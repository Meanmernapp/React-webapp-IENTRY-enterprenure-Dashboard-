import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import useStyle from '../hooks/useStyle';
import { Box } from '@mui/material';

const ReusableTextField = ({
  label,
  value,
  onChange,
  helperText,
  validate,
  isRequired,
  submitClicked,
}) => {
  const { textField, smallBoxStyle } = useStyle();
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    if (validate) {
      const validationResult = validate(inputValue);
      setError(validationResult);
    }

    onChange(inputValue);
  };

  const handleInputBlur = () => {
    setTouched(true);
  };

  useEffect(() => {
    if (submitClicked) {
      setTouched(true);
      setError(true)
    }
  }, [submitClicked]);

  return (
    <Box sx={{...smallBoxStyle,
        ...(error && { marginBottom: '1.5rem' })}}>
      <TextField
        size="small"
        label={label}
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        variant="outlined"
        fullWidth
        required={isRequired}
        helperText={
          (isRequired && touched && !value) || error  ? helperText ? helperText :
          "Field is Required" : ''
        }
        error={(isRequired && touched && !value) || error}
        sx={{
          ...textField,
         
        }}
      />
    </Box>
  );
};

export default ReusableTextField;
