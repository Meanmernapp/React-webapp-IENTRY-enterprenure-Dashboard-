import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import cancel from '../../../../assets/images/ic-cancel.svg'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { GetDeviceLog } from "../../../../reduxToolkit/Devices/DevicesApi";


const DeviceLogModal = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const { getDeviceLog } = useSelector(state => state.DevicesSlice);

    const uuid = props?.data?.id

    const flag = props.flag

    //This section call to the api to obtain the respectively logs
    useEffect(() => {
        if(flag){
        dispatch(GetDeviceLog(uuid));
        }
        props.onLog()
    }, [flag])
    console.log(getDeviceLog)

    return (
        <Modal
            className="log-modal"
            {...props}
            // 
            size='xl'
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t('device_log')}
                </Modal.Title>
                <img onClick={() => props.onHide()} className="modalClose" src={cancel} alt="" />
            </Modal.Header>
            <Modal.Body className="log-modal-body">
                <ul className="log-list">
                    {
                        getDeviceLog?.length > 0 &&
                        getDeviceLog?.map(item => {
                            return (
                                
                                <li key={item?.id}>
                                <span className="log-item-text">{item?.action},{item?.message}</span><span className="log-item-date" style={{ float: 'right' }}>{new Date(item?.createdAt).toLocaleString('es-AR')}</span>
                                </li>
                            )
                        })}
                </ul>
            </Modal.Body>

        </Modal>
    )
}

export default DeviceLogModal