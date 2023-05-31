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
import green_department from '../../../assets/green_department.svg'

import ic_database from "../../../assets/images/ic-database.svg";

// icons 
import companyProfile from "../../../assets/menuIcon/company_profile.svg"
import firstAccess from "../../../assets/menuIcon/first_access.svg"
import firstAccessWhite from "../../../assets/menuIcon/first_access_white.svg"
import eventWhite from "../../../assets/menuIcon/event_white.svg"
import workShiftwhite from "../../../assets/menuIcon/workshift_white.svg"
import workShiftIcon from "../../../assets/menuIcon/work_shift.svg"
import accessWhite from "../../../assets/menuIcon/access_white.svg"
import accessIcon from "../../../assets/menuIcon/access.svg"
import previlageWhite from "../../../assets/menuIcon/previlage_white.svg"
import previlageIcon from "../../../assets/menuIcon/privilage_settings.svg"
import onBoardingWhite from "../../../assets/menuIcon/onboarding_white.svg"
import onboardingIcon from "../../../assets/menuIcon/onboarding.svg"
import userDocumentWhite from "../../../assets/menuIcon/user-document_white.svg"
import userDocumentIcon from "../../../assets/menuIcon/user_document_manager.svg"
import vehicleDocumentWhite from "../../../assets/menuIcon/vehicledocument_white.svg"
import vehicleDocumentIcon from "../../../assets/menuIcon/vehicle_document_manager.svg"
import emailSettingIcon from "../../../assets/menuIcon/email_settings.svg"
import emailSettingWhite from "../../../assets/menuIcon/email_setting_white.svg"
import internalMonitoringIcon from "../../../assets/menuIcon/internal_monitoring.svg"
import internalMonitoringWhite from "../../../assets/menuIcon/internal_monitoring_white.svg"
import announcementsIcon from "../../../assets/menuIcon/announcements.svg"
import announcementsWhite from "../../../assets/menuIcon/white_announcements.svg"
import profileIcon from "../../../assets/menuIcon/profile.svg"
import profileWhite from "../../../assets/menuIcon/white_profile.svg"
import devicesIcon from "../../../assets/menuIcon/device.svg"
import devicesWhite from "../../../assets/menuIcon/device_white.svg"
import SidebarDropDownOption from '../../../components/SidebarDropDownOption';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { permissionObj } from '../../../Helpers/permission';
import { ClearGetListZoneMap } from '../../../reduxToolkit/EmployeeZones/EmployeeZoneSlice';
import BootstrapTooltip from '../../../utils/BootstrapTooltip';



