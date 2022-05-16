import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import VehicleCards from "./VehicleCards";
import FilterPopus from "./FilterPopus";
// import FilterDropDown from "./FilterDropdown";
import { Link } from "react-router-dom";
import { getAllCompaniesData } from "../../../../Apis/companydata";
import { toast } from "react-toastify";
import { getAllCompanyVehicles } from "../../../../Apis/companyVehicle";

const AllVehicles = () => {
  const [modalShow, setModalShow] = useState();
  const userdata = JSON.parse(sessionStorage.getItem("userdata"));
  const [vehicleData, setVehicleData] = useState();

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

      getAllCompanyVehicles(body).then(({ data: { data } }) => {
        setVehicleData(data.content)
        // console.log(data)
      }).catch(error => {
        // toast.error("something went wrong.")
      })
    }).catch(error => {
      toast.error("something went wrong.")
    })

  }, [])

  return (
    <>
      <div className='head'>
        <div className='headLeft'>
          <Link to="/dashboard/company">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </Link>
          <h2>
            Vehicles
            <p style={{ color: "#707070", fontWeight: "lighter", fontSize: "18px" }}>Total {vehicleData?.length}</p>
          </h2>
        </div>
        <div style={{ display: "flex" }}>
          <Link to="/dashboard/company/addupdatevehicle">
            <button
              className="addNewVehicle"
              style={{ backgroundColor: "#65ABA0" }}
            >
              ADD NEW VEHICLE
            </button>
          </Link>
          {/* <FilterDropDown /> */}
          <button
            className="btn filterIconBtn"
            style={{ width: "30px", marginLeft: "10px" }}
            onClick={() => setModalShow(!modalShow)}
          >
            <FilterAltIcon />
          </button>
          {modalShow && <FilterPopus setModalShow={setModalShow} />}
        </div>
      </div>
      <VehicleCards vehicleData={vehicleData} />
    </>
  );
};

export default AllVehicles;
