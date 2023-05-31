import React, { useEffect, useState } from 'react'
// import angelright_icon from "../../../assets/images/angelright.svg";
import SidebarDropDownOption from '../../../components/SidebarDropDownOption';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserDocuments } from '../../../reduxToolkit/Providers/providersApi';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import BootstrapTooltip from '../../../utils/BootstrapTooltip';

import green_company from "../../../assets/images/green-company.svg";
import ic_build from "../../../assets/images/ic-build.svg";



import ic_supplier from "../../../assets/images/ic-supplier.svg";
import green_provider from "../../../assets/images/green-provider.svg";
import green_employee from "../../../assets/images/green-employee.svg";
import ic_people_group_solid from "../../../assets/images/ic-people-group-solid.svg";
import green_vehicle from "../../../assets/images/green-vehicle.svg";
import ic_truck from "../../../assets/images/ic-truck.svg";
import announcementsIcon from "../../../assets/menuIcon/announcements.svg"
import announcementsWhite from "../../../assets/menuIcon/white_announcements.svg"
import profileIcon from "../../../assets/menuIcon/profile.svg"
import profileWhite from "../../../assets/menuIcon/white_profile.svg"

const ProviderTabs = ({ isMenuOpen }) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";


    // useState hook
    const [isOpen, setIsOpen] = useState(false);
    const [changeStyle, setChangeStyle] = useState("orders");
    const [isHovering, setIsHovering] = useState("1");

    const dispatch = useDispatch()
    console.log(isHovering)
    // useSelector hook for store state
    // const { getProvidersByUserId } = useSelector(state => state.providersSlice);
    const { user } = useSelector(state => state.authenticatioauthennSlice);

    useEffect(() => {
        dispatch(GetUserDocuments(user?.data?.id))
    }, [])

    return (
        <ul>
            {
                user?.data?.status?.id != 3 &&
                <>
                    <BootstrapTooltip title={!isMenuOpen ? t('purchase_orders') : ""} placement="right">
                        <Link to='/dashboard/supplier/orders'>
                            <li
                                onClick={() => setChangeStyle("orders")}
                                className={changeStyle === "orders" ? "activeLi" : isHovering === 1 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(1)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 1 && changeStyle !== "orders" ?
                                            <img src={green_provider}
                                                className="sidBarIcons" alt="green_company"
                                                style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }}
                                            /> :
                                            <img src={ic_supplier} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                    }
                                    {
                                        isMenuOpen &&
                                        <span className="ms-1 d-none d-sm-inline">{t("purchase_orders")}</span>
                                    }
                                </div>
                                {/* <img src={angelright_icon} alt="" style={{
                                transform: lCode === "ar" ? "scaleX(-1)" : "",
                                margin: "0 10px"
                            }} /> */}
                            </li>
                        </Link>
                    </BootstrapTooltip>
                    <BootstrapTooltip title={!isMenuOpen ? t('employees') : ""} placement="right">
                        <Link to='/dashboard/supplier/employees'>
                            <li
                                onClick={() => setChangeStyle("employees")}
                                className={changeStyle === "employees" ? "activeLi" : isHovering === 2 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(2)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 2 && changeStyle !== "employee" ?
                                            <img src={green_employee}
                                                className="sidBarIcons" alt="green_company"
                                                style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }}
                                            /> :
                                            <img src={ic_people_group_solid} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                    }
                                    {
                                        isMenuOpen &&
                                        <span className="ms-1 d-none d-sm-inline">{t("employees")}</span>
                                    }
                                </div>
                                {/* <img src={angelright_icon} alt="" style={{
                                transform: lCode === "ar" ? "scaleX(-1)" : "",
                                margin: "0 10px"
                            }} /> */}
                            </li>
                        </Link>
                    </BootstrapTooltip>
                    <BootstrapTooltip title={!isMenuOpen ? t('vehicles') : ""} placement="right">
                        <Link to='/dashboard/supplier/vehicles'>
                            <li
                                onClick={() => setChangeStyle("vehicles")}
                                className={changeStyle === "vehicles" ? "activeLi" : isHovering === 3 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(3)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 3 && changeStyle !== "vehicles" ?
                                            <img src={green_vehicle}
                                                className="sidBarIcons" alt="green_company"
                                                style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }}
                                            /> :
                                            <img src={ic_truck} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                    }
                                    {
                                        isMenuOpen &&
                                        <span className="ms-1 d-none d-sm-inline">{t("vehicles")}</span>
                                    }
                                </div>
                                {/* <img src={angelright_icon} alt="" style={{
                                transform: lCode === "ar" ? "scaleX(-1)" : "",
                                margin: "0 10px"
                            }} /> */}
                            </li>
                        </Link>
                    </BootstrapTooltip>

                    <BootstrapTooltip title={!isMenuOpen ? t('announcements') : ""} placement="right">
                        <Link to='/dashboard/supplier/announcements'>
                            <li
                                onClick={() => setChangeStyle("announcements")}
                                className={changeStyle === "announcements" ? "activeLi" : isHovering === 4 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(4)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 4 && changeStyle !== "announcements" ?
                                            <img src={announcementsIcon}
                                                className="sidBarIcons" alt="green_company"
                                                style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }}
                                            /> :
                                            <img src={announcementsWhite} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                    }
                                    {
                                        isMenuOpen &&
                                        <span className="ms-1 d-none d-sm-inline">{t("announcements")}</span>
                                    }
                                </div>
                                {/* <img src={angelright_icon} alt="" style={{
                                transform: lCode === "ar" ? "scaleX(-1)" : "",
                                margin: "0 10px"
                            }} /> */}
                            </li>
                        </Link>
                    </BootstrapTooltip>

                </>
            }
            <BootstrapTooltip title={!isMenuOpen ? t('profile') : ""} placement="right">
                <Link to='/dashboard/supplier/profile'>
                    <li
                        onClick={() => setChangeStyle("profile")}
                        className={changeStyle === "profile" ? "activeLi" : isHovering === 5 ? "hoverLi" : ""}
                        onMouseEnter={() => setIsHovering(5)}
                        onMouseLeave={() => setIsHovering(0)}
                    >
                        <div>
                            {
                                isHovering === 5 && changeStyle !== "vehicles" ?
                                    <img src={profileIcon}
                                        className="sidBarIcons" alt="green_company"
                                        style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }}
                                    /> :
                                    <img src={profileWhite} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                            }
                            {
                                isMenuOpen &&
                                <span className="ms-1 d-none d-sm-inline">{t("profile")}</span>
                            }
                        </div>
                        {/* <img src={angelright_icon} alt="" style={{
                                transform: lCode === "ar" ? "scaleX(-1)" : "",
                                margin: "0 10px"
                            }} /> */}
                    </li>
                </Link>
            </BootstrapTooltip>
            <Link to='#'>
                <li
                    // onClick={() => { setIsOpen(!isOpen) }}
                    className={`${isMenuOpen ? "profile_li" : "profile_li_col"}`}
                >
                    <SidebarDropDownOption menutop={false} isMenuOpen={isMenuOpen} />
                </li>
            </Link>
        </ul>
    )
}

export default ProviderTabs