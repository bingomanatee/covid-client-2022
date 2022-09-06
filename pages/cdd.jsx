import Head from 'next/head'
import styles from '../styles/Home.module.css'
import GlobeModel from "../lib/GlobeModel";
import { CDDTable } from "../lib/CDDTable";
import CDDForm from "../lib/CDDForm";


export default function Cdd() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Covid State/Country Death Data</title>
        <meta name="description" content="Tablular data" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <GlobeModel>
          <CDDForm />
        </GlobeModel>
      </main>
    </div>
  )
}
