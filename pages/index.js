import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import GlobeModel from "../lib/GlobeModel";

const CovidGlobe = dynamic(() => import('../lib/CovidGlobe'), {
  ssr: false,
})

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Covid State/Country Death Data</title>
        <meta name="description" content="Covid State/Country Death Data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <GlobeModel>
          <CovidGlobe />
        </GlobeModel>
      </main>
    </div>
  )
}
