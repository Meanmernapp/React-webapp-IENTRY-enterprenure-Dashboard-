/*
Author: Mazhar Iqbal
Module: Backup     
*/

import React, { useState } from "react";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import CreateBackUp from "./Modal/CreateBackUp";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Link, useNavigate } from "react-router-dom";
import RestoreDataModal from "./Modal/RestoreDataModal";
import RestoreBackupModal from "./Modal/RestoreBackupModal";
import TablePagination from "@mui/material/TablePagination";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import searchIcon from "../../../assets/images/ic-search.svg"
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import emptyList from "../../../assets/images/warning.svg";
import cloudsvg from "../../../assets/images/cloud.svg";
import DeleteIcon from "../../../assets/images/redTrash.svg";
import sql from "../../../assets/images/sql.png";
import { useEffect } from "react";
import {
  getAllEntities,
  GetRecordInTimePeriod,
  RestoreTableInformation,
} from "../../../reduxToolkit/CompanyBackup/BackUpApi";
import { useSelector } from "react-redux";
import {
  allEntities,
  recordInTimePeriod,
  restoreDatabase,
  restoreSingleData,
} from "../../../reduxToolkit/CompanyBackup/backUpSlice";
import { toast } from "react-toastify";
import { permissionObj } from "../../../Helpers/permission";
import { t } from "i18next";
import { iconStyle, textFieldStyle } from "../../../Helpers/arabicStyle";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";

