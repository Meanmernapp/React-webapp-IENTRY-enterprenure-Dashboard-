import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import EmployeCard from "./EmployeCard";
import TablePagination from "@mui/material/TablePagination";

import { useDispatch, useSelector } from "react-redux";
import {
  GetAllEmployeeFilter,
  GetEmployeByContractorId,
} from "../../../reduxToolkit/Contractor/ContractorApi";
import {
  allEmployeeFilter,
  employeByContractorId,
} from "../../../reduxToolkit/Contractor/ContractorSlice";
import i18next, { t } from "i18next";

const SearchEmploye = () => {
  let navigate = useNavigate();

  /*Author  Mazhar iqbal
    filter attribute for employes
  */
  const getAllEmployeeFilter = useSelector(allEmployeeFilter);

  /*Author  Mazhar iqbal
    all contractor employee
  */
  const getEmployeByContractorId = useSelector(employeByContractorId);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [searchEmp, setSearchEmp] = useState("");

  //pagination
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  // function to set page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  let contractPagination = {
    order: sortBy === "asc" ? true : false,
    page: page,
    size: rowsPerPage,
    sortBy: orderBy ? orderBy : "id",
  };
  useEffect(() => {
    /*Author  Mazhar iqbal
      Get filter attribute for employes
    */
    dispatch(GetAllEmployeeFilter());
  }, []);

  useEffect(() => {
    /*Author  Mazhar iqbal
     Get all contractor employee
   */
    dispatch(GetEmployeByContractorId({ id, contractPagination }));
  }, [page, rowsPerPage, orderBy, sortBy]);

  return (
    <div className="search-container">
      <div className="head my-3">
        <span className="search-container__heading">{t("employees")}</span>
        <div className="d-flex">
          <div
            className="ml-2"
            onClick={() => navigate(`/dashboard/contractor/add-new-employe`)}
          >
            <button className="btn btn-lg">
              {t("add_employee")}
              <SaveIcon />
            </button>
          </div>
          <button
            className="p-2 ms-2 "
            style={{ width: "100%", height: "100%" }}
          >
            <i
              class="fa fa-filter"
              aria-hidden="true"
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              style={{ fontSize: "30px" }}
            ></i>
          </button>
        </div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="user-dropdown" style={{ width: "222px" }}>
          <div className="user-dropdown__name d-flex flex-column border-0">
            <h3 style={{ borderBottom: "2px solid green" }}>{t("filters")}</h3>
            <h4 className="mt-3">{t("attributes")}</h4>
            <Grid container>
              <Grid item xs={12}>
                <Box sx={{ mt: "20px" }}>
                  <FormControl fullWidth
                    sx={{
                      textAlign: i18next.dir() == "rtl" ? "right" : "left",
                      "& 	.MuiOutlinedInput-notchedOutline": {
                        textAlign: i18next.dir() == "rtl" ? "right" : "left",
                      },
                      "& 	.MuiInputLabel-root": {
                        fontSize: 12,
                        left: i18next.dir() == "rtl" ? "inherit" : "0",
                        right: i18next.dir() == "rtl" ? "1.75rem" : "0",
                        transformOrigin: i18next.dir() == "rtl" ? "right" : "left"
                      }
                    }}>
                    <InputLabel id="demo-simple-select-label">
                      {t("order_by")}
                    </InputLabel>
                    <Select size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue="employe"
                      value={orderBy}
                      label="EMPLOYEE"
                      onChange={(e) => setOrderBy(e.target.value)}
                      sx={{
                        fontSize: "16px",
                        padding: "3px 3px 3px 10px",
                      }}
                    >
                      {getAllEmployeeFilter &&
                        getAllEmployeeFilter.length > 0 ? (
                        getAllEmployeeFilter?.map((item) => {
                          return (
                            <MenuItem
                              value={item}
                              sx={{
                                fontSize: "16px",
                              }}
                            >
                              {item}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <MenuItem
                          value="-"
                          sx={{
                            fontSize: "16px",
                          }}
                        >
                          -
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: "30px", position: "relative" }}>
                  <FormControl fullWidth
                    sx={{
                      textAlign: i18next.dir() == "rtl" ? "right" : "left",
                      "& 	.MuiOutlinedInput-notchedOutline": {
                        textAlign: i18next.dir() == "rtl" ? "right" : "left",
                      },
                      "& 	.MuiInputLabel-root": {
                        fontSize: 12,
                        left: i18next.dir() == "rtl" ? "inherit" : "0",
                        right: i18next.dir() == "rtl" ? "1.75rem" : "0",
                        transformOrigin: i18next.dir() == "rtl" ? "right" : "left"
                      }
                    }}>
                    <InputLabel id="demo-simple-select-label">
                      {t("sort")}
                    </InputLabel>
                    <Select size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={sortBy}
                      label={t("employees")}
                      onChange={(e) => setSortBy(e.target.value)}
                      sx={{
                        fontSize: "16px",
                        padding: "3px 3px 3px 10px",
                      }}
                    >
                      <MenuItem
                        value={10}
                        sx={{
                          fontSize: "16px",
                        }}
                      >
                        {t("asc")}
                      </MenuItem>
                      <MenuItem
                        value={20}
                        sx={{
                          fontSize: "16px",
                        }}
                      >
                        {t("des")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </div>
        </div>
      </Popover>
      <Grid container sx={{ my: "30px", position: "relative" }}>
        <Grid item xs={12}>
          <TextField size="small"
            label={t("filters")}
            fullWidth
            onChange={(e) => {
              setSearchEmp(e.target.value);
            }}


            sx={{
              textAlign: i18next.dir() == "rtl" ? "right" : "left",
              "& 	.MuiOutlinedInput-notchedOutline": {
                textAlign: i18next.dir() == "rtl" ? "right" : "left",
              },
              "& 	.MuiInputLabel-root": {
                fontSize: 12,
                left: i18next.dir() == "rtl" ? "inherit" : "0",
                right: i18next.dir() == "rtl" ? "1.75rem" : "0",
                transformOrigin: i18next.dir() == "rtl" ? "right" : "left"
              }
            }}
          />
        </Grid>
      </Grid>
      <Grid className="d-flex flex-wrap" sx={{ overFlow: "hidden" }}>
        {getEmployeByContractorId?.content
          ?.filter((user) => {
            if (searchEmp === "") {
              return user;
            } else if (
              user?.name?.toLowerCase().includes(searchEmp?.toLowerCase())
            ) {
              return user;
            }
          })
          .map((item) => (
            <EmployeCard data={item} />
          ))}

        {/* { getEmployeByContractorId && getEmployeByContractorId?.totalElements > 0  ? getEmployeByContractorId?.content?.map((item=>{
          return(
            <Grid item xs={3}>
            <EmployeCard data={item}/>
          </Grid>
          )
        })):  (
          <span className="warning-msg-style">
            NO Employee
            <img
              src={emptyList}
              style={{
                width: "100px",
                height: "100%",
                display: "flex",
              }}
            />
          </span>
        )} */}
      </Grid>
      {getEmployeByContractorId &&
        getEmployeByContractorId?.totalElements > 0 ? (
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={[8, 16, 24]}
            count={getEmployeByContractorId?.totalElements}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage="Employee per page"
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root": {
                transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
              }
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default SearchEmploye;
