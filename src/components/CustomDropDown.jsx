import React from 'react';
import threedotsicon from "../assets/images/threedotsicon.svg";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from 'react-router-dom';

import ic_edit_outline from '../assets/images/ic-edit-outline-1.svg'
import ic_table from '../assets/images/ic-table.svg'
import ic_list_detail from '../assets/images/ic-list-detail.svg'
import id_badge from '../assets/images/id-badge.svg'
import vehicleDocPanel from '../assets/images/vehicleDocPanel.svg'
import handHoldingIcon from '../assets/images/handHoldingIcon.svg'
import heading_solid from '../assets/images/heading-solid.svg'
import { useTranslation } from 'react-i18next';
import Cookies from "js-cookie";
import { permissionObj } from '../Helpers/permission';
import { useSelector } from 'react-redux';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
    return (
        <div
            ref={ref}
            onClick={e => {
                // e.preventDefault();
                onClick(e);
            }}
        >
            {children}
            <img
                src={threedotsicon}
                className="img-fluid threedotsicon"
                alt="threedotsicon"
            />
        </div>
    )
}
);


const CustomDropDown = () => {

    const { permission } = useSelector(state => state.authenticatioauthennSlice);

    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} />
            <Dropdown.Menu size="sm" title="go to details">
                {permission?.includes(permissionObj?.WEB_COMPANY_UPDATE) &&
                    <Link to='/dashboard/employee/company/update-data'>
                        <div className='dropdownDiv' style={{
                            flexDirection: lCode === "ar" ? "row-reverse" : ""
                        }}>
                            <img src={ic_edit_outline} alt="images" />
                            <span>{t('update_data')}</span>
                        </div>
                    </Link>
                }
                {permission?.includes(permissionObj?.WEB_WORK_SHIFT_MENU) &&
                    <Link to='/dashboard/employee/company/workshift-panel'>
                        <div className='dropdownDiv' style={{
                            flexDirection: lCode === "ar" ? "row-reverse" : ""
                        }}>
                            <img src={ic_table} alt="images" />
                            <span>{t('work_shift_panel')}</span>
                        </div>
                    </Link>
                }
                {permission?.includes(permissionObj?.WEB_EMPLOYEE_DOCUMENT_MENU || permissionObj?.WEB_EXTERNAL_DOCUMENT_MENU) &&
                    <Link to='/dashboard/employee/company/user-doc-panel'>
                        <div className='dropdownDiv' style={{
                            flexDirection: lCode === "ar" ? "row-reverse" : ""
                        }}>
                            <img src={ic_list_detail} alt="images" />
                            <span>{t('user_doc_panel')}</span>
                        </div>
                    </Link>
                }
                {permission?.includes(permissionObj?.WEB_ROLE_MENU) &&
                    <Link to='/dashboard/employee/company/roles-panel'>
                        <div className='dropdownDiv' style={{
                            flexDirection: lCode === "ar" ? "row-reverse" : ""
                        }}>
                            <img src={id_badge} alt="images" />
                            <span>{t('roles_task_panel')}</span>
                        </div>
                    </Link>
                }
                {permission?.includes(permissionObj?.WEB_EXTERNAL_VEHICLE_DOCUMENT_MENU) &&
                    <Link to='/dashboard/employee/company/vehicle-doc-panel'>
                        <div className='dropdownDiv' style={{
                            flexDirection: lCode === "ar" ? "row-reverse" : ""
                        }}>
                            <img src={vehicleDocPanel} alt="images" />
                            <span>{t('vehicle_doc_panel')}</span>
                        </div>
                    </Link>
                }
                {permission?.includes(permissionObj?.WEB_EMAIL_SETTINGS_MENU) &&
                    <Link to='/dashboard/employee/payroll/email-setting'>
                        <div className='dropdownDiv' style={{
                            flexDirection: lCode === "ar" ? "row-reverse" : ""
                        }}>
                            {/* <img src={vehicleDocPanel} alt="images" /> */}
                            <i className="fa fa-envelope-o" aria-hidden="true"></i>
                            <span>{t('email_settings')}</span>
                        </div>
                    </Link>
                }
                {permission?.includes(permissionObj?.WEB_ONBOARDING_MENU) &&
                    <Link to='/dashboard/employee/company/onboarding'>
                        <div className='dropdownDiv' style={{
                            flexDirection: lCode === "ar" ? "row-reverse" : ""
                        }}>
                            <img src={handHoldingIcon} alt="images" />
                            {/* <i className="fa fa-envelope-o" aria-hidden="true"></i> */}
                            <span>{t('On_boarging')}</span>
                        </div>
                    </Link>
                }
                {permission?.includes(permissionObj?.WEB_ONBOARDING_MENU) &&
                    <Link to='/dashboard/employee/company/headers'>
                        <div className='dropdownDiv' style={{
                            flexDirection: lCode === "ar" ? "row-reverse" : ""
                        }}>
                            <img src={heading_solid} alt="images" />
                            {/* <i className="fa fa-envelope-o" aria-hidden="true"></i> */}
                            <span>{t('manage_headers')}</span>
                        </div>
                    </Link>
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CustomDropDown