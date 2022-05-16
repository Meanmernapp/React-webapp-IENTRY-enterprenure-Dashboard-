import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

import { Box } from "@mui/system";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
const AddUpdateProviderContractor = ({
  addProviderFlag,
  addContractorFlag,
  updateProviderFlag,
  updateContractorFlag,
}) => {
  const [acronym, setAcronym] = useState();
  const [companyName, setCompanyName] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [status, setStatus] = useState();
  const [gender, setGender] = useState();
  const [updateProvider, setUpdateProvider] = useState(false);
  const [addContractor, setaddContractor] = useState(false);
  const [updateContractor, setupdateContractor] = useState(false);
  const [addProvider, setaddProvider] = useState(false);

  useEffect(() => {
    console.log(
      { addProviderFlag },
      { addContractorFlag },
      { updateProviderFlag },
      { updateContractorFlag }
    );
    setaddProvider(addProviderFlag);
    setaddContractor(addContractorFlag);
    setUpdateProvider(updateProviderFlag);
    setupdateContractor(updateContractorFlag);
  }, []);
  return (
    <>
      <div className="head">
        <h2>
          <Link to="">
            <ArrowBackIcon
              style={{
                color: "#146F62",
                fontSize: "30px",
                marginRight: "30px",
              }}
            />
          </Link>

          {addProvider && "ADD PROVIDER"}
          {addContractor && "ADD CONTRACTOR"}
          {updateContractor && "UPDATE CONTRACTOR"}
          {updateProvider && "UPDATE PROVIDER"}
        </h2>
        <div style={{ display: "flex" }}>
          <Link to="/dashboard/uploademployeefile">
            <button className="btn btn-lg">
              {addProvider && "ADD PROVIDER"}
              {addContractor && "ADD CONTRACTOR"}
              {updateContractor && "UPDATE CONTRACTOR"}
              {updateProvider && "UPDATE PROVIDER"}
              <SaveIcon />
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-5  add_provider">
        <div className="col-md-6 add_provider_content">
          <p className="provider_header">
            {/* {!updateProvider
              ? addContractor && "CONTRACTOR COMPANY"
              : "Provider Company"}
               */}

            {(addProvider || updateProvider) && "Provider Company"}
            {(addContractor || updateContractor) && "CONTRACTOR COMPANY"}
          </p>

          <Box
            className="add_provider_text_field"
            style={{ marginTop: "28.5px" }}
            sx={{
              width: "100%",
              maxWidth: "100%",
              fontSize: "20px",
              height: "40px",
            }}
          >
            <TextField
              fullWidth
              placeholder="IBL"
              label="Acronym"
              id="Acronym"
              value={acronym}
              onChange={(e) => setAcronym(e.target.value)}
              className=""
            />
          </Box>
          <Box
            className="add_provider_text_field"
            sx={{
              width: "100%",
              maxWidth: "100%",
              fontSize: "20px",
              height: "40px",
            }}
          >
            <TextField
              fullWidth
              placeholder="Intelligence Bereau Laboratory"
              label="Company Name"
              id="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className=""
            />
          </Box>
          <p className="provider_header">
            {(addProvider || updateProvider) && "Provider Company"}
            {(addContractor || updateContractor) && "CONTRACTOR COMPANY"}
          </p>
          <Box
            className="add_provider_text_field"
            style={{ marginTop: "28.5px" }}
            sx={{
              width: "100%",
              maxWidth: "100%",
              fontSize: "20px",
              height: "40px",
            }}
          >
            <TextField
              fullWidth
              placeholder="Luis Enrique Cornejo Arreola"
              label="NAME"
              id="NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=""
            />
          </Box>
          <Box
            className="add_provider_text_field"
            sx={{
              width: "100%",
              maxWidth: "100%",
              fontSize: "20px",
              height: "40px",
            }}
          >
            <TextField
              fullWidth
              placeholder="lcornejo@ibl.mx"
              label="Email"
              id="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box
            className="add_provider_text_field"
            sx={{
              width: "100%",
              maxWidth: "100%",
              fontSize: "20px",
              height: "40px",
            }}
          >
            <TextField
              fullWidth
              placeholder="4427065906"
              label="Phone Number"
              id="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="NoShadowInput"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneIphoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {!addContractor && (
            <Box
              className="add_provider_text_field"
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value={10}>Active</MenuItem>
                  <MenuItem value={20}>Vacations</MenuItem>
                  <MenuItem value={20}>Locked</MenuItem>
                  <MenuItem value={20}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          <Box
            style={{ padding: "0px 12px" }}
            sx={{
              width: "100%",
              maxWidth: "100%",
              fontSize: "20px",
              height: "40px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Age"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value={10}>Male</MenuItem>
                <MenuItem value={20}>Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
    </>
  );
};

export default AddUpdateProviderContractor;
