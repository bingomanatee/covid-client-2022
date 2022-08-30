import GlobeContext from "./GlobeContext";
import { useEffect, useMemo, useState } from "react";
import { Leaf } from "@wonderlandlabs/forest";
import { clamp } from 'lodash';
import axios from "axios";
import dayjs from "dayjs";
import color from 'color';

const CONTINENTS = ['all', 'Africa', 'Europe', 'Americas', 'Asia'];
const toRGB = (list) => list.map((n) => clamp(Math.round(n * 255), 0, 255));
export const BLACK = color.rgb(...toRGB([0.005, 0, 0.01]));
const colorOne = color.rgb(...toRGB([0, 0.25, 0.25]));
const colorTwo = color.rgb(...toRGB([0.25, 0.4, 0]));
const colorThree = color.rgb(...toRGB([0.8, 0.5, 0]));
const colorFour = color.rgb(...toRGB([1, 0.125, 0.25]));
const colorFive = color.rgb(...toRGB([0.4, 0, 0.3]));
const colorSix = color.rgb(...toRGB([0.25, 0, 0.125]));
const WHITE = color.rgb(...toRGB([1, 1, 1]));

const rangeOne = (n) => BLACK.mix(colorOne, n);
const rangeTwo = (n) => colorOne.mix(colorTwo, n);
const rangeThree = (n) => colorTwo.mix(colorThree, n);
const rangeFour = (n) => colorThree.mix(colorFour, n);
const rangeFive = (n) => colorFour.mix(colorFive, n);
const rangeSix = (n) => colorFive.mix(colorSix, n);

const ranges = [
  { max: 10 ** 3, range: rangeOne },
  { max: 10 ** 4, range: rangeTwo },
  { max: 10 ** 4.5, range: rangeThree },
  { max: 10 ** 5, range: rangeFour },
  { max: 10 ** 6, range: rangeFive },
  { max: 2 * 10 **6, range: rangeSix },
]
const PLAY_TIME = 20;
const TODAY = dayjs();
const START_DATE = dayjs(new Date(2020, 0, 1));
const UNIX_SPAN = TODAY.unix() - START_DATE.unix();

const GlobeModel = ({ children }) => {
  const [value, setValue] = useState({ countries: false, resolution: 3 });
  let leaf = useMemo(() => new Leaf({
    deathData: [],
    resolution: 3,
    width: 300,
    countries: [],
    time: 0,
    animationStartTime: null,
    playing: false,
    currentTime: START_DATE
  }, {
    actions: {
      play(leaf) {
        leaf.do.setAnimationStartTime(Date.now());
        leaf.do.setPlaying(true);
        leaf.do.animate();
      },
      stop(leaf) {
        leaf.do.setPlaying(false);
      },
      progress(leaf) {

        if (!leaf.value.playing) {
          return (leaf.value.currentTime.unix() - START_DATE.unix()) / PLAY_TIME;
        }

        const secondsSinceStart = (leaf.value.time - leaf.value.animationStartTime) / 1000.0;
        return secondsSinceStart / PLAY_TIME;
      },
      progressClamped(leaf) {
        return Math.min(1, leaf.do.progress());
      },
      animate(leaf) {
        if (!leaf.value.playing) {
          return;
        }
        leaf.do.setTime(Date.now());

        const progress = leaf.do.progress();
        if (progress > 1) {
          leaf.do.setCurrentTime(TODAY);
          leaf.do.setPlaying(false);
          return;
        }

        leaf.do.setCurrentTime(dayjs.unix(START_DATE.unix() + progress * UNIX_SPAN));
        requestAnimationFrame(leaf.do.animate);
      },
      loadDeathData(leaf) {
        axios.get('//localhost:3010/country/summary')
          .then(({ data }) => leaf.do.setDeathData(data));

      },
      loadCountries(leaf) {
        axios.get(
          //'/geojson/ne_10m_admin_1_states_provinces.geojson.json')
          '/geojson/ne_10m_admin_0_countries.geojson.json')
          .then(({ data }) => {
            leaf.do.setCountries(data.features)
          });
      },
      deaths(leaf, country) {
        if (!leaf.value.deathData) {
          return 0;
        }
        const say = Math.random() < 0.01;

        const { properties: { ISO_A3 } } = country;
        if (say) {
          console.log('looking for ', ISO_A3);
        }
        if (!leaf.value.deathData) {
          if (say) {
            console.log('not found');
          }
          return 0;
        }
        const match = leaf.value.deathData.find((countryData) => countryData.level === 1 && countryData.iso3 === ISO_A3);
        if (say) {
          console.log('match is', match);
        }
        if (!match) {
          return 0;
        }
        const start = dayjs(match.start * 1000);
        const offset = leaf.value.currentTime.diff(start, 'd');
        if (offset < 0) {
          return 0;
        }
        if (say) {
          console.log('offset is', offset, 'from', start.toISOString());
        }
        if (offset >= match.deaths.length) {
          return match.deaths[match.deaths.length - 1];
        }
        return match.deaths[offset];
      },
      deathColor(leaf, country) {
        let deaths = leaf.do.deaths(country);
        const color = leaf.do.colorOf(deaths);

        return color;
      },
      colorOf(leaf, n = 0) {
        for (let index = 0; index < ranges.length; ++index) {
          let { max, range } = ranges[index]
          if (n <= max) {
            let min = index ? ranges[index - 1].max : 0;
            const f = (n - min) / (max - min);
            const color = range(f);

            console.log('colorOf value', n, 'f ', f, 'between', min, max, 'color:', color.hex());

            return `${color.hex()}`;
          }
        }
        console.log('big deaths at ', n);
        return `${WHITE.hex()}`;
      },
    },
    selectors: {
      valueSeries({}, leaf) {
        let out = [];
        function seriesFn (deaths) {
          return { label: deaths, color: leaf.do.colorOf(deaths) }
        }

        for (let scale = 2; scale < 6; ++scale) {
          const index = 10 ** scale;
          let values =  [
            0,
            0.25,
            0.50,
            0.75
          ].map((offset) => seriesFn(index + (index * 10 - index) * offset));
          out.push(values);
        }
        out.push([10 ** 6, 10 ** 6 * 1.25, 10 ** 6 * 1.5, 10 ** 6  * 2].map(seriesFn))
        return out;
      }
    }
  }), []);

  useEffect(() => {
    leaf.do.loadDeathData();
    const sub = leaf.subscribe(setValue);
    leaf.do.loadCountries();
    return () => sub.unsubscribe();
  }, [leaf]);

  return (
    <GlobeContext.Provider value={{
      ...value,
      colorOf(country) {
        return leaf.do.deathColor(country)
      },
      play() {
        leaf.do.play();
      },
      stop() {
        leaf.do.stop();
      },
      progress: leaf.do.progressClamped()
    }}>
      {children}
    </GlobeContext.Provider>
  );
}

export default GlobeModel;
