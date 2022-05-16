import React from 'react';
import threedotsicon from "../assets/images/threedotsicon.svg";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from 'react-router-dom';

import ic_edit_outline from '../assets/images/ic-edit-outline-1.svg'
import ic_table from '../assets/images/ic-table.svg'
import ic_list_detail from '../assets/images/ic-list-detail.svg'
import id_badge from '../assets/images/id-badge.svg'

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
    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} />
            <Dropdown.Menu size="sm" title="go to details">
                <Link to='/dashboard/company/update-data'>
                    <div className='dropdownDiv'>
                        <img src={ic_edit_outline} alt="images" />
                        <span>Update Data</span>
                    </div>
                </Link>
                <Link to='/dashboard/company/workshift-panel'>
                    <div className='dropdownDiv'>
                        <img src={ic_table} alt="images" />
                        <span>Work Shift Panel</span>
                    </div>
                </Link>
                <Link to='/dashboard/company/document-panel'>
                    <div className='dropdownDiv'>
                        <img src={ic_list_detail} alt="images" />
                        <span>Documents Panel</span>
                    </div>
                </Link>
                <Link to='/dashboard/company/roles-panel'>
                    <div className='dropdownDiv'>
                        <img src={id_badge} alt="images" />
                        <span>Roles - Task Panel</span>
                    </div>
                </Link>
                <Link to='/dashboard/zones'>
                    <div className='dropdownDiv'>
                        <img src={id_badge} alt="images" />
                        <span>Charts {"&"} Reports</span>
                    </div>
                </Link>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default CustomDropDown