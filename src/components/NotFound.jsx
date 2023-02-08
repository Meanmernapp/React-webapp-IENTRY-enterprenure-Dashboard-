import Box from "@mui/material/Box";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/iEntry_corporate.png";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <Box className="notFound">
      <Box>
        <img src={logo} alt="" />
      </Box>
      <Box className="notfoundtext">
        <Box className="item">
          <h1>404</h1>
          <p>
            OOPS! PAGE <br />
            NOT FOUND.
          </p>
          <button onClick={goBack}>
            BACK TO HOME <i className="fa fa-home" aria-hidden="true"></i>
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
