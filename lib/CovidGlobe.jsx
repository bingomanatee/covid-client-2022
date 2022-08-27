import Inspector from "./Inspector";
import { Canvas } from '@react-three/fiber';
/*
import { useEffect, useMemo, useState } from "react";
import { Leaf } from "@wonderlandlabs/forest";
import dayjs from "dayjs";
import axios from "axios";
*/

const CONTINENTS = ['all', 'Africa', 'Europe', 'Americas', 'Asia'];

const ThreeGlobe = require('three-globe').default;

const CovidGlobe = () => {
/*  const leaf = useMemo(() => new Leaf(
    {
      geoJson: null,
      time: 0,
      continent: 'all',
      animate: false,
      animationInterval: 0.25,
      globe: null,
    },
    {
      selectors: {
        currentDate({ time }) {
          let date = dayjs(new Date(2020, 0, 1));
          return date.add(time, 'd');
        },
        resolution({ continent }) {
          switch (continent) {
            case 'Europe':
              return 4;
              break;

            case 'Americas':
              return 3;
              break;

            case 'Africa':
              return 3;
              break;

            default:
              return 2;
          }
        },
        features({ geoJson, continent }) {
          if (!geoJson) {
            return null;
          }
          if (continent === 'all') {
            return geoJson;
          }
          const some = geoJson.filter((f) => {
            if (f.properties.WB_A3 === 'RUS') {
              return continent === 'Asia'
            }
            if (continent === 'Americas') {
              return f.properties.CONTINENT === 'North America' || f.properties.CONTINENT === 'South America'
            }
            if (continent === 'Asia') {
              if (f.properties.CONTINENT === 'Oceania') {
                return true;
              }
            }
            return f.properties.CONTINENT === continent
          });

          return some;
        },
      },

      actions: {
        newContinent(leaf, continent) {
          leaf.do.setContinent(continent);
        },
        colorFn(leaf, country) {
          /!* const {properties} = country;
           const iso = properties.WB_A3;
           const key = `${iso}-deaths`;
           const pivot = model.base.table('pivots').getData(key);
           if (!pivot) {
             return BLACK.hex();
           }
           const {offset, st, data} = pivot;

           const currentTime = leaf.selector('currentDate');

           const pivotStartTime = dayjs(st).add(offset, 'd');
           const index = currentTime.diff(pivotStartTime, 'd');


           if (index < 0) return BLACK.hex();

           if (index >= data.length) {
             return model.valueToColor(data[data.length - 1]);
           }
           const color = model.valueToColor(data[index]);
           return color;
           *!/
          return 'black';
        },
        toggleAnimate(leaf) {
          leaf.do.setAnimate(!leaf.value.animate);
          leaf.do.setTime(0);
          if (leaf.value.animate) {
            leaf.do.next();
          }
        },
        next(leaf) {
          if (!leaf.value.animate) {
            return;
          }

          const currentTime = leaf.selector('currentDate');
          if (currentTime.isSameOrAfter(new Date())) {
            return;
          }
          setTimeout(leaf.do.advanceTime, leaf.value.animationInterval);
        },
        advanceTime(leaf) {
          leaf.do.setTime(leaf.value.time + 1);
          leaf.do.next();
        },
        loadGeoJson(leaf) {
             axios.get('/geojson/ne_10m_admin_0_countries.geojson')
               .then(({ data }) => {
                 leaf.do.setGeoJson(data);
               });
        }
      }
    }
  ), []);
  useEffect(() => {
    const sub = leaf.subscribe(setState);
    leaf.do.loadGeoJson();
    return () => sub.unsubscribe();
  }, [leaf]);

  const [state, setState] = useState(null);
  const { geoJson, changing, continent = 'all', time, animate, $currentDate, $features, $resolution } = (state || {});

  const globe = useMemo(() => {
    if ((!ThreeGlobe) || $features) {
      return null;
    }
    const globe = new ThreeGlobe({ animateIn: false })
      .globeImageUrl('/img/earth-dark.jpg')
      .hexPolygonsData($features)
      .hexPolygonResolution($resolution)
      .hexPolygonMargin(0.1)
      .hexPolygonColor(leaf.do.colorFn);
    return globe;
  }, [continent, $features, geoJson, ThreeGlobe, changing]);*/
  const globe = new ThreeGlobe({ animateIn: false })
    .globeImageUrl('/img/earth-dark.jpg')
  return (
    <Canvas>
      <ambientLight color="#cddbfe"/>
      <directionalLight color="#cddbfe"/>
      <pointLight position={[10, 10, 10]}/>

      {(
        <mesh position={[-20, -5, -180]}>
          <Inspector>
            <primitive object={globe}/>
          </Inspector>
        </mesh>
      )}
    </Canvas>
  )
}

export default CovidGlobe;
