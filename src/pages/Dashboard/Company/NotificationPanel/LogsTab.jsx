import React from 'react';
import LoginLogsTab from './SubComponents/LoginLogsTab'
import CrudLogsTab from './SubComponents/CrudLogsTab'

const LogsTab = () => {

    return (
        <div className='row m-auto'>
            <div className="col-6 mx-auto notifications">
                <CrudLogsTab />
            </div>
            <div className="col-6 mx-auto notifications">
                <LoginLogsTab />
            </div>
        </div>
    )
}

export default LogsTab