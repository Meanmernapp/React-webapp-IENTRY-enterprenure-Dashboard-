import React, { useEffect, useState } from 'react'
import ic_excel from '../../../../../assets/images/ic-excel.svg'
import ic_pdf from '../../../../../assets/images/pdf-icon.png'
import icpassword from '../../../../../assets/images/ic-password.svg'
import ic_pc from '../../../../../assets/images/ic-pc.svg'
import ic_fingerprint from '../../../../../assets/images/ic-fingerprint.png'
import nfc_card from '../../../../../assets/images/nfc.svg'
import ic_mobile from '../../../../../assets/images/ic-mobile.png'
import ic_arrow_bottom_red from '../../../../../assets/images/chevron-up-solid.svg'
import { TablePagination } from '@mui/material';
import { GetUserAccessList, GetVehicleAccessList } from '../../../../../reduxToolkit/AccessHistory/AccessHistoryApi'
import { useDispatch, useSelector } from 'react-redux'
import NoEvent from '../../../Events/NoEvent'
import { IoIosArrowDown } from 'react-icons/io';

const UserAccessHistoryTab = () => {
    let body;
    const dispatch = useDispatch();
    const UserListAccess = useSelector(state => state?.AccessHistorySlice?.UserListAccess);
    // console.log(UserListAccess)

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
        dispatch(GetVehicleAccessList(body));
        dispatch(GetUserAccessList(body));
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        body = {
            order: true,
            page: newPage,
            size: rowsPerPage,
            sortBy: "id"
        }
        dispatch(GetVehicleAccessList(body));
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
        dispatch(GetVehicleAccessList(body));
    };

    return (
        <>
            <div className="d-flex justify-content-between">
                <p className='accessHistory'>USER ACCESS</p>
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
            {console.log(UserListAccess)}
            {
                UserListAccess?.content?.length !== 0 ?
                    <>
                        <div className='createScroll'>
                            {
                                UserListAccess?.content?.map(item => (
                                    <div className='tabBox' key={item?.id}>
                                        <div className='tabBox-main'>
                                            <p className='P1' style={{ fontSize: "12px" }}>
                                                <img
                                                    src={
                                                        item?.accessMethod?.id === 1 ?
                                                            icpassword :
                                                            item?.accessMethod?.id === 2 ?
                                                                ic_fingerprint :
                                                                item?.accessMethod?.id === 3 ?
                                                                    nfc_card :
                                                                    item?.accessMethod?.id === 4 ?
                                                                        icpassword :
                                                                        item?.accessMethod?.id === 5 ?
                                                                            ic_pc :
                                                                            item?.accessMethod?.id === 6 ?
                                                                                ic_mobile : icpassword
                                                    }
                                                    className='notifyIcon'
                                                    alt="package"
                                                />
                                                <span>USER:</span> {item?.user?.name}
                                            </p>
                                            <p className='P2 text-right'>
                                                {new Date(item?.createdAt).toDateString()} <br />{new Date(item?.createdAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <div className='tabBox-main'>
                                            <div>
                                                <p className='P3'>Zone: {item?.device?.zone?.name}</p>
                                                <p className='P4'>Access with fingerprint {"->"} Successfully</p>
                                            </div>
                                            <p className='P1'>
                                                {item?.device?.accessType?.name}
                                                {
                                                    item?.device?.accessType?.id === 2 ?
                                                        // <img className='main-arrowRight' src={icDownArrow} alt="package" /> 
                                                        <IoIosArrowDown style={{ fill: "red", margin: "-2px 0 0 10px", fontSize: "20px" }} /> :
                                                        <img className='main-arrowRight' src={ic_arrow_bottom_red} alt="package" />
                                                }
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
                                count={UserListAccess?.totalElements}
                                page={page}
                                onPageChange={handleChangePage}
                                labelRowsPerPage="User per page"
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </div>
                    </> :
                    <NoEvent title="Users" />
            }
        </>
    )
}

export default UserAccessHistoryTab