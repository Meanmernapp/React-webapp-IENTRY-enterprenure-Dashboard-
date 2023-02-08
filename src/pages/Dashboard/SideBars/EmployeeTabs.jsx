import React, { useState } from 'react'
import angelright_icon from "../../../assets/images/angelright.svg";
import ic_build from "../../../assets/images/ic-build.svg";
import circle_notch_solid from "../../../assets/images/circle-notch-solid.svg";
import ic_people_group_solid from "../../../assets/images/ic-people-group-solid.svg";
import ic_truck from "../../../assets/images/ic-truck.svg";
import ic_contract from "../../../assets/images/ic-contract.svg";
import ic_supplier from "../../../assets/images/ic-supplier.svg";
import green_company from "../../../assets/images/green-company.svg";
import green_circle from "../../../assets/images/green-circle.svg";
import green_event from "../../../assets/images/green-event.svg";
import green_employee from "../../../assets/images/green-employee.svg";
import green_vehicle from "../../../assets/images/green-vehicle.svg";
import green_contractor from "../../../assets/images/green-contractor.svg";
import green_provider from "../../../assets/images/green-provider.svg";

import payroll_green from "../../../assets/images/payroll_green.svg";
import payroll_white from "../../../assets/images/payroll_white.svg";
import department_white from '../../../assets/ic_white_department.svg'
import ic_database from "../../../assets/images/ic-database.svg";

import SidebarDropDownOption from '../../../components/SidebarDropDownOption';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { permissionObj } from '../../../Helpers/permission';
import { ClearGetListZoneMap } from '../../../reduxToolkit/EmployeeZones/EmployeeZoneSlice';

