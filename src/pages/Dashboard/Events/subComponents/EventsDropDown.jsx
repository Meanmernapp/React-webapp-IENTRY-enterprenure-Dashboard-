import React, { useState } from "react";
import threedotsicon from "../../../../assets/images/elipse.png";
import Dropdown from "react-bootstrap/Dropdown";
import listIcon from "../../../../assets/images/viewDetails.png"
import fileIcon from "../../../../assets/images/saveFile.png"
import { useNavigate } from 'react-router-dom';
import AllowDenyModal from "./AllowDenyModal";
import { useDispatch, useSelector } from "react-redux";
import CancelEventModal from "../CancelEventModal";
import cryptoJs from 'crypto-js';
import { downloadOnuFile, getEventDetail } from "../../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi";
import { URL } from "../../../../Apis/Constants";
import securekey from "../../../../config";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
    // console.log(children?._owner?.memoizedProps?.event?.id)
    // const dispatch = useDispatch();
    // let childId = children?._owner?.memoizedProps?.event?.id

    return (
        <div
            ref={ref}
            onClick={(e) => {
                onClick(e);
                // dispatch(getEventDetail(childId));
            }}
        >
            {children}
            <img
                src={threedotsicon}
                className="img-fluid providerThreeDots"
                alt="threedotsicon"
            />
        </div>
    );
});

const EventDropDown = ({ dropDownProps, event }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const companyRestrictionsData = useSelector(state => state?.EmployeeEventsSlice?.companyRestrictionsData);
    const token = sessionStorage.getItem('bearerToken');
    const bytes = cryptoJs.AES.decrypt(token, securekey)
    const bearerToken = bytes.toString(cryptoJs.enc.Utf8);


    const [show, setShow] = useState(false);
    const [cancelshow, setCancelShow] = useState(false);
    const handleDownload = () => {
        // dispatch(downloadOnuFile(event?.id))
        fetch(`${URL}file-service/download-report-onu/${event?.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
                "Authorization": `Bearer ${bearerToken}`,
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    "report.pdf",
                );
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            });
    }

    const handleViewDetails = () => {
        navigate(companyRestrictionsData?.isOnuEvent ?
            `/dashboard/employee/events/incomming-envent-detail/${event?.id}` :
            `/dashboard/employee/events/validation-envent-detail/${event?.id}`
        )
    }

    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle} >
                <Dropdown.Menu size="sm" title="go to details">
                    {
                        companyRestrictionsData?.isOnuEvent && dropDownProps.panel !== 'records' ?
                            <div className="dropdownDiv" style={{ cursor: 'pointer' }}>
                                <img src={fileIcon} alt="fileIcon" />
                                <span onClick={handleDownload}>
                                    {dropDownProps.firstItem}
                                </span>
                            </div> : null
                    }
                    <div className="dropdownDiv" style={{ cursor: 'pointer' }}>
                        <img src={listIcon} alt="viewDetails" />
                        <span
                            onClick={handleViewDetails}
                        >
                            {dropDownProps.secondItem}
                        </span>
                    </div>
                    {
                        event?.status.name !== "EVENT_CANCEL" && dropDownProps.panel === 'incoming' || dropDownProps.panel === 'valication' ?
                            <div className="dropdownDiv" style={{ cursor: 'pointer' }}>
                                <img src={fileIcon} alt="fileIcon" />
                                <span onClick={() => setCancelShow(true)}>
                                    {dropDownProps.thirdItem}
                                </span>
                            </div> : null
                    }
                    {
                        dropDownProps.panel === 'valication' ?
                            <div className="dropdownDiv" style={{ cursor: 'pointer' }}>
                                <img src={fileIcon} alt="fileIcon" />
                                <span onClick={() => setShow(true)}>
                                    {dropDownProps.fourthItem}
                                </span>
                            </div> : null
                    }
                    <AllowDenyModal
                        event={event}
                        show={show}
                        onHide={() => setShow(false)}
                    />
                    <CancelEventModal
                        eventid={event?.id}
                        show={cancelshow}
                        onHide={() => setCancelShow(false)}
                    />
                </Dropdown.Menu>
            </Dropdown.Toggle>
        </Dropdown>
    );
};

export default EventDropDown;
