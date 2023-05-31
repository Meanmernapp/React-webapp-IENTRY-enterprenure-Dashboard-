import React, { useEffect, useState } from 'react'
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import excel_image from '../../../assets/images/excelIcon.svg';
import pdf_image from '../../../assets/images/pdfIcon.svg';
import TablePagination from '@mui/material/TablePagination';
import {
    Grid,
    Stack,
    TextField,
} from "@mui/material";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { iconStyle, textFieldStyle } from '../../../Helpers/arabicStyle';
import { permissionObj } from '../../../Helpers/permission';
import { useDispatch, useSelector } from 'react-redux';
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';
import searchIcon from "../../../assets/images/ic-search.svg"
import { GetAllListOfAccess } from '../../../reduxToolkit/EmployeePayRoll/EmployeePayRollApi';
import moment from 'moment/moment';
import { toast } from 'react-toastify';

const Payroll = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const [fromDate, setFormDate] = useState(new Date(Date.now()))
    const [toDate, setToDate] = useState(new Date(Date.now()))
    const [isCheck, setIsCheck] = useState("")
    const [pageDepartment, setPageDepartment] = useState(0)
    const dispatch = useDispatch()
    const { permission } = useSelector(state => state.authenticatioauthennSlice)
    const { getAllListOfAccess } = useSelector(state => state.employeePayrollSlice)
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // set page if change detect
    const handleChangePage = (event, newPage) => {
        setPageDepartment(newPage);
    };
    // set row per page if change detect
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value));
        setPageDepartment(0);
    };
    const searchAccess = () => {

        const data = {
            from: fromDate?.getTime(),
            to: toDate?.getTime(),
            pagination: {
                "order": true,
                "page": pageDepartment,
                "size": rowsPerPage,
                "sortBy": "id"
            }
        }
        if (fromDate?.getTime() < toDate?.getTime()) {

            dispatch(GetAllListOfAccess(data))
        } else {
            toast.warn("From can't be greater then To")
        }
    }

    console.log(getAllListOfAccess)

    useEffect(() => {
        const data = {
            from: fromDate?.getTime(),
            to: toDate?.getTime(),
            pagination: {
                "order": true,
                "page": pageDepartment,
                "size": rowsPerPage,
                "sortBy": "id"
            }
        }
        dispatch(GetAllListOfAccess(data))
    }, [pageDepartment, rowsPerPage])

    return (
        <>
            <div className='custom_head'>
                <div className='left'>
                    {/* <i className="fa fa-arrow-left" aria-hidden="true" style={iconStyle}></i> */}
                    <p>{t("attendance")}</p>
                </div>
                {
                    permission?.includes(permissionObj?.WEB_PAYROLL_UPDATE) &&
                    <div className='right'>
                        <Link className='button' to="/dashboard/employee/payroll/manage-attendence">{t("manage_attendance").toUpperCase()}
                            <i className="fa fa-envelope mx-2" aria-hidden="true"></i>
                        </Link>
                    </div>
                }

            </div>
            <div className='payroll_container'>
                <p>{t("list_of_attendance")}</p>
                <div className='payroll_menubar'>
                    <Grid container gap="1rem">
                        <Grid item xs={4} sx={{ position: "relative" }}>
                            <div className="dateTimeInput">
                                <div className="dateTimeInput-container">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Stack sx={textFieldStyle}>
                                            <DesktopDatePicker
                                                // disablePast
                                                disableFuture
                                                label="FROM"
                                                inputFormat="dd/MM/yyyy"
                                                value={fromDate}
                                                onChange={(e) => { setFormDate(e) }}
                                                renderInput={(params) => <TextField size="small" {...params} />}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4} sx={{ position: "relative" }}>
                            <div className="dateTimeInput">
                                <div className="dateTimeInput-container">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <Stack sx={textFieldStyle}>
                                            <DesktopDatePicker
                                                // disablePast
                                                disableFuture
                                                label="TO"
                                                inputFormat="dd/MM/yyyy"
                                                value={toDate}
                                                onChange={(e) => { setToDate(e) }}
                                                renderInput={(params) => <TextField size="small" {...params} />}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </Grid>
                        <Grid>
                            <button className='searchBtn' onClick={(() => { searchAccess() })}>
                                {t("search")}

                                {/* <i className="fa fa-envelope mx-2" aria-hidden="true"></i> */}
                                <img src={searchIcon} alt="" width={"20px"} height={"20px"} />
                            </button>
                        </Grid>
                        <Grid sx={{ display: 'flex', alignItems: "center" }}>
                            <Grid className='execBtn' onClick={() => { setIsCheck("excel") }} sx={{ background: isCheck == "excel" ? "#E1E1E1" : "" }}>
                                <img src={excel_image} alt="" />
                            </Grid>
                            <Grid className='pdfBtn' onClick={() => { setIsCheck("pdf") }} sx={{ background: isCheck == "pdf" ? "#707070B3" : "" }}>
                                <img src={pdf_image} alt="" />
                            </Grid>
                        </Grid>

                    </Grid>
                </div>
                <div className='payroll_table_content'>
                    {

                        getAllListOfAccess?.content?.length > 0 ?
                            <table style={{ width: "100%" }}>
                                <thead>
                                    <th className='first-head'> {t("name")}</th>
                                    <th > {t("user_type")}</th>
                                    <th>{t("access_method")}</th>
                                    <th>{t("device")}</th>
                                    <th>{t("zone")}</th>
                                    <th>{t("date")}</th>
                                    {/* <th className='last'>options</th> */}
                                </thead>
                                {

                                    getAllListOfAccess?.content?.map((item, index) => {
                                        const date = moment(item?.createdAt);
                                        return (
                                            <tr key={index}>
                                                <td className='first limited-text'>
                                                    {item?.name?.length < 20 ? item?.name : item?.name?.slice(0, 20) + "..."}</td>
                                                <td>{item?.userTypeName?.replace(/_/g, ' ')}</td>
                                                <td>{item?.accessMethodName?.replace(/_/g, ' ')}</td>
                                                <td>{item?.deviceName}</td>
                                                <td>{item?.zoneName}</td>
                                                <td>{date.format('MM-DD-YYYY h:mm')}</td>
                                            </tr>
                                        )
                                    })
                                    // :
                                    // <tr>
                                    //     <td colSpan="10">
                                    //         <NotFoundDataWarning text={t("no_data")} />
                                    //     </td>
                                    // </tr>
                                }
                            </table> :
                            <NotFoundDataWarning text={t("no_data")} />

                    }
                </div>
            </div>
            {
                getAllListOfAccess?.content?.length > 0 &&
                <div className='payroll_pagination d-flex justify-content-center'>
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[10, 15, 20, 30]}
                        count={getAllListOfAccess?.totalElements}
                        page={pageDepartment}
                        onPageChange={handleChangePage}
                        labelRowsPerPage={t("attendance_per_page")}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            }
        </>
    )
}

export default Payroll