import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SaveIcon from "@mui/icons-material/Save";

import {
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import { Box } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccessRightCard from "../Company/Employees/AccessRightCard";
import { Button } from "react-bootstrap";

export const CreateContractor = () => {
  const [contractor, setContractor] = useState();
  const [deliveryDate, setdeliveryDate] = useState();
  const [item, setItem] = useState();
  const [serviceType, setServiceType] = useState();
  const [description, setDescription] = useState();
  const [checkboxState, setCheckboxState] = useState(false);
  const [startContract, setstartContract] = useState();
  const [endContract, setendContract] = useState();

  return (
    <>
      <div className="head">
        <h2>
          <Link to="/dashboard/company">
            <ArrowBackIcon
              style={{
                color: "#146F62",
                fontSize: "30px",
                marginRight: "30px",
              }}
            />
          </Link>
          CREATE Contract
        </h2>
      </div>
      <div className="mt-5 order_data_component">
        <p className="__header">CONTRACT DATA</p>
        <div className="formCard">
          <div className="mt-2 __body">
            <Box
              style={{ width: "390px", marginLeft: "15px" }}
              className="inputField"
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  CHOOSE A CONTRACTOR
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="CHOOSE A PROVIDER"
                  value={contractor}
                  onChange={(e) => setContractor(e.target.value)}
                >
                  <MenuItem value={10}>
                    IBL | Luis Enrique Cornejo Arreola
                  </MenuItem>
                  <MenuItem value={10}>IBL | Muhammad Umair</MenuItem>
                  <MenuItem value={10}>IBL | Muhammad Usama</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <div className="col-md-12 d-flex">
              <Box
                style={{ width: "100%", marginRight: "68px" }}
                className="inputField"
              >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="START CONTRACT"
                      inputFormat="MM/dd/yyyy"
                      value={startContract}
                      onChange={setstartContract}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Box>
              <Box style={{ width: "100%" }} className="inputField">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      label="END CONTRACT"
                      inputFormat="MM/dd/yyyy"
                      value={endContract}
                      onChange={setendContract}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Box>
            </div>
            <div className="col-md-12">
              <TextField
                className="inputField"
                fullWidth
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                defaultValue="Type some description if necessary..."
                style={{ color: "#707070" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 access_right_component">
        <p className="__header">ACCESS RIGHTS</p>
        <div className="mt-2  __body">
          <div className="__upper d-flex">
            <Box
              style={{ width: "459px", marginLeft: "15px" }}
              className="inputField"
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  SCHEDULE ACCESS
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="CHOOSE A PROVIDER"
                  value={contractor}
                  onChange={(e) => setContractor(e.target.value)}
                >
                  <MenuItem value={10}>Saturday Shift</MenuItem>
                  <MenuItem value={10}>Sunday Shift</MenuItem>
                  <MenuItem value={10}>Manager Shift</MenuItem>
                  <MenuItem value={10}>General Worker Shift</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <p>
              <Checkbox
                defaultChecked={false}
                onChange={() => setCheckboxState(!checkboxState)}
                style={{ marginLeft: "37px" }}
              />
              OR CUSTOM SCHEDULE
            </p>
          </div>
          {checkboxState && (
            <div className="__accessbody">
              <p className="mt-2 separator">
                Or Choose <br />
                Custom Schedule
              </p>
              <AccessRightCard
                heading1="zones"
                heading2="days"
                update
                isAddemployee={true}
              />
            </div>
          )}
        </div>
        <div className="btnDiv">
          <Button className="createContactBtn">
            CREATE CONTRACT
            <SaveIcon style={{ marginLeft: "10px" }} />
          </Button>
        </div>
      </div>
    </>
  );
};
