import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCompanyEmployees } from '../../../../Apis/CompanyEmployee';
import TablePagination from '@mui/material/TablePagination';
import { toast } from "react-toastify";
import EmployeeCard from "./subComponents/EmployeeCard";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { permissionObj } from "../../../../Helpers/permission";
import i18next, { t } from "i18next";

export const Employees = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [employeeData, setEmployeeData] = useState();

  const { permission } = useSelector(state => state.authenticatioauthennSlice);

  useEffect(() => {

    const pagination = {
      order: true,
      page: page,
      size: rowsPerPage,
      sortBy: "id"
    }

    getAllCompanyEmployees(pagination).then(({ data: { data } }) => {
      console.log(data)
      setEmployeeData(data)
    }).catch(error => {
      toast.error("something went wrong.")
    })

  }, [page, rowsPerPage])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  return (
    <>
      <div className="employeeVehicleHead">
        <div>
          {
            permission?.includes(permissionObj?.WEB_EMPLOYEE_MENU) &&
            <h3>
              {t('employees')}
              <Link to="/dashboard/employee/all-employees">
                <sub>{t('view_more')}</sub>
              </Link>
            </h3>
          }
          <p>
            {t('total')}  <span>{employeeData?.totalElements}</span>
          </p>
        </div>
        {permission?.includes(permissionObj?.WEB_EMPLOYEE_CREATE) &&
          <Link to="/dashboard/employee/all-employees/add-employee">
            <button className="addNewEmployeeBtn">{t('add_new_employee')}</button>
          </Link>
        }
      </div>
      <div className="row mb-3">
        {
          employeeData?.content !== 0 ?
            <>
              {employeeData?.content?.map(item => (
                <div className="col-12 col-md-6" style={{ marginTop: "4.5rem" }} key={item.id}>
                  <EmployeeCard employeeCardData={item} />
                </div>
              ))}
              <div className="col-10 mt-2">
                <TablePagination
                  component="div"
                  rowsPerPageOptions={[2, 4, 6, 8]}
                  count={employeeData?.totalElements}
                  page={page}
                  onPageChange={handleChangePage}
                  labelRowsPerPage={t('Users_per_page')}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                    "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root": {
                      transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
                    }
                  }}
                />
              </div>
            </> :
            <div className='noItem'>
              {t('no_employees')}
            </div>
        }
      </div>
    </>
  );
};
