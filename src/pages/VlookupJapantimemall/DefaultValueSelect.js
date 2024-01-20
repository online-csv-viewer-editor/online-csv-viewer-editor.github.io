
import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const DefaultValueSelect = ( { state } ) => {

  const { defaultKeyValuePairs, setDefaultKeyValuePairs } = state;

  const deliveryOptionKeyValues = new Map();
  deliveryOptionKeyValues.set("default", "해운특송"); 
  deliveryOptionKeyValues.set("label", "배송방법"); 
  deliveryOptionKeyValues.set("name", "배송방법"); 
  deliveryOptionKeyValues.set("id", "배송방법"); 
  deliveryOptionKeyValues.set("options", ["해운특송", "항공특송" ]);

  const DefaultFormControl = ( { optionKeyValues } ) => {

    const [ selected, setSelected ] = React.useState(optionKeyValues.get("default"));

    const handleSelectChange = (event) => {

      const newDefaultKeyValuePairs = new Map(defaultKeyValuePairs);
      newDefaultKeyValuePairs.set(optionKeyValues.get("name"), event.target.value);
      setDefaultKeyValuePairs(newDefaultKeyValuePairs);

      setSelected(event.target.value);
    };

    return (
      <FormControl>
        <InputLabel variant="standard" htmlFor={optionKeyValues.get("name")}>
          {optionKeyValues.get("label")}
        </InputLabel>
        <NativeSelect
          value={selected}
          defaultValue={optionKeyValues.get("default")}
          onChange={handleSelectChange}
          inputProps={{
            name: optionKeyValues.get("name"),
            id: optionKeyValues.get("id"),
          }}
        >
          {
            optionKeyValues.get("options").map((option) => {
              return (
                <option key={option} value={option}>{option}</option>
              )
            })
          }
        </NativeSelect>
      </FormControl>
    );
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <DefaultFormControl optionKeyValues={deliveryOptionKeyValues} />
    </Box>
  );
}

export default DefaultValueSelect;