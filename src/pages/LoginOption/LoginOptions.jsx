import React, { useEffect, useState } from 'react'
import SidebarDropDownOption from '../../components/SidebarDropDownOption'
import zoneIcon from "../../assets/zoneBlankicon.svg"
import payrollIcon from "../../assets/payrollBlackIcon.svg"

import pencilicon from "../../assets/pencilsmallicon.svg"
import permissionicon from "../../assets/permissionsmallicon.svg"
import workshifticon from "../../assets/workshiftsmallicon.svg"
import docicon from "../../assets/docsmallicon.svg"
import onboardingicon from "../../assets/onboardingsmallicon.svg"
import headericon from "../../assets/headersmallicon.svg"
import companyicon from "../../assets/companyblackicon.svg"
import eventicon from "../../assets/eventblackicon.svg"
import emoloyeeicon from "../../assets/employeeblackicon.svg"
import vehicleicon from "../../assets/vehicleblackicon.svg"
import contractoricon from "../../assets/backupblackicon.svg"
import providericon from "../../assets/providerblackicon.svg"
import backupicon from "../../assets/backupblackicon.svg"
import profileicon from "../../assets/profileblackicon.svg"
import emailicon from "../../assets/emailblacksmallicon.svg"
import vehiclesmallicon from "../../assets/vehiclesmallblackicon.svg"
import logo from "../../assets/loginoptionweblogo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RoleCheck } from '../../reduxToolkit/authentication/AuthenticatonApi'
import jwtDecode from 'jwt-decode'
import { GetProvidersByUserId, GetUserDocuments } from '../../reduxToolkit/Providers/providersApi'
import { GetByUserId } from '../../reduxToolkit/Contractor/ContractorApi'
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
import zonesIcon from "../../assets/loginMenuIcon/zones.svg"
import cryptoJs from 'crypto-js';
import securekey from '../../config'

