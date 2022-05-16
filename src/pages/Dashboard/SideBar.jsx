
import sideLogo from '../../assets/images/assidebar_log.png';
import angelright_icon from "../../assets/images/angelright.svg";
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SideBar = () => {
    const { pathname } = useLocation();
    const [changeStyle, setChangeStyle] = useState(pathname.split("/")[2] ? pathname.split("/")[2] : "company");

    useEffect(() => {
        setChangeStyle(pathname.split("/")[2])
    }, [pathname])


    return (
        <div className='sidebar'>
            <img src={sideLogo} className="sideLogo" alt="sidelogo" />
            <div className="sideTabs">
                <ul>
                    <Link to='/dashboard/company'>
                        <li
                            onClick={() => setChangeStyle("company")}
                            className={changeStyle === "company" ? "activeLi" : ""}
                        >
                            <div>
                                <i className="fa fa-building-o" aria-hidden="true"></i>
                                <span className="ms-1 d-none d-sm-inline">company</span>
                            </div>
                            <img src={angelright_icon} alt="" />
                        </li>
                    </Link>
                    <Link to='/dashboard/zones'>
                        <li
                            onClick={() => setChangeStyle("zones")}
                            className={changeStyle === "zones" ? "activeLi" : ""}
                        >
                            <div>
                                <i className="fa fa-circle-o-notch" aria-hidden="true"></i>
                                <span className="ms-1 d-none d-sm-inline">zones</span>
                            </div>
                            <img src={angelright_icon} alt="" />
                        </li>
                    </Link>
                    <Link to='/dashboard/events-panel/events'>
                        <li>
                            <div>
                                <i className="fa fa-calendar" aria-hidden="true"></i>
                                <span className="ms-1 d-none d-sm-inline">EVENTS</span>
                            </div>
                            <img src={angelright_icon} alt="" />
                        </li>
                    </Link>
                    <Link to='/dashboard/contractors-outlet'>
                        <li>
                            <div>
                                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                                <span className="ms-1 d-none d-sm-inline">CONTRACTORS</span>
                            </div>
                            <img src={angelright_icon} alt="" />
                        </li>
                    </Link>
                    <Link to='/dashboard/providers-outlet'>
                        <li>
                            <div>
                                <i className="fa fa-file-o" aria-hidden="true"></i>
                                <span className="ms-1 d-none d-sm-inline">PROVIDERS</span>
                            </div>
                            <img src={angelright_icon} alt="" />
                        </li>
                    </Link>
                    <Link to='/dashboard/go'>
                        <li>
                            <div>
                                <i className="fa fa-user-circle" aria-hidden="true"></i>
                                <span className="ms-1 d-none d-sm-inline" style={{ textTransform: "capitalize" }}>
                                    Luis Enrique Corn...
                                </span>
                            </div>
                            <img src={angelright_icon} alt="" />
                        </li>
                    </Link>
                </ul>
                <div className="sideBarFooter fixed-bottom">
                    <p>ALL RIGHTS RESERVED iEntry</p>
                    <p> Corporate@ 2021</p>
                </div>
            </div>
        </div >
    )
}
export default SideBar;