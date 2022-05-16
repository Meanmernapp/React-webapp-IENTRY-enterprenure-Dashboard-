import React from 'react';
import { Link } from 'react-router-dom';
import person4 from '../../../../assets/images/person-4.png';
import ic_edit_outline from '../../../../assets/images/ic-edit-outline-red.svg'

const VehicleCard = ({ vehicleCardData }) => {
    // console.log(vehicleCardData)
    return (
        <div className='employeeVehicleCard'>
            <img src={person4} className="person4Img" alt="person2" />
            <Link to={`addupdatevehicle/${vehicleCardData?.vehicle.id}`} >
                <img src={ic_edit_outline} className="pencelIcon" alt="ic_edit_outline" />
            </Link>
            <div className="headName">
                <p>Brand</p>
                <h6>{vehicleCardData?.vehicle.brand}</h6>
            </div>
            <div className="bodyCard">
                <div className="bodyLeftSide">
                    <p>sub-brand</p>
                    <h6>{vehicleCardData?.vehicle.subBrand}</h6>
                    <p>model</p>
                    <h6>{vehicleCardData?.vehicle.model}</h6>
                </div>
                <div className="bodyRightSide">
                    <p>plates</p>
                    <h6>{vehicleCardData?.vehicle.plate}</h6>
                    <p>owner</p>
                    <h6>{vehicleCardData?.vehicle.vin}</h6>
                </div>
            </div>
        </div >
    )
}

export default VehicleCard