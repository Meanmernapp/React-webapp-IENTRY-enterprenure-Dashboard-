import React from 'react'
import loadericon from '../assets/icon/spinner.gif'

const FullPageLoader = () => {
    return (
        <div className='loader_container' id='overlay'>
           
              <div className='loader_div'>
                <img src={loadericon} alt="" width="80px" height="80px" />
              </div>
           

        </div>
    )
}

export default FullPageLoader