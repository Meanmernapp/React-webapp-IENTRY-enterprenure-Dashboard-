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
import { MODELS } from "../../../Apis/Models";
import SearchFor from "../../Modals/SearchFor";
import TablePagination from '@mui/material/TablePagination';
import { SearchByFilters } from "../../../reduxToolkit/Search/SearchApi";
import deviceTypeId from "../../../hooks/deviceTypeId";
import { toast } from 'react-toastify';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

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
    const [filterDialogShow, setFilterDialogShow] = useState(false)
    const [orderBy, setOrderBy] = useState();
    const [sortBy, setSortBy] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [finalArray, setFinalArray] = useState([])
    const [loaded, setLoaded] = useState(false);



    // useSelector 
    const { permission } = useSelector(state => state.authenticatioauthennSlice);
    const { getAllDevices, deleteDevicesApi } = useSelector(state => state.DevicesSlice);
    const { searchByFilters } = useSelector(state => state.SearchSlice);

    // Props to the delete modal window
    const title_modal = `delete_devices`;
    const element_modal = `device_s`;
    const delete_table = `${TABLES.DEVICES}`;

    // Props to the filter window
    const moduleId = `${MODELS.Device}`;
    const option = `${TABLES.DEVICES}`;

    // useEffect to avoid first load
    useEffect(() => {
        setLoaded(true);
    }, [page, rowsPerPage, finalArray]);

    // useEffect to avoid first load
    useEffect(() => {
        setLoaded(true);
    }, []);

    // useEffect to check automatically all the items when page, rowsPerPage, or search change
    useEffect(() => {
        if (isAllChecked) {
            const selectAllIds = searchByFilters?.content?.map(item => item?.id);
            setSelectDeviceForDelete(prevState => {
                const uniqueIds = selectAllIds.filter(id => !prevState.includes(id));
                return [...prevState, ...uniqueIds];
            });
        }
    }, [searchByFilters])

    // this function control select all id or unSelect all
    const handelDeleteAll = (e) => {
        setIsAllChecked(e.target.checked)
        if (e.target.checked) {
            const selectAllIds = searchByFilters?.content?.map(item => {
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
            const distanceTop = rect.top + 20;
            elementRef.current.style.setProperty('--top-value', `${distanceTop}px`);
        }
        const currentUrl = window.location.pathname; // Get the current URL
        const parts = currentUrl.split("/");
        const modulePart = (parts[3] ? (parts[3]) : ('') + parts[4] ? '/' + parts[4] : '')
    }, []);

    //This section refresh the device list when we delete one
    useEffect(() => {
        dispatch(GetAllDevices());
        setDeletedFlag(false)
        setSelectDeviceForDelete([])
    }, [deletedFlag])

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    //Create body for the respectively search
    useEffect(() => {

        if (loaded) {

            const criteriaList = finalArray.map((item) => {
                return {
                    dataOption: item.dataOption,
                    fieldType: item.fieldType,
                    filterKey: item.filterKey,
                    operation: item.operation,
                    sort: item.sort,
                    table: item.table,
                    values: item.values,
                };
            });

            const body = {
                pagination: {
                    page: page,
                    size: rowsPerPage,
                },
                searchCriteriaList: criteriaList
            }
            dispatch(SearchByFilters({ option, body })).then(({ payload: { data: { data, success } } }) => {
                {
                    (success !== true) && toast.error(t('fail_to_complete_fetch'))
                }
            })
            setLoaded(false)
        }
    }, [loaded, page, rowsPerPage, orderBy, sortBy, finalArray])


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
                        className="filter-btn-1"
                        style={{ width: "48px", height: "48px" }}
                        onClick={() => setFilterDialogShow(true)}
                    >
                        <FilterAltIcon style={{ fontSize: "32px" }} />
                    </button>
                </div>
            </div>
            {
                <div className="panelTables animated-div px-1" ref={elementRef}>
                    {
                        searchByFilters?.content?.length > 0 ?
                            <table style={{ width: "100%" }}>
                                <thead>
                                    {
                                        permission?.includes(permissionObj?.WEB_DEVICE_DELETE) &&
                                        <th className='first_head'>
                                            <Tooltip title={t("de_/_select_all").toUpperCase()} placement="top">
                                                <Checkbox
                                                    className="grid-checkall checkbox"
                                                    checked={isAllChecked}
                                                    onChange={handelDeleteAll}
                                                    size="small"
                                                />
                                            </Tooltip>
                                            {/* <input type="checkbox" className="checkbox"
                                                checked={isAllChecked}
                                                onChange={handelDeleteAll}
                                            /> */}
                                        </th>
                                    }
                                    <th className='first_head'>{t("name")}</th>
                                    <th>{t("ip")}</th>
                                    <th>{t("mac")}</th>
                                    <th>{t("s/n")}</th>
                                    <th dangerouslySetInnerHTML={{ __html: t('device_type_table') }} />
                                    <th dangerouslySetInnerHTML={{ __html: t('access_type_table') }} />
                                    <th>{t("status")}</th>
                                    <th style={{ minWidth: 160 }}>{t("zone")}</th>
                                    {
                                        permission?.includes(permissionObj?.WEB_DEVICE_UPDATE) &&
                                        <th className='last'>{t("update")}</th>
                                    }
                                    <th className='last'>{t("log")}</th>
                                </thead>
                                {
                                    searchByFilters?.content?.length > 0 &&
                                    searchByFilters?.content?.map(item => {
                                        return (
                                            <tr key={item?.id}>
                                                {
                                                    permission?.includes(permissionObj?.WEB_DEVICE_DELETE) &&
                                                    <td className='first' style={{ verticalAlign: 'middle' }}>
                                                        <Checkbox
                                                            className="grid-checkall checkbox"
                                                            checked={selectDeviceForDelete?.includes(item?.id)}
                                                            id={item?.id}
                                                            onChange={handleCheckboxChange}
                                                            size="small"
                                                        />
                                                        {/* <input type="checkbox" className="checkbox" style={{ verticalAlign: 'middle' }}
                                                            checked={selectDeviceForDelete?.includes(item?.id)}
                                                            id={item?.id}
                                                            onChange={handleCheckboxChange}
                                                        /> */}
                                                    </td>
                                                }
                                                <td className='first'>{item?.name}</td>
                                                <td>{item?.ip}</td>
                                                <td>{item?.mac}</td>
                                                <td>{item?.serialNumber}</td>
                                                <td className={"img_device_table"}
                                                >
                                                    {
                                                        <>
                                                            <Tooltip title={deviceTypeId(item?.deviceTypeId)} placement="right" arrow>
                                                                <img src={item?.deviceTypeId === 1 ? fixed_app : mobile_app
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
                                                            <Tooltip title={item?.deviceAccessTypeId === 3 && t('entry_exit').toUpperCase() ||
                                                                item?.deviceAccessTypeId === 2 && t('exit').toUpperCase() ||
                                                                item?.deviceAccessTypeId === 1 && t('entry').toUpperCase()} placement="right" arrow>
                                                                <img src={item?.deviceAccessTypeId === 3 && both_ic ||
                                                                    item?.deviceAccessTypeId === 2 && exit_ic ||
                                                                    item?.deviceAccessTypeId === 1 && entry_ic
                                                                } alt=""
                                                                />
                                                            </Tooltip>
                                                        </>
                                                    }
                                                </td>
                                                <td style={{
                                                    fontWeight: "bold",
                                                    font: "normal normal bold 12px/15px Montserrat",
                                                    color: item?.statusId === 11 ? "#0C4523" : "#BC0000"
                                                }}>{item?.statusId === 11 ? t('active').toUpperCase() : t('inactive').toUpperCase()}</td>
                                                <td>{item?.zoneName ? item.zoneName : "-"} </td>
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
                                        // }
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
            <SearchFor
                open={filterDialogShow}
                onClose={() => {
                    setFilterDialogShow(false);
                }}
                onFiltered={(originalArray) => {
                    setFilterDialogShow(false);
                    setFinalArray(originalArray);
                }}
                moduleId={moduleId}
                option={option}
                finalArray={finalArray}
            />
            {
                searchByFilters?.content?.length > 0 &&
                <div className="d-flex justify-content-center">
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[20, 40, 60]}
                        count={searchByFilters?.totalElements}
                        page={page}
                        onPageChange={handleChangePage}
                        labelRowsPerPage={t('devices_per_page')}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            }
        </div>

    );
};

export default DevicesPanel;