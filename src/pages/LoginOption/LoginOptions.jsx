/*
Author : Arman Ali
Module: create Vehicle
github: https://github.com/Arman-Arzoo
*/
import React, { useEffect, useState, useRef } from 'react'
import SidebarDropDownOption from '../../components/SidebarDropDownOption'
import payrollIcon from "../../assets/payrollBlackIcon.svg"
import companyicon from "../../assets/companyblackicon.svg"
import eventicon from "../../assets/eventblackicon.svg"
import emoloyeeicon from "../../assets/employeeblackicon.svg"
import vehicleicon from "../../assets/vehicleblackicon.svg"
import contractoricon from "../../assets/backupblackicon.svg"
import providericon from "../../assets/providerblackicon.svg"
import backupicon from "../../assets/backupblackicon.svg"
import profileicon from "../../assets/profileblackicon.svg"
import logo from "../../assets/loginoptionweblogo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RoleCheck } from '../../reduxToolkit/authentication/AuthenticatonApi'
import jwtDecode from 'jwt-decode'
import { GetProvidersByUserId, GetUserDocuments } from '../../reduxToolkit/Providers/providersApi'
import { GetByUserId, GetContractorsByUserId } from '../../reduxToolkit/Contractor/ContractorApi'
import { GetUserDocumentsEmployee } from '../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi'

import attendenceIcon from "../../assets/loginMenuIcon/attendance.svg"
import companyIcon from "../../assets/loginMenuIcon/company.svg"
import contractorIcon from "../../assets/loginMenuIcon/contractor.svg"
import databaseIcon from "../../assets/loginMenuIcon/database.svg"
import employeeIcons from "../../assets/loginMenuIcon/employees.svg"
import eventIcon from "../../assets/loginMenuIcon/events.svg"
import provfileIcon from "../../assets/loginMenuIcon/profile.svg"
import supplierIcon from "../../assets/loginMenuIcon/supplier.svg"
import vehicleIcon from "../../assets/loginMenuIcon/vehicles.svg"
import firstAccessIcon from "../../assets/loginMenuIcon/first_access.svg"
import internalMonitoringIcon from "../../assets/loginMenuIcon/internal_monitoring.svg"
import accessIcon from "../../assets/loginMenuIcon/access.svg"
import privilageSettingsIcon from "../../assets/loginMenuIcon/privilage_settings.svg"
import onBoardingIcon from "../../assets/loginMenuIcon/on_boarding.svg"
import departmentIcon from "../../assets/loginMenuIcon/departments.svg"
import workShiftIcons from "../../assets/loginMenuIcon/workshift_panel.svg"
import userDocPanelIcon from "../../assets/loginMenuIcon/user_document_panel.svg"
import vehicleDocPanelIcon from "../../assets/loginMenuIcon/vehicle_document_panel.svg"
import emailSettingIcon from "../../assets/loginMenuIcon/email_service_setting.svg"
import deviceIcon from "../../assets/loginMenuIcon/device.svg"
import icAnnnouncementIcon from '../../assets/loginMenuIcon/ic-announcement.svg'
import cryptoJs from 'crypto-js';
import { useTranslation } from 'react-i18next'
import Cookies from "js-cookie";
import securekey from '../../config'
import { permissionObj } from '../../../src/Helpers/permission';
import { Grid, Paper, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Row, Col } from 'react-bootstrap';
import companyProfileImg from '../../assets/home/CompanyProfileImg.png'
import vehiclesImg from '../../assets/home/VehiclesImg.png'
import employeesImg from '../../assets/home/EmployeesImg.png'
import firsAccessImg from '../../assets/home/FirstAccessImg.png'
import internalMonitoringImg from '../../assets/home/InternalMonitoringImg.png'
import devicesImg from '../../assets/home/DevicesImg.png'
import attendanceImg from '../../assets/home/AttendanceImg.png'
import departmentsImg from '../../assets/home/DepartmentsImg.png'
import eventsImg from '../../assets/home/EventsImg.png'
import workshiftImg from '../../assets/home/WorkshiftImg.png'
import accessImg from '../../assets/home/AccessImg.png'
import privilegeImg from '../../assets/home/PrivilegeImg.png'
import onboardingImg from '../../assets/home/OnboardingImg.png'
import contractorsImg from '../../assets/home/ContractorsImg.png'
import suppliersImg from '../../assets/home/SuppliersImg.png'
import userDocumentsImg from '../../assets/home/UserDocumentsImg.png'
import vehicleDocumentsImg from '../../assets/home/VehicleDocumentsImg.png'
import emailSettingsImg from '../../assets/home/EmailSettingsImg.png'
import backupImg from '../../assets/home/BackupImg.png'
import profileImg from '../../assets/home/ProfileImg.png'


