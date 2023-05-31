import React from 'react';
import ic_clean from '../assets/images/ic-clean.svg';

const ClearButton = ({ handleClear }) => {
  return (
    <div className='clearIcon'>
      <button className='btn-option' onClick={handleClear}>
        <img src={ic_clean} alt="ic_clean" />
      </button>
    </div>
  );
};

export default ClearButton;