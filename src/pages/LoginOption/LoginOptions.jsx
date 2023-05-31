/*
Author : Arman Ali
Module: create Vehicle
github: https://github.com/Arman-Arzoo
*/
import React, { useEffect, useState } from 'react'
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


const LoginOptions = () => {
    const [changeStyle, setChangeStyle] = useState("company");
    const [isHovering, setIsHovering] = useState("1");
    const [hover, setHover] = useState({})

    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const Etoken = sessionStorage.getItem('bearerToken') || ""
    const bytes = cryptoJs.AES.decrypt(Etoken, securekey)
    const token = bytes.toString(cryptoJs.enc.Utf8);

    // const { user } = useSelector(state => state.authenticatioauthennSlice);
    const { user, permission } = useSelector(state => state.authenticatioauthennSlice);
    console.log(user)
    console.log(user?.data?.userType?.name == "EMPLOYEE", user?.data?.status?.id != 3)

    const { getProvidersByUserId } = useSelector(state => state.providersSlice);
    const {getContractorsByUserId} =useSelector(state => state.ContractorSlice);
    

    // action taker
    // const userdata = sessionStorage.getItem('userdata');
    // const bytess = cryptoJs.AES.decrypt(userdata || "", securekey)
    // const userstring = bytess.toString(cryptoJs.enc.Utf8);
    // const user = userstring ? JSON.parse(userstring)?.data?.data : ""

    // console.log(user)


    useEffect(() => {
        if (token) {
            const tokeninfo = jwtDecode(token)
            console.log(tokeninfo)
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


    return (
        <div className='login_option_container'>
            <div className='login_option_header'>
                <SidebarDropDownOption changestyle={changeStyle} hovereffect={isHovering} menutop={true} />
            </div>

            <div className='login_option_menus'
                style={{
                    backgroundImage: hover.isMenu ? `url(https://cdn.unenvironment.org/2020-02/sustainable-cities.jpg)` : "",
                    backgroundSize: hover.isMenu ? "cover" : "",
                    width: "100%",
                    height: "100%"
                }}
            >
                <div className='overlay_mask_menu'
                    style={{
                        background: hover.isMenu ? "transparent linear-gradient(270deg, #00000000 0%, #000000 100%) 0% 0% no-repeat padding-box" : ""
                    }}
                >
                    <div className='menu_overflow_control'>


                        {
                            user?.data?.userType?.name === "EMPLOYEE" &&
                            <>
                                <div className="login_option_menu"
                                    onClick={() => navigate("/dashboard/employee/company")}
                                    onMouseEnter={() => setHover({
                                        menu: "Company",
                                        url: '/dashboard/employee/company',
                                        isMenu: true,
                                        img: companyIcon

                                    })}
                                    onMouseLeave={() => setHover({})}
                                >
                                    <img src={companyicon} alt="" />

                                    <p>{t("company_profile")}</p>
                                </div>
                                <div className="login_option_menu"
                                    onClick={() => navigate("/dashboard/employee/zones")}
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
                                <div className="login_option_menu"
                                    onClick={() => navigate("/dashboard/employee/events")}
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
                                <div className="login_option_menu"
                                    onClick={() => navigate("/dashboard/employee/all-employees")}
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
                                <div className="login_option_menu"
                                    onClick={() => navigate("/dashboard/employee/allvehicles")}
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
                                <div className="login_option_menu"
                                    onClick={() => navigate("/dashboard/employee/contractors")}
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
                                <div className="login_option_menu"
                                    onClick={() => navigate("/dashboard/employee/suppliers")}
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
                                <div className="login_option_menu"
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
                                <div className="login_option_menu"
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
                                <div className="login_option_menu"
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
                                <div className="login_option_menu"
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

                                <div className="login_option_menu"
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

                                <div className="login_option_menu"
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

                                <div className="login_option_menu"
                                    //   onClick={() => navigate("/dashboard/employee/company/workshift-panel")}
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

                                <div className="login_option_menu"
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

                                <div className="login_option_menu"
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


                                <div className="login_option_menu"
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

                                <div className="login_option_menu"
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

                                <div className="login_option_menu"
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

                                {permission?.includes(permissionObj.WEB_DEVICE_MENU) &&
                                    <div className="login_option_menu"
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
                                }
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
                    </div>

                </div>

            </div>

            <div className='footer_logo'>
                <img src={logo} alt="" />
            </div>

        </div >
    )
}

export default LoginOptions