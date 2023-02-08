import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Intersection from "../assets/images/Intersection.png";
import logo from "../assets/images/iEntry_unauthorized.png";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-2);
  return (
    <Box className="un_authorized_main_container">
      <Box className="un_authorized_container">
        <Box>
          <img src={Intersection} alt="" />
        </Box>
        <Box className="un_authorized_info_container">
          <Box className="un_authorized_info">
            <h1>401</h1>
            <p>
              UNAUTHORIZED <br />
              <span>authorization is required</span>
            </p>
            <button onClick={goBack}>
              BACK TO HOME <i className="fa fa-home" aria-hidden="true"></i>
            </button>
          </Box>
        </Box>
      </Box>
      <Box className="logo">
        <img src={logo} alt="" />
      </Box>
    </Box>
  );
};

export default Unauthorized;