const LoginOptions = () => {
    const [changeStyle, setChangeStyle] = useState("company");
    const [isHovering, setIsHovering] = useState("1");
    const [hover, setHover] = useState({})

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const Etoken = sessionStorage.getItem('bearerToken') || ""
    const bytes = cryptoJs.AES.decrypt(Etoken, securekey)
    const token = bytes.toString(cryptoJs.enc.Utf8);

    const { user } = useSelector(state => state.authenticatioauthennSlice);
    console.log(user)
    console.log(user?.data?.userType?.name == "EMPLOYEE", user?.data?.status?.id != 3)

    const { getProvidersByUserId } = useSelector(state => state.providersSlice);
    localStorage.setItem("providerId", getProvidersByUserId?.id)
    console.log(getProvidersByUserId)

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
        if (userType == "PROVIDER_IN_CHARGE") {
            const data = {
                userId: user?.data?.id
            }
            dispatch(GetProvidersByUserId(data))
            dispatch(GetUserDocuments(user?.data?.id))
            localStorage.setItem("providerId", getProvidersByUserId?.id || user?.data?.id)
        }
        if (userType == "CONTRACTOR_IN_CHARGE") {
            dispatch(GetByUserId(user?.data?.id))

        }
        if (userType == "EMPLOYEE") {
            dispatch(GetUserDocumentsEmployee(user?.data?.id))

        }


    }, [user?.data?.id])


    return (
        <div className='login_option_container'>
            <div className='login_option_header'>
                <SidebarDropDownOption changestyle={changeStyle} hovereffect={isHovering} />
            </div>

            <div className='login_option_menus' style={{ display: hover?.isMenu ? "none" : "flex" }}>

                <div className="login_option_menu" onMouseEnter={() => setHover({
                    menu: "Company",
                    url: '/dashboard/employee/company',
                    isMenu: true,
                    img: companyIcon

                })}
                >
                    <img src={companyicon} alt="" />

                    <p>COMPANY</p>
                </div>
                <div className="login_option_menu"
                    onMouseEnter={() => setHover({
                        menu: "ZONES",
                        url: '/dashboard/employee/zones',
                        isMenu: true,
                        img: zonesIcon

                    })}
                >
                    <img src={zoneIcon} alt="" />
                    <p>ZONES</p>
                </div>
                <div className="login_option_menu"
                    onMouseEnter={() => setHover({
                        menu: "EVENTS",
                        url: '/dashboard/employee/events',
                        isMenu: true,
                        img: eventIcon

                    })}
                >
                    <img src={eventicon} alt="" />
                    <p>EVENTS</p>
                </div>
                <div className="login_option_menu"
                    onMouseEnter={() => setHover({
                        menu: "EMPLOYEES",
                        url: '/dashboard/employee/all-employees',
                        isMenu: true,
                        img: employeeIcons


                    })}
                >
                    <img src={emoloyeeicon} alt="" />
                    <p>EMPLOYEES</p>
                </div>




                <div className="sub_menus">

                    <div className="sub_menu"
                        onMouseEnter={() => setHover({
                            menu: "UPDATE DATA",
                            url: '/dashboard/employee/company/update-data',
                            isMenu: true

                        })}>
                        <img src={pencilicon} alt="" />
                        <p>UPDATE DATA</p>
                    </div>
                    <div className="sub_menu"
                        onMouseEnter={() => setHover({
                            menu: "PERMISSION PANEL",
                            url: '/dashboard/employee/company/roles-panel',
                            isMenu: true,


                        })}>
                        <img src={permissionicon} alt="" />
                        <p>PERMISSION PANEL</p>
                    </div>
                    <div className="sub_menu"
                        onMouseEnter={() => setHover({
                            menu: "WORK SHIFT PANEL",
                            url: '/dashboard/employee/company/workshift-panel',
                            isMenu: true,


                        })}>
                        <img src={workshifticon} alt="" />
                        <p>WORK SHIFT PANEL</p>
                    </div>
                    <div className="sub_menu"
                        onMouseEnter={() => setHover({
                            menu: "USER DOC PANEL",
                            url: '/dashboard/employee/company/user-doc-panel',
                            isMenu: true


                        })}>
                        <img src={docicon} alt="" />
                        <p>USER DOC PANEL</p>
                    </div>
                    <div className="sub_menu"
                        onMouseEnter={() => setHover({
                            menu: "VEHICLE DOC PANEL",
                            url: '/dashboard/employee/company/vehicle-doc-panel',
                            isMenu: true,


                        })}>
                        <img src={vehiclesmallicon} alt="" />
                        <p>VEHICLE DOC PANEL</p>
                    </div>
                    <div className="sub_menu"
                        onMouseEnter={() => setHover({
                            menu: "EMAIL SETTINGS",
                            url: '/dashboard/employee/payroll/email-setting',
                            isMenu: true

                        })}>
                        <img src={emailicon} alt="" />
                        <p>EMAIL SETTINGS</p>
                    </div>
                    <div className="sub_menu"
                        onMouseEnter={() => setHover({
                            menu: "ONBOARGING",
                            url: '/dashboard/employee/company/onboarding',
                            isMenu: true

                        })}>
                        <img src={onboardingicon} alt="" />
                        <p>ONBOARGING</p>
                    </div>
                    <div className="sub_menu"
                        onMouseEnter={() => setHover({
                            menu: "MANAGE HEADERS",
                            url: '/dashboard/employee/company//headers',
                            isMenu: true

                        })}>
                        <img src={headericon} alt="" />
                        <p> MANAGE HEADERS</p>
                    </div>


                </div>


                <div className="login_option_menu"
                    onMouseEnter={() => setHover({
                        menu: "VEHICLES",
                        url: '/dashboard/employee/allvehicles',
                        isMenu: true,
                        img: vehicleIcon

                    })}
                >
                    <img src={vehicleicon} alt="" />
                    <p>VEHICLES</p>
                </div>
                <div className="login_option_menu"
                    onMouseEnter={() => setHover({
                        menu: "CONTRACTORS",
                        url: '/dashboard/employee/contractors',
                        isMenu: true,
                        img: contractorIcon

                    })}>
                    <img src={contractoricon} alt="" />
                    <p>CONTRACTORS</p>
                </div>
                <div className="login_option_menu"
                    onMouseEnter={() => setHover({
                        menu: "PROVIDERS",
                        url: '/dashboard/employee/providers',
                        isMenu: true,
                        img: supplierIcon

                    })}
                >
                    <img src={providericon} alt="" />
                    <p>PROVIDERS</p>
                </div>
                <div className="login_option_menu"
                    onMouseEnter={() => setHover({
                        menu: "BACK UP",
                        url: '/dashboard/employee/backup',
                        isMenu: true,
                        img: databaseIcon

                    })}>
                    <img src={backupicon} alt="" />
                    <p>BACK UP</p>
                </div>
                <div className="login_option_menu"
                    onMouseEnter={() => setHover({
                        menu: "PAYROLL",
                        url: '/dashboard/employee/payroll',
                        isMenu: true,
                        img: attendenceIcon


                    })}>
                    <img src={payrollIcon} alt="" />
                    <p>PAYROLL</p>
                </div>
                <div className="login_option_menu"
                    onMouseEnter={() => setHover({
                        menu: "PROFILE",
                        url: '/dashboard/employee/profile',
                        isMenu: true,
                        img: provfileIcon

                    })}
                >
                    <img src={profileicon} alt="" />
                    <p>PROFILE</p>
                </div>
                <div className="login_option_menu"
                    onMouseEnter={() => setHover({
                        menu: "DEPARTMENTS",
                        url: '/dashboard/employee/departments',
                        isMenu: true,
                        img: provfileIcon

                    })}
                >
                    <img src={profileicon} alt="" />
                    <p>DEPARTMENTS</p>
                </div>


                <div className='footer_logo'>
                    <img src={logo} alt="" />
                </div>

            </div>
            {
                hover?.isMenu &&
                <div className="overlay">
                    <div className='overlay_mask'>


                        <div className='on_mouse_leave' onMouseLeave={() => setHover(false)}>
                            <Link to={hover?.url || ""}>
                                <div className="menulink" >
                                    <img src={hover?.img} alt="" />
                                    <p>{hover?.menu}</p>
                                </div>
                            </Link>

                        </div>
                    </div>

                </div>
            }



        </div >
    )
}

export default LoginOptions