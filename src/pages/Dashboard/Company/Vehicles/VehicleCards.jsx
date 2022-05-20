import React, { useState, useEffect } from "react";
import SingleVehicleCard from "./SingleVehicleCard";
import HashLoader from "react-spinners/HashLoader";
import TablePagination from '@mui/material/TablePagination';
import { override } from "../../../../Helpers/spinnercss";
import { getAllCompanyVehicles } from "../../../../Apis/companyVehicle";
import { getCompanyData } from "../../../../Apis/companydata";


const VehicleCards = () => {
  const userdata = JSON.parse(sessionStorage.getItem("userdata"));
  const companyId = "bc9789f1-3f16-4759-851d-5501cc37ec97";

  const [vehicleData, setVehicleData] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);

  useEffect(() => {

    getCompanyData(companyId).then(({ data: { data } }) => {

      const body = {
        companyId: companyId,
        email: userdata?.data.email,
        pagination: {
          order: true,
          page: page,
          size: rowsPerPage,
          sortBy: "id"
        },
        userId: userdata?.data.id,
        userTypes: userdata?.data?.userType.name
      }

      getAllCompanyVehicles(body).then(({ data: { data } }) => {
        setVehicleData(data)
        // console.log(data)
      }).catch(error => {
        // toast.error("something went wrong.")
      })

    }).catch(error => {
      // toast.error("something went wrong.")
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
      <div className="row mt-5 mr-2">
        {
          vehicleData ?
            vehicleData?.content?.map(item => (
              <div className="col-md-4" key={item.id}>
                <SingleVehicleCard vehicle={item.vehicle} />
              </div>
            )) :
            <div className="overlay">
              <HashLoader loading="true" css={override} size={50} color="#fff" />
            </div>
        }
      </div>
      <div className="d-flex justify-content-center">
        <TablePagination
          component="div"
          rowsPerPageOptions={[1, 2, 3]}
          count={vehicleData?.totalElements}
          page={page}
          onPageChange={handleChangePage}
          labelRowsPerPage="Vehicles per page"
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default VehicleCards;
