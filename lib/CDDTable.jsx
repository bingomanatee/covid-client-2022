import { useContext, useEffect, useMemo } from "react";
import GlobeContext from "./GlobeContext";
import { sortBy } from 'lodash';
import styles from '../styles/CDD.module.css';

export const CDDTable = () => {
  const {
    stateDeathData,
    countryDeathData,
    countries,
    states,
    leaf
  } = useContext(GlobeContext);

  useEffect(() => {
    leaf.do.loadStates();
    leaf.do.loadStateDeathData();
  }, []);

  const stateDDR = useMemo(() => {
    return function ddr({ iso3, admin2 }) {
      const dd = stateDeathData.find((ddItem) => {
        return ddItem.iso3 === iso3 && ddItem.admin2 === admin2;
      });
      if (dd) {
        return dd.deaths.length;
      }
      return '--'
    }
  }, []);

  const iso3s = useMemo(() => {
    const set = new Set();
    states.forEach((state) => {
      if (state.properties.iso3) {
        set.add(state.properties.iso3);
      }
      if (state.properties.adm0_a3) {
        set.add(state.properties.adm0_a3);
      }
    });
    return Array.from(set).sort();
  }, [states, stateDeathData]);

  function deathState(iso3, admin2) {
    return states.find(({ properties }) => {
      const { iso3: sISO, admin2: sADMIN } = properties;
      return iso3 === sISO && admin2 === sADMIN;
    })
  }

  console.log('states:', states);
  return (
    <article>
      <h1>Covid Data Tables</h1>

      <div className={styles.container}>
        <section>
          {iso3s.map(rowIso3 => {
            return (
              <div className={styles.row} key={rowIso3}>
                <div>
                  <h2>{rowIso3} States</h2>
                  <table>
                    <thead>
                    <tr>
                      <td>iso3</td>
                      <td>Name</td>
                      <td>admin2</td>
                      <td>(no match)</td>
                      <td>deathData rows</td>
                    </tr>
                    </thead>
                    {sortBy(states, 'properties.iso3', 'properties.admin2',
                      'properties.adm0_a3', 'properties.name')
                      .filter(({ properties }) => {
                        return properties.iso3 === rowIso3 || properties.adm0_a3 === rowIso3
                      })
                      .map(({ properties }, i) => {
                        return (
                          <tr key={i + (properties.iso3 || properties.adm0_a3)}>
                            <td>{properties.iso3 || properties.adm0_a3}</td>
                            <td>{properties.admin1}</td>
                            <td>{properties.admin2 || properties.name}</td>
                            <td>{properties.adm0_a3 ? '*' : ''}</td>
                            <td>{stateDDR(properties)}</td>
                          </tr>
                        )
                      })}
                  </table>
                </div>
                <div>
                  <h2>{rowIso3} Death Data</h2>
                  <table>
                    <thead>
                    <tr>
                      <td>iso3</td>
                      <td>admin2</td>
                      <td>state found</td>
                    </tr>
                    </thead>
                    {sortBy(stateDeathData, 'iso3', 'admin2')
                      .filter((state) => state.iso3 === rowIso3)
                      .map(({ iso3, admin1, admin2 }, i) => {
                        return (<tr key={i + iso3}>
                          <td>{iso3}</td>
                          <td>{name}</td>
                          <td>{admin2}</td>
                          <td>{deathState(iso3, admin2) ? 'MATCH' : ''}</td>
                        </tr>)
                      })}
                  </table>
                </div>
              </div>
            )
          })}
        </section>
      </div>
    </article>
  )
}