const EmployeeTabs = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const [changeStyle, setChangeStyle] = useState("company");
    const [isHovering, setIsHovering] = useState("1");

    const { user, permission } = useSelector(state => state.authenticatioauthennSlice);

    return (
        <ul>
            {
                user?.data?.status?.id != 3 &&
                <>
                    {permission?.includes(permissionObj?.WEB_COMPANY_MENU) &&
                        <Link to='/dashboard/employee/company'>
                            <li
                                onClick={() => setChangeStyle("company")}
                                className={changeStyle === "company" ? "activeLi" : isHovering === 1 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(1)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 1 && changeStyle !== "company" ?
                                            <img src={green_company} className="sidBarIcons" alt="green_company" /> :
                                            <img src={ic_build} className="sidBarIcons" alt="ic_build" />
                                    }
                                    <span className="ms-1 d-none d-sm-inline">{t('company')}</span>
                                </div>
                                {
                                    isHovering === 1 && changeStyle !== "company" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""
                                }
                            </li>
                        </Link>
                    }

                    {permission?.includes(permissionObj.WEB_ZONE_MENU) &&
                        <Link to='/dashboard/employee/zones' onClick={() => dispatch(ClearGetListZoneMap())}>
                            <li
                                onClick={() => setChangeStyle("zones")}
                                className={changeStyle === "zones" ? "activeLi" : isHovering === 2 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(2)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 2 && changeStyle !== "zones" ?
                                            <img src={green_circle} className="sidBarIcons" alt="green_circle" /> :
                                            <img src={circle_notch_solid} className="sidBarIcons" alt="ic_build" />
                                    }
                                    <span className="ms-1 d-none d-sm-inline">{t('zones')}</span>
                                </div>
                                {
                                    isHovering === 2 && changeStyle !== "zones" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""

                                }
                            </li>
                        </Link>
                    }

                    {permission?.includes(permissionObj.WEB_EVENT_MENU) &&
                        <Link to='/dashboard/employee/events'>
                            <li
                                onClick={() => setChangeStyle("events")}
                                className={changeStyle === "events" ? "activeLi" : isHovering === 3 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(3)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 3 && changeStyle !== "events" ?
                                            <img src={green_event} className="sidBarIcons" alt="green_event" /> :
                                            <i className="fa fa-calendar sidBarIcons" aria-hidden="true"></i>
                                    }
                                    <span className="ms-1 d-none d-sm-inline">{t('events')}</span>
                                </div>
                                {
                                    isHovering === 3 && changeStyle !== "events" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""

                                }
                            </li>
                        </Link>
                    }

                    {permission?.includes(permissionObj.WEB_EMPLOYEE_MENU) &&
                        <Link to='/dashboard/employee/all-employees'>
                            <li
                                onClick={() => setChangeStyle("employees")}
                                className={changeStyle === "employees" ? "activeLi" : isHovering === 4 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(4)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 4 && changeStyle !== "employees" ?
                                            <img src={green_employee} className="sidBarIcons" alt="green_employee" /> :
                                            <img src={ic_people_group_solid} className="sidBarIcons" alt="ic_build" />
                                    }
                                    <span className="ms-1 d-none d-sm-inline">{t('employees')}</span>
                                </div>
                                {
                                    isHovering === 4 && changeStyle !== "employees" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""

                                }
                            </li>
                        </Link>
                    }
                    {permission?.includes(permissionObj.WEB_VEHICLE_MENU) &&
                        <Link to='/dashboard/employee/allvehicles'>
                            <li
                                onClick={() => setChangeStyle("vehicles")}
                                className={changeStyle === "vehicles" ? "activeLi" : isHovering === 5 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(5)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 5 && changeStyle !== "vehicles" ?
                                            <img src={green_vehicle} className="sidBarIcons" alt="green_vehicle" /> :
                                            <img src={ic_truck} className="sidBarIcons" alt="ic_build" />
                                    }
                                    <span className="ms-1 d-none d-sm-inline">{t('vehicles')}</span>
                                </div>
                                {
                                    isHovering === 5 && changeStyle !== "vehicles" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""

                                }
                            </li>
                        </Link>
                    }

                    {permission?.includes(permissionObj.WEB_CONTRACTOR_MENU) &&
                        <Link to='/dashboard/employee/contractors'>
                            <li
                                onClick={() => setChangeStyle("contractor")}
                                className={changeStyle === "contractor" ? "activeLi" : isHovering === 6 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(6)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 6 && changeStyle !== "contractor" ?
                                            <img src={green_contractor} className="sidBarIcons" alt="green_contractor" /> :
                                            <img src={ic_contract} className="sidBarIcons" alt="ic_build" />
                                    }
                                    <span className="ms-1 d-none d-sm-inline">{t('contractors')}</span>
                                </div>
                                {
                                    isHovering === 6 && changeStyle !== "contractor" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""

                                }
                            </li>
                        </Link>
                    }
                    {permission?.includes(permissionObj.WEB_PROVIDER_MENU) &&
                        <Link to='/dashboard/employee/providers'>
                            <li
                                onClick={() => setChangeStyle("provider")}
                                className={changeStyle === "provider" ? "activeLi" : isHovering === 7 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(7)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 7 && changeStyle !== "provider" ?
                                            <img src={green_provider} className="sidBarIcons" alt="green_provider" /> :
                                            <img src={ic_supplier} className="sidBarIcons" alt="ic_build" />
                                    }
                                    <span className="ms-1 d-none d-sm-inline">{t('provider')}</span>
                                </div>
                                {
                                    isHovering === 7 && changeStyle !== "provider" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""

                                }
                            </li>
                        </Link>
                    }
                    {permission?.includes(permissionObj.WEB_PAYROLL_MENU) &&
                        <Link to='/dashboard/employee/payroll'>
                            <li
                                onClick={() => setChangeStyle("payroll")}
                                className={changeStyle === "payroll" ? "activeLi" : isHovering === 8 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(8)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 8 && changeStyle !== "payroll" ?
                                            <img src={payroll_green} className="sidBarIcons" alt="green_provider" /> :
                                            <img src={payroll_white} className="sidBarIcons" alt="ic_build" />
                                    }
                                    <span className="ms-1 d-none d-sm-inline">{t('payroll').slice(0, 10)}..</span>
                                </div>
                                {
                                    isHovering === 8 && changeStyle !== "payroll" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""
                                }
                            </li>
                        </Link>
                    }
                    {permission?.includes(permissionObj.WEB_BACK_UP_MENU) &&
                        <Link to='/dashboard/employee/backup'>
                            <li
                                onClick={() => setChangeStyle("backup")}
                                className={changeStyle === "backup" ? "activeLi" : isHovering === 10 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(10)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 10 && changeStyle !== "backup" ?
                                            <svg
                                                id="ic-database"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 25 25"
                                                style={{
                                                    margin: "0 5px"
                                                }}
                                            >
                                                <path
                                                    id="database-solid_2_"
                                                    data-name="database-solid (2)"
                                                    d="M21,3.75V6c0,2.072-4.7,3.75-10.5,3.75S0,8.072,0,6V3.75C0,1.679,4.7,0,10.5,0S21,1.679,21,3.75Zm-2.569,6.314A9.792,9.792,0,0,0,21,8.723V13.5c0,2.072-4.7,3.75-10.5,3.75S0,15.572,0,13.5V8.723a9.185,9.185,0,0,0,2.571,1.341A24.423,24.423,0,0,0,10.5,11.25a24.457,24.457,0,0,0,7.931-1.186Zm-15.86,7.5A24.423,24.423,0,0,0,10.5,18.75a24.457,24.457,0,0,0,7.931-1.186A9.792,9.792,0,0,0,21,16.223V20.25C21,22.322,16.3,24,10.5,24S0,22.322,0,20.25V16.223A9.185,9.185,0,0,0,2.571,17.564Z"
                                                    fill="#146f62"
                                                />
                                            </svg> :
                                            <svg
                                                id="ic-database"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 25 25"
                                                style={{
                                                    margin: "0 5px"
                                                }}
                                            >
                                                <path
                                                    id="database-solid_2_"
                                                    data-name="database-solid (2)"
                                                    d="M21,3.75V6c0,2.072-4.7,3.75-10.5,3.75S0,8.072,0,6V3.75C0,1.679,4.7,0,10.5,0S21,1.679,21,3.75Zm-2.569,6.314A9.792,9.792,0,0,0,21,8.723V13.5c0,2.072-4.7,3.75-10.5,3.75S0,15.572,0,13.5V8.723a9.185,9.185,0,0,0,2.571,1.341A24.423,24.423,0,0,0,10.5,11.25a24.457,24.457,0,0,0,7.931-1.186Zm-15.86,7.5A24.423,24.423,0,0,0,10.5,18.75a24.457,24.457,0,0,0,7.931-1.186A9.792,9.792,0,0,0,21,16.223V20.25C21,22.322,16.3,24,10.5,24S0,22.322,0,20.25V16.223A9.185,9.185,0,0,0,2.571,17.564Z"
                                                    fill="#fff"
                                                />
                                            </svg>
                                    }
                                    <span className="ms-1 d-none d-sm-inline ms-3">{t('back_up')}</span>
                                </div>
                                {
                                    isHovering === 10 && changeStyle !== "backup" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""

                                }
                            </li>
                        </Link>
                    }

                    {/* {permission?.includes(permissionObj.WEB_PAYROLL_MENU) && */}
                    <Link to='/dashboard/employee/departments'>
                        <li
                            onClick={() => setChangeStyle("departments")}
                            className={changeStyle === "departments" ? "activeLi" : isHovering === 11 ? "hoverLi" : ""}
                            onMouseEnter={() => setIsHovering(11)}
                            onMouseLeave={() => setIsHovering(0)}
                        >
                            <div>
                                {
                                    isHovering === 11 && changeStyle !== "departments" ?
                                        <img src={payroll_green} className="sidBarIcons" alt="green_provider" /> :
                                        <img src={department_white} className="sidBarIcons" alt="ic_build" />
                                }
                                <span className="ms-1 d-none d-sm-inline">{t('departments').slice(0, 10)}..</span>
                            </div>
                            {
                                isHovering === 11 && changeStyle !== "departments" ?
                                    <img src={angelright_icon} alt="angelright_icon" style={{
                                        transform: lCode === "ar" ? "scaleX(-1)" : ""
                                    }} /> : ""
                            }
                        </li>
                    </Link>
                    {/* } */}
                    {/* hiding hopitaility for now */}
                    {/* {permission?.includes(permissionObj.WEB_HOSPITALITY_MENU) &&
                        <Link to='/dashboard/employee/hospitality'>
                            <li
                                onClick={() => setChangeStyle("hospitality")}
                                className={changeStyle === "hospitality" ? "activeLi" : isHovering === 11 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(11)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 11 && changeStyle !== "hospitality" ?
                                            <img src={payroll_green} className="sidBarIcons" alt="green_provider" /> :
                                            <img src={payroll_white} className="sidBarIcons" alt="ic_build" />
                                    }
                                    <span className="ms-1 d-none d-sm-inline">{t('hospitality')}</span>
                                </div>
                                {
                                    isHovering === 11 && changeStyle !== "hospitality" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""

                                }
                            </li>
                        </Link>
                    } */}

                </>

            }

            <Link to='#'>
                <li
                    onClick={() => setChangeStyle("profile")}
                    className={changeStyle === "profile" ? "activeLi" : isHovering === 9 ? "hoverLi" : ""}
                    onMouseEnter={() => setIsHovering(9)}
                    onMouseLeave={() => setIsHovering(0)}

                >
                    <SidebarDropDownOption changestyle={changeStyle} hovereffect={isHovering} />
                </li>
            </Link>
        </ul>
    )
}

export default EmployeeTabs