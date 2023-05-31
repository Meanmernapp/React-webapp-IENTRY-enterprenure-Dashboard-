
import sideLogoL from '../../assets/logo/ientry-corporate-large-logo.svg';
import sideLogoS from '../../assets/logo/logo-ientry.svg';
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
import BootstrapTooltip from '../../utils/BootstrapTooltip';



const SideBar = ({ isMenuOpen, setIsMenuOpen }) => {
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
        <div className='sidebar'
            style={{ width: isMenuOpen ? "13.5rem" : "3.15rem" }}
        >



            <div className="sideTabs"
            // style={{
            //     borderRadius: lCode === "ar" ? "85px 0 0 0" : "0 85px 0 0"
            // }}

            >
                <div className='logo_sidebar'>
                    <Link to="/login-option">
                        {
                            isMenuOpen ?
                                <img src={sideLogoL} className="sideLogoL"

                                    style={{
                                        transform: lCode === "ar" ? "scaleX(-1)" : ""
                                    }} alt="sidelogo" />
                                :
                                <img src={sideLogoS} className="sideLogoS" style={{
                                    transform: lCode === "ar" ? "scaleX(-1)" : ""
                                }} alt="sidelogo" />
                        }

                    </Link>
                </div>
                <div className='Change_menu_style'

                >
                    {
                        isMenuOpen === false &&
                        <BootstrapTooltip title={!isMenuOpen ? t('expand_bar') : ""} placement="right">
                            <i className="fa fa-angle-double-right" aria-hidden="true" onClick={() => setIsMenuOpen(true)}></i>
                        </BootstrapTooltip>

                    }
                    {
                        isMenuOpen === true &&
                        <BootstrapTooltip title={isMenuOpen ? t('collapse_bar') : ""} placement="right">
                        <i className="fa fa-angle-double-left" aria-hidden="true"
                            style={{
                                position: 'absolute',
                                top: "26px",
                                right: "24px"

                            }}
                            onClick={() => setIsMenuOpen(false)}
                        ></i>
                        </BootstrapTooltip>
                    }
                </div>
                {userType === "EMPLOYEE" && <EmployeeTabs isMenuOpen={isMenuOpen}/>}
                {userType === "SUPPLIER_IN_CHARGE" && <ProviderTabs  isMenuOpen={isMenuOpen}/>}
                {userType === "CONTRACTOR_IN_CHARGE" && <ContractorTabs  isMenuOpen={isMenuOpen}/>}
                {/* <div className="sideBarFooter">
                    <p>{t("all_rights_reserved")}</p>
                    <p> Corporate@ 2022</p>
                </div> */}
            </div>
        </div >
    )
}
export default SideBar;

