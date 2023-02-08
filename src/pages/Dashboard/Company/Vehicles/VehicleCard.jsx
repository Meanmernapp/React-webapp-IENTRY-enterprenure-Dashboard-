import React from 'react';
import { Link } from 'react-router-dom';
import person4 from '../../../../assets/images/person-4.png';
import ic_edit_outline from '../../../../assets/images/ic-edit-outline-red.svg';
import { useTranslation } from "react-i18next";
import { permissionObj } from '../../../../Helpers/permission';
import { useSelector } from 'react-redux';

const VehicleCard = ({ vehicleCardData }) => {
    const { t } = useTranslation();
    const { permission } = useSelector(state => state.authenticatioauthennSlice);
    return (
        <div className='employeeVehicleCard'>
            <img
                // src={person4}
                src={vehicleCardData?.vehicle?.image != null ? `data:image/png;base64,${vehicleCardData?.vehicle?.image}` : person4}
                className="person4Img"
                alt="person2"
            />
            {
                permission?.includes(permissionObj?.WEB_VEHICLE_UPDATE) &&
                <Link to={`/dashboard/employee/all-employees/update-employee/${vehicleCardData?.vehicle.id}`} >
                    <img src={ic_edit_outline} className="pencelIcon" alt="ic_edit_outline" />
                </Link>
            }
            <div className="headName">
                <p>{t('brand')}</p>
                <h6>{vehicleCardData?.vehicle.brand}</h6>
            </div>
            <div className="bodyCard">
                <div className="bodyLeftSide">
                    <p>{t('sub_brand')}</p>
                    <h6>{vehicleCardData?.vehicle.subBrand}</h6>
                    <p>{t('model')}</p>
                    <h6>{vehicleCardData?.vehicle.model}</h6>
                </div>
                <div className="bodyRightSide">
                    <p>{t('plates')}</p>
                    <h6>{vehicleCardData?.vehicle.plate}</h6>
                    <p>{t('owner')}</p>
                    <h6>{vehicleCardData?.vehicle.vin}</h6>
                </div>
            </div>
        </div >
    )
}

export default VehicleCard