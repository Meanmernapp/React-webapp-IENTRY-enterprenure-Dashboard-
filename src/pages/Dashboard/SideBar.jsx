
import sideLogo from '../../assets/images/assidebar_log.png';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EmployeeTabs from './SideBars/EmployeeTabs';
import ProviderTabs from './SideBars/ProviderTabs';
import ContractorTabs from './SideBars/ContractorTabs';
import { GetByUserId } from '../../reduxToolkit/Contractor/ContractorApi';
import { useDispatch, useSelector } from 'react-redux';
import { GetSingleProvider, GetSingleUserProvider } from '../../reduxToolkit/Providers/providersApi';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next';

const SideBar = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.authenticatioauthennSlice);
    const userType = user?.data?.userType?.name

    const [changeStyle, setChangeStyle] = useState(pathname.split("/")[2] ? pathname.split("/")[2] : "company");

    // useEffect(() => {
    //     setChangeStyle(pathname.split("/")[2]);
    //     dispatch(GetByUserId(user?.data?.id));
    //     dispatch(GetSingleUserProvider(user?.data?.id))
    // }, [])

    return (
        <div className='sidebar'>
            <Link to="/login-option">
                <img src={sideLogo} className="sideLogo" style={{
                    transform: lCode === "ar" ? "scaleX(-1)" : ""
                }} alt="sidelogo" />
            </Link>

            <div className="sideTabs" style={{
                borderRadius: lCode === "ar" ? "85px 0 0 0" : "0 85px 0 0"
            }}>
                {userType === "EMPLOYEE" && <EmployeeTabs />}
                {userType === "PROVIDER_IN_CHARGE" && <ProviderTabs />}
                {userType === "CONTRACTOR_IN_CHARGE" && <ContractorTabs />}
                <div className="sideBarFooter">
                    <p>{t("all_rights_reserved")}</p>
                    <p> Corporate@ 2022</p>
                </div>
            </div>
        </div >
    )
}
export default SideBar;

