import Inspector from "./Inspector";
import { Canvas } from '@react-three/fiber';
import { useContext, useEffect, useMemo } from "react";
import GlobeContext from "./GlobeContext";
import TimeScale from "./TimeLine";
import { useThree } from '@react-three/fiber'
import ValueSeries from "./ValueScales";
import LoadScreen from "./LoadScreen";
import styles from '../styles/Globe.module.css'
import ScopeToggle from "./ScopeToggle";

let ThreeGlobe = null;

if (typeof window !== 'undefined') {
  ThreeGlobe = require('three-globe').default;
}

function CameraSetter() {
  const sceneState = useThree();
 const {position} = sceneState.camera;
  position.z = 180;
  position.x = 25;
}

const CovidGlobe = () => {
  const {
    $features,
    $resolution,
    colorOf,
    currentTime,
    $valueSeries,
    loading,
    stopLoading,
    loadIndex,
    toggleScope,
    scope,
    toggling,
    rewind
  } = useContext(GlobeContext);

  const globe = useMemo(() => {
    if (toggling || !ThreeGlobe) {
      return false;
    }
    return new ThreeGlobe({ animateIn: false })
      .hexPolygonResolution($resolution)
      .labelResolution($resolution)
      .hexPolygonMargin(0.1)
      .globeImageUrl('/img/earth-dark.jpg')
      .labelText((data) => {
        console.log('label text data: ', data);
        return data && data.properties ? data.properties.iso3 || '' : '';
      })
      .labelColor(() => 'white')
      .labelSize(2)
      .labelAltitude(0.01)
      .labelLat(d => {
        console.log('ll data:', d);
        if (d && d.properties) {
          return d.properties.latitude;
        }
        return 0;
      })
      .labelLng(d => {
        if (d.properties) {
          return d.properties.longitude;
        }
        return 0;
      })
      .hexPolygonColor((country) => {
        return colorOf(country)
      });
  }, [$features, $resolution, ThreeGlobe, toggling]);

  useEffect(() => {
    if (globe && $features.length) {
      globe.hexPolygonsData([...$features])
        .labelsData($features);
    }
  }, [globe, currentTime, $features]);

  useEffect(() => {
    if (globe && $features.length) {
      stopLoading();
    }
  }, [globe, $features])

  if (loading) {
    return <div className={styles['load-screen']}>
      <LoadScreen sequence={loadIndex}/>
    </div>
  }

  return (
    <>
      <div style={{ position: 'absolute', right: 0, top: 0 }}>
        <ValueSeries values={$valueSeries}/>
      </div>
      <Canvas>
        <ambientLight color="#cddbfe"/>
        <directionalLight color="#cddbfe"/>
        <pointLight position={[10, 10, 10]}/>
        {(
          <group>
            <CameraSetter />
            <Inspector>
              <primitive object={globe}/>
            </Inspector>
          </group>
        )}
      </Canvas>
      <TimeScale/>
      <header className={styles.header}>
        <div className={styles.title}>
          <h1>Deaths from COVID-19 over time</h1>
          <p>Click play button at bottom of screen</p>
        </div>
        <section className={styles.scope}>
          <ScopeToggle scope={scope} toggle={toggleScope}></ScopeToggle>
        </section>
      </header>
    </>
  )
}

export default CovidGlobe;
