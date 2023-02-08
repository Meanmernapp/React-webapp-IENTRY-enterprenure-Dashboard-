import React, { useEffect, useState } from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import contact_img from '../assets/images/id-badge.svg'
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../Apis/Authentication';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import green_profile from "../assets/images/green-profile.PNG";
import LanguageSelector from './LanguageSelector';
import languageIcon from '../assets/images/ic-language-black.svg'
import { Translate } from '@mui/icons-material';
import uaeFlag from '../assets/images/uaeFlag.png';
import englishFlag from '../assets/images/english.png'
import spanishFlag from '../assets/images/spanish.png'
import franceFlag from '../assets/images/france.png'
import i18next from 'i18next'
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

const SidebarDropDownOption = ({ changestyle, hovereffect }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.authenticatioauthennSlice);
    const userType = user?.data?.userType?.name


    const languages = [
        {
            id: 1,
            name: "English",
            code: "en",
            flag: englishFlag,
        },
        {
            id: 2,
            name: "Spanish",
            code: "sp",
            flag: spanishFlag,
        },
        {
            id: 3,
            name: "French",
            code: "fr",
            flag: franceFlag,
        },
        {
            id: 4,
            name: "Arabic",
            dir: "rtl",
            code: "ar",
            flag: uaeFlag,
        },
    ];

    const currentLanguageCode = Cookies.get("i18next") || "en";
    const [currentLanguage, setCurrentLanguage] = useState({});
    const { t } = useTranslation();

    useEffect(() => {
        setCurrentLanguage(languages.find((l) => l.code === currentLanguageCode))
        document.body.dir = currentLanguage?.dir || "ltr";
        document.body.style.textAlign = currentLanguageCode === "ar" ? "right" : "left";
        document.title = t("app_title");

        // const root = document.documentElement;
        // root?.style.setProperty(
        //     "--text-align",
        //     currentLanguageCode === "ar" ? "right" : "left",
        // );
        // root?.style.setProperty(
        //     "--right",
        //     currentLanguageCode === "ar" ? "1.75rem !important" : "0",
        // );
        // root?.style.setProperty(
        //     "--left",
        //     currentLanguageCode === "ar" ? "inherit" : "0",
        // );
        // root?.style.setProperty(
        //     "--transform-origin",
        //     currentLanguageCode === "ar" ? "right !important" : "left",
        // );
    }, []);


    return (
        <>
            <Dropdown drop='end'>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{
                    width: "225px",
                    textAlign: currentLanguageCode === "ar" ? "right" : "left"
                }} >
                    {
                        hovereffect === 9 && changestyle !== "profile" ?
                            <img src={green_profile} className="sidBarIcons" alt="green_profile" /> :
                            <i className="fa fa-user-circle sidBarIcons" aria-hidden="true"></i>
                    }
                    <span
                        // className="ms-1 d-none d-sm-inline"
                        style={{ textTransform: "capitalize", width: "100%" }}
                        className={changestyle === "profile" ? "activeLi" : hovereffect === 9 ? "hoverLi" : ""}
                    >
                        {`${user?.data?.name.slice(0, 15)}...`}
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="sidebar_option_container_side"


                >
                    <Dropdown.Item href="#/action-1">
                        <div className="sidebar_option_container_header">
                            <img src={contact_img} alt="contact_img" />
                            <div style={{ marginLeft: '0.5rem' }}>
                                <h6>{user?.data?.name}</h6>
                                <p>{user?.data?.userType?.name}</p>
                            </div>
                        </div>
                    </Dropdown.Item>
                    {
                        user?.data?.status?.id != 3 &&
                        <>

                            <Dropdown.Item href="#/action-2">
                                <Link to={userType === "EMPLOYEE" ? "/dashboard/employee/notification-panel" :
                                    "/dashboard/notification-panel"
                                }>
                                    <div className="sidebar_option_body_item">

                                        <p>NOTIFICATIONS</p>
                                        <NotificationsIcon />
                                    </div>
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-3">
                                <Link to={userType === "EMPLOYEE" ? "/dashboard/employee/profile" : "/dashboard/provider/profile"}>
                                    <div className="sidebar_option_body_item">
                                        <p>PROFILE</p>
                                        <PersonIcon />
                                    </div>
                                </Link>
                            </Dropdown.Item>
                        </>
                    }
                    <Dropdown.Item href="#/action-3">
                        <div className="sidebar_option_body_item" onClick={() => logoutUser(navigate, dispatch)}>
                            <p >LOG OUT</p>
                            <LogoutIcon />
                        </div>
                    </Dropdown.Item>

                    <div className="sidebar_option_body_item">
                        <LanguageSelector />
                    </div>
                </Dropdown.Menu>
            </Dropdown>
            {/* <div className="sidebar_option_container">
                <div className="sidebar_option_container_header">
                    <img src={contact_img} alt="contact_img" />
                    <div style={{ marginLeft: '0.5rem' }}>
                        <h6>Luis Enrique Cornejo Arreola</h6>
                        <p>Contador</p>
                    </div>
                </div>
                <div className="sidebar_option_body">
                    <div className="sidebar_option_body_item">
                        <Link to="/dashboard/employee/notification-panel">
                            <p>NOTIFICATIONS</p>
                        </Link>
                        <NotificationsIcon />
                    </div>
                    <div className="sidebar_option_body_item">
                        <Link to="/dashboard/profile_provider">
                            <p>PROFILE</p>
                        </Link>
                        <PersonIcon />
                    </div>
                    <div className="sidebar_option_body_item">
                        <p onClick={() => logoutUser(navigate)}>LOG OUT</p>
                        <LogoutIcon />
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default SidebarDropDownOption