import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TablePagination from '@mui/material/TablePagination';
import { Link, useNavigate } from 'react-router-dom';
import cross from '../../../assets/images/ic-cancel.svg'
import { Modal } from 'react-bootstrap';
import { DeleteDevice, ZoneDetailFatherAndChild } from '../../../reduxToolkit/EmployeeZones/EmployeeZonesApi';
import { permissionObj } from '../../../Helpers/permission';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

// a component to handle delete 
export const DeleteModal = (props) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    // use hook importer
    const dispatch = useDispatch();
    const navigate = useNavigate();



    // a funtion to dispatch delete api with id
    const handleDelete = () => {
        dispatch(DeleteDevice(props?.deleteid)).then(({ payload: { data: { data } } }) => {
            console.log(data)
            const params = {
                zoneId: data?.zone?.id
            }
            dispatch(ZoneDetailFatherAndChild(params))
            // props.onHide();
        })
    }
    // return main page
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
                    {t("remove_user")}
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
                    {t("invite_confirmation_message")}
                </p>
                <div className="changeImgBottomDiv mt-3">
                    <button
                        className="changeImgCancelBtn"
                        style={{ fontSize: "16px" }}
                        onClick={() => props.onHide()}
                    >
                        {t("cancel")?.toUpperCase()}
                    </button>
                    <button
                        className="changeImgChangeBtn"
                        style={{ fontSize: "16px", }}
                        onClick={handleDelete}
                    >
                        {t("confirm")?.toUpperCase()}
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

// main access device component
const AccessDeviceTable = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    //use State hook for local state management 
    const [deleteShow, setDeleteShow] = useState(false);
    const [deleteId, setDeleteId] = useState();

    // use Selector hook to get state for redux store
    const { zoneDetailFatherAndChild } = useSelector(state => state.EmployeeZonesSlice)
    const { permission } = useSelector(state => state.authenticatioauthennSlice);

    // return main page 
    return (
        <>
            {
                zoneDetailFatherAndChild?.devices?.length > 0 &&
                <div className="providersTables">
                    <table style={{ width: "100%" }}>
                        <thead>
                            <th className='first_head'> {t("name")}</th>
                            <th>{t("s_n")}</th>
                            <th>{t("ip")}</th>
                            <th>{t("mac")}</th>
                            <th>{t("status")}</th>
                            <th>{t("access_type")}</th>
                            <th>{t("device_type")}</th>
                            {
                                permission?.includes(permissionObj?.WEB_DEVICE_UPDATE) &&
                                <th>{t("update")}</th>
                            }
                            {
                                permission?.includes(permissionObj?.WEB_DEVICE_DELETE) &&
                                <th>{t("remove")}</th>
                            }
                            {/* <th className='last'>options</th> */}
                        </thead>
                        {
                            zoneDetailFatherAndChild?.devices?.length > 0 ?
                                zoneDetailFatherAndChild?.devices?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='first'>{item?.name}</td>
                                            <td>{item?.serialNumber}</td>
                                            <td>{item?.ip}</td>
                                            <td>{item?.mac}</td>
                                            <td>{item?.status?.name}</td>
                                            <td>{item?.accessType?.name}</td>
                                            <td>
                                                <i class="fa fa-tablet" aria-hidden="true"></i>
                                                {/* {item?.deviceType?.name} */}
                                            </td>
                                            {
                                                permission?.includes(permissionObj?.WEB_DEVICE_UPDATE) &&
                                                <td style={{ color: 'gray' }}>
                                                    <Link to={`/dashboard/employee/zones/update-device/${item?.id}`}>
                                                        <i class="fa fa-pencil" aria-hidden="true"></i>
                                                    </Link>
                                                </td>
                                            }
                                            {
                                                permission?.includes(permissionObj?.WEB_DEVICE_DELETE) &&
                                                <td
                                                    style={{
                                                        color: '#F44336',
                                                        cursor: "pointer"
                                                    }}
                                                    onClick={() => {
                                                        setDeleteId(item?.id);
                                                        setDeleteShow(true);
                                                    }}
                                                >
                                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                                </td>
                                            }


                                            {/* <td className='last'>
                                            <ProviderDropDown dropDownProps={dropDownProps} userId={item?.user?.id} pid={item?.id} statusTo={item?.user?.status?.id} />
                                        </td> */}
                                        </tr>
                                    )
                                }) :
                                <tr style={{ boxShadow: 'none', borderRadius: 'none', height: "auto" }}>
                                    <td colSpan="10">

                                        <NotFoundDataWarning text={t("no_data")} />
                                    </td>
                                </tr>
                        }
                        <DeleteModal
                            show={deleteShow}
                            onHide={() => setDeleteShow(false)}
                            deleteid={deleteId}
                        />

                    </table>
                </div>

                // <NoEvent />
            }

            {/* <div className="d-flex justify-content-center">
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[2, 4, 6, 8]}
                    count={getAllPageableProvider?.totalElements}
                    page={pagePagination}
                    onPageChange={handleChangePageProvider}
                    labelRowsPerPage="Provider per page"
                    rowsPerPage={rowsPerPageProvider}
                    onRowsPerPageChange={handleChangeRowsPerPageProvider}
                />
            </div> */}

        </>
    )
}

export default AccessDeviceTable