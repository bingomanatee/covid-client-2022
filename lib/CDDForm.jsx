import { useContext, useEffect, useMemo } from "react";
import GlobeContext from "./GlobeContext";
import styles from '../styles/CDD.module.css';
import { Accordion, AccordionPanel, Box, Grommet, Heading } from "grommet";
import EditStateForm from "./EditStateForm";

const CCDForm = () => {
  const {
    stateDeathData,
    states,
    leaf
  } = useContext(GlobeContext);

  useEffect(() => {
    leaf.do.loadStates();
    leaf.do.loadStateDeathData();
  }, []);

  const stateIso3s = useMemo(() => {
    const set = new Set();
    stateDeathData.forEach((state) => {
      if (state.iso3) {
        set.add(state.iso3);
      }
    });
    return Array.from(set).sort();
  }, [stateDeathData])

  function deathState(iso3, admin2) {
    return states.find(({ properties }) => {
      const { iso3: sISO, admin2: sADMIN } = properties;
      return iso3 === sISO && admin2 === sADMIN;
    })
  }

  return (
    <Grommet>
      <Box overflow="scroll" height="100vh">

      <Heading>COVID-19 States by Country ({stateIso3s.length}) </Heading>
      <Accordion>
        {stateIso3s.map((iso3) => {
          return (<AccordionPanel key={iso3} label={iso3}>
            <Heading level={2}>{iso3} States</Heading>
            <EditStateForm iso3={iso3} states={states} stateDeathData={stateDeathData} />
          </AccordionPanel>)
        })}
      </Accordion>
    </Box>
    </Grommet>
  )

}

export default CCDForm;
