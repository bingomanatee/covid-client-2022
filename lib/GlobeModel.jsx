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
  { max: 2 * 10 ** 6, range: rangeSix },
]
const PLAY_TIME = 20;
const TODAY = dayjs();
const START_DATE = dayjs(new Date(2020, 0, 1));
const UNIX_SPAN = TODAY.unix() - START_DATE.unix();
const loadTime = Date.now();

const SCOPE_STATE = 'state';
const SCOPE_COUNTRY = 'country';

let startTime = Date.now();

function colorOf(scope, n) {
  if (scope === SCOPE_STATE) {
    n *= 2;
  }
  for (let index = 0; index < ranges.length; ++index) {
    let { max, range } = ranges[index]
    if (n <= max) {
      let min = index ? ranges[index - 1].max : 0;
      const f = (n - min) / (max - min);
      const color = range(f);
      return `${color.hex()}`;
    }
  }
  return `${WHITE.hex()}`;
}

function getIso3(target) {
  if (target.iso3) return target.iso3;
  return target.adm0_a3;
}

function getAdmin2(target) {
  if (target.admin2) return target.admin2;
  return target.name;
}

function analyze(target) {
  if (target.properties) {
    return analyze(target.properties);
  }
  return {
    iso3: getIso3(target),
    admin2: getAdmin2(target)
  }
}

const API_URL = 'http://100.21.24.136/'