const LoginOptions = () => {
    const [changeStyle, setChangeStyle] = useState("company");
    const [isHovering, setIsHovering] = useState("1");
    const [hover, setHover] = useState({ isMenu: false })

    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const Etoken = sessionStorage.getItem('bearerToken') || ""
    const bytes = cryptoJs.AES.decrypt(Etoken, securekey)
    const token = bytes.toString(cryptoJs.enc.Utf8);

    // const { user } = useSelector(state => state.authenticatioauthennSlice);
    const { user, permission } = useSelector(state => state.authenticatioauthennSlice);

    const { getProvidersByUserId } = useSelector(state => state.providersSlice);
    const { getContractorsByUserId } = useSelector(state => state.ContractorSlice);

    const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
        if (token) {
            const tokeninfo = jwtDecode(token)
            const data = {
                roleId: tokeninfo?.role_id
            }
            dispatch(RoleCheck(data))
        }
    }, [])



    useEffect(() => {

        const userType = user?.data?.userType?.name
        if (userType == "SUPPLIER_IN_CHARGE") {
            const data = {
                userId: user?.data?.id
            }
            dispatch(GetProvidersByUserId(data))
            dispatch(GetUserDocuments(user?.data?.id))
            localStorage.setItem("providerId", getProvidersByUserId?.id)

            if (user?.data?.status?.id === 3) {
                navigate("/dashboard/supplier/user-Documents")
            }
        }
        if (userType == "CONTRACTOR_IN_CHARGE") {

            const data = {
                userId: user?.data?.id
            }
            dispatch(GetContractorsByUserId(data))
            dispatch(GetUserDocuments(user?.data?.id))
            localStorage.setItem("contractorId", getContractorsByUserId?.id)

            if (user?.data?.status?.id === 3) {
                navigate("/dashboard/contractor/user-Documents")
            }

        }
        if (userType == "EMPLOYEE") {
            dispatch(GetUserDocumentsEmployee(user?.data?.id))

        }


    }, [user?.data?.id])


    useEffect(() => {
        const iconBaseGridElements = document.querySelectorAll('.icon-base-grid');
        const imageContainer = document.getElementById('imageContainer');
        const imageContainerBackgroundNo = document.querySelector('.image-container-background-no');
        const imageContainerBackground = document.querySelector('.image-container-background');

        let bg

        iconBaseGridElements.forEach((el) => {
            el.addEventListener('mouseover', () => {
                console.log('probando')
                bg = el.getAttribute('data-bg');
                if (imageContainer) {
                    console.log('probando2')
                    imageContainer.style.backgroundImage = `${bg}`;
                }
            });

            el.addEventListener('mouseout', () => {
                if (imageContainer) {
                    imageContainer.style.backgroundImage = `${bg}`;
                }
            });


        });
        if (renderCount < 4){
        setRenderCount((prevCount) => prevCount + 1);
        }
    }, [hover, renderCount]);

   

    return (

        <div className='overflow-hidden'>
            <div className='login_option_container'>


                <div className='login_option_header mr-0'>
                    <SidebarDropDownOption changestyle={changeStyle} hovereffect={isHovering} menutop={true} />
                </div>

                <div className='login_option_menus position-relative'
                >

                    <div id="imageContainer" className={`${hover.isMenu ? 'image-container-background-no' : 'image-container-background'} image-container-transition`}
                    >
                        <div className='mask-image-background-login-1'></div>
                    </div>
                    <div className='overlay_mask_menu'
                    >
                        <div className='menu_overflow_control w-100'>


                            {
                                user?.data?.userType?.name === "EMPLOYEE" &&
                                <>



                                    <div className='grid-menu-icon-container full-container mx-0'>
                                        <div className='grid-menu-icon-row row mt-5 mx-3'>
                                            {permission?.includes(permissionObj?.WEB_COMPANY_READ) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>
                                                    <div className={`${hover.menu === 'Company' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${companyProfileImg}")`}
                                                        onClick={() => {
                                                            navigate("/dashboard/employee/company")
                                                            sessionStorage.setItem('sidebarOption', 'company')
                                                        }}
                                                        onMouseEnter={() => setHover({
                                                            menu: "Company",
                                                            url: '/dashboard/employee/company',
                                                            isMenu: true,
                                                            img: companyIcon

                                                        })}
                                                        onMouseLeave={() => setHover({ isMenu: false })}
                                                    >
                                                        <img src={companyicon} alt="" />

                                                        <p>{t("company_profile")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {permission?.includes(permissionObj?.WEB_ZONE_READ) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>

                                                    <div className={`${hover.menu === 'ZONES' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${firsAccessImg}")`}
                                                        onClick={() => {
                                                            navigate("/dashboard/employee/zones")
                                                            sessionStorage.setItem('sidebarOption', 'zones')
                                                        }}
                                                        onMouseEnter={() => setHover({
                                                            menu: "ZONES",
                                                            url: '/dashboard/employee/zones',
                                                            isMenu: true,
                                                            img: firstAccessIcon

                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={firstAccessIcon} alt="" />
                                                        <p>{t("first_access")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {/* {permission?.includes(permissionObj?.WEB_ZONE_READ) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>
                                                    <div className={`${hover.menu === 'internalMonitoring' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${internalMonitoringImg}")`}
                                                        onClick={() => navigate("/dashboard/employee/zones")}
                                                        onMouseEnter={() => setHover({
                                                            menu: "internalMonitoring",
                                                            url: '/dashboard/employee/zones',
                                                            isMenu: true,
                                                            img: internalMonitoringIcon

                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={internalMonitoringIcon} alt="" />
                                                        <p>{t("internal_monitoring")}</p>
                                                    </div>
                                                </div>
                                            } */}
                                            {permission?.includes(permissionObj.WEB_DEVICE_READ) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>
                                                    <div className={`${hover.menu === 'device setting' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${devicesImg}")`}
                                                        onClick={() => navigate("/dashboard/employee/devices")}
                                                        onMouseEnter={() => setHover({
                                                            menu: "device setting",
                                                            url: '',
                                                            isMenu: true,
                                                            img: deviceIcon
                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={deviceIcon} alt="" />
                                                        <p>{t("devices")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {permission?.includes(permissionObj.WEB_ATTENDANCE_READ) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>
                                                    <div className={`${hover.menu === 'PAYROLL' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${attendanceImg}")`}
                                                        onClick={() => navigate("/dashboard/employee/payroll")}
                                                        onMouseEnter={() => setHover({
                                                            menu: "PAYROLL",
                                                            url: '/dashboard/employee/payroll',
                                                            isMenu: true,
                                                            img: attendenceIcon


                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={payrollIcon} alt="" />
                                                        <p>{t("attendance")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {permission?.includes(permissionObj.WEB_DEPARTMENT_READ) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>

                                                    <div className={`${hover.menu === 'DEPARTMENTS' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${departmentsImg}")`}
                                                        onClick={() => navigate("/dashboard/employee/departments")}
                                                        onMouseEnter={() => setHover({
                                                            menu: "DEPARTMENTS",
                                                            url: '/dashboard/employee/departments',
                                                            isMenu: true,
                                                            img: departmentIcon

                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={departmentIcon} alt="" />
                                                        <p>{t("departments")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {permission?.includes(permissionObj.WEB_EMPLOYEE_READ) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>
                                                    <div className={`${hover.menu === 'EMPLOYEES' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${employeesImg}")`}
                                                        onClick={() => {
                                                            navigate("/dashboard/employee/all-employees")
                                                            sessionStorage.setItem('sidebarOption', 'employees')
                                                        }}
                                                        onMouseEnter={() => setHover({
                                                            menu: "EMPLOYEES",
                                                            url: '/dashboard/employee/all-employees',
                                                            isMenu: true,
                                                            img: employeeIcons
                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={emoloyeeicon} alt="" />
                                                        <p>{t("employees")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {permission?.includes(permissionObj.WEB_VEHICLE_READ) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>
                                                    <div className={`${hover.menu === 'VEHICLES' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${vehiclesImg}")`}
                                                        onClick={() => {
                                                            navigate("/dashboard/employee/allvehicles")
                                                            sessionStorage.setItem('sidebarOption', 'vehicles')
                                                        }}
                                                        onMouseEnter={() => setHover({
                                                            menu: "VEHICLES",
                                                            url: '/dashboard/employee/allvehicles',
                                                            isMenu: true,
                                                            img: vehicleIcon

                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={vehicleicon} alt="" />
                                                        <p>{t("vehicles")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {permission?.includes(permissionObj.WEB_EVENT_READ) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>
                                                    <div className={`${hover.menu === 'EVENTS' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${eventsImg}")`}
                                                        onClick={() => {
                                                            navigate("/dashboard/employee/events")
                                                            sessionStorage.setItem('sidebarOption', 'events')
                                                        }}
                                                        onMouseEnter={() => setHover({
                                                            menu: "EVENTS",
                                                            url: '/dashboard/employee/events',
                                                            isMenu: true,
                                                            img: eventIcon
                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={eventicon} alt="" />
                                                        <p>{t("events")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {permission?.includes(permissionObj.WEB_WORK_SHIFT_READ) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>

                                                    <div className={`${hover.menu === 'WORK SHIFT PANEL' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${workshiftImg}")`}
                                                        onClick={() => navigate("/dashboard/employee/company/workshift-panel")}
                                                        onMouseEnter={() => setHover({
                                                            menu: "WORK SHIFT PANEL",
                                                            url: '/dashboard/employee/company/workshift-panel',
                                                            isMenu: true,
                                                            img: workShiftIcons

                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={workShiftIcons} alt="" />
                                                        <p>{t("work_shift_panel")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {permission?.includes(permissionObj?.WEB_ACCESS_USER_READ || permissionObj?.WEB_ACCESS_VEHICLE_READ) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>
                                                    <div className={`${hover.menu === 'access' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${accessImg}")`}
                                                          onClick={() => navigate("/dashboard/employee/access")}
                                                        onMouseEnter={() => setHover({
                                                            menu: "access",
                                                            url: '',
                                                            isMenu: true,
                                                            img: accessIcon
                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={accessIcon} alt="" />
                                                        <p>{t("access")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {permission?.includes(permissionObj.WEB_PRIVILEGE_READ) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>
                                                    <div className={`${hover.menu === 'privilage settings' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${privilegeImg}")`}
                                                        onClick={() => navigate("/dashboard/employee/company/roles-panel")}
                                                        onMouseEnter={() => setHover({
                                                            menu: "privilage settings",
                                                            url: '',
                                                            isMenu: true,
                                                            img: privilageSettingsIcon
                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={privilageSettingsIcon} alt="" />
                                                        <p>{t("privilage_settings")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {permission?.includes(permissionObj.WEB_ONBOARDING_READ) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>
                                                    <div className={`${hover.menu === 'onBoarding' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${onboardingImg}")`}
                                                        onClick={() => navigate("/dashboard/employee/company/onboarding")}
                                                        onMouseEnter={() => setHover({
                                                            menu: "onBoarding",
                                                            url: '',
                                                            isMenu: true,
                                                            img: onBoardingIcon
                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={onBoardingIcon} alt="" />
                                                        <p>{t("on_boarding")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {(permission?.includes(permissionObj.WEB_CONTRACTOR_READ) || permission?.includes(permissionObj.WEB_CONTRACTOR_CONTRACT_READ)) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>

                                                    <div className={`${hover.menu === 'CONTRACTORS' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${contractorsImg}")`}
                                                        onClick={() => {
                                                            navigate("/dashboard/employee/contractors")
                                                            sessionStorage.setItem('sidebarOption', 'contractor')
                                                        }}
                                                        onMouseEnter={() => setHover({
                                                            menu: "CONTRACTORS",
                                                            url: '/dashboard/employee/contractors',
                                                            isMenu: true,
                                                            img: contractorIcon

                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={contractoricon} alt="" />
                                                        <p>{t("contractors")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {(permission?.includes(permissionObj.WEB_SUPPLIER_READ) || permission?.includes(permissionObj.WEB_SUPPLIER_ORDER_READ)) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>

                                                    <div className={`${hover.menu === 'PROVIDERS' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${suppliersImg}")`}
                                                        onClick={() => {
                                                            navigate("/dashboard/employee/suppliers")
                                                            sessionStorage.setItem('sidebarOption', 'provider')
                                                        }}
                                                        onMouseEnter={() => setHover({
                                                            menu: "PROVIDERS",
                                                            url: '/dashboard/employee/suppliers',
                                                            isMenu: true,
                                                            img: supplierIcon

                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={providericon} alt="" />
                                                        <p>{t("suppliers")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {(permission?.includes(permissionObj.WEB_SUPPLIER_DOCUMENT_READ) || permission?.includes(permissionObj.WEB_EMPLOYEE_DOCUMENT_READ) || permission?.includes(permissionObj.WEB_CONTRACTOR_DOCUMENT_READ)) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>

                                                    <div className={`${hover.menu === 'user document manager' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${userDocumentsImg}")`}
                                                        onClick={() => navigate("/dashboard/employee/company/user-doc-panel")}
                                                        onMouseEnter={() => setHover({
                                                            menu: "user document manager",
                                                            url: '',
                                                            isMenu: true,
                                                            img: userDocPanelIcon

                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={userDocPanelIcon} alt="" />
                                                        <p>{t("user_document_manager")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {(permission?.includes(permissionObj.WEB_SUPPLIER_VEHICLE_DOCUMENT_READ) || permission?.includes(permissionObj.WEB_CONTRACTOR_VEHICLE_DOCUMENT_READ)) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>

                                                    <div className={`${hover.menu === 'vehicle document manager' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${vehicleDocumentsImg}")`}
                                                        onClick={() => navigate("/dashboard/employee/company/vehicle-doc-panel")}
                                                        onMouseEnter={() => setHover({
                                                            menu: "vehicle document manager",
                                                            url: '',
                                                            isMenu: true,
                                                            img: vehicleDocPanelIcon

                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={vehicleDocPanelIcon} alt="" />
                                                        <p>{t("vehicle_document_manager")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {permission?.includes(permissionObj?.WEB_EMAIL_SETTINGS_READ) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>
                                                    <div className={`${hover.menu === 'email setting' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${emailSettingsImg}")`}
                                                        onClick={() => navigate("/dashboard/employee/payroll/email-setting")}
                                                        onMouseEnter={() => setHover({
                                                            menu: "email setting",
                                                            url: '',
                                                            isMenu: true,
                                                            img: emailSettingIcon
                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={emailSettingIcon} alt="" />
                                                        <p>{t("email_service_settings")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {permission?.includes(permissionObj.WEB_BACK_UP_READ) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>

                                                    <div className={`${hover.menu === 'BACK UP' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${backupImg}")`}
                                                        onClick={() => navigate("/dashboard/employee/backup")}
                                                        onMouseEnter={() => setHover({
                                                            menu: "BACK UP",
                                                            url: '/dashboard/employee/backup',
                                                            isMenu: true,
                                                            img: databaseIcon

                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={backupicon} alt="" />
                                                        <p>{t("back_up")}</p>
                                                    </div>
                                                </div>
                                            }
                                            {permission?.includes(permissionObj.WEB_PROFILE_READ) &&
                                                <div className='menu-icon-grid col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 px-0 mx-0 mb-3'>
                                                    <div className={`${hover.menu === 'PROFILE' ? 'icon-base-grid-hovered' : 'icon-base-grid'}`} data-bg={`url("${profileImg}")`}
                                                        onClick={() => navigate("/dashboard/employee/profile")}
                                                        onMouseEnter={() => setHover({
                                                            menu: "PROFILE",
                                                            url: '/dashboard/employee/profile',
                                                            isMenu: true,
                                                            img: provfileIcon
                                                        })}
                                                        onMouseLeave={() => setHover({})}
                                                    >
                                                        <img src={profileicon} alt="" />
                                                        <p>{t("profile")}</p>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>

                                </>

                            }
                            {
                                user?.data?.userType?.name === "SUPPLIER_IN_CHARGE" &&
                                <>
                                    {
                                        user?.data?.status?.id !== 3 &&
                                        <>

                                            <div className="login_option_menu"
                                                onClick={() => navigate("/dashboard/supplier/orders")}
                                                onMouseEnter={() => setHover({
                                                    menu: "Orders",
                                                    url: '/dashboard/supplier/orders',
                                                    isMenu: true,
                                                    img: companyIcon

                                                })}
                                                onMouseLeave={() => setHover({})}
                                            >
                                                <img src={providericon} alt="" />

                                                <p>{t("orders")}</p>
                                            </div>
                                            <div className="login_option_menu"
                                                onClick={() => navigate("/dashboard/supplier/employees")}
                                                onMouseEnter={() => setHover({
                                                    menu: "employees",
                                                    url: '/dashboard/supplier/employees',
                                                    isMenu: true,
                                                    img: companyIcon

                                                })}
                                                onMouseLeave={() => setHover({})}
                                            >
                                                <img src={emoloyeeicon} alt="" />

                                                <p>{t("employees")}</p>
                                            </div>
                                            <div className="login_option_menu"
                                                onClick={() => navigate("/dashboard/supplier/vehicles")}
                                                onMouseEnter={() => setHover({
                                                    menu: "vehicles",
                                                    url: '/dashboard/supplier/vehicles',
                                                    isMenu: true,
                                                    img: companyIcon

                                                })}
                                                onMouseLeave={() => setHover({})}
                                            >
                                                <img src={vehicleicon} alt="" />

                                                <p>{t("vehicles")}</p>
                                            </div>

                                            <div className="login_option_menu"
                                                onClick={() => navigate("/dashboard/supplier/announcements")}
                                                onMouseEnter={() => setHover({
                                                    menu: "announcements",
                                                    url: '/dashboard/supplier/announcements',
                                                    isMenu: true,
                                                    img: companyIcon

                                                })}
                                                onMouseLeave={() => setHover({})}
                                            >
                                                <img src={icAnnnouncementIcon} alt="" />

                                                <p>{t("announcements")}</p>
                                            </div>
                                        </>
                                    }

                                    <div className="login_option_menu"
                                        onClick={() => navigate("/dashboard/supplier/profile")}
                                        onMouseEnter={() => setHover({
                                            menu: "profile",
                                            url: '/dashboard/supplier/profile',
                                            isMenu: true,
                                            img: companyIcon

                                        })}
                                        onMouseLeave={() => setHover({})}
                                    >
                                        <img src={profileicon} alt="" />

                                        <p>{t("profile")}</p>
                                    </div>
                                </>

                            }
                            {
                                user?.data?.userType?.name === "CONTRACTOR_IN_CHARGE" &&
                                <>
                                    <>
                                        {
                                            user?.data?.status?.id !== 3 &&
                                            <>
                                                <div className="login_option_menu"
                                                    onClick={() => navigate("/dashboard/contractor/contracts")}
                                                    onMouseEnter={() => setHover({
                                                        menu: "Contracts",
                                                        url: '/dashboard/contractor/contracts',
                                                        isMenu: true,
                                                        img: companyIcon

                                                    })}
                                                    onMouseLeave={() => setHover({})}
                                                >
                                                    <img src={contractoricon} alt="" />

                                                    <p>{t("contracts")}</p>
                                                </div>
                                                <div className="login_option_menu"
                                                    onClick={() => navigate("/dashboard/contractor/search-employe")}
                                                    onMouseEnter={() => setHover({
                                                        menu: "employees",
                                                        url: '/dashboard/contractor/search-employe',
                                                        isMenu: true,
                                                        img: companyIcon

                                                    })}
                                                    onMouseLeave={() => setHover({})}
                                                >
                                                    <img src={emoloyeeicon} alt="" />

                                                    <p>{t("employees")}</p>
                                                </div>
                                                <div className="login_option_menu"
                                                    onClick={() => navigate("/dashboard/contractor/search-vehicle")}
                                                    onMouseEnter={() => setHover({
                                                        menu: "vehicles",
                                                        url: '/dashboard/contractor/search-vehicle',
                                                        isMenu: true,
                                                        img: companyIcon

                                                    })}
                                                    onMouseLeave={() => setHover({})}
                                                >
                                                    <img src={vehicleicon} alt="" />

                                                    <p>{t("vehicles")}</p>
                                                </div>

                                                <div className="login_option_menu"
                                                    onClick={() => navigate("/dashboard/contractor/announcementtab")}
                                                    onMouseEnter={() => setHover({
                                                        menu: "announcements",
                                                        url: '/dashboard/contractor/announcementtab',
                                                        isMenu: true,
                                                        img: companyIcon

                                                    })}
                                                    onMouseLeave={() => setHover({})}
                                                >
                                                    <img src={icAnnnouncementIcon} alt="" />

                                                    <p>{t("announcements")}</p>
                                                </div>
                                            </>

                                        }

                                        <div className="login_option_menu"
                                            onClick={() => navigate("/dashboard/contractor/profile")}
                                            onMouseEnter={() => setHover({
                                                menu: "profile",
                                                url: '/dashboard/contractor/profile',
                                                isMenu: true,
                                                img: companyIcon

                                            })}
                                            onMouseLeave={() => setHover({})}
                                        >
                                            <img src={profileicon} alt="" />

                                            <p>{t("profile")}</p>
                                        </div>
                                    </>
                                </>
                            }
                            < div className={`${hover.isMenu ? 'bottom-logo-menu-icon-no position-sticky pb-2 pt-2' : 'bottom-logo-menu-icon position-sticky pb-2 pt-2'}`}>
                                <img src={logo} alt="" />
                            </div >
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default LoginOptions