import Inspector from "./Inspector";
import { Canvas } from '@react-three/fiber';
import { useContext, useEffect, useMemo } from "react";
import GlobeContext from "./GlobeContext";
import TimeScale from "./TimeScale";
import dayjs from "dayjs";
import ValueSeries from "./ValueScales";

let ThreeGlobe = null;

if (typeof window !== 'undefined') {
  ThreeGlobe = require('three-globe').default;
}

const CovidGlobe = () => {
  const { countries, resolution, colorOf, playing, play, stop, currentTime, progress, $valueSeries } = useContext(GlobeContext);

  const globe = useMemo(() => {
    if (!ThreeGlobe) {
      return false;
    }
    return new ThreeGlobe({ animateIn: false })
      .hexPolygonResolution(resolution)
      .hexPolygonMargin(0.1)
      .globeImageUrl('/img/earth-dark.jpg')
      .hexPolygonColor((country) => {
        return colorOf(country)
      });
  }, [countries, resolution, ThreeGlobe]);

  useEffect(() => {
    if (countries.length)
    globe.hexPolygonsData([...countries])
  }, [globe, currentTime, countries])

  if (!globe || !countries.length || (typeof window === 'undefined')) {
    return <div>loading...</div>;
  }


  return (
    <>
      <div style={{position: 'absolute', left: 0, right: 200, top: 0, padding: '1rem'}}>
        <h1>Deaths from COVID-19 over time</h1>
        <p>Click play button at bottom of screen</p>
      </div>
      <div style={{position: 'absolute', right: 0, top: 0}}>
        <ValueSeries values={$valueSeries} />
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

    </>
  )
}

export default CovidGlobe;