let leaf = new Leaf({
  stateDeathData: [],
  countryDeathData: [],
  width: 300,
  countries: [], // geojson shape data
  states: [],    // geojson shape data
  time: 0,
  animationStartTime: null,
  playing: false,
  currentTime: START_DATE,
  loadIndex: 0,
  scope: SCOPE_COUNTRY,
  loading: true,
  toggling: false,
  loadingStates: false,
  endDate: TODAY,
}, {
  actions: {
    play(leaf) {
      const progress  = leaf.do.progress();
      const progressSeconds = PLAY_TIME * progress;
      const newAnimationStartTime = dayjs().subtract(progressSeconds, 's');
      leaf.do.setAnimationStartTime(newAnimationStartTime.toDate());

      leaf.do.setPlaying(true);
      leaf.do.animate();
    },
    initLoadCycle(leaf) {
      setTimeout(() => {
        leaf.do.loadCycle();
      }, 500)
    },
    toggleScope(leaf) {
      const currentTime = leaf.value.currentTime;
      leaf.do.stop();
      if (leaf.value.toggling) {
        return;
      }
      if (leaf.value.scope === SCOPE_STATE) {
        leaf.do.setScope(SCOPE_COUNTRY)
      } else {
        leaf.do.loadStates();
        leaf.do.setScope(SCOPE_STATE);
      }
      leaf.do.setToggling(true);
      leaf.do.setCurrentTime(currentTime);
      setTimeout(() => {
        leaf.do.setCurrentTime(currentTime);
        leaf.do.setToggling(false)
      }, 100);
    },
    rewind(leaf) {
      leaf.do.stop();
      leaf.do.setCurrentTime(START_DATE);
    },
    loadCycle(leaf) {
      if (typeof windows === 'undefined') {
        return;
      }
      if (Date.now() - startTime > 10 * 1000) {
        return;
      }
      console.log('leaf  loaded: ', loaded);
      if (loaded) {
        return;
      }

      const time = Date.now();
      const rawIndex = (time - loadTime);
      const index = Math.floor(rawIndex / 200) % 7;
      if (index !== leaf.value.loadIndex) {
        // console.log(version, ')---', time, 'raw index', rawIndex, 'index:', index, 'load time', loadTime);
        leaf.do.setLoadIndex(index);
      }

      setTimeout(() => {
        leaf.do.loadCycle();
      }, 50);

    },
    stop(leaf) {
      leaf.do.setPlaying(false);
    },
    progress(leaf) {
      if (!leaf.value.playing) {
        return (leaf.value.currentTime.unix() - START_DATE.unix()) / (UNIX_SPAN);
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
    loadCountryDeathData(leaf) {
      axios.get(API_URL + 'country/summary')
        .then(({ data }) => leaf.do.setCountryDeathData(data));

    },
    loadStateDeathData(leaf) {
      axios.get(API_URL + 'state/summary')
        .then(({ data }) => leaf.do.setStateDeathData(data));
    },
    loadCountries(leaf) {
      axios.get(
        API_URL + 'geojson/country.json')
        .then(({ data }) => {
          leaf.do.setCountries(data.features)
        });
    },
    loadStates(leaf) {
      if (!leaf.value.loadingStates) {
        leaf.do.setLoadingStates(true);
        axios.get(
          API_URL + 'geojson/state.json')
          .then(({ data }) => {
            leaf.do.setStates(data.features)
          });
      }
    },
    getDeathDataForLocation(leaf, location, scope) {
      const {iso3, admin2} = analyze(location);
      if (!scope) {
        scope = leaf.value.scope;
      }
      let match;
      switch (scope) {
        case SCOPE_COUNTRY:
          match = leaf.value.countryDeathData.find((deathItem) => deathItem.level === 1
            && deathItem.iso3 === iso3);
          break;

        case SCOPE_STATE:
          match = leaf.value.stateDeathData.find((deathItem) => deathItem.level === 2
            && deathItem.iso3 === iso3
            && deathItem.admin2 === admin2
          );
          break
      }
      return match;
    },
    checkCountryDeaths(leaf, location) {
      if (!leaf.value.countryDeathData.length) {
        console.log('no death data')
        return 0;
      }
      if (leaf.value.scope === SCOPE_STATE) {
        const {iso3, admin2} = analyze(location);
        const say = iso3 === 'ITA';
        function c(...args) {
          if (say) console.log(...args);
        }
        const match = leaf.do.getDeathDataForLocation({iso3, admin2}, SCOPE_COUNTRY);
        if (!match) {
          c('no death data for ', iso3);
          return 0;
        }
        const deaths = leaf.do.deathDataToNumber(match);
        c('analyzing ', iso3, admin2, 'country deaths: ', deaths);
        if (deaths === 0) {
          c('no deaths in country', iso3);
          return 0;
        }
        c('checking country deaths for ', location, ' country deaths = ', deaths);
        return deaths;

        const otherStatesInCountry = leaf.value.states.find(
          (shapeState) => analyze(shapeState).iso3 === iso3);

        if (!otherStatesInCountry.length) return deaths;

        let statesWithKnownDeaths = 0;
        let statesWithoutKnownDeaths = 0;

        otherStatesInCountry.forEach((shapeState) => {
          let dd = leaf.do.getDeathDataForLocation(shapeState, SCOPE_STATE);
          if (dd) {
            statesWithKnownDeaths += 1;
          } else {
            statesWithoutKnownDeaths += 1;
          }
        });
        if (statesWithKnownDeaths && statesWithKnownDeaths) {
          /**
           * the deaths will be scaled the number of unspecified states / number of total states
           */
          return Math.round( deaths * statesWithoutKnownDeaths / otherStatesInCountry.length);
        } else {
          return deaths;
        }
      } else {
        console.log('ccd scope is not state');
        return 0;
      }
    },
    deaths(leaf, location) {
      if (!location || (!location.properties) || !leaf.selector('deathData').length) {
        return 0;
      }
      const match = leaf.do.getDeathDataForLocation(location);
      if (!match) {
        return leaf.do.checkCountryDeaths(location);
      }
      return leaf.do.deathDataToNumber(match);
    },

    deathDataToNumber(leaf, match){
      const start = dayjs(match.start * 1000);
      const offset = leaf.value.currentTime.diff(start, 'd');
      if (offset < 0) {
        return 0;
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
      return colorOf(leaf.value.scope, n);
    },
  },
  selectors: {
    valueSeries({scope}, leaf) {
      let out = [];

      function seriesFn(deaths) {
        return { label: deaths, color: colorOf(scope, deaths) }
      }

      for (let scale = 2; scale < 6; ++scale) {
        const index = 10 ** scale;
        let values = [
          0,
          0.25,
          0.50,
          0.75
        ].map((offset) => seriesFn(index + (index * 10 - index) * offset));
        out.push(values);
      }
      out.push([10 ** 6, 10 ** 6 * 1.25, 10 ** 6 * 1.5, 10 ** 6 * 2].map(seriesFn))
      return out;
    },
    deathData({ scope, stateDeathData, countryDeathData }) {
      return scope === SCOPE_STATE ? stateDeathData : countryDeathData;
    },
    features({ scope, states, countries }) {
      return scope === SCOPE_STATE ? states : countries
    },
    resolution({scope}) {
      return scope === SCOPE_COUNTRY ? 2 : 3;
    }
  }
});

const GlobeModel = ({ children }) => {
  const [value, setValue] = useState(leaf.value);

  useEffect(() => {
    leaf.do.loadCountryDeathData();
    leaf.do.loadCountries();
    setTimeout(() => {
      leaf.do.loadStates();
      leaf.do.loadStateDeathData();
    }, 3000);
    const sub = leaf.subscribe(setValue);
    return () => sub.unsubscribe();
  }, [leaf]);

  if (typeof windows !== "undefined") {
    leaf.do.initLoadCycle();
  }

  return (
    <GlobeContext.Provider value={{
      leaf,
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
      progress: leaf.do.progressClamped(),
      stopLoading() {
        if (leaf.value.loading) {
          leaf.do.setLoading(false);
        }
      },
      toggleScope() {
        leaf.do.toggleScope();
      },
      rewind() {
        leaf.do.rewind();
      }
    }}>
      {children}
    </GlobeContext.Provider>
  );
}

export default GlobeModel;
