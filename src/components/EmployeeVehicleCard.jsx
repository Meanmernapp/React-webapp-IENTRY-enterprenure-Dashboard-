import React from 'react';
import { Link } from 'react-router-dom';
import person4 from '../assets/images/person-4.png';
import ic_edit_outline from '../assets/images/ic-edit-outline-red.svg'

const EmployeeVehicleCard = ({ employeeCardData }) => {
    localStorage.setItem("deleteId", employeeCardData?.user.id)
    // console.log(employeeCardData)
    return (
        <div className='employeeVehicleCard'>
            <img src={person4} className="person4Img" alt="person2" />
            <Link to={{
                pathname: `addemployee/${employeeCardData?.user.id}`,
                state: employeeCardData
            }}
            >
                <img src={ic_edit_outline} className="pencelIcon" alt="ic_edit_outline" />
            </Link>
            <div className="headName">
                <p>Name</p>
                <h6>{employeeCardData?.user.name}</h6>
            </div>
            <div className="bodyCard">
                <div className="bodyLeftSide">
                    <p>job title</p>
                    <h6>{employeeCardData?.role.name}</h6>
                    <p>email</p>
                    <h6>{employeeCardData?.user.email}</h6>
                </div>
                <div className="bodyRightSide">
                    <p>schedule</p>
                    <h6>Morning Shift</h6>
                    <p>telephone</p>
                    <h6>{employeeCardData?.user.phoneNumber}</h6>
                </div>
            </div>
        </div >
    )
}

export default EmployeeVehicleCard