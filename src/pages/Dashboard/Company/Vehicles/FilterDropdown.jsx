import React, { useState } from "react";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
var event = null;
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
  return (
    <div
      ref={ref}
      onClick={(e) => {
        // e.preventDefault();
        onClick(e);
        console.log(e);
        event = e;
      }}
    >
      {children}
      <button
        className="btn"
        style={{ width: "30px", marginLeft: "10px" }}
        // onClick={() => setModalShow(!modalShow)}
      >
        <FilterAltIcon />
      </button>
    </div>
  );
});

const FilterDropDown = () => {
  const [week, setWeek] = useState();
  const [year, setYear] = useState();
  const [orderby, setOrderby] = useState();
  const [sort, setSort] = useState();
  const [check, setcheck] = useState();
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} />
      <Dropdown.Menu
        size="lg"
        title="go to details"
        style={{
          width: "100%",
          minWidth: "76rem",
          padding: "0",
          margin: "0",
          border: "none",
        }}
      >
        <div className="col-md-10 filter_parent">
          <p className="filter_header">
            FILTERS
            <CloseIcon
              style={{ marginTop: "10px", color: "red", cursor: "pointer" }}
              onClick={(e) => {
                if (event) {
                  console.log("I am event", event);
                  event.cancelable = false;
                }
              }}
            />
          </p>
          <div
            className="filter_body"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="col-md-6 dates_week_part">
              <p>Dates</p>
              <ButtonGroup
                className="filter_btn_group"
                style={{ width: "100%", margin: "20px", padding: "0px 40px" }}
                variant="outlined"
                aria-label="outlined button group"
              >
                <Button>Day</Button>
                <Button>Month</Button>
                <Button>Week</Button>
                <Button>Year</Button>
              </ButtonGroup>

              <div
                className="week_year_inputfield"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  marginLeft: "30px",
                }}
              >
                <Box
                  className="mt-2"
                  style={{ marginRight: "10px" }}
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    fontSize: "20px",
                    height: "40px",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">WEEK</InputLabel>
                    <Select
                      value={week}
                      label="WEEK"
                      onChange={(e) => setWeek(e.target.value)}
                    >
                      <MenuItem value={10}>WEEK 1</MenuItem>
                      <MenuItem value={20}>WEEK 2</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  className="mt-2"
                  sx={{
                    width: "100%",
                    maxWidth: "100%",
                    fontSize: "20px",
                    height: "40px",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel>YEAR</InputLabel>
                    <Select
                      value={year}
                      label="YEAR"
                      onChange={(e) => setYear(e.target.value)}
                    >
                      <MenuItem value={10}>2021</MenuItem>
                      <MenuItem value={20}>2022</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>
            <div className="col-md-4">
              <p>Attributes</p>
              <Box
                style={{ marginTop: "20px !important" }}
                className="mt-2"
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  fontSize: "20px",
                  height: "40px",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel>ORDER BY</InputLabel>
                  <Select
                    value={orderby}
                    label="ORDER BY"
                    onChange={(e) => setOrderby(e.target.value)}
                  >
                    <MenuItem value={10}>Company Name</MenuItem>
                    <MenuItem value={20}>Company Name</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                className="mt-2"
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  fontSize: "20px",
                  height: "40px",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">sort</InputLabel>
                  <Select
                    value={sort}
                    label="SORT"
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <MenuItem value={10}>ASC</MenuItem>
                    <MenuItem value={20}>DES</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterDropDown;
