import Inspector from "./Inspector";
import { Canvas } from '@react-three/fiber';
import { useContext, useEffect, useMemo } from "react";
import GlobeContext from "./GlobeContext";
import TimeScale from "./TimeLine";
import dayjs from "dayjs";
import ValueSeries from "./ValueScales";
import LoadScreen from "./LoadScreen";
import styles from '../styles/Globe.module.css'
import ScopeToggle from "./ScopeToggle";

let ThreeGlobe = null;

if (typeof window !== 'undefined') {
  ThreeGlobe = require('three-globe').default;
}

const CovidGlobe = () => {
  const {
    $features,
    $resolution,
    colorOf,
    playing,
    play,
    stop,
    currentTime,
    progress,
    $valueSeries,
    loading,
    stopLoading,
    loadIndex,
    toggleScope,
    scope,
    toggling
  } = useContext(GlobeContext);

  const globe = useMemo(() => {
    if (toggling || !ThreeGlobe) {
      return false;
    }
    return new ThreeGlobe({ animateIn: false })
      .hexPolygonResolution($resolution)
      .hexPolygonMargin(0.1)
      .globeImageUrl('/img/earth-dark.jpg')
      .hexPolygonColor((country) => {
        return colorOf(country)
      });
  }, [$features, $resolution, ThreeGlobe, toggling]);

  useEffect(() => {
    if (globe && $features.length) {
      globe.hexPolygonsData([...$features])
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
          <mesh position={[-20, -5, -180]}>
            <Inspector>
              <primitive object={globe}/>
            </Inspector>
          </mesh>
        )}
      </Canvas>
      <TimeScale playing={playing} currentTime={currentTime} play={play} progress={progress} stop={stop}
                 now={dayjs().format('MMMM YYYY')}/>
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
