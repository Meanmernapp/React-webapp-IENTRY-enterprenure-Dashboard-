import React, { useEffect, useState } from "react";

import SingleEmployeeCard from "./SingleEmployeeCard";
import { Link } from "react-router-dom";
import { getAllCompanyEmployees } from "../../../../../Apis/CompanyEmployee";
import { getAllCompaniesData } from "../../../../../Apis/companydata";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";


const override = css`
  position: fixed;
  top: 50%;
  left: 50%;
  right: 0;
  bottom: 0; 
  z-index: 6; 
`;


const EmployeeCards = ({ employeeCardData }) => {
  const userdata = JSON.parse(sessionStorage.getItem("userdata"));
  const [employeeData, setEmployeeData] = useState();

  useEffect(() => {

    getAllCompaniesData().then(({ data: { data } }) => {

      const body = {
        companyId: data[0]?.id,
        email: userdata?.data.email,
        pagination: {
          order: true,
          page: 0,
          size: 10,
          sortBy: "id"
        },
        userId: userdata?.data.id,
        userTypes: userdata?.data?.userType.name
      }

      getAllCompanyEmployees(body).then(({ data: { data } }) => {
        setEmployeeData(data.content)
        console.log(data)
      }).catch(error => {
        // toast.error("something went wrong.")
      })

    }).catch(error => {
      // toast.error("something went wrong.")
    })

  }, [])
  console.log(employeeData)


  return (
    <>
      <div style={{ display: "flex" }} className="mt-2">
        <div className="row mt-5 mr-2">
          {
            employeeData ?
              employeeData?.map((character) => (
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
      </div>
    </>
  );
};

export default EmployeeCards;
