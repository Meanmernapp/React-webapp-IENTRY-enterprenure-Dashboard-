import React, { useEffect, useState } from 'react'
import ic_excel from '../../../../../assets/images/ic-excel.svg'
import ic_pdf from '../../../../../assets/images/pdf-icon.png'
import meetingIcon from '../../../../../assets/images/meetingIcon.svg'
import user_circle_solid from '../../../../../assets/images/user-circle-solid.svg'
import car_icon from '../../../../../assets/images/car_icon.svg'
import icpassword from '../../../../../assets/images/ic-password.svg'
import icRightArrow from '../../../../../assets/images/ic-right-arrow.svg'
import ic_movbile_notification from '../../../../../assets/images/ic_movbile_notification.svg'
import ic_pc from '../../../../../assets/images/ic-pc.svg'
import ic_invitation from '../../../../../assets/images/ic-invitation.svg'
import ic_event from '../../../../../assets/images/ic-event.svg'
import ic_check_black from '../../../../../assets/images/ic-check-black.svg'
import ic_cancel from '../../../../../assets/images/ic-cancel.svg'

import box_open_solid from '../../../../../assets/images/box-open-solid.svg'
import person_shelter_solid from '../../../../../assets/images/person-shelter-solid.svg'
import image_solid from '../../../../../assets/images/image-solid.svg'
import list_check_solid from '../../../../../assets/images/list-check-solid.svg'
import rectangle_list_solid from '../../../../../assets/images/rectangle-list-solid.svg'
import users_solid from '../../../../../assets/images/users-solid.svg'
import circle_solid from '../../../../../assets/images/circle-solid.svg'
import file_solid from '../../../../../assets/images/file-solid.svg'
import building_solid from '../../../../../assets/images/building-solid.svg'

import { TablePagination } from '@mui/material';
import { GetCrudLogList } from '../../../../../reduxToolkit/Logs/LogApi'
import { useDispatch, useSelector } from 'react-redux'
import NoEvent from '../../../Events/NoEvent'

const CrudLogsTab = () => {
    let body;
    const dispatch = useDispatch();
    const CrudLogList = useSelector(state => state?.LogSlice?.CrudLogList);
    console.log(CrudLogList)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [value, setValue] = useState(true);

    useEffect(() => {
        body = {
            order: true,
            page: page,
            size: rowsPerPage,
            sortBy: "id"
        }
        dispatch(GetCrudLogList(body));
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        body = {
            order: true,
            page: newPage,
            size: rowsPerPage,
            sortBy: "id"
        }
        dispatch(GetCrudLogList(body));
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
        body = {
            order: true,
            page: page,
            size: parseInt(event.target.value),
            sortBy: "id"
        }
        dispatch(GetCrudLogList(body));
    };

    return (
        <>
            <div className="d-flex justify-content-between">
                <p className='accessHistory'>CRUD LOG</p>
                <div className="exporBtns">
                    <div
                        className='exportExcel exportDiv'
                        onClick={() => setValue(true)}
                        style={{
                            backgroundColor: value ? "#9A9A9A" : "#fff"
                        }}
                    >
                        <img src={ic_excel} style={{ width: "24px", height: "24px" }} alt="ic_excel" />
                    </div>
                    <div
                        className='exportPtf exportDiv'
                        onClick={() => setValue(false)}
                        style={{
                            backgroundColor: value ? "#fff" : "#9A9A9A"
                        }}
                    >
                        <img src={ic_pdf} style={{ width: "24px", height: "24px" }} alt="ic_pdf" />
                    </div>
                </div>
            </div>
            {
                CrudLogList?.content?.length !== 0 ?
                    <>
                        <div className='createScroll'>
                            {
                                CrudLogList?.content?.map(item => (
                                    <div className='tabBox' key={item?.id}>
                                        <div className='tabBox-main'>
                                            <p className='P1' style={{ fontSize: "12px" }}>
                                                <img
                                                    src={
                                                        item?.model === 'purchase' ?
                                                            box_open_solid :
                                                            item?.model === 'zone' ?
                                                                person_shelter_solid :
                                                                item?.model === 'zone_map_plane' ||
                                                                    item?.model === 'vehicle_image' ||
                                                                    item?.model === 'user_image' ?
                                                                    image_solid :
                                                                    item?.model === 'work_shift' ?
                                                                        list_check_solid :
                                                                        item?.model === 'contract' ?
                                                                            rectangle_list_solid :
                                                                            item?.model === 'employee' ||
                                                                                item?.model === 'contractor' ||
                                                                                item?.model === 'provider' ||
                                                                                item?.model === 'user' ||
                                                                                item?.model === 'extra_data' ?
                                                                                users_solid :
                                                                                item?.model === 'company_document_employee' ||
                                                                                    item?.model === 'company_document_external' ||
                                                                                    item?.model === 'company_document_external_vehicle' ?
                                                                                    file_solid :
                                                                                    item?.model === 'company' ||
                                                                                        item?.model === 'company_restriction' ||
                                                                                        item?.model === 'role' ?
                                                                                        building_solid : circle_solid
                                                    }
                                                    className='notifyIcon'
                                                    alt="package"
                                                />
                                                <span>{item?.action}</span>
                                            </p>
                                            <p className='P2 text-right'>
                                                {new Date(item?.createdAt).toDateString()} <br />{new Date(item?.createdAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <div className='tabBox-main align-items-end'>
                                            <div>
                                                <p className='P3'>USER: {item?.user?.name}</p>
                                                <p className='P4'>{item?.action} {item?.model}</p>
                                            </div>
                                            <p className='P2' style={{ fontWeight: "bold" }}>
                                                <span>By: </span> {item?.user?.name}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='d-flex justify-content-center'>
                            <TablePagination
                                component="div"
                                rowsPerPageOptions={[10, 16, 22]}
                                count={CrudLogList?.totalElements}
                                page={page}
                                onPageChange={handleChangePage}
                                labelRowsPerPage="Records per page"
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    </> :
                    <NoEvent title="CRUD Logs" />
            }
        </>
    )
}

export default CrudLogsTab