import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import person4 from '../../../../../assets/images/person-4.png';
import ic_edit_outline from '../../../../../assets/images/ic-edit-outline-red.svg'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleEmployeeDetail } from '../../../../../reduxToolkit/CompanyEmployees/CompanyEmployeesApi';
import { useTranslation } from "react-i18next";
import { permissionObj } from '../../../../../Helpers/permission';

const EmployeeCard = ({ employeeCardData }) => {
    // const dispatch = useDispatch();
    // console.log(employeeCardData)
    const { t } = useTranslation();
    localStorage.setItem("deleteId", employeeCardData?.id)
    const { permission } = useSelector(state => state.authenticatioauthennSlice);

    // useEffect(() => {
    //     dispatch(getSingleEmployeeDetail(employeeCardData?.user.id));
    // }, [])

    return (
        <div className='employeeVehicleCard'>
            <img
                // src={person4} 
                src={employeeCardData?.selfie != null ? `data:image/png;base64,${employeeCardData?.selfie}` : person4}
                className="person4Img"
                alt="person2"
            />
            {
                permission?.includes(permissionObj?.WEB_EMPLOYEE_UPDATE) &&

                <Link to={{
                    pathname: `/dashboard/employee/all-employees/update-employee/${employeeCardData?.id}`,
                    state: employeeCardData
                }}
                >
                    <img src={ic_edit_outline} className="pencelIcon" alt="ic_edit_outline" />
                </Link>

            }

            <div className="headName">
                <p>{t('name')}</p>
                <h6>{employeeCardData?.name}</h6>
            </div>
            <div className="bodyCard">
                <div className="bodyLeftSide">
                    <p>{t('job_title')}</p>
                    <h6>{employeeCardData?.role?.name}</h6>
                    <p>{t('email')}</p>
                    <h6>{employeeCardData?.email}</h6>
                </div>
                <div className="bodyRightSide">
                    <p>{t('schedule')}</p>
                    <h6>Morning Shift</h6>
                    <p>{t('telephone')}</p>
                    <h6>{employeeCardData?.phoneNumber}</h6>
                </div>
            </div>
        </div>
    )
}

export default EmployeeCard