const BackUp = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();

  // use hook importer
  const GetAllEntities = useSelector(allEntities);
  const getRecordInTimePeriod = useSelector(recordInTimePeriod);
  const { permission } = useSelector(state => state.authenticatioauthennSlice);

  // use state hook  for local state managment
  const [selectModal, setSelectModal] = useState();
  const [pdfFile, setPdfFile] = useState();
  const [previewSize, setPreviewSize] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  //covert time into miliseconds
  var start = new Date(from);
  var startFrom = start.getTime();
  var end = new Date(to);
  var EndTo = end.getTime();

  //checkbox state and function
  const [selectedValue, setSelectedValue] = React.useState("a");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  //pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPer] = useState(8);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPer(parseInt(event.target.value));
    setPage(0);
  };
  //pagination End

  //Modal States
  const [createBackupModal, setCreateBackupModal] = useState(false);
  const [removeDataModal, setRemoveDataModal] = useState(false);
  const [restoreBackupModal, setRestoreBackupModal] = useState(false);

  //file size calculate function
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  //select file
  const onImageChange = async (e) => {
    const originalFile = e.target.files[0];
    const checkExtension = originalFile["type"].split("/")[0] === "image";
    if (!checkExtension) {
      const originalFile = e.target.files[0];
      setPdfFile(originalFile);
      let formatedValue = formatBytes(originalFile?.size);
      setPreviewSize(formatedValue);
      toast.info("File imported successfully");
    }
  };

  let Pagination = {
    order: false,
    page: page,
    size: rowsPerPage,
    sortBy: "id",
  };

  const handleSelect = (e) => {
    setSelectModal(e.target.value);

    if (startFrom && EndTo) {
      dispatch(
        GetRecordInTimePeriod({
          from: startFrom,
          to: EndTo,
          table: e.target.value,
          pagination: Pagination,
        })
      );
    } else {
      toast.warn("Please Select a Range")
    }


  };

  // useEffect(() => {
  //   if (startFrom && EndTo) {
  //     dispatch(
  //       GetRecordInTimePeriod({
  //         from: startFrom,
  //         to: EndTo,
  //         table: selectModal,
  //         pagination: Pagination,
  //       })
  //     );
  //   }
  // }, [page, rowsPerPage]);

  useEffect(() => {
    //get all modal filters
    dispatch(getAllEntities());
  }, []);

  const [checked, setChecked] = useState([]);

  //handle selected and unselected days list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  //restore only data using list
  const handleSubmitt = () => {
    dispatch(RestoreTableInformation({ table: selectModal, list: checked }));
  };
  return (
    <div>
      <div className="head">
        <div className="headLeft  addcontractor">
          {/* <Link to="/dashboard/employee/company">
            <i className="fa fa-arrow-left" aria-hidden="true" style={iconStyle} ></i>
          </Link> */}
          <h2>{t("backup")}</h2>
        </div>
        {
          permission?.includes(permissionObj?.WEB_BACK_UP_CREATE) &&
          <button
            className="btn btn-lg btn-hover"
            style={{ width: "270px" }}
            onClick={() => setCreateBackupModal(true)}
          >
            {t("create_backup")}
            <svg
              id="ic-database"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 25 25"
            >
              <path
                id="database-solid_2_"
                data-name="database-solid (2)"
                d="M21,3.75V6c0,2.072-4.7,3.75-10.5,3.75S0,8.072,0,6V3.75C0,1.679,4.7,0,10.5,0S21,1.679,21,3.75Zm-2.569,6.314A9.792,9.792,0,0,0,21,8.723V13.5c0,2.072-4.7,3.75-10.5,3.75S0,15.572,0,13.5V8.723a9.185,9.185,0,0,0,2.571,1.341A24.423,24.423,0,0,0,10.5,11.25a24.457,24.457,0,0,0,7.931-1.186Zm-15.86,7.5A24.423,24.423,0,0,0,10.5,18.75a24.457,24.457,0,0,0,7.931-1.186A9.792,9.792,0,0,0,21,16.223V20.25C21,22.322,16.3,24,10.5,24S0,22.322,0,20.25V16.223A9.185,9.185,0,0,0,2.571,17.564Z"
                fill="#fff"
              />
            </svg>
          </button>
        }

      </div>
      <div className="backup-option">
        <span className="backup-option__heading">{t("restore_data")}</span>
        <Grid container sx={{ px: 5, mt: 5 }}>
          <Grid item xs={12} md={8}>
            <span className="backup-option__checkbox">
              <Radio
                sx={{
                  color: "#146F62",
                  pl: 0,
                  my: 1,
                  "&.Mui-checked": {
                    color: "#146F62",
                  },
                }}
                checked={selectedValue === "a"}
                onChange={handleChange}
                value="a"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              {t("full_db")}
            </span>
          </Grid>
          <Grid item xs={12} md={4}>
            <span className="backup-option__checkbox">
              <Radio
                sx={{
                  color: "#146F62",
                  pl: 0,
                  my: 1,
                  ml: 2,
                  "&.Mui-checked": {
                    color: "#146F62",
                  },
                }}
                // checked={Lane1Type === '1'}
                // onChange={() => {
                //     setLane1Type('1')
                // }}
                checked={selectedValue === "b"}
                onChange={handleChange}
                value="b"
                name="radio-buttons"
                inputProps={{ "aria-label": "B" }}
              />
              {t("only_data")}
            </span>
          </Grid>
        </Grid>
      </div>
      {selectedValue === "a" && (
        <>
          <div className="backup-option__fullDB px-5 pb-4 pt-5">
            <div className="row"
              style={{ width: "100%" }}>
              <div style={{ width: "100%", margin: "15px" }}>
                <div className="updata_img_m">
                  <label
                    htmlFor="file-input"
                    className="dottedborderbox"
                    style={{ height: "150px", justifyContent: "space-around" }}
                  >
                    <img
                      src={cloudsvg}
                      alt="submitupload"
                      className="submitupload"
                    />
                    <input
                      type="file"
                      id="file-input"
                      accept=".sql"
                      onChange={onImageChange}
                    />
                    <p>
                      ARRASTRA <br />Ó <br /> SULETA TU ARCHIVO <br />{" "}
                      <b>UP TP 100 MB</b>
                    </p>
                  </label>
                </div>
                <div style={{ width: "100%" }}>
                  {pdfFile ? (
                    <div className="previewFile">
                      <Grid container spacing={3} sx={{ pl: 2 }}>
                        <Grid item xs={1}>
                          <img
                            src={sql}
                            style={{ width: "40px", height: "40px" }}
                            alt="imgs"
                          />
                        </Grid>
                        <Grid item xs={10}>
                          <p className="ms-2">{pdfFile?.name}</p>
                          <p className="ms-2">
                            <span>{t("size")}: </span>
                            {previewSize}
                          </p>
                        </Grid>
                        <Grid item xs={1}>
                          <img
                            src={DeleteIcon}
                            className="cancelIcon"
                            alt="ic_cancel"
                            style={{ width: "27px", height: "27px" }}
                            onClick={() => {
                              setPdfFile("");
                              toast.error("File Removed");
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="backup-option__fullDB">
            <div className="d-flex my-4">
              <button
                className="custom-primary-btn cancel-custom-btn"
                style={{ fontSize: "12px" }}
              >
                {t("cancel")}
              </button>
              {
                permission?.includes(permissionObj?.WEB_BACK_UP_FULL_RESTORE) &&
                <button
                  style={{ fontSize: "12px" }}
                  className="custom-primary-btn create-custom-btn"
                  onClick={() => {
                    dispatch(restoreDatabase(pdfFile));
                    setRestoreBackupModal(true);
                  }}
                >
                  {t("restore_full_backup")}
                </button>
              }
            </div>
          </div>
        </>
      )}
      {selectedValue === "b" && (
        <div className="backup-option__only-data">
          <spna className="backup-option__text my-4 ">
            {t("choose_date_and_data")}
          </spna>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box

              // className="inputField"

              >
                <LocalizationProvider dateAdapter={AdapterDateFns} sx={textFieldStyle} >
                  <DesktopDatePicker
                    label="FROM"
                    inputFormat="MM/dd/yyyy"
                    value={from}
                    onChange={setFrom}
                    renderInput={(params) => <TextField
                      fullWidth
                      size="small" {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box style={{ width: "100%" }} className="inputField">
                <LocalizationProvider dateAdapter={AdapterDateFns} sx={textFieldStyle}>
                  <DesktopDatePicker
                    label="TO"
                    inputFormat="MM/dd/yyyy"
                    value={to}
                    onChange={setTo}
                    renderInput={(params) => <TextField
                      fullWidth
                      size="small" {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item xs={4}
              sx={{
                display: 'flex',
                gap: "0.5rem",

              }}
            >
              <FormControl
                fullWidth
                size="small">
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{
                    pr: 2,
                    background: "#fff",
                    fontSize: "12px",
                    fontWeight: 900,
                  }}
                >
                  {t("model")}
                </InputLabel>
                <Select size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Age"
                  onChange={handleSelect}
                  MenuProps={{
                    fontSize: "10px",
                    fontSize: "12px",
                    color: "#707070",
                    sx: {
                      "&& .MuiList-root": {
                        backgroundColor: "#Fff",
                        fontSize: "12px",
                        letterSpacing: "0.00938em",
                        color: "rgba(0, 0, 0, 0.87)",
                      },
                      "&& .MuiMenuItem-root:hover": {
                        backgroundColor: "#e1e1e1",
                      },
                      "&& .MuiMenuItem-root": {
                        fontSize: "12px",
                        paddingLeft: "15px",
                        paddingRight: "15px",
                      },
                      "&& .Mui-selected": {
                        fontSize: "12px",
                        letterSpacing: "0.00938em",
                        color: "rgba(0, 0, 0, 0.87)",
                      },
                    },
                  }}
                  sx={textFieldStyle}
                >
                  {GetAllEntities?.length > 0 &&
                    GetAllEntities?.map((item) => {
                      return (
                        <MenuItem value={item}>
                          {item?.replaceAll("_", " ")}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <Grid sx={{
                boxShadow: "0px 0px 4px #00000029",
                borderRadius: '4px',
                background: "#707070 0% 0% no-repeat padding-box",
                width: '44px',
                height: '38px',
                display: "flex",
                alignItems: 'center',
                justifyContent: "center"
              }}>
                <img src={searchIcon} alt="" width={"24px"} height={"24px"} />
              </Grid>
            </Grid>

          </Grid>
          {getRecordInTimePeriod?.content?.length > 0 ? (
            <div className="providersTables mt-3">
              <table style={{ width: "100%" }}>
                <thead>
                  <th className="first_head">{t("id")}</th>
                  <th>{t("data")}</th>
                  <th>{t("deleted_by")}</th>
                  <th>{t("deleted_at")}</th>
                  <th className="last">{t("restore")}</th>
                </thead>
                {getRecordInTimePeriod?.content?.map((item, index) => {
                  const deletedDate = new Date(item?.deletedAt);
                  return (
                    <tr key={index}>
                      <td className="first" style={{ color: "#707070" }}>
                        <b>{item?.id}</b>
                      </td>
                      <td>
                        <span
                          className="backup-option__link"
                          onClick={() => {
                            // dispatch(GetInformationById({id:item?.id,table:selectModal}))
                            dispatch(
                              restoreSingleData({
                                id: item?.id,
                                table: selectModal,
                              })
                            );
                            setRemoveDataModal(true);
                          }}
                        >
                          {t("click_to_see_data")}
                        </span>
                      </td>
                      <td>Luis Cornejo Arreola</td>
                      <td>{deletedDate.toLocaleDateString("en-US")}</td>
                      <td className="last pr-5">
                        <input
                          type="checkbox"
                          value={`${item?.id}`}
                          onChange={handleCheck}
                        />
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
          ) : (

            <div className="mt-3">
              <NotFoundDataWarning text={t("no_backup")} />
            </div>
          )}

          {
            getRecordInTimePeriod?.content?.length > 0 &&
            <div className="d-flex justify-content-center">
              <TablePagination
                component="div"
                rowsPerPageOptions={[8, 16, 24]}
                count={getRecordInTimePeriod?.totalElements}
                page={page}
                onPageChange={handleChangePage}
                labelRowsPerPage={t("items_per_page")}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          }

          <div className="backup-option__fullDB">
            <div className="d-flex my-4">
              {/* <button
                className="custom-primary-btn cancel-custom-btn"
                style={{ fontSize: "12px" }}
              >
                {t("cancel")}
              </button> */}
              {
                permission?.includes(permissionObj?.WEB_BACK_UP_PARTIAL_RESTORE) &&
                <button

                  className="restore_btn"
                  onClick={handleSubmitt}
                >
                  {t("restore_data")}
                </button>
              }
            </div>
          </div>
        </div>
      )}

      <CreateBackUp
        check="false"
        show={createBackupModal}
        onHide={() => setCreateBackupModal(false)}
      />
      <RestoreDataModal
        check="false"
        show={removeDataModal}
        onHide={() => setRemoveDataModal(false)}
      />

      <RestoreBackupModal
        check="false"
        show={restoreBackupModal}
        onHide={() => setRestoreBackupModal(false)}
      />
    </div>
  );
};

export default BackUp;
