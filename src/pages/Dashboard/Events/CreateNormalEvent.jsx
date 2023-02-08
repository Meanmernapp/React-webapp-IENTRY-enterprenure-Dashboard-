import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, TextField, Box, InputAdornment } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider, TimePicker } from "@mui/lab";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Visitors from "./CreateOnuEvents/Visitors"
import companyImage from "../../../assets/images/companyImg.png";
import flower from "../../../assets/images/plant.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { saveNormalEventDetail, updateSelectedEmployees } from "../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice";
import { allZonesList, createNormalEvent, createUserInvitation } from "../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next';
import ic_birthday from '../../../assets/images/ic-birthday.svg'
import emptyList from "../../../assets/images/warning.svg";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";


const CreateNormalEvent = () => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detailData = useSelector(state => state?.EmployeeEventsSlice?.normalEventDetails);
  const userData = useSelector(state => state?.authenticatioauthennSlice?.user.data);
  const allZones = useSelector(state => state?.EmployeeEventsSlice?.zonesList);
  const guestData = useSelector(state => state?.EmployeeEventsSlice?.emailPhoneSearchList);
  const selectedEmployees = useSelector(state => state?.EmployeeEventsSlice?.selectedEmployees);
  const allEmployees = useSelector(state => state?.EmployeeEventsSlice?.allEmployees);
  const [toggleState, setToggleState] = useState(0);
  const [hostChecked, setHostChecked] = useState(false);
  const [eventDetail, setEventDetail] = useState({
    name: detailData.name,
    date: detailData.date,
    time: detailData.time,
    duration: detailData.duration,
  });
  const [endDate, setEndDate] = useState();
  const [selectedZones, setSelectedZones] = useState();
  const [selectedHostEmp, setSelectedHostEmp] = useState();
  const [hostObject, setHostObject] = useState({
    name: selectedHostEmp?.name,
    email: selectedHostEmp?.email,
    phoneNo: selectedHostEmp?.phoneNo,
  });
  console.log("allzone", allZones)

  useEffect(() => {
    setSelectedHostEmp({})
  }, [hostChecked])

  const toggleTab = (index) => {
    // setToggleState(index);
  };

  const handleReserve = (value) => {
    setSelectedZones(value)
  }

  const handleSubmit = (moveState) => {

    const { name, date, time, duration } = eventDetail;
    if (moveState === 0) {
      if (name !== "" && date !== "" && time !== "" && duration !== "") {
        dispatch(saveNormalEventDetail(eventDetail))
        dispatch(allZonesList({
          startDate: Math.round(date?.getTime()),
          endDate: Math.round(endDate?.getTime()),
          userId: userData?.id
        }))
        moveState + 1 < 3 && setToggleState((prevState) => prevState + 1);
      } else {
        toast.error("please fill all fields..!")
      }
    } else if (moveState === 1) {
      if (selectedZones.length !== 0) {

        moveState + 1 < 3 && setToggleState((prevState) => prevState + 1);
      } else {
        toast.error("Must select zone..!")
      }
    } else if (moveState === 2) {
      if (selectedEmployees?.length > 0) {
        const body = {
          user: {
            id: userData?.id
          },
          host: {
            id: selectedHostEmp?.id ? selectedHostEmp?.id : userData?.id
          },
          reservation: {
            zone: {
              id: selectedZones?.zoneId
            }
          },
          name: detailData?.name,
          visitPurpose: "No comments.",
          duration: detailData?.duration,
          startDate: detailData?.date.getTime()
        }
        dispatch(createNormalEvent(body))
          .then(({ payload: { data: { data } } }) => {
            let employeeOtherGuests = [];
            guestData.map(item => {
              employeeOtherGuests.push({
                guest: {
                  id: item.id
                },
                guestNumber: 4
              })
            })
            selectedEmployees.map(item => {
              employeeOtherGuests.push({
                guest: {
                  id: item.id
                },
                guestNumber: 4
              })
            })
            // console.log(employeeOtherGuests)
            const invitBody = {
              eventId: data?.id,
              userInvitations: employeeOtherGuests
            }
            dispatch(createUserInvitation(invitBody))
              .then(({ payload: { data: { data } } }) => {
                console.log(data)
                if (data !== null) {
                  dispatch(saveNormalEventDetail({
                    name: "",
                    date: "",
                    time: "",
                    duration: "",
                  }))
                  dispatch(updateSelectedEmployees([]));
                  navigate('/dashboard/employee/events');
                }
              });
          });
      } else {
        toast.error("You must atleast one person to invite")
      }

    }
  }

  return (
    <div className="providersPanel CreateEventPanel">
      <div className="head">
        <div className='headLeft'>
          <Link to="/dashboard/employee/events">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}

            ></i>
          </Link>
          <h2>{t('create_event')}</h2>
        </div>
      </div>
      <div className="row steps-row mb-2 mt-3" id="pills-tab" role="tablist">
        <div className="col-4 tab" role="presentation">
          <a
            className={`steps btn ${toggleState === 0 ? "active-border" : "disable-border"
              }`}
            onClick={() => toggleTab(0)}
            style={{ width: "100%" }}
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            <span>{t('detail')}</span>
          </a>
        </div>
        <div className="col-4 tab tab-right" role="presentation">
          <a
            className={`steps btn ${toggleState === 1 ? "active-border" : "disable-border"
              }`}
            onClick={() => toggleTab(1)}
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            style={{ width: "100%" }}
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            <span>{t('reservation')}</span>
          </a>
        </div>
        <div className="col-4 tab tab-right" role="presentation">
          <a
            className={`steps btn ${toggleState === 2 ? "active-border" : "disable-border"
              }`}
            onClick={() => toggleTab(2)}
            id="pills-home-tab"
            data-bs-toggle="pill"
            style={{ width: "100%" }}
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            <span>{t('invitations')}</span>
          </a>
        </div>
      </div>
      {toggleState === 0 && (
        <div className="content">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} sx={{ position: "relative" }}>
              <p>{t('event_name')}</p>
              <TextField
                size="small"
                fullWidth
                label={t('name')}
                id="NAME"

                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img src={ic_birthday} alt="ic_birthday" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  textAlign: lCode === "ar" ? "right" : "left",

                  "& 	.MuiOutlinedInput-notchedOutline": {
                    textAlign: lCode === "ar" ? "right" : "left",
                  },
                  "& 	.MuiInputLabel-root": {
                    fontSize: 12,
                    left: lCode === "ar" ? "inherit" : "0",
                    right: lCode === "ar" ? "1.75rem" : "0",
                    transformOrigin: lCode === "ar" ? "right" : "left"
                  }
                }}
                value={eventDetail.name}
                onChange={(e) => setEventDetail({ ...eventDetail, "name": e.target.value })}
              />
            </Grid>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={6}>
              <p>{t('choose_a_date')}</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack>
                  <DesktopDatePicker
                    label={t('fecha')}
                    inputFormat="dd/MM/yyyy"
                    value={eventDetail.date}
                    disablePast
                    onChange={(e) => setEventDetail({ ...eventDetail, "date": e })}
                    renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <p>{t('choose_a_time')}</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  renderInput={(props) => <TextField fullWidth size="small" {...props} />}
                  ampm={false}
                  openTo="hours"
                  views={["hours", "minutes", "seconds"]}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  className="timeInput"
                  label={t('hora')}
                  value={eventDetail.time}
                  onChange={(e) => setEventDetail({ ...eventDetail, "time": e })}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField size="small"
                fullWidth
                label={t('duration')}
                id="NAME"
                value={eventDetail.duration}
                onChange={(e) => {
                  // const d = new Date();
                  // d.setUTCDate(eventDetail.date.getUTCDate() + Number(e.target.value));
                  // setEndDate(d)
                  setEventDetail({ ...eventDetail, "duration": Number(e.target.value) })
                }}
                InputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  endAdornment: (
                    <InputAdornment position="end">
                      <span style={{
                        fontSize: "10px"
                      }}> MIN.</span>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  textAlign: lCode === "ar" ? "right" : "left",
                  "& 	.MuiOutlinedInput-notchedOutline": {
                    textAlign: lCode === "ar" ? "right" : "left",
                  },
                  "& 	.MuiInputLabel-root": {
                    fontSize: 12,
                    left: lCode === "ar" ? "inherit" : "0",
                    right: lCode === "ar" ? "1.75rem" : "0",
                    transformOrigin: lCode === "ar" ? "right" : "left"
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12} md={6} sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <p style={{ fontSize: "12px" }}>{t('choose_the_host')}</p>
              <p className="checkboxOther" style={{ textAlign: "right", display: "flex" }}>
                <input
                  type="checkbox"
                  checked={hostChecked}
                  onChange={() => setHostChecked(!hostChecked)}
                  style={{ marginRight: "10px" }}
                />
                {t('other_is_the_host')}
              </p>
            </Grid>
          </Grid>

          <div
            className=" "

          >
            <div
              className="HostSection"
              style={{
                width: "50%",
                marginTop: "2rem"
              }}
            >
              {/* <p>{t('choose_the_host')}</p>
              <p className="checkboxOther" style={{ textAlign: "right" }}>
                <input
                  type="checkbox"
                  checked={hostChecked}
                  onChange={() => setHostChecked(!hostChecked)}
                  style={{ marginRight: "10px" }}
                />
                {t('other_is_the_host')}
              </p> */}
              {
                hostChecked ?
                  <div className=" ">
                    <div className="">
                      <div className="name">
                        <Grid
                          container
                          spacing={2}
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <Grid item xs={12}>
                            <Box sx={{ mt: "6px" }}>
                              <FormControl
                                fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  {t('employee')}
                                </InputLabel>
                                <Select
                                  size="small"
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  defaultValue="employee"
                                  value={hostObject.employee}
                                  label={t('employee')}
                                  onChange={(e) => setSelectedHostEmp(e.target.value)}
                                  sx={{
                                    // fontSize: "14px",
                                  }}
                                >
                                  {
                                    allEmployees?.map(item => (
                                      <MenuItem
                                        value={item}
                                        sx={{
                                          fontSize: "14px",
                                        }}
                                      >
                                        {item.name}
                                      </MenuItem>
                                    ))
                                  }
                                </Select>
                              </FormControl>
                            </Box>
                          </Grid>
                        </Grid>
                      </div>
                      <div className="name">
                        <Grid
                          container
                          spacing={2}
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <Grid item xs={12} sx={{ position: "relative" }}>
                            <TextField size="small"
                              sx={{
                                textAlign: lCode === "ar" ? "right" : "left",
                                "& 	.MuiOutlinedInput-notchedOutline": {
                                  textAlign: lCode === "ar" ? "right" : "left",
                                },
                                "& 	.MuiInputLabel-root": {
                                  fontSize: 12,
                                  left: lCode === "ar" ? "inherit" : "0",
                                  right: lCode === "ar" ? "1.75rem" : "0",
                                  transformOrigin: lCode === "ar" ? "right" : "left"
                                }
                              }}
                              fullWidth
                              label={t('name')}
                              id="NAME"
                              disabled
                              defaultValue=" "
                              value={selectedHostEmp?.name}
                              onChange={(e) => setHostObject({ ...hostObject, ["name"]: e.target.value })}
                              inputProps={{
                                sx: {
                                  border: "none",
                                  outline: "none",
                                  fontSize: "10px",
                                  letterSpacing: "0px",
                                  color: "#707070",
                                  "&::placeholder": {
                                    color: "#707070",
                                    fontSize: "12px",
                                  },
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sx={{ position: "relative" }}>

                            <TextField size="small"
                              fullWidth
                              sx={{
                                textAlign: lCode === "ar" ? "right" : "left",
                                "& 	.MuiOutlinedInput-notchedOutline": {
                                  textAlign: lCode === "ar" ? "right" : "left",
                                },
                                "& 	.MuiInputLabel-root": {
                                  fontSize: 12,
                                  left: lCode === "ar" ? "inherit" : "0",
                                  right: lCode === "ar" ? "1.75rem" : "0",
                                  transformOrigin: lCode === "ar" ? "right" : "left"
                                }
                              }}
                              disabled

                              defaultValue={selectedHostEmp?.email}
                              label={t('email')}
                              value={selectedHostEmp?.email}
                              onChange={(e) => setHostObject({ ...hostObject, ["email"]: e.target.value })}
                              // font size of input label
                              inputProps={{
                                sx: {
                                  border: "none",
                                  outline: "none",
                                  fontSize: "10px",
                                  letterSpacing: "0px",
                                  color: "#707070",
                                  "&::placeholder": {
                                    color: "#707070",
                                    fontSize: "12px",
                                  },
                                },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </div>
                      <div className="name">
                        <Grid container spacing={4}>
                          <Grid item xs={12} sx={{ position: "relative" }}>
                            <TextField size="small"
                              sx={{
                                textAlign: lCode === "ar" ? "right" : "left",
                                "& 	.MuiOutlinedInput-notchedOutline": {
                                  textAlign: lCode === "ar" ? "right" : "left",
                                },
                                "& 	.MuiInputLabel-root": {
                                  fontSize: 12,
                                  left: lCode === "ar" ? "inherit" : "0",
                                  right: lCode === "ar" ? "1.75rem" : "0",
                                  transformOrigin: lCode === "ar" ? "right" : "left"
                                }
                              }}
                              fullWidth


                              label={'phone_number'}
                              defaultValue=" "
                              disabled
                              value={selectedHostEmp?.phoneNumber}
                              onChange={(e) => setHostObject({ ...hostObject, ["phoneNo"]: e.target.value })}
                              InputLabelProps={{
                                // style: {
                                //   fontSize: "10px",
                                //   fontWeight: 600,
                                //   background: "#ffffff",
                                //   padding: "0px 0px 0px 4px",
                                // },
                              }} // font size of input label
                              inputProps={{
                                sx: {
                                  border: "none",
                                  outline: "none",
                                  fontSize: "10px",
                                  letterSpacing: "0px",
                                  color: "#707070",
                                  "&::placeholder": {
                                    color: "#707070",
                                    fontSize: "12px",
                                  },
                                },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </div> : null
              }
            </div>
          </div>
        </div>
      )}
      {toggleState === 1 && (
        <div className="content2">
          <div className="row">
            <p className="headline">{t('choose_a_common_area_to_reservate')}</p>
            {
              allZones?.length !== 0 ?
                allZones?.map((value) => (
                  <div
                    className="col-12 col-md-6"
                    key={value?.zoneId}
                  >
                    <div
                      className="reservationCard"
                      style={{
                        backgroundColor: value?.zoneId === selectedZones?.zoneId ? "#E1E1E1" : ""
                      }}
                      onClick={() => handleReserve(value)}
                    >
                      {value?.isCommonArea && <img className="flowerImg" src={flower} alt="flower" />}
                      <div className="d-flex justify-content-between w-100">
                        <div className="data">
                          <p className="heading">{value?.name}</p>
                          <p><span>
                            {t("from")}: {value?.from || "-"} {t("to")} {value?.to || "-"}
                          </span></p>
                          {/* <span className="description">
                      Alberca principal, 3 m.
                    </span> */}
                          <p className="status" style={{
                            color: value?.statusId == "11" && "#178A7B" ||
                              value?.statusId == "12" && "#BC0000"

                          }}>{
                              value?.statusId == "11" && t("active") ||
                              value?.statusId == "12" && t("in_active")
                            }</p>
                        </div>
                        {/* <img className="companyImage" src={companyImage} alt="companyImage" /> */}
                      </div>
                    </div>
                  </div>
                )) :
                <div className="row unavailableEventParent">
                  <p className="unavailableEvent">
                    {t('unavailable')}
                    <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                  </p>
                </div>
            }
          </div>
          <div className="row mt-3">
            <p className="headline2">{t('reservation')}</p>
            {
              selectedZones ?
                // selectedZones?.map((value) => (
                <div className="col-12 col-md-6" key={selectedZones?.zoneId}>
                  <div
                    className="reservationCard"
                  >
                    {selectedZones?.isCommonArea && <img className="flowerImg" src={flower} alt="flower" />}
                    <div className="d-flex justify-content-between w-100">
                      <div className="data">
                        <p className="heading">{selectedZones?.name}</p>
                        <p><span>
                          {t("from")}: {selectedZones?.from || "-"} {t("to")} {selectedZones?.to || "-"}
                        </span></p>
                        {/* <span className="description">
                      Alberca principal, 3 m.
                    </span> */}
                        {/* <p className="status">{selectedZones?.status?.name?.split("_")[0]}</p> */}
                        <p className="status" style={{
                          color: selectedZones?.statusId == "11" && "#178A7B" ||
                            selectedZones?.statusId == "12" && "#BC0000"

                        }}>{
                            selectedZones?.statusId == "11" && t("active") ||
                            selectedZones?.statusId == "12" && t("in_active")
                          }</p>
                      </div>
                      {/* <img className="companyImage" src={companyImage} alt="companyImage" /> */}
                    </div>
                  </div>
                </div> :
                // )) :
                <NotFoundDataWarning text={t("no_choosed")} />
              // <div className="unavailableEventParent">
              //   <p className="unavailableEvent">
              //     {t('no choosed')}
              //     <img
              //       src={emptyList}
              //       alt="empty-List"
              //       style={{
              //         width: "50px",
              //         height: "50%",
              //         marginLeft: "1rem"
              //       }}
              //     />
              //   </p>
              // </div>
            }
          </div>
        </div>
      )}
      {toggleState === 2 && (
        <div style={{ width: "75%", margin: "auto" }}>
          <Visitors />
        </div>
      )}
      <div className="EventBtns">
        {
          toggleState !== 0 ?
            <button
              className="custom_btn_cancel_gray_hover"
              style={{ width: "284px" }}
              onClick={() =>
                toggleState - 1 > -1 &&
                setToggleState((prevState) => prevState - 1)
              }
            >
              {t('previous')}
            </button> : ""
        }
        <button
          style={{ width: "284px" }}
          className="custom_primary_btn_dark"
          onClick={() => handleSubmit(toggleState)}
        >
          {toggleState === 2 ? t("create")?.toUpperCase() : t("next")?.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

export default CreateNormalEvent;
