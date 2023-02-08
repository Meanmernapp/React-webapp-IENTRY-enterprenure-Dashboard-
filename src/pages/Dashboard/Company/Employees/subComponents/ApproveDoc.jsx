import React from 'react';
import threedotsicon from "../../../../../assets/images/threedotsicon.svg";
import icCheck from "../../../../../assets/images/ic-check.svg";
import icCancel from "../../../../../assets/images/ic-cancel.svg";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from 'react-redux';
import { approveDocs, documentListing } from '../../../../../reduxToolkit/CompanyEmployees/CompanyEmployeesApi';

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
                style={{
                    transform: "rotate(270deg)",
                    cursor: "pointer"
                }}
                alt="threedotsicon"
            />
        </div>
    )
});


const ApproveDoc = ({ documentvalue }) => {
    const dispatch = useDispatch();
    const singleEmployeeDetail = useSelector(state => state?.CompanyEmployeesSlice?.singleEmployeeDetail);


    const handleApproDoc = (isValid) => {
        const body = {
            "comments": isValid ? "approved doc" : "No approved doc",
            "id": documentvalue?.id,
            "validated": isValid
        }
        dispatch(approveDocs(body)).then(() => {
            dispatch(documentListing(singleEmployeeDetail?.user?.id));
        })
    }

    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} />
            <Dropdown.Menu
                size="sm"
                style={{
                    padding: '5px 10px',
                    fontSize: "12px",
                    width: "200px"
                }}
            >
                <div
                    className='d-flex justify-content-between align-items-center mb-1'
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={() => handleApproDoc(true)}
                >
                    <span>Approve document</span>
                    <img src={icCheck} alt="icCheck" style={{ width: "10px", height: "10px" }} />
                </div>
                <div
                    className='d-flex justify-content-between align-items-center'
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={() => handleApproDoc(false)}
                >
                    <span>No Approve document</span>
                    <img src={icCancel} alt="icCancel" style={{ width: "10px", height: "10px" }} />
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ApproveDoc