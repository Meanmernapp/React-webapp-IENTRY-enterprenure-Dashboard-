import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import contact_img from '../../../assets/images/id-badge.svg'
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../Apis/Authentication';
import { Dropdown } from 'react-bootstrap';
import LanguageSelector from '../../../components/LanguageSelector';
import { t } from "i18next";

const ProfileDropDown = () => {
    const navigate = useNavigate();

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <i className="fa fa-user-circle" aria-hidden="true"></i>
                    <span className="ms-1 d-none d-sm-inline" style={{ textTransform: "capitalize" }}>
                        ar Luis Enrique Corn...
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="sidebar_option_container">
                    <Dropdown.Item href="#/action-1">
                        <div className="sidebar_option_container_header">
                            <img src={contact_img} alt="contact_img" />
                            <div style={{ marginLeft: '0.5rem' }}>
                                <h6>Luis Enrique Cornejo Arreola</h6>
                                <p>Contador</p>
                            </div>
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                        <div className="sidebar_option_body_item">
                            <Link to="/dashboard/announcement-panel">
                                <p>{t("announcements")}</p>
                            </Link>
                            <NotificationsIcon />
                        </div>
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                        <div className="sidebar_option_body_item">
                            <Link to="/dashboard/contractor/profile">
                                <p>PROFILE</p>
                            </Link>
                            <PersonIcon />
                        </div>
                    </Dropdown.Item>
                    <div className="sidebar_option_body_item">
                        <LanguageSelector />
                    </div>
                    <Dropdown.Item href="#/action-3">
                        <div className="sidebar_option_body_item">
                            <p onClick={() => logoutUser(navigate)}>LOG OUT</p>
                            <LogoutIcon />
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default ProfileDropDown