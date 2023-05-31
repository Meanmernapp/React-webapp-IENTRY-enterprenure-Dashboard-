/*
Author : Arman Ali
Module: create Vehicle
github: https://github.com/Arman-Arzoo
*/
import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import useStyle from "../hooks/useStyle";

const SelectWithSearch = ({ options, label, onSelect,update,checkUpdate }) => {
    // option : is the api response
    // label : is the lable of select
    // onSelect : return data to parent
  const [value, setValue] = useState(null);
  const { textField } = useStyle()

//   a funtion to set value of on change field...
  const handleSelect = (event, newValue) => {
    setValue(newValue);
    onSelect(newValue);
  
  };

  useEffect(()=>{
    if(checkUpdate=== "update"){
      setValue(update)
    }
  },[])

  return (
    <Autocomplete
    
      options={options}
      getOptionLabel={(option) => option.name}
      onChange={handleSelect}
      sx={textField}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: "disabled",
          }}
        />
      )}
    />
  );
};

export default SelectWithSearch;
