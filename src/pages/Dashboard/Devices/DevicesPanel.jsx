import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'react-i18next'
import { permissionObj } from "../../../Helpers/permission";
import { useDispatch, useSelector } from "react-redux";
import ic_list_detail from '../../../assets/images/ic-list-detail_grey.svg'
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
import { GetAllDevices } from "../../../reduxToolkit/Devices/DevicesApi";
import DeleteModal from "../../Modals/DeleteModal";
import mobile_app from '../../../assets/images/mobile_app_image.png'
import fixed_app from '../../../assets/images/fixed_app_image.png'
import entry_ic from '../../../assets/images/arrow-up-solid-image.png'
import exit_ic from '../../../assets/images/arrow-down-solid-image.png'
import both_ic from '../../../assets/images/ic-both-entries-image.png'
import DeleteDeviceModal from "./Modals/DeleteDeviceModal";
import DeviceLogModal from "./Modals/DeviceLogModal";
import { TABLES } from "../../../Apis/Tables";


const DevicesPanel = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation();
    const [modalShow, setModalShow] = useState(false);
    const [selectDeviceForDelete, setSelectDeviceForDelete] = useState([])
    const [isAllChecked, setIsAllChecked] = useState(false)
    const [deleteDeviceShow, setDeleteDeviceShow] = useState(false)
    const [showDeleteDeviceModal, setShowDeleteDeviceModal] = useState(false)
    const [showLogModal, setShowLogModal] = useState(false)
    const [deleteSingleDevice, setDeleteSingleDevice] = useState()
    const [logDevice, setLogDevice] = useState()
    const [deletedFlag, setDeletedFlag] = useState(false)
    const [logFlag, setLogFlag] = useState(false)


    // useSelector 
    const { permission } = useSelector(state => state.authenticatioauthennSlice);
    const { getAllDevices, deleteDevicesApi } = useSelector(state => state.DevicesSlice);

    // Props to the delete modal window
    const title_modal = `delete_devices`;
    const element_modal = `device_s`;
    const delete_table = `${TABLES.DEVICES}`;

    // this function control select all id or unSelect all
    const handelDeleteAll = (e) => {
        setIsAllChecked(e.target.checked)
        if (e.target.checked) {
            const selectAllIds = getAllDevices?.map(item => {
                return item?.id
            })
            setSelectDeviceForDelete(selectAllIds)


        } else {
            setSelectDeviceForDelete([])
        }

    }
    // this function handle only specific id base on selection
    const handleCheckboxChange = (e) => {

        if (e.target.checked) {
            setSelectDeviceForDelete([...selectDeviceForDelete, e.target.id]);
        } else {
            setSelectDeviceForDelete(selectDeviceForDelete.filter((removeid) => removeid !== e.target.id));
        }
    };

    // This section help us to determine the height of the main table
    const elementRef = useRef(null);
    useEffect(() => {
        if (elementRef.current) {
            const rect = elementRef.current.getBoundingClientRect();
            const distanceTop = rect.top - 20;
            elementRef.current.style.setProperty('--top-value', `${distanceTop}px`);
        }
    }, []);

    //This section refresh the device list when we delete one
    useEffect(() => {
        dispatch(GetAllDevices());
        setDeletedFlag(false)
        setSelectDeviceForDelete([])
    }, [deletedFlag])


    return (
        <div style={{ overflowY: "hidden", height: "95vh" }}>
            <div className='head'>
                <div className='headLeft'>
                    <h2>{t('devices_panel')}</h2>
                </div>
                <div className="container-top-right-btns">
                    {
                        permission?.includes(permissionObj?.WEB_DEVICE_CREATE) &&
                        <button className="add-btn-1"
                            onClick={() => navigate("/dashboard/employee/devices/create")}
                        >
                            <i class="fa fa-plus" aria-hidden="true"></i>
                            {t('add')}
                        </button>
                    }
                    {
                        permission?.includes(permissionObj?.WEB_DEVICE_DELETE) &&
                        <button className="delete-btn-1"
                            disabled={selectDeviceForDelete?.length === 0}
                            onClick={() => {
                                setDeleteDeviceShow(true)
                                setDeletedFlag(false)
                            }}
                        >
                            <i class="fa fa-trash-o" aria-hidden="true"></i>
                            {t('delete')}
                        </button>
                    }
                    <button
                        className="custom_primary_btn_dark"
                        style={{ width: "48px", height: "48px" }}
                        onClick={() => setModalShow(true)}
                    >
                        <FilterAltIcon style={{ fontSize: "32px" }} />
                    </button>
                </div>
            </div>
            {
                <div className="col-12 panelTables animated-div px-1" ref={elementRef}>
                    {
                        getAllDevices?.length > 0 ?
                            <table style={{ width: "100%" }}>
                                <thead>
                                    {
                                        permission?.includes(permissionObj?.WEB_DEVICE_DELETE) &&
                                        <th className='first_head'>
                                            <input type="checkbox" className="checkbox"
                                                checked={isAllChecked}
                                                onChange={handelDeleteAll}
                                            />
                                        </th>
                                    }
                                    <th className='first_head'>{t("name")}</th>
                                    <th>{t("ip")}</th>
                                    <th>{t("mac")}</th>
                                    <th>{t("s/n")}</th>
                                    <th dangerouslySetInnerHTML={{ __html: t('device_type_table') }} />
                                    <th dangerouslySetInnerHTML={{ __html: t('access_type_table') }} />
                                    <th>{t("status")}</th>
                                    <th>{t("zone")}</th>
                                    {
                                        permission?.includes(permissionObj?.WEB_DEVICE_UPDATE) &&
                                        <th className='last'>{t("update")}</th>
                                    }
                                    <th className='last'>{t("log")}</th>
                                </thead>
                                {
                                    getAllDevices?.length > 0 &&
                                    getAllDevices?.map(item => {
                                        if (item?.deleted === false) {
                                            return (
                                                <tr key={item?.id}>
                                                    {
                                                        permission?.includes(permissionObj?.WEB_DEVICE_DELETE) &&
                                                        <td className='first'>
                                                            <input type="checkbox" className="checkbox"
                                                                checked={selectDeviceForDelete?.includes(item?.id)}
                                                                id={item?.id}
                                                                onChange={handleCheckboxChange}
                                                            />
                                                        </td>
                                                    }
                                                    <td className='first'>{item?.name}</td>
                                                    <td>{item?.ip}</td>
                                                    <td>{item?.mac}</td>
                                                    <td>{item?.serialNumber}</td>
                                                    <td className={"img_device_table"}
                                                        // style={{ padding: "0.5rem 0" }}
                                                    >
                                                        {
                                                            <>
                                                                <Tooltip title={item?.deviceType?.name} placement="right" arrow>
                                                                    <img src={item?.deviceType?.id === 1 ? fixed_app : mobile_app
                                                                    } alt=""
                                                                    />
                                                                </Tooltip>
                                                            </>
                                                        }
                                                    </td>
                                                    <td className={"img_arrow_table"}
                                                    >
                                                        {
                                                            <>
                                                                <Tooltip title={item?.deviceAccessType?.id === 3 && t('entry_exit').toUpperCase() ||
                                                                 item?.deviceAccessType?.id === 2 && t('exit').toUpperCase() ||
                                                                  item?.deviceAccessType?.id === 1 && t('entry').toUpperCase()} placement="right" arrow>
                                                                    <img src={item?.deviceAccessType?.id === 3 && both_ic ||
                                                                        item?.deviceAccessType?.id === 2 && exit_ic ||
                                                                        item?.deviceAccessType?.id === 1 && entry_ic
                                                                    } alt=""
                                                                    />
                                                                </Tooltip>
                                                            </>
                                                        }
                                                    </td>
                                                    <td style={{
                                                        fontWeight: "bold",
                                                        font: "normal normal bold 12px/15px Montserrat",
                                                        color: item?.status?.id === 11 ? "#0C4523" : "#BC0000"
                                                    }}>{item?.status?.id === 11 ? t('active').toUpperCase() : t('inactive').toUpperCase()}</td>
                                                    <td>{item?.zone?.name ? item.zone.name : "-"} </td>
                                                    {
                                                        permission?.includes(permissionObj?.WEB_DEVICE_UPDATE) &&
                                                        <td className='tableIcon'>
                                                            <button className='btn-option'
                                                                onClick={() => navigate(`/dashboard/employee/devices/update/${item?.id}`)}>
                                                                <i className="fa fa-pencil" aria-hidden="true"
                                                                    style={{ color: "#146F62" }}
                                                                ></i>
                                                            </button>
                                                        </td>
                                                    }
                                                    <td className='tableIcon'>
                                                        <button className='btn-option'
                                                            onClick={() => {
                                                                const data = {
                                                                    id: item?.id,
                                                                    name: item?.name,
                                                                }
                                                                setLogDevice(data)
                                                                setShowLogModal(true)
                                                                setLogFlag(true)
                                                            }}>
                                                            <img
                                                                src={ic_list_detail}
                                                                alt="ic_list_detail"
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })}
                            </table> :
                            <NotFoundDataWarning text={t("no_devices_available")} />
                    }
                </div>
            }
            <DeleteDeviceModal
                show={showDeleteDeviceModal}
                onHide={() => setShowDeleteDeviceModal(false)}
                data={deleteSingleDevice}
                flag={deletedFlag}
                onDelete={() => setDeletedFlag(true)}
            />
            <DeviceLogModal
                show={showLogModal}
                onHide={() => setShowLogModal(false)}
                data={logDevice}
                flag={logFlag}
                onLog={() => setLogFlag(false)}
            />
            <DeleteModal
                show={deleteDeviceShow}
                onHide={() => setDeleteDeviceShow(false)}
                data={selectDeviceForDelete}
                title_modal={title_modal}
                element_modal={element_modal}
                flag={deletedFlag}
                onDelete={() => setDeletedFlag(true)}
                delete_table={delete_table}
            />
        </div>
    );
};

export default DevicesPanel;