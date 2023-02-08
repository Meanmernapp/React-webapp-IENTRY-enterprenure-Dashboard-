import React from 'react';
import warningIcon from '../../../assets/images/warning.svg'

const NoEvent = ({ title }) => {
    return (
        <div className='records'>
            <div className="not_available">
                <span>{`NO ${title}`}</span>
                <div className="icon">
                    <img src={warningIcon} alt="warning" />
                </div>
            </div>
        </div>
    )
}

export default NoEvent