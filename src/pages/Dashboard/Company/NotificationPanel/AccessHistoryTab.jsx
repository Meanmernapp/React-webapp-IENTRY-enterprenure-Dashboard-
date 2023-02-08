import React from 'react'
import UserAccessHistoryTab from './SubComponents/UserAccessHistoryTab'
import VehicleAccessHistoryTab from './SubComponents/VehicleAccessHistoryTab'

const AccessHistoryTab = () => {
    return (
        <div className='row m-auto'>
            <div className="col-6 mx-auto notifications">
                <UserAccessHistoryTab />
            </div>
            <div className="col-6 mx-auto notifications">
                <VehicleAccessHistoryTab />
            </div>
        </div>
    )
}

export default AccessHistoryTab