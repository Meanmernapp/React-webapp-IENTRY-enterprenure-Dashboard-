import React from 'react';
import ic_clean from '../assets/images/ic-clean.svg';
import Tooltip from '@mui/material/Tooltip';


const ClearButton = ({ handleClear, flagTooltip, textTooltip }) => {
  return (
    <div className='clearIcon'>
      {flagTooltip ?
        <Tooltip title={textTooltip?.toUpperCase()} placement="left" arrow >
          <button className='btn-option' onClick={handleClear}>
            <img src={ic_clean} alt="ic_clean" />
          </button>
        </Tooltip>
        :
        <button className='btn-option' onClick={handleClear}>
          <img src={ic_clean} alt="ic_clean" />
        </button>
      }
    </div>
  );
};

export default ClearButton;