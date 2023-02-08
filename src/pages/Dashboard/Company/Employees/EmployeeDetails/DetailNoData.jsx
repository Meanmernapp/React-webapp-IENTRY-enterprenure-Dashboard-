import React from 'react';
import emptyList from "../../../../../assets/images/warning.svg";

const DetailNoData = ({ title }) => {
  return (
    <div className="mb-5 firearms_card">
      <div className="firearms_txt">
        {title}
        <img
          src={emptyList}
          style={{
            width: "50px",
            height: "50%",
            marginLeft: "1rem"
          }}
        />
        {/* <AiOutlineExclamationCircle className='ml-5' /> */}
      </div>
    </div>
  )
}

export default DetailNoData