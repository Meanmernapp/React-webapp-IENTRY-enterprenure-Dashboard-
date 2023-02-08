import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import ViewCard from "./ViewCard";
import { Box } from "@mui/system";
import Popover from "@mui/material/Popover";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TablePagination from "@mui/material/TablePagination";
import { GetVehicleFilter, GetVehicleByContractorId, GetByUserId } from "../../../reduxToolkit/Contractor/ContractorApi";
import { vehicleFilter, byUserId, vehicleByContractorId } from "../../../reduxToolkit/Contractor/ContractorSlice";
import { useSelector } from "react-redux";
import i18next, { t } from "i18next";

const SearchVehicle = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const getVehicleFilter = useSelector(vehicleFilter);
  const contractorData = useSelector(byUserId);
  const getVehicleByContractorId = useSelector(vehicleByContractorId);

  const contractorID = contractorData?.id; // by id

  const [searchEmp, setSearchEmp] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //pagination
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  // functions
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
    GetByUserId(contractorID);
    /*author mazhar iqbal
      get vehicle filter attribute list
    */
    dispatch(GetVehicleFilter());
  }, []);

  useEffect(() => {
    dispatch(GetVehicleByContractorId({ contractorID, contractPagination }));
  }, [contractorData, page, rowsPerPage, orderBy, sortBy]);
  return (
    <div className="search-container">
      <div className="head my-3">
        <span className="search-container__heading">{t("vehicles")}</span>
        <div className="d-flex">
          <div className="ml-2">
            <button
              className="btn btn-lg"
              onClick={() => navigate(`/dashboard/Contractor/addvehical`)}
            >
              {t("add_vehicle")}
            </button>
          </div>
          <button
            className="p-2    ms-2 "
            style={{ width: "100%", height: "100%" }}
          >
            <i
              class="fa fa-filter"
              aria-hidden="true"
              style={{ fontSize: "30px" }}
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
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
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {t("status")}
                    </InputLabel>
                    <Select size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      defaultValue="employe"
                      value={sortBy}
                      label="EMPLOYEE"
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
                        ASC
                      </MenuItem>
                      <MenuItem
                        value={20}
                        sx={{
                          fontSize: "16px",
                        }}
                      >
                        DES
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: "30px" }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {t("order_by")}
                    </InputLabel>
                    <Select size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={orderBy}
                      label="ORDER BY"
                      onChange={(e) => setOrderBy(e.target.value)}
                      sx={{
                        fontSize: "16px",
                        padding: "3px 3px 3px 10px",
                      }}
                    >
                      {getVehicleFilter.length !== 0 &&
                        getVehicleFilter?.map((item) => {
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
                        })}
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
        {getVehicleByContractorId?.content
          ?.filter((user) => {
            if (searchEmp === "") {
              return user;
            } else if (
              user?.color?.toLowerCase().includes(searchEmp?.toLowerCase())
            ) {
              return user;
            }
          })
          .map((item) => (
            <ViewCard vehicles={item} />
          ))}
      </Grid>
      <div className="d-flex justify-content-center">
        <TablePagination
          component="div"
          rowsPerPageOptions={[8, 16, 24]}
          count={getVehicleByContractorId?.totalElements}
          page={page}
          onPageChange={handleChangePage}
          labelRowsPerPage={t("vehicles_per_page")}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root": {
              transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
            }
          }}
        />
      </div>
    </div>
  );
};

export default SearchVehicle;
