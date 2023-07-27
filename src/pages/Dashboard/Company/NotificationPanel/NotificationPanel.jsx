import React, { useState } from 'react'
import { Link } from "react-router-dom";
import ic_bell from '../../../../assets/images/ic-bell.svg'
import NotificationsTab from './NotificationTab';
import AccessHistoryTab from './AccessHistoryTab';
import LogsTab from './LogsTab';
import { useSelector } from 'react-redux';
import { t } from "i18next";
import DeleteVehicleModal from '../Vehicles/modal/DeleteVehicleModal';
import { useTranslation } from 'react-i18next';
import DeleteModal from '../../../Modals/DeleteModal';

const NotificationPanel = () => {
    // const [toggleState, setToggleState] = useState(1);
    const { t } = useTranslation();

    const { user } = useSelector(state => state.authenticatioauthennSlice);
    const notificationlist = useSelector(state => state?.NotificationsSlice?.getListNotifications);
    const userType = user?.data?.userType?.name

    const [selectAnnouncementForDelete, setSlectAnnouncementForDelete] = useState([])
    const [isAllChecked, setIsAllChecked] = useState(false)
    const [deleteAnnouncementShow, setDeleteAnnouncementShow] = useState(false)

    // const toggleTab = (index) => {
    //     setToggleState(index);
    // }

    // this function control select all id or unSelect all
    const handelDeleteAll = (e) => {
        setIsAllChecked(e.target.checked)
        if (e.target.checked) {
            const selectAllIds = notificationlist?.content?.map(item => {
                return item?.id
            })
            setSlectAnnouncementForDelete(selectAllIds)


        } else {
            setSlectAnnouncementForDelete([])
        }

    }
    // this function handle only specific id base on selection
    const handleCheckboxChange = (e) => {

        if (e.target.checked) {
            setSlectAnnouncementForDelete([...selectAnnouncementForDelete, e.target.id]);
        } else {
            setSlectAnnouncementForDelete(selectAnnouncementForDelete.filter((removeid) => removeid !== e.target.id));
        }
    };

    return (
        <>
            <div className="userPanel">
                <div className='head'>
                    <div className='headLeft'>

                        <h2 
                        // style={{ paddingLeft: userType != "EMPLOYEE" ? '2.5rem' : "" }}
                        >{t("announcements")}</h2>
                    </div>
                    <div className='d-flex gap-3'>
                        {
                            // toggleState === 1 && 
                            userType == "EMPLOYEE" &&
                            <Link to="/dashboard/employee/company/create-announcement">
                                <button
                                    className='add-btn-1'
                                >
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                    {t("add")}
                                </button>
                            </Link>
                        }

                        <button className="delete-btn-1"
                            disabled={selectAnnouncementForDelete?.length === 0}
                            onClick={() => {
                                setDeleteAnnouncementShow(true)
                            }}

                        >
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                            {t('delete')}
                        </button>

                    </div>
                </div>
                <div className="d-flex gap-1 pl-2">
                    <input type="checkbox" className="checkbox"
                        checked={isAllChecked}
                        onChange={handelDeleteAll}
                    />
                    <span className="text_size_12">de/select all</span>
                </div>
                <div className="mt-1">
                    {/* {
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
                                <span>{t("announcements")}</span>
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
                } */}
                    <div className="tab-content" id="pills-tabContent">
                        <div
                            // className={`${toggleState === 1 ? 'tab-pane fade show active ' : 'tab-pane fade'}`}
                            id="pills-home"
                            role="tabpanel"
                            aria-labelledby="pills-home-tab"
                        >
                            <NotificationsTab
                                // setSlectAnnouncementForDelete={setSlectAnnouncementForDelete}
                                selectAnnouncementForDelete={selectAnnouncementForDelete}
                                handleCheckboxChange={handleCheckboxChange}
                            />
                        </div>
                        {/* accss history tab */}
                        {/* <div
                        className={`${toggleState === 2 ? 'tab-pane fade show active ' : 'tab-pane fade'}`}
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                    >
                        <AccessHistoryTab />
                    </div> */}

                        {/* logs tab */}
                        {/* <div
                        className={`${toggleState === 3 ? 'tab-pane fade show active ' : 'tab-pane fade'}`}
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                    >
                        <LogsTab />
                    </div> */}
                    </div>
                </div>
            </div>
            <DeleteModal
                onHide={() => setDeleteAnnouncementShow(false)}
                show={deleteAnnouncementShow}
                data={selectAnnouncementForDelete}
                title_modal={"delete announcements"}
                element_modal={"announcements"}
    
                isReset={setSlectAnnouncementForDelete}
                isAllReset={setIsAllChecked}

            />
        </>
    )
}

export default NotificationPanel