const EmployeeTabs = ({ isMenuOpen }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const [changeStyle, setChangeStyle] = useState("company");
    const [isHovering, setIsHovering] = useState("1");

    const { user, permission } = useSelector(state => state.authenticatioauthennSlice);

    const limitCharacter = 15



    return (
        <ul >
            {
                user?.data?.status?.id != 3 &&
                <>
                    {permission?.includes(permissionObj?.WEB_COMPANY_MENU) &&
                        <BootstrapTooltip title={!isMenuOpen ? t('company_profile') : ""} placement="right">
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
                                                <img src={green_company}
                                                    className="sidBarIcons" alt="green_company"
                                                    style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }}
                                                /> :
                                                <img src={ic_build} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                        }
                                        {isMenuOpen &&

                                            <span className="ms-1 d-none d-sm-inline">{t('company_profile')?.slice(0, limitCharacter)}</span>
                                        }
                                    </div>
                                    {/* {
                                    isMenuOpen && isHovering === 1 && changeStyle !== "company" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""
                                } */}
                                </li>
                            </Link>
                        </BootstrapTooltip>

                    }

                    {permission?.includes(permissionObj.WEB_ZONE_MENU) &&
                        <BootstrapTooltip title={!isMenuOpen ? t('first_access') : ""} placement="right">
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
                                                <img src={firstAccess} className="sidBarIcons" alt="green_circle" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                                <img src={firstAccessWhite} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                        }
                                        {
                                            isMenuOpen &&
                                            <span className="ms-1 d-none d-sm-inline">{t('first_access')}</span>
                                        }
                                    </div>
                                    {/* {
                                    isMenuOpen && isHovering === 2 && changeStyle !== "zones" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""

                                } */}
                                </li>
                            </Link>
                        </BootstrapTooltip>
                    }

                    {permission?.includes(permissionObj.WEB_EVENT_MENU) &&
                        <BootstrapTooltip title={!isMenuOpen ? t('events') : ""} placement="right">
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
                                                <img src={green_event} className="sidBarIcons" alt="green_event" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                                <img src={eventWhite} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                        }
                                        {
                                            isMenuOpen &&
                                            <span className="ms-1 d-none d-sm-inline">{t('events')}</span>
                                        }
                                    </div>
                                    {/* {
                                    isMenuOpen && isHovering === 3 && changeStyle !== "events" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""

                                } */}
                                </li>
                            </Link>
                        </BootstrapTooltip>
                    }

                    {permission?.includes(permissionObj.WEB_EMPLOYEE_MENU) &&
                        <BootstrapTooltip title={!isMenuOpen ? t('employees') : ""} placement="right">

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
                                                <img src={green_employee} className="sidBarIcons" alt="green_employee" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                                <img src={ic_people_group_solid} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                        }
                                        {
                                            isMenuOpen &&
                                            <span className="ms-1 d-none d-sm-inline">{t('employees')}</span>
                                        }
                                    </div>
                                    {/* {
                                    isMenuOpen && isHovering === 4 && changeStyle !== "employees" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""

                                } */}
                                </li>
                            </Link>
                        </BootstrapTooltip>
                    }
                    {permission?.includes(permissionObj.WEB_VEHICLE_MENU) &&
                        <BootstrapTooltip title={!isMenuOpen ? t('vehicles') : ""} placement="right">

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
                                                <img src={green_vehicle} className="sidBarIcons" alt="green_vehicle" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                                <img src={ic_truck} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                        }
                                        {
                                            isMenuOpen &&
                                            <span className="ms-1 d-none d-sm-inline">{t('vehicles')}</span>
                                        }
                                    </div>
                                    {/* {
                                    isMenuOpen && isHovering === 5 && changeStyle !== "vehicles" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""

                                } */}
                                </li>
                            </Link>
                        </BootstrapTooltip>
                    }

                    {permission?.includes(permissionObj.WEB_CONTRACTOR_MENU) &&
                        <BootstrapTooltip title={!isMenuOpen ? t('contractors') : ""} placement="right">

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
                                                <img src={green_contractor} className="sidBarIcons" alt="green_contractor" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                                <img src={ic_contract} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                        }
                                        {
                                            isMenuOpen &&
                                            <span className="ms-1 d-none d-sm-inline">{t('contractors')}</span>
                                        }
                                    </div>
                                    {/* {
                                    isMenuOpen && isHovering === 6 && changeStyle !== "contractor" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""

                                } */}
                                </li>
                            </Link>
                        </BootstrapTooltip>
                    }
                    {permission?.includes(permissionObj.WEB_PROVIDER_MENU) &&
                        <BootstrapTooltip title={!isMenuOpen ? t('supplier') : ""} placement="right">

                            <Link to='/dashboard/employee/suppliers'>
                                <li
                                    onClick={() => setChangeStyle("provider")}
                                    className={changeStyle === "provider" ? "activeLi" : isHovering === 7 ? "hoverLi" : ""}
                                    onMouseEnter={() => setIsHovering(7)}
                                    onMouseLeave={() => setIsHovering(0)}
                                >
                                    <div>
                                        {
                                            isHovering === 7 && changeStyle !== "provider" ?
                                                <img src={green_provider} className="sidBarIcons" alt="green_provider" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                                <img src={ic_supplier} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                        }
                                        {
                                            isMenuOpen &&
                                            <span className="ms-1 d-none d-sm-inline">{t('supplier')}</span>
                                        }
                                    </div>
                                    {/* {
                                    isMenuOpen && isHovering === 7 && changeStyle !== "provider" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""

                                } */}
                                </li>
                            </Link>
                        </BootstrapTooltip>
                    }
                    {permission?.includes(permissionObj.WEB_PAYROLL_MENU) &&
                        <BootstrapTooltip title={!isMenuOpen ? t('attendance') : ""} placement="right">

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
                                                <img src={payroll_green} className="sidBarIcons" alt="green_provider" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                                <img src={payroll_white} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                        }
                                        {
                                            isMenuOpen &&
                                            <span className="ms-1 d-none d-sm-inline">{t('attendance')}</span>
                                        }
                                    </div>
                                    {/* {
                                    isMenuOpen && isHovering === 8 && changeStyle !== "payroll" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""
                                } */}
                                </li>
                            </Link>
                        </BootstrapTooltip>
                    }
                    {permission?.includes(permissionObj.WEB_BACK_UP_MENU) &&
                        <BootstrapTooltip title={!isMenuOpen ? t('back_up') : ""} placement="right">

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
                                                    style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }}
                                                    id="ic-database"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 25 25"

                                                >
                                                    <path
                                                        id="database-solid_2_"
                                                        data-name="database-solid (2)"
                                                        d="M21,3.75V6c0,2.072-4.7,3.75-10.5,3.75S0,8.072,0,6V3.75C0,1.679,4.7,0,10.5,0S21,1.679,21,3.75Zm-2.569,6.314A9.792,9.792,0,0,0,21,8.723V13.5c0,2.072-4.7,3.75-10.5,3.75S0,15.572,0,13.5V8.723a9.185,9.185,0,0,0,2.571,1.341A24.423,24.423,0,0,0,10.5,11.25a24.457,24.457,0,0,0,7.931-1.186Zm-15.86,7.5A24.423,24.423,0,0,0,10.5,18.75a24.457,24.457,0,0,0,7.931-1.186A9.792,9.792,0,0,0,21,16.223V20.25C21,22.322,16.3,24,10.5,24S0,22.322,0,20.25V16.223A9.185,9.185,0,0,0,2.571,17.564Z"
                                                        fill="#146f62"
                                                    />
                                                </svg> :
                                                <svg
                                                    style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }}
                                                    id="ic-database"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 25 25"

                                                >
                                                    <path
                                                        id="database-solid_2_"
                                                        data-name="database-solid (2)"
                                                        d="M21,3.75V6c0,2.072-4.7,3.75-10.5,3.75S0,8.072,0,6V3.75C0,1.679,4.7,0,10.5,0S21,1.679,21,3.75Zm-2.569,6.314A9.792,9.792,0,0,0,21,8.723V13.5c0,2.072-4.7,3.75-10.5,3.75S0,15.572,0,13.5V8.723a9.185,9.185,0,0,0,2.571,1.341A24.423,24.423,0,0,0,10.5,11.25a24.457,24.457,0,0,0,7.931-1.186Zm-15.86,7.5A24.423,24.423,0,0,0,10.5,18.75a24.457,24.457,0,0,0,7.931-1.186A9.792,9.792,0,0,0,21,16.223V20.25C21,22.322,16.3,24,10.5,24S0,22.322,0,20.25V16.223A9.185,9.185,0,0,0,2.571,17.564Z"
                                                        fill="#fff"
                                                    />
                                                </svg>
                                        }
                                        {
                                            isMenuOpen &&
                                            <span className="ms-1 d-none d-sm-inline ms-3">{t('back_up')}</span>
                                        }
                                    </div>
                                    {/* {
                                    isMenuOpen && isHovering === 10 && changeStyle !== "backup" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""

                                } */}
                                </li>
                            </Link>
                        </BootstrapTooltip>
                    }

                    <BootstrapTooltip title={!isMenuOpen ? t('departments') : ""} placement="right">

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
                                            <img src={green_department} className="sidBarIcons" alt="green_provider" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                            <img src={department_white} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                    }
                                    {
                                        isMenuOpen &&
                                        <span className="ms-1 d-none d-sm-inline">{t('departments')}</span>
                                    }
                                </div>
                                {/* {
isMenuOpen && isHovering === 11 && changeStyle !== "departments" ?
<img src={angelright_icon} alt="angelright_icon" style={{
transform: lCode === "ar" ? "scaleX(-1)" : ""
}} /> : ""
} */}
                            </li>
                        </Link>
                    </BootstrapTooltip>


                    {/* {permission?.includes(permissionObj.WEB_PAYROLL_MENU) && */}
                    <BootstrapTooltip title={!isMenuOpen ? t('internal_monitoring') : ""} placement="right">

                        <Link to='/dashboard/employee/zones'>
                            <li
                                onClick={() => setChangeStyle("internalMonitoring")}
                                className={changeStyle === "internalMonitoring" ? "activeLi" : isHovering === 12 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(12)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 12 && changeStyle !== "internalMonitoring" ?
                                            <img src={internalMonitoringIcon} className="sidBarIcons" alt="green_provider" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                            <img src={internalMonitoringWhite} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                    }
                                    {
                                        isMenuOpen &&
                                        <span className="ms-1 d-none d-sm-inline">{t('internal_monitoring')?.slice(0, limitCharacter)}</span>
                                    }
                                </div>
                                {/* {
                                isMenuOpen && isHovering === 11 && changeStyle !== "departments" ?
                                    <img src={angelright_icon} alt="angelright_icon" style={{
                                        transform: lCode === "ar" ? "scaleX(-1)" : ""
                                    }} /> : ""
                            } */}
                            </li>
                        </Link>
                    </BootstrapTooltip>
                    {/* } */}
                    {/* hide for temporary perpose */}
                    {/* {permission?.includes(permissionObj.WEB_HOSPITALITY_MENU) &&
                        <Link to='/dashboard/employee/hospitality'>
                            <li
                                onClick={() => setChangeStyle("hospitality")}
                                className={changeStyle === "hospitality" ? "activeLi" : isHovering === 12 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(12)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 12 && changeStyle !== "hospitality" ?
                                            <img src={payroll_green} className="sidBarIcons" alt="green_provider" style={{margin:isMenuOpen ?"0 5px":"0 -8px"}}/> :
                                            <img src={payroll_white} className="sidBarIcons" alt="ic_build" style={{margin:isMenuOpen ?"0 5px":"0 -8px"}}/>
                                    }
                                    {isMenuOpen &&

                                        <span className="ms-1 d-none d-sm-inline">{t('hospitality')}</span>
                                    }
                                </div>
                                {
                                  isMenuOpen &&  isHovering === 11 && changeStyle !== "hospitality" ?
                                        <img src={angelright_icon} alt="angelright_icon" style={{
                                            transform: lCode === "ar" ? "scaleX(-1)" : ""
                                        }} /> : ""

                                }
                            </li>
                        </Link>
                    } */}



                    <BootstrapTooltip title={!isMenuOpen ? t('work_shift_panel') : ""} placement="right">

                        <Link to='/dashboard/employee/company/workshift-panel'>
                            <li
                                onClick={() => setChangeStyle("workshift")}
                                className={changeStyle === "workshift" ? "activeLi" : isHovering === 13 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(13)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 13 && changeStyle !== "workshift" ?
                                            <img src={workShiftIcon} className="sidBarIcons" alt="green_provider" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                            <img src={workShiftwhite} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                    }
                                    {
                                        isMenuOpen &&
                                        <span className="ms-1 d-none d-sm-inline">{t('work_shift_panel')?.slice(0, limitCharacter)}</span>
                                    }
                                </div>
                                {/* {
            isMenuOpen && isHovering === 11 && changeStyle !== "departments" ?
                <img src={angelright_icon} alt="angelright_icon" style={{
                    transform: lCode === "ar" ? "scaleX(-1)" : ""
                }} /> : ""
        } */}
                            </li>
                        </Link>
                    </BootstrapTooltip>


                    <BootstrapTooltip title={!isMenuOpen ? t('access') : ""} placement="right">

                        <Link to='#'>
                            <li
                                onClick={() => setChangeStyle("access")}
                                className={changeStyle === "access" ? "activeLi" : isHovering === 14 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(14)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 14 && changeStyle !== "access" ?
                                            <img src={accessIcon} className="sidBarIcons" alt="green_provider" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                            <img src={accessWhite} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                    }
                                    {
                                        isMenuOpen &&
                                        <span className="ms-1 d-none d-sm-inline">{t('access')}</span>
                                    }
                                </div>
                                {/* {
            isMenuOpen && isHovering === 11 && changeStyle !== "departments" ?
                <img src={angelright_icon} alt="angelright_icon" style={{
                    transform: lCode === "ar" ? "scaleX(-1)" : ""
                }} /> : ""
        } */}
                            </li>
                        </Link>
                    </BootstrapTooltip>

                    <BootstrapTooltip title={!isMenuOpen ? t('privilage_settings') : ""} placement="right">

                        <Link to='/dashboard/employee/company/roles-panel'>
                            <li
                                onClick={() => setChangeStyle("previlageSetting")}
                                className={changeStyle === "previlageSetting" ? "activeLi" : isHovering === 15 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(15)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 15 && changeStyle !== "previlageSetting" ?
                                            <img src={previlageIcon} className="sidBarIcons" alt="green_provider" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                            <img src={previlageWhite} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                    }
                                    {
                                        isMenuOpen &&
                                        <span className="ms-1 d-none d-sm-inline">{t('privilage_settings')?.slice(0, limitCharacter)}</span>
                                    }
                                </div>
                                {/* {
            isMenuOpen && isHovering === 11 && changeStyle !== "departments" ?
                <img src={angelright_icon} alt="angelright_icon" style={{
                    transform: lCode === "ar" ? "scaleX(-1)" : ""
                }} /> : ""
        } */}
                            </li>
                        </Link>
                    </BootstrapTooltip>


                    <BootstrapTooltip title={!isMenuOpen ? t('on_boarding') : ""} placement="right">

                        <Link to='/dashboard/employee/company/onboarding'>
                            <li
                                onClick={() => setChangeStyle("onBoarding")}
                                className={changeStyle === "onBoarding" ? "activeLi" : isHovering === 16 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(16)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 16 && changeStyle !== "onBoarding" ?
                                            <img src={onboardingIcon} className="sidBarIcons" alt="green_provider" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                            <img src={onBoardingWhite} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                    }
                                    {
                                        isMenuOpen &&
                                        <span className="ms-1 d-none d-sm-inline">{t('on_boarding')}</span>
                                    }
                                </div>
                                {/* {
            isMenuOpen && isHovering === 11 && changeStyle !== "departments" ?
                <img src={angelright_icon} alt="angelright_icon" style={{
                    transform: lCode === "ar" ? "scaleX(-1)" : ""
                }} /> : ""
        } */}
                            </li>
                        </Link>
                    </BootstrapTooltip>


                    <BootstrapTooltip title={!isMenuOpen ? t('user_document_manager') : ""} placement="right">

                        <Link to='/dashboard/employee/company/user-doc-panel'>
                            <li
                                onClick={() => setChangeStyle("userDocument")}
                                className={changeStyle === "userDocument" ? "activeLi" : isHovering === 17 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(17)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 17 && changeStyle !== "userDocument" ?
                                            <img src={userDocumentIcon} className="sidBarIcons" alt="green_provider" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                            <img src={userDocumentWhite} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                    }
                                    {
                                        isMenuOpen &&
                                        <span className="ms-1 d-none d-sm-inline">{t('user_document_manager')?.slice(0, limitCharacter)}</span>
                                    }
                                </div>
                                {/* {
            isMenuOpen && isHovering === 11 && changeStyle !== "departments" ?
                <img src={angelright_icon} alt="angelright_icon" style={{
                    transform: lCode === "ar" ? "scaleX(-1)" : ""
                }} /> : ""
        } */}
                            </li>
                        </Link>
                    </BootstrapTooltip>


                    <BootstrapTooltip title={!isMenuOpen ? t('vehicle_document_manager') : ""} placement="right">

                        <Link to='/dashboard/employee/company/vehicle-doc-panel'>
                            <li
                                onClick={() => setChangeStyle("vehicleDocument")}
                                className={changeStyle === "vehicleDocument" ? "activeLi" : isHovering === 18 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(18)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 18 && changeStyle !== "vehicleDocument" ?
                                            <img src={vehicleDocumentIcon} className="sidBarIcons" alt="green_provider" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                            <img src={vehicleDocumentWhite} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                    }
                                    {
                                        isMenuOpen &&
                                        <span className="ms-1 d-none d-sm-inline">{t('vehicle_document_manager')?.slice(0, limitCharacter)}</span>
                                    }
                                </div>
                                {/* {
            isMenuOpen && isHovering === 11 && changeStyle !== "departments" ?
                <img src={angelright_icon} alt="angelright_icon" style={{
                    transform: lCode === "ar" ? "scaleX(-1)" : ""
                }} /> : ""
        } */}
                            </li>
                        </Link>
                    </BootstrapTooltip>

                    <BootstrapTooltip title={!isMenuOpen ? t('email_service_settings') : ""} placement="right">

                        <Link to='/dashboard/employee/payroll/email-setting'>
                            <li
                                onClick={() => setChangeStyle("emailSetting")}
                                className={changeStyle === "emailSetting" ? "activeLi" : isHovering === 19 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(19)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 19 && changeStyle !== "emailSetting" ?
                                            <img src={emailSettingIcon} className="sidBarIcons" alt="green_provider" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                            <img src={emailSettingWhite} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                    }
                                    {
                                        isMenuOpen &&
                                        <span className="ms-1 d-none d-sm-inline">{t('email_service_settings')?.slice(0, limitCharacter)}</span>
                                    }
                                </div>
                                {/* {
            isMenuOpen && isHovering === 11 && changeStyle !== "departments" ?
                <img src={angelright_icon} alt="angelright_icon" style={{
                    transform: lCode === "ar" ? "scaleX(-1)" : ""
                }} /> : ""
        } */}
                            </li>
                        </Link>
                    </BootstrapTooltip>

                    {permission?.includes(permissionObj.WEB_DEVICE_MENU) &&

                        <BootstrapTooltip title={!isMenuOpen ? t('devices') : ""} placement="right">

                            <Link to='/dashboard/employee/devices'>
                                <li
                                    onClick={() => setChangeStyle("devices")}
                                    className={changeStyle === "devices" ? "activeLi" : isHovering === 22 ? "hoverLi" : ""}
                                    onMouseEnter={() => setIsHovering(22)}
                                    onMouseLeave={() => setIsHovering(0)}
                                >
                                    <div>
                                        {
                                            isHovering === 22 && changeStyle !== "devices" ?
                                                <img src={devicesIcon} className="sidBarIcons" alt="green_provider" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                                <img src={devicesWhite} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                        }
                                        {
                                            isMenuOpen &&
                                            <span className="ms-1 d-none d-sm-inline">{t('devices')?.slice(0, limitCharacter)}</span>
                                        }
                                    </div>
                                    
                                </li>
                            </Link>
                        </BootstrapTooltip>

                    }

                    <BootstrapTooltip title={!isMenuOpen ? t('announcements') : ""} placement="right">

                        <Link to='/dashboard/employee/announcement-panel'>
                            <li
                                onClick={() => setChangeStyle("announcements")}
                                className={changeStyle === "announcements" ? "activeLi" : isHovering === 20 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(20)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 20 && changeStyle !== "announcements" ?
                                            <img src={announcementsIcon} className="sidBarIcons" alt="green_provider" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                            <img src={announcementsWhite} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                    }
                                    {
                                        isMenuOpen &&
                                        <span className="ms-1 d-none d-sm-inline">{t('announcements')?.slice(0, limitCharacter)}</span>
                                    }
                                </div>
                                {/* {
isMenuOpen && isHovering === 11 && changeStyle !== "departments" ?
<img src={angelright_icon} alt="angelright_icon" style={{
transform: lCode === "ar" ? "scaleX(-1)" : ""
}} /> : ""
} */}
                            </li>
                        </Link>
                    </BootstrapTooltip>

                    <BootstrapTooltip title={!isMenuOpen ? t('profile') : ""} placement="right">

                        <Link to='/dashboard/employee/profile'>
                            <li
                                onClick={() => setChangeStyle("profile")}
                                className={changeStyle === "profile" ? "activeLi" : isHovering === 21 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(21)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 21 && changeStyle !== "profile" ?
                                            <img src={profileIcon} className="sidBarIcons" alt="green_provider" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} /> :
                                            <img src={profileWhite} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                    }
                                    {
                                        isMenuOpen &&
                                        <span className="ms-1 d-none d-sm-inline">{t('profile')?.slice(0, limitCharacter)}</span>
                                    }
                                </div>
                                {/* {
isMenuOpen && isHovering === 11 && changeStyle !== "departments" ?
<img src={angelright_icon} alt="angelright_icon" style={{
transform: lCode === "ar" ? "scaleX(-1)" : ""
}} /> : ""
} */}
                            </li>
                        </Link>
                    </BootstrapTooltip>



                </>

            }

            <Link to='#'>
                <li

                    // onClick={() => setChangeStyle("profile")}
                    // className={
                    //     isMenuOpen && changeStyle   === "profile" ? "activeLi" :
                    //      isHovering === 9 && isMenuOpen ? "hoverLi" : ""}
                    // onMouseEnter={() => setIsHovering(9)}
                    // onMouseLeave={() => setIsHovering(0)}
                    className={`${isMenuOpen ? "profile_li" : "profile_li_col"}`}

                >
                    <SidebarDropDownOption
                        changestyle={changeStyle}
                        hovereffect={isHovering}
                        isMenuOpen={isMenuOpen}
                        menutop={false}
                    />
                </li>
            </Link>
        </ul>
    )
}

export default EmployeeTabs