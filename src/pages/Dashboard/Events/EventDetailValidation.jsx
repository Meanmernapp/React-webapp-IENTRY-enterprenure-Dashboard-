import React, { useEffect } from 'react'
import search from '../../../assets/images/search.svg'
import cross from '../../../assets/images/ic-cancel.svg'
import dash from '../../../assets/images/ic-minus.svg'
import tick from '../../../assets/images/ic-check.svg'
import deleteIcon from '../../../assets/images/ic-delete-red.svg'
import companyImg from '../../../assets/images/companyImg.png'
import CancelEventModal from './CancelEventModal';
import { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserInvitation, deleteVehicleInvitation, getEventDetail, getUserInvitations, getVehiclesInvitations } from '../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi';
import NoEvent from './NoEvent';
import { Modal } from 'react-bootstrap'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'


export const DeleteModal = (props) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleInvitation = () => {
        if (props.check === "invite") {
            dispatch(deleteUserInvitation(props?.inviteid)).then(() => {
                dispatch(getUserInvitations(id));
                props.onHide();
            });
        }
        if (props.check === "vehicle") {
            dispatch(deleteVehicleInvitation(props?.inviteid)).then(() => {
                console.log("vehicle")
                dispatch(getVehiclesInvitations(id));
                props.onHide();
            });
        }
    }
    return (
        <Modal
            className="filter_Event_model"
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='fiter_event_model_head'>
                <Modal.Title
                    style={{
                        width: "100%",
                        color: '#146F62',
                        fontSize: "16px",
                        fontWeight: "600",
                        textAlign: "center",
                        marginTop: "10px"
                    }}
                >
                    {t('remove_device')}
                </Modal.Title>
                <img
                    src={cross}
                    style={{
                        position: "absolute",
                        padding: "1px",
                        right: "3px",
                        width: "15px",
                        height: "15px",
                        top: "3px",
                        cursor: "pointer",
                    }}
                    onClick={() => props.onHide()}
                />
            </Modal.Header>
            <Modal.Body>
                <p style={{ fontSize: '14px', textAlign: 'center', paddingBottom: "1.5rem" }}>
                    If you want to remove the device, please confirm the action.
                </p>
                <div className="changeImgBottomDiv mt-3">
                    <button
                        className="changeImgCancelBtn"
                        style={{ fontSize: "12px" }}
                        onClick={() => props.onHide()}
                    >
                        {t('cancel')}
                    </button>
                    <button
                        className="changeImgChangeBtn"
                        style={{ fontSize: "12px" }}
                        onClick={handleInvitation}
                    >
                        {t('confirm')}
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

const EventDetailValidation = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    const { id } = useParams();
    const eventDetailData = useSelector(state => state?.EmployeeEventsSlice?.eventDetail);
    const userInvitationsData = useSelector(state => state?.EmployeeEventsSlice?.userInvitationsData);
    console.log(eventDetailData)

    const [showEvent, setShowEvent] = useState(false);
    const [invitationId, setInvitationId] = useState();
    const [deleteShow, setDeleteShow] = useState(false);
    const [addUserquery, setAddUserquery] = useState('');

    useEffect(() => {
        dispatch(getEventDetail(id));
        dispatch(getUserInvitations(id));
        dispatch(getVehiclesInvitations(id));
        // getComopanyRestructions(companyId).then(({ data: { data } }) => {
        //     setRestructions(data)
        // })
    }, [])

    const checkStatus = (name) => {
        if (name === "EVENT_IN_VALIDATION") {
            return "#0C4523"
        } else if (name === "EVENT_CANCEL") {
            return "red"
        }
    }

    return (
        <div className='EventValidationDeatil'>
            <div className="head">
                <div className='headLeft'>
                    <Link to="/dashboard/employee/events">
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </Link>
                    <h2>{t('event_detail')}</h2>
                </div>
                {
                    eventDetailData?.status?.name !== "EVENT_CANCEL" ?
                        <div className="d-flex">
                            <button
                                className='btn btn-primary'
                                style={{ marginRight: "0.5rem", background: '#e24c4b', border: 'none', }}
                                onClick={() => setShowEvent(true)}
                            >
                                {t('cancel_event')}
                                <i style={{ marginLeft: '0.5rem' }} class="fa fa-trash" aria-hidden="true"></i>
                            </button>
                        </div> : null
                }
                <CancelEventModal
                    eventid={id}
                    show={showEvent}
                    onHide={() => setShowEvent(false)}
                />
            </div>

            <div className='row' style={{ marginTop: '1.4rem' }}>
                <div className="col-md-8" >
                    <p style={{ color: '#146F62', fontSize: '20px', letterSpacing: '7px', fontWeight: "bold", }}>DETAILS</p>
                    <div style={{ boxShadow: '0px 0px 4px #000000B3', borderRadius: '8px', padding: "15px", marginTop: '1rem', position: "relative", height: "180px" }}>
                        <div>
                            <span
                                style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: '20px',
                                    fontSize: "12px",
                                    color: checkStatus(eventDetailData?.status?.name),
                                    fontWeight: "bold"
                                }}
                            >
                                {eventDetailData?.status?.name.replaceAll('_', ' ')}
                            </span>
                            <div
                                style={{
                                    width: "12px",
                                    height: '12px',
                                    backgroundColor: checkStatus(eventDetailData?.status?.name),
                                    borderRadius: '50%',
                                    position: "absolute",
                                    top: "8px",
                                    right: '5px'
                                }}
                            >
                            </div>
                        </div>

                        <div style={{ marginTop: '0.7rem' }}>
                            <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('event_name')}</h6>
                            <p style={{ color: '#707070', fontSize: "16px" }}>{eventDetailData?.name}</p>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div style={{ marginTop: '0.7rem' }}>
                                    <h6 style={{ color: '#707070', fontSize: "14px", fontWeight: "bold" }}>{t('date')}</h6>
                                    <p
                                        style={{
                                            color: '#707070',
                                            fontSize: "16px"
                                        }}
                                    >
                                        <span style={{ color: '#707070', fontSize: "14px", fontWeight: "bold", marginRight: "1rem" }}>{t('from')}</span>
                                        {new Date(eventDetailData?.startDate).toJSON()?.split("T")[0]}
                                        <span style={{ color: '#707070', fontSize: "14px", fontWeight: "bold", margin: "0 5px" }}>{t('at')}</span>
                                        {new Date(eventDetailData?.startDate).toJSON()?.split("T")[1].split(".")[0]}
                                    </p>
                                    <p
                                        style={{
                                            color: '#707070',
                                            fontSize: "16px"
                                        }}
                                    >
                                        <span style={{ color: '#707070', fontSize: "14px", fontWeight: "bold", marginRight: "1rem" }}>{t('from')}</span>
                                        {new Date(eventDetailData?.endDate).toJSON()?.split("T")[0]}
                                        <span style={{ color: '#707070', fontSize: "14px", fontWeight: "bold", margin: "0 5px" }}>{t('at')}</span>
                                        {new Date(eventDetailData?.endDate).toJSON()?.split("T")[1].split(".")[0]}
                                    </p>
                                </div>
                            </div>
                            <div className="col-6">
                                <div>
                                    <h6 style={{ color: '#707070', fontSize: "14px", fontWeight: "bold" }}>{t('host')}</h6>
                                    <p style={{ color: '#707070', fontSize: "16px" }}>{eventDetailData?.host?.name}</p>
                                </div>
                                <div>
                                    <h6 style={{ color: '#707070', fontSize: "14px", fontWeight: "bold" }}>{t('validated_by')}</h6>
                                    {
                                        eventDetailData?.status?.id !== 32 && eventDetailData?.validatedBy === null ?
                                            null :
                                            <p style={{ color: '#707070', fontSize: "16px" }}>
                                                {eventDetailData?.validatedBy === null ? "IN VALIDATION PROCESS" : eventDetailData?.validatedBy?.name}
                                            </p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* host */}
                <div className="col-md-4">
                    <p style={{ color: '#146F62', fontSize: '20px', letterSpacing: '7px', fontWeight: "bold" }}>{t('reservation')}</p>
                    <div style={{ boxShadow: '0px 0px 4px #000000B3', borderRadius: '8px', padding: "15px", marginTop: '1rem', position: "relative", height: "180px" }}>
                        <div style={{ marginTop: '0.7rem' }}>
                            <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('common_area')}</h6>
                            <p style={{ color: '#707070', fontSize: "16px" }}>{eventDetailData?.reservation?.zone?.name}</p>
                        </div>
                        <div style={{ marginTop: '0.7rem' }}>
                            <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('date')}</h6>
                            <p style={{ color: '#707070', fontSize: "16px" }}>
                                {new Date(eventDetailData?.reservation?.createdAt).toJSON()?.split("T")[0]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* invitaion */}
            <div style={{ marginTop: "1rem" }}>
                <p style={{ color: '#146F62', fontSize: '20px', letterSpacing: '7px', fontWeight: "bold", }}>{t('invitations')}</p>
                <div>
                    <p>Total <span style={{ color: '#263238', fontWeight: 'bold' }}>{userInvitationsData.length}</span></p>
                </div>
            </div>
            {/* listing */}
            <div style={{ marginBottom: "2rem" }}>
                {
                    userInvitationsData?.length !== 0 ?
                        <>
                            <div className="row employe-log-module" style={{ marginTop: '0.5rem' }}>
                                <div className="col-12">
                                    <input
                                        type="text"
                                        class="form-control"
                                        name="x"
                                        onChange={(e) => setAddUserquery(e.target.value)}

                                    />
                                    <span class="input-group-btn">
                                        <button
                                            class="btn btn-default"
                                            type="button"
                                        >
                                            <img src={search} alt="" />
                                        </button>
                                    </span>
                                </div>
                            </div>
                            {
                                userInvitationsData?.filter(user => {
                                    if (addUserquery === '') {
                                        return user;
                                    } else if (user?.guest?.name.toLowerCase().includes(addUserquery.toLowerCase())) {
                                        return user;
                                    }
                                })?.map(user => (
                                    <div style={{ boxShadow: "0px 0px 2px #000000B0", borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '.4rem 1rem', width: "350px", marginTop: '1rem' }}>
                                        <div style={{ display: "flex", alignItems: 'center' }}>
                                            <img src={companyImg} alt="" width="24px" height="24px" style={{ borderRadius: '50%' }} />
                                            <div style={{ marginLeft: "1rem", fontSize: '12px' }}>
                                                <p><span style={{ color: "#707070" }}>{t('name')}: </span> {user?.guest?.name}</p>
                                                <p><span style={{ color: "#707070" }}>{t('celular')}: </span>  {user?.guest?.phoneNumber}</p>
                                            </div>
                                        </div>
                                        <div>
                                            {
                                                user?.status?.id === 37 ? <img src={dash} alt="imgs" /> :
                                                    user?.status?.id === 38 ? <img src={tick} alt="imgs" /> :
                                                        user?.status?.id === 39 ? <img src={cross} alt="imgs" /> : null
                                            }
                                            <img
                                                src={deleteIcon}
                                                style={{ marginLeft: "2rem", cursor: "pointer" }}
                                                onClick={() => {
                                                    setInvitationId(user?.id);
                                                    setDeleteShow(true);
                                                }}
                                                alt="imgs"
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                        </> :
                        <NoEvent title="user Invitations" />
                }
            </div>
            <DeleteModal
                show={deleteShow}
                onHide={() => setDeleteShow(false)}
                inviteid={invitationId}
                check="invite"
            />
        </div>
    )
}

export default EventDetailValidation