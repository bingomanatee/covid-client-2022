import * as PropTypes from "prop-types";
import { Leaf } from "@wonderlandlabs/forest";
import { useEffect, useMemo, useState } from "react";
import { Box, Button, Form, Heading, DataTable, Spinner, Text } from "grommet";
import FuzzyMatching from 'fuzzy-matching';
import axios from "axios";

const YES = <Text color="status-ok">Yes</Text>;
const ALIASED = <Text color="status-warning">Aliased</Text>;
const NO = <Text color="status-error">No</Text>;

function AttachBestMatch({ match, target, onClick }) {
  return (
    <Box margin="medium" gap="medium" align="baseline" direction="row"
         border={{ width: 2, color: 'branding' }} pad="small">
      <Heading level={3}>
        Attach {match.label}
      </Heading>
      <Text>to {target}</Text>
      <Button primary onClick={() => onClick(match)} label="Attach"></Button>
    </Box>
  )
}

AttachBestMatch.propTypes = {
  onClick: PropTypes.func,
  match: PropTypes.any,
  target: PropTypes.string
};

function EditStateForm({
                         states, iso3, stateDeathData
                       }) {

  const formLeaf = useMemo(() => new Leaf(
      {
        iso3filter: iso3,
        stateNameFilter: '',
        dataStateCheckedRows: [],
        shapeStatesCheckedRows: [],
        shapeStates: states,
        dataStates: [],
      },
      {
        actions: {
          loadStates(leaf) {
            axios.get('//localhost:3010/state/states')
              .then(({ data }) => leaf.do.setDataStates(data))
          },
          matchingShape(leaf, iso3f, admin2f) {
            return leaf.value.shapeStates.find(({ properties: { iso3, admin2 } }) => {
              return iso3 === iso3f & admin2 === admin2f;
            });
          },
          attachBestMatch(leaf, match) {
            const { state } = match;
            leaf.do.attachState(state);
          },
          attachState(leaf, state) {
            const iso3 = state.properties.adm0_a3 || state.properties.iso3;
            const name = state.properties.name;
            const dataState = leaf.selector('selectedState');

            axios.post('//localhost:3010/state/alias/' + dataState.id,
              { iso3, name })
              .then(() => leaf.do.loadStates());
          },
          fuzzyMatch(leaf, name) {
            const items = leaf.selector('items');
            const keys = Array.from(items.keys());
            const fuz = new FuzzyMatching(keys);
            console.log('matching', name, 'against ', keys);

            const { distance, value } = fuz.get(name);
            if (items.has(value)) {
              return items.get(value);
            }
            return null;
          }
        },
        selectors: {
          items({ shapeStates }) {
            return shapeStates.reduce((map, state) => {
              const { name, adm0_a3, iso3: stateIso3, admin2 } = state.properties;
              if (stateIso3 === iso3) {
                map.set(admin2, { state, field: 'admin2', label: admin2 });
              } else if (adm0_a3 === iso3) {
                map.set(name, { state, field: 'name', label: name });
              }
              return map;
            }, new Map());
          },
          localStates({ dataStates }) {
            return dataStates.filter((ds) => ds.iso3 === iso3)
          },
          filteredShapeStates({ iso3filter, shapeStates }) {
            const re = new RegExp(iso3filter, 'i');
            const out = shapeStates
              .filter(({ properties: { iso3, adm0_a3 } }) => re.test(iso3) || re.test(adm0_a3))
              .map((data) => {
                return { id: JSON.stringify(data.properties), ...data };
              })

            return out;
          },
          attachable({ dataStateCheckedRows }) {
            return dataStateCheckedRows.length === 1;
          },
          selectedState({ dataStateCheckedRows, dataStates }) {
            const admin2 = dataStateCheckedRows[0];
            return dataStates.filter((ds) => ds.iso3 === iso3 && ds.admin2 === admin2)[0]
          },
          selectedAdmin2({ dataStateCheckedRows }) {
            if (!(dataStateCheckedRows.length === 1)) {
              return null;
            }
            return dataStateCheckedRows[0];
          }
        },

      }
    ),
    [iso3]
  );

  const [values, setValues] = useState(formLeaf.values);

  useEffect(() => {
    formLeaf.do.loadStates();

    const sub = formLeaf.subscribe(setValues);
    return () => sub.unsubscribe();
  }, [formLeaf])


  useEffect(() => {
    formLeaf.do.setShapeStates(states);
  }, [states, formLeaf]);


  const { $filteredShapeStates, $localStates, iso3filter, $attachable, $selectedAdmin2 } = (values || {});


  const selectedItemMatch = useMemo(() => {
    if (!$selectedAdmin2) {
      return null;
    }
    return formLeaf.do.fuzzyMatch($selectedAdmin2);
  }, [formLeaf, $selectedAdmin2])

  if (!values) {
    return <Spinner size="large"/>
  }
  console.log('values:', values, 'sim', selectedItemMatch)

  return (
    <Box margin="1rem" overflow="scroll">
      <Heading level={2}>States in ISO3 &quot;{iso3}&quot;</Heading>
      <DataTable data={$localStates}
                 onSelect={formLeaf.do.setDataStateCheckedRows}
                 onClickRow='select'
                 columns={[
                   { property: 'admin2', header: 'Admin 2', primary: true },
                   {
                     property: 'shape_states', header: 'Aliases',
                     render({ shape_states, iso3 }) {
                       if (!shape_states.length) {
                         return '';
                       }
                       return shape_states.reduce((memo, ss) => {
                         if (ss.iso3 === iso3) {
                           return [...memo, ss.name];
                         }
                         return [...memo, `${ss.iso3}:${ss.name}`]
                       }, []).join(", ");
                     }
                   },
                   {
                     property: '', header: 'Direct Match',
                     render: ({ iso3, admin2, shape_states }) => {
                       let match = formLeaf.do.matchingShape(iso3, admin2);
                       if (match) {
                         return YES;
                       }
                       if (shape_states.length) {
                         return ALIASED;
                       }
                       return NO;
                     }
                   }
                 ]}
      />
      <Heading level={2}>State Shapes in &quot;{iso3filter}&quot;</Heading>

      {(selectedItemMatch && $attachable) ?
        <AttachBestMatch match={selectedItemMatch} onClick={formLeaf.do.attachBestMatch}
                         target={$selectedAdmin2}/>
        : ''}

      <DataTable data={$filteredShapeStates}
                 onClickRow='select'
                 columns={[
                   { property: 'id', size: 0, primary: true, render: () => '' },
                   { property: 'properties.iso3', header: 'ISO 3' },
                   { property: 'properties.adm0_a3', header: 'ADM 0 A3' },
                   { property: 'properties.name', header: 'Name' },
                   { property: 'properties.admin2', header: 'Admin 2' },
                   {
                     property: 'geometry', header: 'Best Match',
                     render: ({
                                properties
                              }) => {
                       const {
                         name, admin2
                       } = properties;
                       if (selectedItemMatch) {
                         if (selectedItemMatch.label === admin2 || selectedItemMatch.label === name) {
                           return YES;
                         }
                       }
                       return NO;
                     }
                   },
                   {
                     property: '', size: '14rem', render: (state) => {
                       if ($attachable) {
                         return <Button label="Attach"
                                        onClick={() => formLeaf.do.attachState(state)}
                         ></Button>;
                       }
                       return '';
                     }
                   }
                 ]}
      />
    </Box>
  )
}

EditStateForm.propTypes = { iso3: PropTypes.any };

export default EditStateForm;
