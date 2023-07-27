import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutoCompleteSearch({ data, value, setValue, handleFn, label,defaultState }) {
  console.log(data)



  return (
    <Autocomplete
      size='small'
      disablePortal
      id={data?.id}
      options={data}
      defaultValue={defaultState}
      value={value}
      onChange={(event, newValue) => {
        if (newValue) {
          setValue(newValue);
          handleFn(newValue)
        }
      }}

      renderInput={(params) => <TextField    {...params} label={label ? label : "search"}

      />}
    />
  );
}