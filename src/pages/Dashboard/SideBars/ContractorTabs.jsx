import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SidebarDropDownOption from '../../../components/SidebarDropDownOption';
import BootstrapTooltip from '../../../utils/BootstrapTooltip';
import { useSelector } from 'react-redux';
import green_contractor from "../../../assets/images/green-contractor.svg";
import green_employee from "../../../assets/images/green-employee.svg";
import green_vehicle from "../../../assets/images/green-vehicle.svg";
import ic_contract from "../../../assets/images/ic-contract.svg";
import ic_people_group_solid from "../../../assets/images/ic-people-group-solid.svg";
import ic_truck from "../../../assets/images/ic-truck.svg";
import announcementsIcon from "../../../assets/menuIcon/announcements.svg";
import profileIcon from "../../../assets/menuIcon/profile.svg";
import announcementsWhite from "../../../assets/menuIcon/white_announcements.svg";
import profileWhite from "../../../assets/menuIcon/white_profile.svg";


const ContractorTabs = ({ isMenuOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [changeStyle, setChangeStyle] = useState("contractors");
    const [isHovering, setIsHovering] = useState("1");
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const { user } = useSelector(state => state.authenticatioauthennSlice);

    return (
        <ul>
            {
                user?.data?.status?.id != 3 &&
                <>
                    <BootstrapTooltip title={!isMenuOpen ? t('contractors') : ""} placement="right">

                        <Link to='/dashboard/contractor/contracts'>
                            <li
                                onClick={() => setChangeStyle("contractors")}

                                className={changeStyle === "contractors" ? "activeLi" : isHovering === 1 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(1)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {
                                        isHovering === 1 && changeStyle !== "contractors" ?
                                            <img src={green_contractor}
                                                className="sidBarIcons" alt="green_company"
                                                style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }}
                                            /> :
                                            <img src={ic_contract} className="sidBarIcons" alt="ic_build" style={{ margin: isMenuOpen ? "0 5px" : "0 -8px" }} />
                                    }
                                    {
                                        isMenuOpen &&
                                        <span className="ms-1 d-none d-sm-inline">{t("contractors")}</span>
                                    }
                                </div>
                                {/* <img src={angelright_icon} alt="" /> */}
                            </li>
                        </Link>
                    </BootstrapTooltip>
                    <BootstrapTooltip title={!isMenuOpen ? t('employees') : ""} placement="right">

                        <Link to='/dashboard/contractor/search-employe'>
                            <li
                                onClick={() => setChangeStyle("employees")}
                                className={changeStyle === "employees" ? "activeLi" : isHovering === 2 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(2)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {/* <i className="fa fa-file-text-o" aria-hidden="true"></i>
                         */}

                                    {
                                        isHovering === 2 && changeStyle !== "orders" ?
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
                                {/* <img src={angelright_icon} alt="" /> */}
                            </li>
                        </Link>
                    </BootstrapTooltip>
                    <BootstrapTooltip title={!isMenuOpen ? t('vehicles') : ""} placement="right">

                        <Link to='/dashboard/contractor/search-vehicle'>
                            <li
                                onClick={() => setChangeStyle("vehicles")}
                                className={changeStyle === "vehicles" ? "activeLi" : isHovering === 3 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(3)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {/* <i className="fa fa-file-o" aria-hidden="true"></i> */}
                                    {
                                        isHovering === 3 && changeStyle !== "orders" ?
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
                                {/* <img src={angelright_icon} alt="angelright_icon" /> */}
                            </li>
                        </Link>
                    </BootstrapTooltip>
                    <BootstrapTooltip title={!isMenuOpen ? t('announcements') : ""} placement="right">

                        <Link to='/dashboard/contractor/announcementtab'>
                            <li
                                onClick={() => setChangeStyle("announcements")}
                                className={changeStyle === "announcements" ? "activeLi" : isHovering === 4 ? "hoverLi" : ""}
                                onMouseEnter={() => setIsHovering(4)}
                                onMouseLeave={() => setIsHovering(0)}
                            >
                                <div>
                                    {/* <i className="fa fa-file-o" aria-hidden="true"></i> */}
                                    {
                                        isHovering === 4 && changeStyle !== "orders" ?
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
                                {/* <img src={angelright_icon} alt="angelright_icon" /> */}
                            </li>
                        </Link>
                    </BootstrapTooltip>
                </>
            }

            <BootstrapTooltip title={!isMenuOpen ? t('profile') : ""} placement="right">

                <Link to='/dashboard/contractor/profile'>
                    <li
                        onClick={() => setChangeStyle("profile")}
                        className={changeStyle === "profile" ? "activeLi" : isHovering === 5 ? "hoverLi" : ""}
                        onMouseEnter={() => setIsHovering(5)}
                        onMouseLeave={() => setIsHovering(0)}
                    >
                        <div>
                            {/* <i className="fa fa-file-o" aria-hidden="true"></i> */}
                            {
                                isHovering === 5 && changeStyle !== "orders" ?
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
                        {/* <img src={angelright_icon} alt="angelright_icon" /> */}
                    </li>
                </Link>
            </BootstrapTooltip>



            <Link to='#'>
                <li
                    // onClick={() => { setIsOpen(!isOpen) }}
                    className={`${isMenuOpen ? "profile_li" : "profile_li_col"}`}
                >
                    {/* <ProfileDropDown /> */}
                    <SidebarDropDownOption menutop={false} isMenuOpen={isMenuOpen} />
                </li>
            </Link>
        </ul>
    )
}

export default ContractorTabs