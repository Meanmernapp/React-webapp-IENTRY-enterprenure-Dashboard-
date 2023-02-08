import React, { useEffect } from 'react'
import CancelEventModal from './CancelEventModal';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { Link, useParams } from 'react-router-dom';
import {
    deleteUserInvitation,
    downloadSignature,
    getEventDetail,
    getUserInvitations,
    getVehiclesInvitations
} from '../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi';
import NoEvent from './NoEvent';
import deleteIcon from '../../../assets/images/ic-delete-red.svg';
// import signatureimg from '../../../assets/images/as.jpg';
import checkTrue from '../../../assets/images/ic-check.svg';
import checkFalse from '../../../assets/images/ic-cancel.svg';
// import { getComopanyRestructions } from '../../../Apis/companydata';
import { URL } from '../../../Apis/Constants';
import { DeleteModal } from './EventDetailValidation';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { permissionObj } from '../../../Helpers/permission';
import cryptoJs from 'crypto-js';
import securekey from '../../../config';

const EventDetailIcomming = () => {

    const token = sessionStorage.getItem('bearerToken');
    const bytes = cryptoJs.AES.decrypt(token, securekey)
    const bearerToken = bytes.toString(cryptoJs.enc.Utf8);
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const { id } = useParams();
    // const companyId = "a6bd2887-0f4a-4e5f-b0b5-000d9817ab23";
    const dispatch = useDispatch();
    const incomingsData = useSelector(state => state?.EmployeeEventsSlice?.eventDetail);
    const userInvitationsData = useSelector(state => state?.EmployeeEventsSlice?.userInvitationsData);
    const vehiclesInvitationsData = useSelector(state => state?.EmployeeEventsSlice?.vehiclesInvitationsData);
    const companyRestrictionsData = useSelector(state => state?.EmployeeEventsSlice?.companyRestrictionsData);
    const { permission } = useSelector(state => state.authenticatioauthennSlice);
    // console.log(vehiclesInvitationsData)

    const [showEvent, setShowEvent] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    // const [restructions, setRestructions] = useState();


    useEffect(() => {
        dispatch(getEventDetail(id));
        dispatch(getUserInvitations(id));
        dispatch(getVehiclesInvitations(id));
        // dispatch(downloadSignature({
        //     id: id,
        //     option: "event"
        // }))
    }, [])

    const handlePdfDownload = () => {
        fetch(`${URL}file-service/download-report-onu/${id}`, {
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
                    `${incomingsData.path}`,
                );
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            });
    }
    const handleuserInviteDelete = (userinvitId) => {
        dispatch(deleteUserInvitation(userinvitId));
        dispatch(getUserInvitations(id));
    }

    const checkStatus = (name) => {
        if (name === "EVENT_IN_VALIDATION") {
            return "#0C4523"
        } else if (name === "EVENT_CANCEL") {
            return "red"
        }
    }

    return (
        <div className='EventIncomingDeatil'>
            <div className="head">
                <div className='headLeft'>
                    <Link to="/dashboard/employee/events">
                        <i className="fa fa-arrow-left" aria-hidden="true" style={{
                            transform: lCode === "ar" ? "scaleX(-1)" : "",
                            margin: "0 10px"
                        }}

                        ></i>
                    </Link>
                    <h2>{t('event_detail')}</h2>
                </div>
                <div className="d-flex">
                    {
                        companyRestrictionsData?.isOnuEvent ?
                            <button
                                className='btn btn-primary'
                                style={{ marginRight: "0.5rem", background: '#146F62', border: 'none' }}
                                onClick={handlePdfDownload}
                            >
                                {t('download_pdf')}
                                <i style={{ marginLeft: '0.5rem' }} class="fa fa-download" aria-hidden="true"></i>
                            </button> : null
                    }
                    {
                        incomingsData?.status?.id !== 31 && permission?.includes(permissionObj?.WEB_EVENT_DELETE) ?
                            <button
                                className='btn btn-primary'
                                style={{ marginRight: "0.5rem", background: '#e24c4b', border: 'none', }}
                                onClick={() => setShowEvent(true)}
                            >
                                {t('cancel_event')}
                                <i style={{ marginLeft: '0.5rem' }} class="fa fa-trash" aria-hidden="true"></i>
                            </button> : null
                    }
                    <CancelEventModal
                        eventid={id}
                        show={showEvent}
                        onHide={() => setShowEvent(false)}
                    />
                </div>
            </div>

            <div className='row' style={{ marginTop: '1.4rem' }}>
                <div className="col-md-8" >
                    <p style={{ color: '#146F62', fontSize: '20px', letterSpacing: '7px', fontWeight: "bold", }}>{t('details')}</p>
                    <div style={{ boxShadow: '0px 0px 4px #000000B3', borderRadius: '8px', padding: "15px", marginTop: '1rem', position: "relative" }}>
                        <div>
                            <span
                                style={{
                                    position: "absolute",
                                    top: "5px",
                                    right: '20px',
                                    fontSize: "12px",
                                    color: checkStatus(incomingsData?.status?.name),
                                    fontWeight: "bold"
                                }}
                            >
                                {incomingsData?.status?.name.replaceAll('_', ' ') ? incomingsData?.status?.name.replaceAll('_', ' ') : "-----"}
                            </span>
                            <div
                                style={{
                                    width: "12px",
                                    height: '12px',
                                    backgroundColor: checkStatus(incomingsData?.status?.name),
                                    borderRadius: '50%',
                                    position: "absolute",
                                    top: "8px",
                                    right: '5px'
                                }}
                            >
                            </div>
                        </div>

                        <div>
                            <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('name')}</h6>
                            <p style={{ color: '#707070', fontSize: "16px" }}>
                                {incomingsData?.user?.name ? incomingsData?.user?.name : "-----"}
                            </p>
                        </div>

                        <div>
                            <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('purpose_of_visit')}</h6>
                            <p style={{ color: '#707070', fontSize: "16px" }}>{incomingsData?.visitPurpose ? incomingsData?.visitPurpose : "-----"}</p>
                        </div>

                        <div>
                            <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('date')}</h6>
                            <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                <div>
                                    <p style={{ color: '#707070', fontSize: "16px" }}>{t('date')}</p>
                                    <p style={{ color: '#707070', fontSize: "16px" }}>{t('time')}</p>
                                    <p style={{ color: '#707070', fontSize: "16px" }}>{t('duration')}</p>
                                </div>
                                <div>
                                    <p style={{ color: '#707070', fontSize: "16px" }}>
                                        {new Date(incomingsData?.createdAt).toJSON()?.split("T")[0]}
                                    </p>
                                    <p style={{ color: '#707070', fontSize: "16px" }}>
                                        {new Date(incomingsData?.createdAt).toJSON()?.split("T")[1].split(".")[0]}
                                    </p>
                                    <p style={{ color: '#707070', fontSize: "16px" }}>{incomingsData?.duration}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('zone')}</h6>
                            <p style={{ color: '#707070', fontSize: "16px" }}>{incomingsData?.reservation?.zone?.name}</p>
                        </div>
                    </div>

                </div>
                {/* host */}
                <div className="col-md-4">
                    <p style={{ color: '#146F62', fontSize: '20px', letterSpacing: '7px', fontWeight: "bold" }}>HOST</p>

                    <div style={{ boxShadow: '0px 0px 4px #000000B3', borderRadius: '8px', padding: "15px", marginTop: '1rem', position: "relative" }}>


                        <div style={{ marginTop: '0.7rem' }}>
                            <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('name')}</h6>
                            <p style={{ color: '#707070', fontSize: "16px" }}>{incomingsData?.host?.name}</p>
                        </div>

                        <div style={{ marginTop: '0.7rem' }}>
                            <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('email')}</h6>
                            <p style={{ color: '#707070', fontSize: "16px" }}>{incomingsData?.host?.email}</p>
                        </div>



                        <div style={{ marginTop: '0.7rem' }}>
                            <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('unit_section')}</h6>
                            <p style={{ color: '#707070', fontSize: "16px" }}>{incomingsData?.unitSection}</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.8rem' }}>
                            <div>
                                <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('accompained')}</h6>
                                <p style={{ color: '#707070', fontSize: "16px" }}>{incomingsData?.accompanied}</p>
                            </div>
                            <div>
                                <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('organization')}</h6>
                                <p style={{ color: '#707070', fontSize: "16px" }}>{incomingsData?.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
                <div className="row">
                    <div className="col-md-5">
                        <p style={{ color: '#146F62', fontSize: '20px', letterSpacing: '7px', fontWeight: "bold", }}>{t('comments')}</p>
                        <div style={{ boxShadow: '0px 0px 4px #000000B3', borderRadius: '8px', padding: "15px", marginTop: '1rem', position: "relative", height: '146px' }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <div style={{ marginTop: '0.7rem' }}>
                                    <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('visitors_comments')}</h6>
                                    <p style={{ color: '#707070', fontSize: "16px" }}>
                                        {incomingsData?.visitorComment ? incomingsData?.visitorComment : "-----"}
                                    </p>
                                </div>
                                <div style={{ marginTop: '0.7rem' }}>
                                    <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('validations_comments')}</h6>
                                    <p style={{ color: '#707070', fontSize: "16px" }}>
                                        {incomingsData?.validationComment ? incomingsData?.validationComment : "-----"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        incomingsData?.validatedBy !== null ?
                            <div className="col-md-4">
                                <p style={{ color: '#146F62', fontSize: '20px', letterSpacing: '7px', fontWeight: "bold", }}>{t('validated_by')}</p>
                                <div style={{ boxShadow: '0px 0px 4px #000000B3', borderRadius: '8px', padding: "15px", marginTop: '1rem', position: "relative", height: '146px' }}>

                                    <div >
                                        <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('name')}</h6>
                                        <p style={{ color: '#707070', fontSize: "16px" }}>
                                            {incomingsData?.validatedBy?.name ? incomingsData?.validatedBy?.name : "-----"}
                                        </p>
                                    </div>
                                    <div >
                                        <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('phone_number')}</h6>
                                        <p style={{ color: '#707070', fontSize: "16px" }}>
                                            {incomingsData?.validatedBy?.phoneNumber ? incomingsData?.validatedBy?.phoneNumber : "-----"}
                                        </p>
                                    </div>
                                    <div >
                                        <h6 style={{ color: '#707070', fontSize: "15px", fontWeight: "bold" }}>{t('action')}</h6>
                                        <p style={{ color: '#707070', fontSize: "16px" }}>
                                            {incomingsData?.validatedBy?.status?.name ? incomingsData?.validatedBy?.status?.name.replaceAll('_', ' ') : "-----"}
                                        </p>
                                    </div>
                                </div>
                            </div> : null
                    }
                    <div className="col-md-3">
                        <p style={{ color: '#146F62', fontSize: '20px', letterSpacing: '7px', fontWeight: "bold", }}>{t('signature')}</p>
                        <img
                            src={`data:${incomingsData?.path};base64,${incomingsData?.image}`}
                            style={{
                                width: "100%",
                                height: "9rem",
                                marginTop: "1rem",
                                borderRadius: "8px"
                            }}
                            alt="No Signature"
                        />
                    </div>
                </div>
            </div>
            {/* visitor */}

            <div style={{ marginTop: '1rem' }}>
                <p style={{ color: '#146F62', fontSize: '20px', letterSpacing: '7px', fontWeight: "bold", }}>{t('visitor')}</p>
                <div className='remove_filter_visitor'>
                    {
                        userInvitationsData?.length !== 0 ?
                            <div className="eventTables onuVistor" style={{ height: "15rem" }}>
                                <table style={{ width: "100%" }}>
                                    <thead>
                                        <th className='first-head'>{t('name')}</th>
                                        <th>{t('phone_number')}</th>
                                        <th>{t('role')}</th>
                                        <th>{t('gzbadge')}</th>
                                        <th>{t('place_to_pick')}</th>
                                        <th>{t('share_pdf')}</th>
                                        <th className='last'>{t('remove')}</th>
                                    </thead>
                                    {
                                        userInvitationsData?.map(item => (
                                            <tr key={item.id}>
                                                <td className='first'>{item?.guest?.name ? item?.guest?.name : "-"}</td>
                                                <td>{item?.guest?.phoneNumber ? item?.guest?.phoneNumber : "-"}</td>
                                                <td>{item?.guest?.userType?.name ? item?.guest?.userType?.name : "-"}</td>
                                                <td>{item?.gzBadge ? "Yes" : "No"}</td>
                                                <td>{item?.placeToPickUp ? item?.placeToPickUp : "-"}</td>
                                                <td>
                                                    {
                                                        item?.sharePdf ?
                                                            <img src={checkTrue} alt="checkTrue" /> :
                                                            <img src={checkFalse} alt="checkFalse" />
                                                    }
                                                </td>
                                                <td className='last'>
                                                    <img
                                                        src={deleteIcon}
                                                        alt="delete"
                                                        onClick={() => setDeleteShow(true)}
                                                    />
                                                </td>
                                                <DeleteModal
                                                    show={deleteShow}
                                                    onHide={() => setDeleteShow(false)}
                                                    inviteid={item?.id}
                                                    check="invite"
                                                />
                                            </tr>
                                        ))
                                    }
                                </table>
                            </div> :
                            <NoEvent title="visitors" />
                    }
                </div>
            </div>

            {/* vehicle */}
            {
                companyRestrictionsData?.isOnuEvent === true ?
                    <>
                        <p style={{ color: '#146F62', fontSize: '20px', letterSpacing: '7px', fontWeight: "bold", }}>{t('vehicles')}</p>
                        <div className='remove_filter_visitor'>
                            {

                                vehiclesInvitationsData?.length !== 0 ?
                                    <div className="eventTables onuVistor" style={{ height: "15rem" }}>
                                        <table style={{ width: "100%" }}>
                                            <thead>
                                                <th className='first-head'>{t('brand')}</th>
                                                <th>{t('sub_brand')}</th>
                                                <th>{t('model')}</th>
                                                <th>{t('plates')}</th>
                                                <th>{t('color')}</th>
                                                <th>{t('s_n')}</th>
                                                <th className='last'>{t('otp')}</th>
                                            </thead>
                                            {
                                                vehiclesInvitationsData?.map(item => (
                                                    <tr key={item.id}>
                                                        <td className='first'>{item?.vehicle?.brand ? item?.vehicle?.brand : "-"}</td>
                                                        <td>{item?.vehicle?.subBrand ? item?.vehicle?.subBrand : "-"}</td>
                                                        <td>{item?.vehicle?.model ? item?.vehicle?.model : "-"}</td>
                                                        <td>{item?.vehicle?.plate ? item?.vehicle?.plate : "-"}</td>
                                                        <td>{item?.vehicle?.color ? item?.vehicle?.color : "-"}</td>
                                                        <td>{item?.vehicle?.serialNumber ? item?.vehicle?.serialNumber : "-"}</td>
                                                        <td className='last'>
                                                            <img
                                                                src={deleteIcon}
                                                                onClick={() => setDeleteShow(true)}
                                                                alt="delete"
                                                            />
                                                        </td>
                                                        <DeleteModal
                                                            show={deleteShow}
                                                            onHide={() => setDeleteShow(false)}
                                                            inviteid={item?.id}
                                                            check="vehicle"
                                                        />
                                                    </tr>
                                                ))
                                            }
                                        </table>
                                    </div> :
                                    <NoEvent title="vehicles" />

                            }
                        </div>
                    </> : ""
            }
        </div>
    )
}

export default EventDetailIcomming