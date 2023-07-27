import React from 'react'
import warning from '../assets/warningImage.svg'

const NotFoundDataWarning = ({ text }) => {
    return (
        <div className="not_found_waring mb-3 mt-2">
            <img className='mr-2' src={warning} alt="" />
            <p className='text-center'> {text}</p>
        </div>
    )
}

export default NotFoundDataWarning