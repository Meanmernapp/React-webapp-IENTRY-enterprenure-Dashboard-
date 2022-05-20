import React, { useEffect, useState } from "react";

import SingleEmployeeCard from "./SingleEmployeeCard";
import { Link } from "react-router-dom";
import { getAllCompanyEmployees } from "../../../../../Apis/CompanyEmployee";
import { getAllCompaniesData, getCompanyData } from "../../../../../Apis/companydata";
import HashLoader from "react-spinners/HashLoader";
import TablePagination from '@mui/material/TablePagination';
import { css } from "@emotion/react";


const override = css`
  position: fixed;
  top: 50%;
  left: 50%;
  right: 0;
  bottom: 0; 
  z-index: 6; 
`;


const EmployeeCards = ({ employeeCardData, orderBy, sortBy }) => {
  const userdata = JSON.parse(sessionStorage.getItem("userdata"));
  const companyId = "bc9789f1-3f16-4759-851d-5501cc37ec97";
  const [employeeData, setEmployeeData] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  useEffect(() => {

    getCompanyData(companyId).then(({ data: { data } }) => {

      // order: orderBy ? orderBy : true,
      // sortBy: sortBy ? sortBy : "id"

      const body = {
        companyId: companyId,
        email: userdata?.data.email,
        pagination: {
          order: sortBy === 'asc' ? true : false,
          page: page,
          size: rowsPerPage,
          sortBy: orderBy ? orderBy : "id"
        },
        userId: userdata?.data.id,
        userTypes: userdata?.data?.userType.name
      }

      getAllCompanyEmployees(body).then(({ data: { data } }) => {
        setEmployeeData(data)
        console.log(data)
      }).catch(error => {
        // toast.error("something went wrong.")
      })

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



  return (
    <>
      {/* <div style={{ display: "flex" }} className="mt-2"> */}
      <div className="row mt-5 mr-2">
        {
          employeeData ?
            employeeData?.content?.map((character) => (
              <>
                <div className="col-md-3">
                  <SingleEmployeeCard
                    index={character.id}
                    character={character}
                    key={character.id}
                  />
                </div>
              </>
            )) :
            <div className="overlay">
              <HashLoader loading="true" css={override} size={50} color="#fff" />
            </div>
        }
      </div>
      {/* </div> */}
      <div className="d-flex justify-content-center">
        <TablePagination
          component="div"
          rowsPerPageOptions={[2, 4, 6, 8]}
          count={employeeData?.totalElements}
          page={page}
          onPageChange={handleChangePage}
          labelRowsPerPage="Users per page"
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default EmployeeCards;
