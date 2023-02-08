import React, { useState } from 'react'
import { Link } from "react-router-dom";
import ic_bell from '../../../../assets/images/ic-bell.svg'
import NotificationsTab from './NotificationTab';
import AccessHistoryTab from './AccessHistoryTab';
import LogsTab from './LogsTab';
import { useSelector } from 'react-redux';

const NotificationPanel = () => {
    const [toggleState, setToggleState] = useState(1);

    const { user } = useSelector(state => state.authenticatioauthennSlice);
    const userType = user?.data?.userType?.name

    const toggleTab = (index) => {
        setToggleState(index);
    }

    return (
        <div className="userPanel">
            <div className='head'>
                <div className='headLeft'>
                    {/* {
                        userType == "EMPLOYEE" &&
                        <Link to="/dashboard/company">
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        </Link>
                    } */}
                    <h2 style={{ paddingLeft: userType != "EMPLOYEE" ? '2.5rem' : "" }}>NOTIFICATION PANEL</h2>
                </div>
                {
                    toggleState === 1 && userType == "EMPLOYEE" ?
                        <Link to="/dashboard/employee/company/create-notification">
                            <button
                                className='p-0'
                                style={{
                                    height: "38px",
                                    width: "233px",
                                    backgroundColor: "#65ABA0",
                                }}
                            // onClick={() => setShow(true)}
                            >
                                create notification
                                <img src={ic_bell} style={{ height: "16px" }} alt="ic_bell" />
                            </button>
                        </Link> : null
                }
            </div>
            <div className="mt-5">
                {
                    userType == "EMPLOYEE" &&
                    <div className="row steps-row justify-content-between m-0" style={{ borderBottom: "1px solid #146f62" }} id="pills-tab" role="tablist">
                        <div className="col-4 text-center p-0" role="presentation">
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
                        <div className="col-4 text-center p-0" role="presentation">
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
                        <div className="col-4 text-center p-0" role="presentation">
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
                }
                <div className="tab-content" id="pills-tabContent">
                    <div
                        className={`${toggleState === 1 ? 'tab-pane fade show active ' : 'tab-pane fade'}`}
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                    >
                        <NotificationsTab />
                    </div>
                    <div
                        className={`${toggleState === 2 ? 'tab-pane fade show active ' : 'tab-pane fade'}`}
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                    >
                        <AccessHistoryTab />
                    </div>

                    <div
                        className={`${toggleState === 3 ? 'tab-pane fade show active ' : 'tab-pane fade'}`}
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                    >
                        <LogsTab />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationPanel