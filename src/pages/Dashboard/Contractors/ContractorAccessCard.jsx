import { LocalizationProvider, TimePicker } from "@mui/lab";
import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Button } from "react-bootstrap";
import DeleteIcon from "../../../assets/images/redTrash.svg";
import { useDispatch, useSelector } from "react-redux";
import { GetZoneTree } from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import {
  getZonetree,
  customScduleTime,
} from "../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice";
import { useEffect } from "react";
import moment from "moment";
import apiInstance from "../../../Apis/Axios";
import { useTranslation } from 'react-i18next'
import Cookies from "js-cookie";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
import { toast } from "react-toastify";

let day_arr = [];
let latestArray = [];
const ContractorAccessCard = ({
  heading1,
  heading2,
  update,
  isAddemployee,
}) => {
  const [fromValue, setfromValue] = useState(new Date("2014-08-18T21:11:54"));
  const [toValue, setToValue] = useState(new Date("2014-08-18T21:11:54"));

  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();

  const [userRemoveModal, setuserRemoveModal] = useState(false);

  const [selIndex, setSelIndex] = useState(null);

  let dispatch = useDispatch();
  const [data, setData] = useState();
  const zoneData = useSelector(getZonetree);

  const [allDays, setAllDays] = useState(false);
  const [allTime, setAllTime] = useState(false);
  const [checked, setChecked] = useState([]);
  // const [index, setIndex] = useState();
  const [toM, setToM] = useState();
  const [fromM, setFromM] = useState()
  const [deleteindex, setDeleteIndex] = useState()



  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  useEffect(() => {
    /*author mazhar iqbal
      get zone tree
    */
    dispatch(GetZoneTree());
  }, []);

  let [array, setArray] = useState([]);
  const handleCLick = async () => {
    const updateArray = [...array];
    for (let i = 0; i < checked.length; i++) {
      for (let j = 0; j < day_arr.length; j++) {
        let x = {
          zone: { id: checked[i] },
          day: { id: day_arr[j] },
          from: moment(fromValue).format("HH:mm:ss"),
          to: moment(toValue).format("HH:mm:ss"),
        };

        updateArray.push(x);
      }
    }
    latestArray = updateArray;

    if (checked.length && day_arr.length) {

      if (fromValue?.getTime() < toValue.getTime()) {
        setArray(updateArray);
        dispatch(customScduleTime(updateArray));
        // setChecked([])
        // day_arr = []
        // latestArray = []
        // setAllDays(false)
        // setAllTime(false)



      } else {
        toast.warn("From should be less then To")
      }


    } else {
      toast.warn("Please Fill all the fields!")
    }

    // await addContractWorkShift();
  };

  const selectAllDays = (event) => {
    if (event.target.checked) {
      day_arr = [1, 2, 3, 4, 5, 6, 0];
    } else {
      day_arr = [];
    }
    setAllDays(!allDays);
  };

  const handleAllTime = (event) => {
    if (event.target.checked) {
      setfromValue(new Date(-2211769692000));
      setToValue(new Date(-2211683293000));
    } else {
      setfromValue();
      setToValue();
    }
    setAllTime(!allTime);
  };
  const addContractWorkShift = async () => {
    let data = JSON.stringify(latestArray);
    await apiInstance
      .post(`work-shift-service/contract-work/create-list`, data, {
        headers: {
          "content-Type": "application/json",
        },
      })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        return error.response;
      });
  };

  const handleMon = (event) => {
    if (event.target.checked) {
      day_arr.push(event.target.value);
    } else {
      day_arr.pop(event.target.value);
    }
  };
  const handleTue = (event) => {
    if (event.target.checked) {
      day_arr.push(event.target.value);
    } else {
      day_arr.pop(event.target.value);
    }
  };
  const handleWed = (event) => {
    if (event.target.checked) {
      day_arr.push(event.target.value);
    } else {
      day_arr.pop(event.target.value);
    }
  };
  const handleThur = (event) => {
    if (event.target.checked) {
      day_arr.push(event.target.value);
    } else {
      day_arr.pop(event.target.value);
    }
  };
  const handleFri = (event) => {
    if (event.target.checked) {
      day_arr.push(event.target.value);
    } else {
      day_arr.pop(event.target.value);
    }
  };
  const handleSat = (event) => {
    if (event.target.checked) {
      day_arr.push(event.target.value);
    } else {
      day_arr.pop(event.target.value);
    }
  };
  const handleSun = (event) => {
    if (event.target.checked) {
      day_arr.push(event.target.value);
    } else {
      day_arr.pop(event.target.value);
    }
  };

  const removeShift = () => {
    let arrayForSort = [...array];
    arrayForSort.splice(selIndex, 1);
    setArray(arrayForSort);
    /*author mazhar iqbal
        remove selected acces time from custom created acces time 
      */
    dispatch(customScduleTime(arrayForSort));
  };

  function UserRemove(props) {
    const { from, to, deleteindex } = props;

    return (
      <div className="primary-modal" style={{ background: "red" }}>
        <Modal
          {...props}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{ background: "rgba(0,0,0,0.00001)!important" }}
        >
          <button onClick={props.onHide} className="modal-close-btn">
            X
          </button>
          <span className="main-modal-heading">REMOVE ACCESS</span>
          <div className="unlink-modal-body">
            <span
              className="modal-desc-text"
              style={{ color: "#000", fontSize: "12px", fontWeight: 400 }}
            >
              Are you sure that would you like to remove to <br /> the access {from} to
              {to} in the work shift <span style={{ fontWeight: "bold" }}>Morning?</span>
              {/* {deleteindex} */}
            </span>

            <div className="btn-div">
              <button
                className="button-sec btn-cancel"
                style={{ color: "red" }}
                onClick={props.onHide}
              >
                CANCEL
              </button>
              <button
                className="button-sec btn-confirm"
                onClick={() => {
                  removeShift();
                  setuserRemoveModal(false);
                }}
              >
                CONFIRM
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <div className="pt-3 row">
      <div className="col-lg-6">
        <div className={heading1 === "zones" ? "access_text" : "work_text"}>
          <p>{heading1}</p>
        </div>

        <div className="checkboxes_m">
          {zoneData &&
            zoneData.map((item) => {
              // console.log("single item", item);
              return (
                <ol>
                  <li>
                    <i
                      className="fa fa-angle-right angeL_rights"
                      aria-hidden="true"
                      style={{
                        transform: lCode === "ar" ? "scaleX(-1)" : "",
                        // margin: "0 10px"
                      }}
                    ></i>
                    <input
                      type="checkbox"
                      value={`${item?.id},${item?.name}`}
                      onChange={handleCheck}
                    />
                    <span className="sm_res">{item?.name}</span>
                  </li>
                  {item?.children &&
                    item?.children.map((childItem) => {
                      return (
                        <ul>
                          <li>
                            <i
                              className="fa fa-angle-right angeL_rights"
                              aria-hidden="true"
                              style={{
                                transform: lCode === "ar" ? "scaleX(-1)" : "",
                                margin: "0 10px"
                              }}
                            ></i>
                            <input
                              type="checkbox"
                              value={`${childItem?.id},${childItem?.name}`}
                              onChange={handleCheck}
                            />
                            <span className="sm_res">{childItem?.name}</span>

                            <ul className="nested_checkbox">
                              {childItem &&
                                childItem?.children.map((grandChild) => {
                                  // console.log("grand child", grandChild);
                                  return (
                                    <li>
                                      <input
                                        type="checkbox"
                                        value={`${grandChild?.id},${grandChild?.name}`}
                                        onChange={handleCheck}
                                      />
                                      <span className="sm_ress">
                                        {grandChild?.name}
                                      </span>
                                    </li>
                                  );
                                })}
                            </ul>
                          </li>
                        </ul>
                      );
                    })}
                </ol>
              );
            })}
        </div>
      </div>
      <div className="col-lg-6">

        <div className={heading2 === "days" ? "access_text" : "work_text"}>
          <p>{heading2}</p>
        </div>
        <div
          className="main_content days_card"
          style={{
            background: "#e1e1e1",
            paddingRight: "15px",
            paddingLeft: "15px",
          }}
        >
          <div
            className="d-flex justify-content-between contract-custom-checkbox"
            style={{ paddingTop: "2px" }}
          >
            <article>
              <input
                type="checkbox"
                value={1}
                onChange={handleMon}
                checked={allDays ? allDays : null}
              />

              <span className="days-text-style">
                M
                <br />
              </span>
            </article>
            <article>
              <input
                type="checkbox"
                value={2}
                onChange={handleTue}
                checked={allDays ? allDays : null}
              />

              <span className="days-text-style">
                T
                <br />
              </span>
            </article>
            <article>
              <input
                type="checkbox"
                value={3}
                onChange={handleWed}
                checked={allDays ? allDays : null}
              />

              <span className="days-text-style">
                W
                <br />
              </span>
            </article>
            <article>
              <input
                type="checkbox"
                value={4}
                onChange={handleThur}
                checked={allDays ? allDays : null}
              />

              <span className="days-text-style">
                T
                <br />
              </span>
            </article>
            <article>
              <input
                type="checkbox"
                value={5}
                onChange={handleFri}
                checked={allDays ? allDays : null}
              />

              <span className="days-text-style">
                F
                <br />
              </span>
            </article>
            <article>
              <input
                type="checkbox"
                value={6}
                onChange={handleSat}
                checked={allDays ? allDays : null}
              />

              <span className="days-text-style">
                S
                <br />
              </span>
            </article>
            <article>
              <input
                type="checkbox"
                value={0}
                onChange={handleSun}
                checked={allDays ? allDays : null}
              />

              <span className="days-text-style">
                S
                <br />
              </span>
            </article>
          </div>

          <div className="all_checkbox">
            <input type="checkbox" checked={allDays} onChange={selectAllDays} />{" "}
            ALL Days
          </div>
        </div>

        <div className="col-md-12 p-0">
          <div className="mt-5 access_text">
            <p>{t("hours")}</p>
            <div className="mt-3">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  renderInput={(props) => (
                    <TextField size="small" style={{ width: "100%" }} {...props} />
                  )}
                  ampm={false}
                  openTo="hours"
                  views={["hours", "minutes", "seconds"]}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  label={t("from")}
                  value={fromValue}
                  onChange={(newValue) => {
                    setfromValue(newValue);
                    // console.log({ newValue });
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="mt-3">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  renderInput={(props) => (
                    <TextField size="small" style={{ width: "100%" }} {...props} />
                  )}
                  ampm={false}
                  openTo="hours"
                  views={["hours", "minutes", "seconds"]}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  label={t("to")}
                  value={toValue}
                  onChange={(newValue) => {
                    setToValue(newValue);
                  }}
                />
              </LocalizationProvider>
            </div>
            <div className="all_checkbox">
              <input
                type="checkbox"
                checked={allTime}
                onChange={handleAllTime}
              />{" "}
              ALL Time
            </div>
          </div>
          <div className="btnDiv d-flex justify-content-end">
            <Button
              className="add-access-btn"
              style={{ fontWeight: "bold" }}
              onClick={(e) => {
                handleCLick(e);
              }}
            >
              {t("add_access")}
              <AddIcon style={{ marginLeft: "10px" }} />
            </Button>
          </div>
        </div>
      </div>

      <div className="access-sec">
        <span className="contractor-access-heading">{t("access")}</span>
        {array?.length > 0 ?
          <>
            <Grid container sx={{ mt: 1 }}>
              <Grid
                item
                xs={4}
                className="contractor-access-table-heading"
                sx={{ textAlign: "left" }}
              >
                {t("name")?.toUpperCase()}
              </Grid>
              <Grid item xs={2} className="contractor-access-table-heading">
                DAY
              </Grid>
              <Grid item xs={2} className="contractor-access-table-heading">
                {t("from")?.toUpperCase()}
              </Grid>
              <Grid item xs={2} className="contractor-access-table-heading">
                {t("to")?.toUpperCase()}
              </Grid>
              <Grid item xs={1} className="contractor-access-table-heading">
                {t("remove")?.toUpperCase()}
              </Grid>
            </Grid>
            {
              array?.map((item, index) => {
                return (
                  <Grid container sx={{ mt: 1 }}>
                    <Grid item xs={4} className="contractor-access-table-first">
                      {item?.zone?.id?.split(",", 2)[1]}
                    </Grid>
                    <Grid item xs={2} className="contractor-access-table-data">
                      {(item?.day?.id == 3 && "Wednesday") ||
                        (item?.day?.id == 1 && "Monday") ||
                        (item?.day?.id == 2 && "Tuesday") ||
                        (item?.day?.id == 4 && "Thursday") ||
                        (item?.day?.id == 5 && "Friday") ||
                        (item?.day?.id == 6 && "Saturday") ||
                        (item?.day?.id == 0 && "Sunday")}
                    </Grid>
                    <Grid item xs={2} className="contractor-access-table-data">
                      {item?.from}
                    </Grid>
                    <Grid item xs={2} className="contractor-access-table-data">
                      {item?.to}
                    </Grid>
                    <Grid item xs={1} className="contractor-access-table-data">
                      <img
                        src={DeleteIcon}
                        className="acces-hover-effect"
                        onClick={() => {
                          setuserRemoveModal(true);
                          setSelIndex(index);
                          // setIndex(index)
                          setToM(item?.to)
                          setFromM(item?.from)
                          setDeleteIndex(index)

                        }}
                      />

                    </Grid>
                  </Grid>
                );
              })}
          </> :
          <NotFoundDataWarning text={t("there_are_no_access_selected")} />
        }
        <UserRemove
          show={userRemoveModal}
          onHide={() => setuserRemoveModal(false)}
          from={fromM}
          to={toM}
          deleteindex={deleteindex}
        />
      </div>
    </div>
  );
};

export default ContractorAccessCard;
