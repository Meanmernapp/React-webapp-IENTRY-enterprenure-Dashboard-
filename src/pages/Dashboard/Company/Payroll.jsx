import React, { useEffect, useState } from 'react'
import TablePagination from '@mui/material/TablePagination';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { permissionObj } from '../../../Helpers/permission';
import { useDispatch, useSelector } from 'react-redux';
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';
import { GetAllListOfAccess } from '../../../reduxToolkit/EmployeePayRoll/EmployeePayRollApi';
import { toast } from 'react-toastify';
import faceIcon from '../../../assets/icon/ic-face.svg';
import cardIcon from '../../../assets/icon/ic-card.svg';
import fingerIcon from '../../../assets/icon/ic-fingerprint.svg';
import qrIcon from '../../../assets/icon/ic-qr-code.svg';
import useStyle from '../../../hooks/useStyle';



const Payroll = () => {
    const { t } = useTranslation();
    const navigate = useNavigate()
    const { textField, smallBoxStyle } = useStyle()
    const { permission } = useSelector(state => state.authenticatioauthennSlice)

    // const lCode = Cookies.get("i18next") || "en";
    // const [fromDate, setFormDate] = useState(new Date(Date.now()))
    // const [toDate, setToDate] = useState(new Date(Date.now()))
    // const [isCheck, setIsCheck] = useState("")
    // const [pageDepartment, setPageDepartment] = useState(0)
    // const dispatch = useDispatch()
    // const { getAllListOfAccess } = useSelector(state => state.employeePayrollSlice)
    // const [rowsPerPage, setRowsPerPage] = useState(10);

    // // set page if change detect
    // const handleChangePage = (event, newPage) => {
    //     setPageDepartment(newPage);
    // };
    // // set row per page if change detect
    // const handleChangeRowsPerPage = event => {
    //     setRowsPerPage(parseInt(event.target.value));
    //     setPageDepartment(0);
    // };
    // const searchAccess = () => {

    //     const data = {
    //         from: fromDate?.getTime(),
    //         to: toDate?.getTime(),
    //         pagination: {
    //             "order": true,
    //             "page": pageDepartment,
    //             "size": rowsPerPage,
    //             "sortBy": "id"
    //         }
    //     }
    //     if (fromDate?.getTime() < toDate?.getTime()) {

    //         dispatch(GetAllListOfAccess(data))
    //     } else {
    //         toast.warn("From can't be greater then To")
    //     }
    // }

    // console.log(getAllListOfAccess)

    // useEffect(() => {
    //     const data = {
    //         from: fromDate?.getTime(),
    //         to: toDate?.getTime(),
    //         pagination: {
    //             "order": true,
    //             "page": pageDepartment,
    //             "size": rowsPerPage,
    //             "sortBy": "id"
    //         }
    //     }
    //     dispatch(GetAllListOfAccess(data))
    // }, [pageDepartment, rowsPerPage])

    return (
        <>
            <div className='custom_head'>
                <div className='left'>
                    {/* <i className="fa fa-arrow-left" aria-hidden="true" style={iconStyle}></i> */}
                    <p>{t("attendance")}</p>
                </div>
                {
                    permission?.includes(permissionObj?.WEB_ATTENDANCE_UPDATE) &&
                    // <div className='right'>
                    //     <Link className='button' to="/dashboard/employee/payroll/manage-attendence">{t("manage_attendance").toUpperCase()}
                    //         <i className="fa fa-envelope mx-2" aria-hidden="true"></i>
                    //     </Link>
                    // </div>
                      <button className="add-btn-1"

                      onClick={() => navigate("/dashboard/employee/payroll/manage-attendence")}
                    >
                     <i className="fa fa-envelope mx-2" aria-hidden="true"></i>
                      {t('manage')}
                    </button>
                }

            </div>
           
            <div className="panelTables animated-div px-1 mt-1"
            style={{ width: "100%", paddingTop: "0rem" }}
          >
            {
              [1, 2].length > 0 ?
                <table style={{ width: "100%" }}>
                  <thead>
                    <th className='first_head'>{t("name")}</th>
                    <th>{t("entry_access_method")}</th>
                    <th>{t("entry_device")}</th>
                    <th>{t("entry_date")}</th>
                    <th>{t("exit_access_method")}</th>
                    <th>{t("exit_device")}</th>
                    <th className='last'>{t("exit_date")}</th>
                  </thead>
                  <tbody>
                    {
                      [1, 2,3,4,5,6,7].map((item, index) => {
                        return (
                          <tr >
                            < td className='first align-middle' >1</td>
                            <td >
                            <img src={fingerIcon} alt="finger" />
                            </td>
                            <td >3</td>
                            <td  >
                                <div className='date_col' style={{backgroundColor:"#F93E3E"}}>
                                MM/dd/yyyy 
                                <br />
                                hh:mm
                                </div>
                              
                                </td>
                            <td >  <img src={fingerIcon} alt="finger" /></td>
                            <td>6</td>
                            <td className='last_tr'>7</td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table> :
                <NotFoundDataWarning text={t("no_documents")} />
            }

          </div>
            {
                // getAllListOfAccess?.content?.length > 0 &&
                <div className='payroll_pagination d-flex justify-content-center'>
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[10, 15, 20, 30]}
                        count={12}
                        page={0}
                        // onPageChange={handleChangePage}
                        labelRowsPerPage={t("attendance_per_page")}
                        // rowsPerPage={rowsPerPage}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            }
        </>
    )
}

export default Payroll