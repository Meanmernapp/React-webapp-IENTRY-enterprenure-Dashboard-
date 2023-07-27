import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoPrimitiveDot } from 'react-icons/go'
import employee_4 from '../../../../../assets/defaultImages/userDef.svg'
import angelright_icon from "../../../../../assets/images/angelright.svg";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from "react-redux";
import { handleSelfi } from "../../../../../reduxToolkit/CompanyEmployees/CompanyEmployeesSlice";
import NotFoundDataWarning from "../../../../../components/NotFoundDataWarning";
import genderId from "../../../../../hooks/genderId";
import statusId from "../../../../../hooks/statusId";
import Checkbox from '@mui/material/Checkbox';

const AllEmployeeCards = ({ searchEmployee, handleCheckboxChange, selectEmployeeForDelete }) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { getAllEmployees } = useSelector(state => state.EmployeeSlice);
  const { searchByFilters } = useSelector(state => state.SearchSlice);

  const handleStatus = (paramId) => {
    return paramId === 2 ? "#F2A100" :
      paramId === 3 ? "blue" :
        paramId === 4 ? "#0C4523" :
          paramId === 5 ? "orange" :
            paramId === 6 ? "#BC0000" : "black"
  }


  return (
    <>
      <div className="row animated-div-left mt-0 ml-1 px-0">
        {
          searchByFilters?.content?.length > 0 ?
            searchByFilters?.content?.filter((user) => {
              if (searchEmployee === "") {
                return user;
              } else if (
                user?.name
                  ?.toLowerCase()
                  .includes(searchEmployee?.toLowerCase())
              ) {
                return user;
              }
            })?.map((character) => (
              <div className="panel-grid  col-md-3 col-lg-3 px-0 pr-1 mb-3" key={character?.id} id={character?.id}>
                <div className="card-base-grid mb-3 pb-2 h-100">
                  <div className="top-heading-card">
                    <Checkbox
                      className="grid-checkall checkbox"
                      checked={selectEmployeeForDelete?.includes(character?.id)}
                      id={character?.id}
                      onChange={handleCheckboxChange}
                      size="small"
                    />
                    {/* <input type="checkbox" className="checkbox"
                      checked={selectEmployeeForDelete?.includes(character?.id)}
                      id={character?.id}
                      onChange={handleCheckboxChange}
                    /> */}
                    <div className="status">
                      <p
                        style={{
                          color: handleStatus(character?.statusId)
                        }}
                      >
                        {statusId(character?.statusId).replace(/\_/g, " ")}
                      </p>
                      <GoPrimitiveDot
                        className="ml-1"
                        style={{
                          color: handleStatus(character?.statusId)
                        }}
                      />
                    </div>

                  </div>
                  <div className="card-body-grid px-2 pb-2">

                    <div className="img-body">
                      <img
                        src={character?.selfie != null ? `data:image/png;base64,${character?.selfie}` : employee_4}

                        alt="employee_4"
                      />
                    </div>
                    <div className="p-0">
                      <div className="card-content-grid">
                        <p>{t('name')}</p>
                        <span style={{ textTransform: "none" }}>{character?.name}</span>
                      </div>
                      <div className="card-content-grid">
                        <p>{t('last_name')}</p>
                        <span style={{ textTransform: "none" }}>{character?.lastName}</span>
                      </div>
                      <div className="card-content-grid">
                        <p>{t('second_last_name')}</p>
                        <span style={{ textTransform: "none" }}>{character?.secondLastName || '-'}</span>
                      </div>
                      <div className="card-content-grid">
                        <p>{t('work_station')}</p>
                        <span style={{ textTransform: "none" }}>{character?.workStation}</span>
                      </div>
                      <div className="card-content-grid">
                        <p>{t('gender')}</p>
                        <span >{genderId(character?.genderId) || "-"}</span>
                      </div>
                      <div className="card-content-grid">
                        <p>{t('email')}</p>
                        <span style={{ textTransform: "none" }}>{character?.email}</span>
                      </div>
                      <div className="card-content-grid">
                        <p>{t('employee_phone_number')}</p>
                        <span>{character?.phoneNumber}</span>
                      </div>
                      <div className="card-content-grid">
                        <p>{t('employee_id')}</p>
                        <span>{character?.employeeId}</span>
                      </div>
                      <div className="card-content-grid">
                        <p>{t('role')}</p>
                        <span style={{ textTransform: "none" }}>{character?.role}</span>
                      </div>
                      <div className="card-content-grid">
                        <p>{t('department')}</p>
                        <span style={{ textTransform: "none" }}>{character?.department}</span>
                      </div>

                      <div
                        className="card-detail-grid d-flex justify-content-end align-bottom"
                        style={{
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          dispatch(handleSelfi([]))
                          navigate(`/dashboard/employee/all-employees/employee-Detail/${character?.id}`)
                        }}
                      >
                        <p className="mb-1">
                          {t('details')}
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
            :
            (
              <NotFoundDataWarning text={t("no_employees_to_show")} />
            )
        }
      </div>

    </>
  );
};

export default AllEmployeeCards;
