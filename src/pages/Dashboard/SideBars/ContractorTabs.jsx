import React, { useState } from 'react'
import angelright_icon from "../../../assets/images/angelright.svg";
import SidebarDropDownOption from '../../../components/SidebarDropDownOption';
import { Link } from 'react-router-dom';
import ProfileDropDown from '../../Contractor/Profile/ProfileDropDown';
const ContractorTabs = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [changeStyle, setChangeStyle] = useState("contractors");


    return (
        <ul>
            <Link to='/dashboard/contractor/contracts'>
                <li
                    onClick={() => setChangeStyle("contractors")}
                    className={changeStyle === "contractors" ? "activeLi" : ""}
                >
                    <div>
                        <i className="fa fa-building-o" aria-hidden="true"></i>
                        <span className="ms-1 d-none d-sm-inline">contractors</span>
                    </div>
                    <img src={angelright_icon} alt="" />
                </li>
            </Link>
            <Link to='/dashboard/contractor/search-employe'>
                <li
                    onClick={() => setChangeStyle("employees")}
                    className={changeStyle === "employees" ? "activeLi" : ""}
                >
                    <div>
                        <i className="fa fa-file-text-o" aria-hidden="true"></i>
                        <span className="ms-1 d-none d-sm-inline">employees</span>
                    </div>
                    <img src={angelright_icon} alt="" />
                </li>
            </Link>
            <Link to='/dashboard/contractor/search-vehicle'>
                <li
                    onClick={() => setChangeStyle("vehicles")}
                    className={changeStyle === "vehicles" ? "activeLi" : ""}
                >
                    <div>
                        <i className="fa fa-file-o" aria-hidden="true"></i>
                        <span className="ms-1 d-none d-sm-inline">vehicles</span>
                    </div>
                    <img src={angelright_icon} alt="angelright_icon" />
                </li>
            </Link>
            <Link to='#'>
                <li onClick={() => { setIsOpen(!isOpen) }}>
                    <ProfileDropDown />
                </li>
            </Link>
        </ul>
    )
}

export default ContractorTabs