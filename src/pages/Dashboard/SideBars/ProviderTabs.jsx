import React, { useEffect, useState } from 'react'
import angelright_icon from "../../../assets/images/angelright.svg";
import SidebarDropDownOption from '../../../components/SidebarDropDownOption';
import ic_people_group_solid from "../../../assets/images/ic-people-group-solid.svg";
import ic_truck from "../../../assets/images/ic-truck.svg";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserDocuments } from '../../../reduxToolkit/Providers/providersApi';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const ProviderTabs = () => {
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
                    <Link to='/dashboard/provider/orders'>
                        <li
                            onClick={() => setChangeStyle("orders")}
                            className={changeStyle === "orders" ? "activeLi" : isHovering === 1 ? "hoverLi" : ""}
                            onMouseEnter={() => setIsHovering(1)}
                            onMouseLeave={() => setIsHovering(0)}
                        >
                            <div>
                                <i class="fa fa-list" aria-hidden="true" style={{
                                    margin: "0 5px"
                                }}></i>
                                <span className="ms-1 d-none d-sm-inline">{t("orders")}</span>
                            </div>
                            <img src={angelright_icon} alt="" style={{
                                transform: lCode === "ar" ? "scaleX(-1)" : "",
                                margin: "0 10px"
                            }} />
                        </li>
                    </Link>
                    <Link to='/dashboard/provider/employees'>
                        <li
                            onClick={() => setChangeStyle("employees")}
                            className={changeStyle === "employees" ? "activeLi" : isHovering === 2 ? "hoverLi" : ""}
                            onMouseEnter={() => setIsHovering(2)}
                            onMouseLeave={() => setIsHovering(0)}
                        >
                            <div>
                                <img src={ic_people_group_solid} className="sidBarIcons" alt="ic_build" />
                                <span className="ms-1 d-none d-sm-inline">{t("employees")}</span>
                            </div>
                            <img src={angelright_icon} alt="" style={{
                                transform: lCode === "ar" ? "scaleX(-1)" : "",
                                margin: "0 10px"
                            }} />
                        </li>
                    </Link>
                    <Link to='/dashboard/provider/vehicles'>
                        <li
                            onClick={() => setChangeStyle("vehicles")}
                            className={changeStyle === "vehicles" ? "activeLi" : isHovering === 3 ? "hoverLi" : ""}
                            onMouseEnter={() => setIsHovering(3)}
                            onMouseLeave={() => setIsHovering(0)}
                        >
                            <div>
                                <img src={ic_truck} className="sidBarIcons" alt="ic_build" />
                                <span className="ms-1 d-none d-sm-inline">{t("vehicles")}</span>
                            </div>
                            <img src={angelright_icon} alt="" style={{
                                transform: lCode === "ar" ? "scaleX(-1)" : "",
                                margin: "0 10px"
                            }} />
                        </li>
                    </Link>
                </>
            }
            <Link to='#'>
                <li onClick={() => { setIsOpen(!isOpen) }}>
                    <SidebarDropDownOption />
                </li>
            </Link>
        </ul>
    )
}

export default ProviderTabs