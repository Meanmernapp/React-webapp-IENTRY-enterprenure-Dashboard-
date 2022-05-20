import React, { useState } from 'react'
import { Link } from "react-router-dom";
import search from '../../../assets/images/search.svg'
import packageImg from '../../../assets/images/package.png'
import meetingIcon from '../../../assets/images/meetingIcon.svg'
import icpassword from '../../../assets/images/ic-password.svg'
import icRightArrow from '../../../assets/images/ic-right-arrow.svg'
import ic_movbile_notification from '../../../assets/images/ic_movbile_notification.svg'
import ic_pc from '../../../assets/images/ic-pc.svg'
import user_circle_solid from '../../../assets/images/user-circle-solid.svg'
import car_icon from '../../../assets/images/car_icon.svg'
import { TablePagination } from '@mui/material';

const NotificationPanel = () => {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    }

    return (
        <div className="rolesPanel">
            <div className='head'>
                <div className='headLeft'>
                    <Link to="/dashboard/company">
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </Link>
                    <h2>Notification Panel</h2>
                </div>
                <div className="row employe-log-module">
                    <div className="col-6 employee-module">Export to excel</div>
                    <div className="col-4 log-module">create notification</div>
                </div>
            </div>

            {/* portfolio-grid */}
            <div className="container mt-5">
                <div className="row steps-row justify-content-between mb-3" id="pills-tab" role="tablist">
                    <div className="col-4 text-center" role="presentation">
                        <a
                            className={`steps btn ${toggleState === 1 ? 'btn-bordered' : ''}`}
                            onClick={() => toggleTab(1)}
                            id="pills-home-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-home"
                            type="button"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                        >
                            <span>Notifications</span>
                        </a>
                    </div>
                    <div className="col-4 text-center" role="presentation">
                        <a
                            className={`steps btn ${toggleState === 2 ? 'btn-bordered' : ''}`}
                            onClick={() => toggleTab(2)}
                            id="pills-home-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-home"
                            type="button"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                        >
                            <span>Access History</span>
                        </a>
                    </div>
                    <div className="col-4 text-center" role="presentation">
                        <a
                            className={`steps btn ${toggleState === 3 ? 'btn-bordered' : ''}`}
                            onClick={() => toggleTab(3)}
                            id="pills-home-tab"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-home"
                            type="button"
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                        >
                            <span>Logs</span>
                        </a>
                    </div>

                </div>
                <div className="tab-content" id="pills-tabContent">
                    <div className={`${toggleState === 1 ? 'tab-pane fade show active ' : 'tab-pane fade'}`} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className="col-8 mx-auto notifications">
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'><img src={packageImg} alt="package" /> Package</p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>provider Arrrived</p>
                                <p className='P4'>Your package is in the lobby.</p>
                            </div>
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'><img src={meetingIcon} alt="package" /> Meeting</p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>Guest Arrrived</p>
                                <p className='P4'>Your guest is in the main meeting room.</p>
                                <p className='P5'>Date Meeting: 28-04-2021 12:00 P.M.</p>
                            </div>
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'><img src={meetingIcon} alt="package" /> Meeting</p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>Guest Arrrived</p>
                                <p className='P4'>Your guest is in the main meeting room.</p>
                                <p className='P5'>Date Meeting: 28-04-2021 12:00 P.M.</p>
                            </div>
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'><img src={packageImg} alt="package" /> Package</p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>provider Arrrived</p>
                                <p className='P4'>Your package is in the lobby.</p>
                            </div>
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'><img src={meetingIcon} alt="package" /> Meeting</p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>Guest Arrrived</p>
                                <p className='P4'>Your guest is in the main meeting room.</p>
                                <p className='P5'>Date Meeting: 28-04-2021 12:00 P.M.</p>
                            </div>
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'><img src={meetingIcon} alt="package" /> Meeting</p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>Guest Arrrived</p>
                                <p className='P4'>Your guest is in the main meeting room.</p>
                                <p className='P5'>Date Meeting: 28-04-2021 12:00 P.M.</p>
                            </div>
                            <div>
                                <TablePagination
                                    component="div"
                                    // count={employeeData?.totalElements}
                                    // page="0"
                                    // onPageChange={handleChangePage}
                                    labelRowsPerPage="Notifications per page"
                                // rowsPerPage={rowsPerPage}
                                // onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`${toggleState === 2 ? 'tab-pane fade show active ' : 'tab-pane fade'}`} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <div className="col-8 mx-auto notifications">
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'>
                                        <img className='main-arrowleft' src={icpassword} alt="package" />
                                        Entry
                                        <img className='main-arrowRight' src={icRightArrow} alt="package" />
                                    </p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>Zone: Meeting Access</p>
                                <p className='P4'>Access with fingerprint {"->"} Successfully</p>
                            </div>
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'>
                                        <img className='main-arrowleft' src={ic_movbile_notification} alt="package" />
                                        Entry
                                        <img className='main-arrowRight' src={icRightArrow} alt="package" />
                                    </p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>Zone: Boss Room</p>
                                <p className='P4' style={{ color: "#BC0000" }}>Access with face recognition {"->"} Failed.</p>
                            </div>
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'>
                                        <img className='main-arrowleft' src={ic_pc} alt="package" />
                                        Exit
                                        <img className='main-arrowRight' src={icRightArrow} alt="package" />
                                    </p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>Zone: Meeting Access</p>
                                <p className='P4'>Access with NFC {"->"} Successfully</p>
                            </div>
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'>
                                        <img className='main-arrowleft' src={icpassword} alt="package" />
                                        Entry
                                        <img className='main-arrowRight' src={icRightArrow} alt="package" />
                                    </p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>Zone: Meeting Access</p>
                                <p className='P4'>Access with fingerprint {"->"} Successfully</p>
                            </div>
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'>
                                        <img className='main-arrowleft' src={icpassword} alt="package" />
                                        Entry
                                        <img className='main-arrowRight' src={icRightArrow} alt="package" />
                                    </p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>Zone: Meeting Access</p>
                                <p className='P4'>Access with fingerprint {"->"} Successfully</p>
                            </div>
                            <div>
                                <TablePagination
                                    component="div"
                                    // count={employeeData?.totalElements}
                                    // page="0"
                                    // onPageChange={handleChangePage}
                                    labelRowsPerPage="Notifications per page"
                                // rowsPerPage={rowsPerPage}
                                // onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={`${toggleState === 3 ? 'tab-pane fade show active ' : 'tab-pane fade'}`} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className="col-8 mx-auto notifications">
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'><img src={user_circle_solid} alt="package" style={{ backgroundColor: "#178A7B", borderRadius: "50%" }} /> Update</p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>USER: Luis Enrique Cornejo Arreola</p>
                                <p className='P4'>Update a user</p>
                            </div>
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'><img src={car_icon} alt="package" /> Create</p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>USER: Luis Enrique Cornejo Arreola</p>
                                <p className='P4'>Create an event</p>
                            </div>
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'><img src={meetingIcon} alt="package" /> Delete</p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>ZONE: Meeting access</p>
                                <p className='P4'>Delete an invitation</p>
                            </div>
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'><img src={user_circle_solid} alt="package" style={{ backgroundColor: "#178A7B", borderRadius: "50%" }}/> Update</p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>ZONE: Boss room</p>
                                <p className='P4'>Update a event</p>
                            </div>
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'><img src={meetingIcon} alt="package" /> Create</p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>ZONE: Boss room</p>
                                <p className='P4'>Create a user</p>
                            </div>
                            <div className='notificationBox'>
                                <div className='notificationBox-main'>
                                    <p className='P1'><img src={meetingIcon} alt="package" /> Delete</p>
                                    <p className='P2'>Friday 24 de April 2021</p>
                                </div>
                                <p className='P3'>ZONE: Boss room</p>
                                <p className='P4'>Delete a car</p>
                            </div>
                            <div>
                                <TablePagination
                                    component="div"
                                    // count={employeeData?.totalElements}
                                    // page="0"
                                    // onPageChange={handleChangePage}
                                    labelRowsPerPage="Notifications per page"
                                // rowsPerPage={rowsPerPage}
                                // onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* contact-form */}
        </div>
    )
}

export default NotificationPanel