import React from 'react'
import warning from '../assets/warningImage.svg'

const NotFoundDataWarning = ({ text }) => {
    return (
        <div className="not_found_waring mb-3 mt-3">
            <p> {text}</p>
            <img src={warning} alt="" />
            {/* <div className="warning">
                <i class="fa fa-exclamation" aria-hidden="true"></i>
            </div> */}
        </div>
    )
}

export default NotFoundDataWarning