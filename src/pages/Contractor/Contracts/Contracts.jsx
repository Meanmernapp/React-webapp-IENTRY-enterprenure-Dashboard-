import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Popover from "@mui/material/Popover";
import TablePagination from "@mui/material/TablePagination";
import Switch from "@mui/material/Switch";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

import ContractCard from "./ContractCard";
import { useDispatch, useSelector } from "react-redux";
import { GetAllEmployeeContracts } from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import {
  GetActiveContracts,
  GetContractsByTime,
} from "../../../reduxToolkit/Contractor/ContractorApi";
import { activeContarcts } from "../../../reduxToolkit/Contractor/ContractorSlice";
import apiInstance from "../../../Apis/Axios";
import emptyList from "../../../assets/images/warning.svg";
import i18next, { t } from "i18next";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";

const Contracts = () => {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [employee, setEmployee] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const [orderby, setOrderby] = useState("id");
  const [showIncome, setShowIncome] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [show, setShow] = useState(false);
  const [allFilters, setAllFilters] = useState("id");
  const [sort, setSort] = useState();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //

  const [checked, setChecked] = useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  //pagination

  const fetchAllContractors = useSelector(activeContarcts);

  const [pagePagination, setPagePagination] = useState(0);
  const [rowsPerPageProvider, setRowsPerProvider] = useState(8);

  const handleChangePageProvider = (event, newPage) => {
    setPagePagination(newPage);
  };

  const handleChangeRowsPerPageProvider = (event) => {
    setRowsPerProvider(parseInt(event.target.value));
    setPagePagination(0);
  };

  let contractPagination = {
    order: true,
    page: pagePagination,
    size: rowsPerPageProvider,
    sortBy: orderby,
  };

  const fetchFilterApi = async () => {
    const result = await apiInstance
      .get("assets-service/contract/get-filters")
      .then(function (response) {
        setAllFilters(response?.data?.data);
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  };

  var now = new Date();
  var nowIso = now.toISOString();
  var nowInMilliseconds = Date.parse(nowIso);

  let inCommingActive = checked
    ? `incoming-active/${nowInMilliseconds}`
    : `records/${nowInMilliseconds}`;

  useEffect(() => {
    /*Author  Mazhar iqbal
       get filter list with attributes to sort
    */
    fetchFilterApi();
  }, []);

  useEffect(() => {
    if (checked) {
      /*Author  Mazhar iqbal
        Get Incomming Contracts
      */
      dispatch(GetActiveContracts({ inCommingActive, contractPagination }));
    } else {
      /*Author  Mazhar iqbal
       Get Contracts Record
     */
      dispatch(GetContractsByTime({ inCommingActive, contractPagination }));
    }
  }, [checked, pagePagination, rowsPerPageProvider, orderby]);

  return (
    <div className="contracts-main-container">
      <Grid container sx={{ my: "30px" }}>
        <Grid item xs={8} sx={{ display: "flex" }}>
          <div className="head me-4">
            <div className="headLeft">
              <h2>{t("contract")}</h2>
            </div>
          </div>
          <div className="pt-3">
            <span className="d-flex font-weight-bold">{t("options")}</span>
            <label className={checked ? null : "contract-option-label"}>
              {t("incoming")}
            </label>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
              color="success"
            />
            <label className={checked ? "contract-option-label" : null}>
              {t("records")}
            </label>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div
            className="head d-flex justify-content-end mt-2"
            style={{ position: "relative" }}
          >
            <div className="d-flex">
              {toggleState === 1 && (
                <i
                  class="fa fa-filter filterPopup"
                  aria-hidden="true"
                  onClick={() => setShowIncome(true)}
                ></i>
              )}
            </div>

            {showIncome && (
              <div
                className="col-md-3 filter_parent w-100"
                style={{
                  top: "0px",
                  zIndex: "101",
                  maxWidth: "100%",
                }}
              >
                <p className="filter_header">
                  {t("filters")}
                  <CloseIcon
                    style={{
                      marginTop: "10px",
                      color: "red",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowIncome(false)}
                  />
                </p>
                <div className="filter_body d-flex justify-content-between py-3">
                  <div className="col-md-12">
                    <p>{t("attributes")}</p>
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
                        <InputLabel>{t("order_by")}</InputLabel>
                        <Select size="small"
                          value={orderby}
                          label={t("order_by")}
                          onChange={(e) => setOrderby(e.target.value)}
                        >
                          {allFilters &&
                            allFilters?.map((item) => {
                              return <MenuItem value={item}>{item}</MenuItem>;
                            })}
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
                          value={sort}
                          label={t("sort")}
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
            )}
          </div>
        </Grid>
      </Grid>
      <div className="contracts-container">
        <Grid container sx={{ my: "30px" }} spacing={3}>
          {fetchAllContractors?.totalElements > 0 ? (
            fetchAllContractors?.content?.map((item) => {
              return (
                <Grid item xs={3}>
                  <ContractCard data={item} />
                </Grid>
              );
            })
          ) : (
            <NotFoundDataWarning text={t("no_contracts")} />

          )}
        </Grid>
      </div>
      <div className="d-flex justify-content-center">
        <TablePagination
          component="div"
          rowsPerPageOptions={[8, 16, 24]}
          count={fetchAllContractors?.totalElements}
          page={pagePagination}
          onPageChange={handleChangePageProvider}
          labelRowsPerPage={t("contracts_per_page")}
          rowsPerPage={rowsPerPageProvider}
          onRowsPerPageChange={handleChangeRowsPerPageProvider}
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

export default Contracts;
