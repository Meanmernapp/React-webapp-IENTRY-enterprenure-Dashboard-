import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TablePagination from '@mui/material/TablePagination';
import { GoPrimitiveDot } from 'react-icons/go'
import employee_4 from '../../../../../assets/images/employee-4.png'
import { getAllCompanyEmployees } from "../../../../../Apis/CompanyEmployee";
import angelright_icon from "../../../../../assets/images/angelright.svg";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { useDispatch } from "react-redux";
import { handleSelfi } from "../../../../../reduxToolkit/CompanyEmployees/CompanyEmployeesSlice";

const AllEmployeeCards = ({ orderBy, sortBy }) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [employeeData, setEmployeeData] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  console.log(employeeData)

  useEffect(() => {
    const body = {
      order: sortBy === 'asc' ? true : false,
      page: page,
      size: rowsPerPage,
      sortBy: orderBy ? orderBy : "id"
    }

    getAllCompanyEmployees(body).then(({ data: { data } }) => {
      setEmployeeData(data)
      // console.log(data)
    }).catch(error => {
      // toast.error("something went wrong.")
    })

  }, [page, rowsPerPage, orderBy, sortBy])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleStatus = (paramId) => {
    return paramId === 2 ? "#F2A100" :
      paramId === 3 ? "blue" :
        paramId === 4 ? "#0C4523" :
          paramId === 5 ? "orange" :
            paramId === 6 ? "#BC0000" : "black"
  }

  return (
    <>
      <div className="row mt-5 mx-auto">
        {
          employeeData?.content?.map((character) => (
            <div className="col-md-3" key={character?.id}>
              <div className="employee_m mb-3">
                <div className="top_heading_m">
                  <p
                    style={{
                      color: handleStatus(character?.status?.id)
                    }}
                  >
                    {character?.status?.name.replace(/\_/g, " ")}
                  </p>
                  <GoPrimitiveDot
                    className="ml-1"
                    style={{
                      color: handleStatus(character?.status?.id)
                    }}
                  />
                </div>
                <div className="emp_card_body">
                  <img
                    src={character?.selfie != null ? `data:image/png;base64,${character?.selfie}` : employee_4}
                    style={{
                      width: "100%",
                      height: "117px"
                    }}
                    alt="employee_4"
                  />
                  <div className="p-2">
                    <div className="emp_card_content">
                      <p>{t('name')}</p>
                      <span>{character?.name}</span>
                    </div>
                    <div className="emp_card_content">
                      <p>{t('work_station')}</p>
                      <span>{character?.workStation}</span>
                    </div>
                    <div className="emp_card_content">
                      <p>{t('gender')}</p>
                      <span>{character?.gender?.name}</span>
                    </div>
                    <div className="emp_card_content">
                      <p>{t('email')}</p>
                      <span>{character?.email}</span>
                    </div>
                    <div className="emp_card_content">
                      <p>{t('phone_number')}</p>
                      <span>{character?.phoneNumber}</span>
                    </div>
                    {/* <div className="emp_card_content">
                      <p>{t('corporate')}</p>
                      <span>{character?.workStation}</span>
                    </div> */}
                    <div className="emp_card_content">
                      <p>{t('employee_id')}</p>
                      <span>{character?.employeeId}</span>
                    </div>
                    <div className="emp_card_content">
                      <p>{t('role')}</p>
                      <span>{character?.role}</span>
                    </div>

                    {/* <Link to={`/dashboard/employee/all-employees/employee-Detail/${character?.id}`}> */}
                    <div
                      className="employee_detail_m"
                      style={{
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        dispatch(handleSelfi([]))
                        navigate(`/dashboard/employee/all-employees/employee-Detail/${character?.id}`)
                      }}
                    >
                      <p className="mb-1">
                        {t('employee_details')}
                      </p>
                      <img src={angelright_icon} alt="" style={{
                        transform: lCode === "ar" ? "scaleX(-1)" : "",
                        margin: "0 5px"
                      }} />
                    </div>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="d-flex justify-content-center">
        <TablePagination
          component="div"
          rowsPerPageOptions={[8, 16, 24, 32]}
          count={employeeData?.totalElements}
          page={page}
          onPageChange={handleChangePage}
          labelRowsPerPage={t('user_per_page')}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default AllEmployeeCards;
