import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import submitupload from '../../../../assets/images/upload.PNG'
import { DesktopDatePicker, LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useEffect } from "react";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import { toast } from "react-toastify";
import Vehicles from "./Vehicles";
import { saveOunDetailsData, saveOunHostData, saveOunVehiclesList } from "../../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice";
import { useDispatch, useSelector } from "react-redux";
import OnuVisitors from "./OnuVisitors";
import { createOnuEvent, createUserInvitation, createVehicleInvitations, getOnuAllZones } from "../../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi";
import { updateComopanyImg } from "../../../../Apis/companydata";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'

const CreateOnuEvent = () => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  let vehicleIds = [];
  const navigate = useNavigate();
  const companyId = "a6bd2887-0f4a-4e5f-b0b5-000d9817ab23";
  const dispatch = useDispatch();
  const userData = useSelector(state => state?.authenticatioauthennSlice?.user.data);
  const detailData = useSelector(state => state?.EmployeeEventsSlice?.onuDetailsData);
  const hostData = useSelector(state => state?.EmployeeEventsSlice?.normalEventHost);
  const allEmployees = useSelector(state => state?.EmployeeEventsSlice?.allEmployees);
  const OnuAllZones = useSelector(state => state?.EmployeeEventsSlice?.OnuAllZones);
  // const selectedEmployees = useSelector(state => state?.EmployeeEventsSlice?.selectedEmployees);
  const onuEmployeeData = useSelector(state => state?.EmployeeEventsSlice?.onuEmployeeData)
  const guestData = useSelector(state => state?.EmployeeEventsSlice?.emailPhoneSearchList);
  const ounVehiclesList = useSelector(state => state?.EmployeeEventsSlice?.ounVehiclesList);
  const companyRestrictionsData = useSelector(state => state?.EmployeeEventsSlice?.companyRestrictionsData);

  const [toggleState, setToggleState] = useState(0);
  const [hostChecked, setHostChecked] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [detailsObject, setDetailsObject] = useState({
    name: detailData?.name,
    purpose: detailData?.purpose,
    date: detailData?.date,
    time: detailData?.time,
    duration: detailData?.duration,
    zone: detailData?.zone,
    access: detailData?.access
  });
  const [hostObject, setHostObject] = useState({
    accompanied: hostData?.accompanied,
    unitSection: hostData?.unitSection,
    employee: selectedEmployee?.employee,
    name: selectedEmployee?.name,
    email: selectedEmployee?.email,
    phoneNo: selectedEmployee?.phoneNo,
  });
  const [validationObject, setValidationObject] = useState({
    comment: "",
    transportation: false,
    vehicleImg: ""
  })
  const [staticImg, setStaticImg] = useState()

  useEffect(() => {
    let todaydate = new Date();
    const body = {
      startDate: 1654409723612,
      endDate: 1654437723612,
      userId: userData?.id
    }
    dispatch(getOnuAllZones(body));
  }, []);

  useEffect(() => {
    setSelectedEmployee({})
  }, [hostChecked])

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const handleDetailChange = (e) => {
    const { id, value } = e.target;
    setDetailsObject({ ...detailsObject, [id]: value })
  }

  const onImageChange = (e) => {
    setValidationObject({ ...validationObject, "vehicleImg": e.target.files[0] })
    const [file] = e.target.files;
    setStaticImg(URL.createObjectURL(file));
  };


  const handleSubmit = (moveState) => {
    const { name, purpose, date, time, duration, zone, access } = detailsObject;
    if (moveState === 0) {
      if (name !== "" && purpose !== "" && date !== "" && time !== "" && duration !== "" && zone !== "" && access !== "") {
        dispatch(saveOunDetailsData(detailsObject))
        moveState + 1 < 5 && setToggleState((prevState) => prevState + 1);
      } else {
        toast.warn("please fill all fields..!")
      }
    } else if (moveState === 1) {
      dispatch(saveOunHostData(hostObject));

      moveState + 1 < 5 && setToggleState((prevState) => prevState + 1);
    } else if (moveState === 2) {
      console.log(onuEmployeeData)
      if (onuEmployeeData?.length > 0) {

        moveState + 1 < 5 && setToggleState((prevState) => prevState + 1);
      } else {
        toast.error("You must atleast one person to invite")
      }

    } else if (moveState === 3) {
      moveState + 1 < 5 && setToggleState((prevState) => prevState + 1);

    } else if (moveState === 4) {
      if (validationObject?.vehicleImg) {
        const body = {
          "user": {
            "id": selectedEmployee?.id ? selectedEmployee?.id : userData?.id
          },
          // "validatedBy": {
          //   "id": selectedEmployee?.id ? selectedEmployee?.id : userData?.id
          // },
          "host": {
            "id": selectedEmployee?.id ? selectedEmployee?.id : userData?.id
          },
          "reservation": {
            "zone": {
              "id": detailData?.zone?.zoneId
            }
          },
          "name": detailData?.name,
          "visitPurpose": detailData?.purpose,
          "duration": detailData?.duration,
          "startDate": Math.round(detailData?.date.getTime()),
          "accompanied": hostData?.accompanied,
          "unitSection": hostData?.unitSection,
          "visitorComment": validationObject.comment,
          "validationComment": validationObject.comment,
          "requireTransportation": validationObject.transportation
        }
        dispatch(createOnuEvent(body)).then(({ payload: { data: { data } } }) => {
          console.log(data)
          let employeeOtherGuests = [];
          guestData.map(item => {
            employeeOtherGuests.push({
              guest: {
                id: item.id
              },
              guestNumber: 4
            })
          })
          onuEmployeeData.map(item => {
            employeeOtherGuests.push({
              guest: {
                id: item.id
              },
              guestNumber: 4,
              sharePdf: true,
              organization: "IBL/UNITAD",
              placeToPickUp: "Neer from my house",
              gzBadge: false
            })
          })
          const invitBody = {
            "eventId": data?.id,
            "userInvitations": employeeOtherGuests
          }
          dispatch(createUserInvitation(invitBody)).then(() => {
            ounVehiclesList?.map(item => {
              vehicleIds.push(item.id)
            })

            const vehicleBody = {
              "eventId": data?.id,
              "vehiclesIds": vehicleIds
            }
            // console.log(vehicleBody)
            dispatch(createVehicleInvitations(vehicleBody)).then(() => {
              dispatch(saveOunDetailsData({
                name: "",
                purpose: "",
                date: "",
                time: "",
                duration: "",
                zone: "",
                access: ""
              }))
              dispatch(saveOunHostData({
                accompanied: "",
                unitSection: "",
                employee: "",
                email: "",
                phoneNo: "",
              }));
              dispatch(saveOunVehiclesList([]));

              let formData = new FormData();
              formData.append('id', data?.id);
              formData.append('option', "event");
              formData.append('file', validationObject?.vehicleImg);

              updateComopanyImg(formData).then((data) => {
                toast.success("signature uploaded successfully!");
                navigate('/dashboard/employee/events');

              }).catch(error => {
                toast.error("something went wrong in uploading image")
              })
              // navigate('/dashboard/employee/events');

            })
          })
        })
      } else {
        toast.warn("Please Upload Signature")
      }
    }
  }

  // {
  //   eventId: data?.id,
  //   userInvitations: [{
  //     guest: {
  //       id: guestData[0]?.id
  //     },
  //     guestNumber: 1 
  //   }]
  // }
  // var aarr = {
  //   "eventId": data?.id,
  //   "userInvitations": [{
  //     "guest": {
  //       "id": guestData[0]?.id
  //     },
  //     "host": {
  //       "id": data?.host.id
  //     },
  //     "startDate": "1655907594000",
  //     "endDate": "1655907594000",
  //     "sharePdf": false,
  //     "organization": "Name of the organization",
  //     "placeToPickUp": "Mexico",
  //     "gzBadge": false
  //   }]
  // }

  useEffect(()=>{
    if(companyRestrictionsData?.isOnuEvent === false){
      navigate("/unauthorized")
      
    }
  })


  return (
    <div className="providersPanel CreateOnuEventPanel">
      <div className="head">
        <div className='headLeft'>
          <Link to="/dashboard/employee/events">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}></i>
          </Link>
          <h2>{t('create_event')}</h2>
        </div>
      </div>
      <div className="row steps-row m-auto" id="pills-tab" role="tablist">
        <div className="col tab" role="presentation">
          <a
            className={`steps btn ${toggleState === 0 ? "active-border" : "disable-border"
              }`}
            // onClick={() => toggleTab(0)}
            style={{ width: "100%" }}
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            <span>{t('details')}</span>
          </a>
        </div>
        <div className="col tab" role="presentation">
          <a
            className={`steps btn ${toggleState === 1 ? "active-border" : "disable-border"
              }`}
            // onClick={() => toggleTab(1)}
            style={{ width: "100%" }}
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            <span>{t('host')}</span>
          </a>
        </div>
        <div className="col tab" role="presentation">
          <a
            className={`steps btn ${toggleState === 2 ? "active-border" : "disable-border"
              }`}
            // onClick={() => toggleTab(2)}
            style={{ width: "100%" }}
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            <span>{t('visitors')}</span>
          </a>
        </div>
        <div className="col tab" role="presentation">
          <a
            className={`steps btn ${toggleState === 3 ? "active-border" : "disable-border"
              }`}
            // onClick={() => toggleTab(3)}
            style={{ width: "100%" }}
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            <span>{t('vehicles')}</span>
          </a>
        </div>
        <div className="col tab" role="presentation">
          <a
            className={`steps btn ${toggleState === 4 ? "active-border" : "disable-border"
              }`}
            // onClick={() => toggleTab(4)}
            style={{ width: "100%" }}
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            <span>{t('validations')}</span>
          </a>
        </div>
      </div>
      {toggleState === 0 && (
        <div className="CreateEventPanel animated-div">
          <Grid
            container
            spacing={2}
            sx={{
              marginTop: "3rem !important",
              justifyContent: "center",
              width: "70%",
              margin: "auto"
            }}
          >
            <Grid item xs={12} md={5}>
              <TextField size="small"
                fullWidth
                label={t('name')}
                id="name"
                value={detailsObject.name}
                onChange={handleDetailChange}
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
            <Grid item xs={12} md={5}>
              <TextField size="small"
                fullWidth
                label={t('purpose_of_visit')}
                id="purpose"
                value={detailsObject.purpose}
                onChange={handleDetailChange}
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
            <Grid item xs={12} md={5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack>
                  <DesktopDatePicker
                    label={t('fecha')}
                    inputFormat="dd/MM/yyyy"
                    value={detailsObject.date}
                    id="date"
                    disablePast
                    textFieldStyle={{ width: "100%" }}
                    onChange={(e) => setDetailsObject({ ...detailsObject, "date": e })}
                    renderInput={(params) => <TextField size="small" {...params}
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
                    />}

                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  renderInput={(props) => <TextField size="small" {...props}
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
                  />}
                  ampm={false}
                  openTo="hours"
                  views={["hours", "minutes", "seconds"]}
                  inputFormat="HH:mm:ss"
                  mask="__:__:__"
                  className="timeInput"
                  label={t('from')}
                  id="time"
                  value={detailsObject.time}
                  onChange={(e) => setDetailsObject({ ...detailsObject, "time": e })}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={5}>
              <TextField size="small"
                fullWidth

                label={t('duration')}
                id="duration"
                value={detailsObject.duration}
                onChange={handleDetailChange}
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
            <Grid item xs={12} md={5}>
              <FormControl fullWidth
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
                }}>
                <InputLabel id="demo-simple-select-label">
                  {t('zones')}
                </InputLabel>
                <Select size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue="employe"
                  value={detailsObject.zone}
                  label={t('zone')}
                  onChange={(e) => setDetailsObject({ ...detailsObject, "zone": e.target.value })}
                >
                  {
                    OnuAllZones?.map(item => (
                      <MenuItem
                        key={item?.zoneId}
                        value={item}
                      >
                        {item.name}
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField size="small"
                fullWidth
                label={t('access')}
                id="access"
                value={detailsObject.access}
                onChange={handleDetailChange}
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
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={5}></Grid>
          </Grid>
        </div>
      )}
      {toggleState === 1 && (
        <div
          className="content2 animated-div"
          style={{
            width: "350px",
            margin: "auto",
          }}
        >
          <div className="HostSection">
            <p className="checkboxOther" style={{ textAlign: "right" }}>
              <input
                type="checkbox"
                checked={hostChecked}
                onChange={() => setHostChecked(!hostChecked)}
              />
              {t('other_is_the_host')}
            </p>
            <div className="CreateEventPanel hostContainer">
              <div className="content">
                <div className="name">
                  <Grid
                    container
                    spacing={2}
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Grid item xs={12}>
                      <TextField size="small"
                        fullWidth


                        label="ACCOMPANIED"
                        id="NAME"
                        value={hostObject.accompanied}
                        defaultValue=" "
                        onChange={(e) => setHostObject({ ...hostObject, ["accompanied"]: e.target.value })}
                        InputLabelProps={{
                          style: {
                            fontSize: "10px",
                            fontWeight: 600,
                            background: "#ffffff",
                            padding: "0px 0px 0px 4px",
                          },
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
                    <Grid item xs={12} sx={{ position: "relative" }}>
                      <TextField size="small"
                        fullWidth


                        label="UNIT/SECTION"
                        id="NAME"
                        value={hostObject.unitSection}
                        defaultValue=" "
                        onChange={(e) => setHostObject({ ...hostObject, ["unitSection"]: e.target.value })}
                        InputLabelProps={{
                          style: {
                            fontSize: "10px",
                            fontWeight: 600,
                            background: "#ffffff",
                            padding: "0px 0px 0px 4px",
                          },
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
                      <span className="duration-min">
                        <ima src="../../../../public/icn.svg" />
                      </span>
                    </Grid>
                    <hr style={{ margin: "1.2rem 0rem 0rem 1rem", color: "green", opacity: "1" }}></hr>
                  </Grid>
                </div>
                {
                  hostChecked ?
                    <div className="name">
                      <Grid
                        container
                        spacing={2}
                        sx={{ display: "flex", flexDirection: "column" }}
                      >
                        <Grid item xs={12}>
                          <Box sx={{ mt: "6px" }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">
                                EMPLOYEE
                              </InputLabel>
                              <Select size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue="employee"
                                value={hostObject.employee}
                                label="EMPLOYEE"
                                onChange={(e) => {
                                  setSelectedEmployee(e.target.value);
                                  setHostObject({ ...hostObject, ["employee"]: e.target.value });
                                }}
                                sx={{
                                  fontSize: "14px",
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
                        <Grid item xs={12} sx={{ position: "relative" }}>
                          <TextField size="small"
                            sx={{ mt: "2px" }}
                            fullWidth

                            label="NAME"
                            id="NAME"
                            defaultValue=" "
                            value={selectedEmployee?.name}
                            onChange={(e) => setHostObject({ ...hostObject, ["name"]: e.target.value })}
                            InputLabelProps={{
                              style: {
                                fontSize: "10px",
                                fontWeight: 600,
                                background: "#ffffff",
                                padding: "0px 0px 0px 4px",
                              },
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
                        <Grid item xs={12} sx={{ position: "relative" }}>
                          <TextField size="small"
                            sx={{ mt: "2px" }}
                            fullWidth

                            label="EMAIL"
                            defaultValue=" "
                            value={selectedEmployee?.email}
                            onChange={(e) => setHostObject({ ...hostObject, ["email"]: e.target.value })}
                            InputLabelProps={{
                              style: {
                                fontSize: "10px",
                                fontWeight: 600,
                                background: "#ffffff",
                                padding: "0px 0px 0px 4px",
                              },
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
                        <Grid item xs={12} sx={{ position: "relative" }}>
                          <TextField size="small"
                            sx={{ mt: "2px" }}
                            fullWidth


                            label="PHONE NUMBER"
                            defaultValue=" "
                            value={selectedEmployee?.phoneNumber}
                            onChange={(e) => setHostObject({ ...hostObject, ["phoneNo"]: e.target.value })}
                            InputLabelProps={{
                              style: {
                                fontSize: "10px",
                                fontWeight: 600,
                                background: "#ffffff",
                                padding: "0px 0px 0px 4px",
                              },
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
                    </div> : null
                }
              </div>
            </div>
          </div>
        </div>
      )}
      {toggleState === 2 && (
        <>
          <OnuVisitors  />
        </>
      )}
      {toggleState === 3 && (
        <>
          <Vehicles />
        </>
      )}
      {toggleState === 4 && (
        <>
          <Box className="content4 animated-div">
            <TextField size="small"
              fullWidth
              defaultValue="Hello"

              label="COMMENTS"
              id="COMMENTS"
              multiline
              rows={5}
              value={validationObject.comment}
              onChange={(e) => setValidationObject({ ...validationObject, "comment": e.target.value })}
            />
            <p className="headingText">REQUIRED TRANSPORATION*</p>
            <FormGroup>
              <div className="yesNoCheckbox">
                NO
                <div style={{ margin: "0px 28px" }}>
                  <Switch
                    defaultChecked
                    checked={validationObject.transportation}
                    onChange={(e) => setValidationObject({ ...validationObject, "transportation": e.target.checked })}

                    color="success"
                  />
                </div>
                YES
              </div>
            </FormGroup>
            <h5 className="my-3 headingText">UPLOAD SIGNATURE*</h5>
            <div className="row updata_img_m">
              <div className="col-lg-6 col-md-6">
                <label htmlFor="file-input" className="dottedborderbox" style={{ margin: "0", height: "129px" }}>
                  <img
                    src={submitupload}
                    alt="submitupload"
                    className="submitupload"

                  />
                  <input
                    type="file"
                    id="file-input"
                    name="vehicleImg"
                    accept="image/*, video/*"
                    onChange={onImageChange}
                  />
                  <p>
                    drag {"&"} drop <br /> your image <br /> size 20 mb max
                  </p>
                </label>
              </div>
              <div className="col-lg-6 col-md-6">
                {
                  staticImg ?
                    <img
                      src={staticImg}
                      style={{
                        width: "100%",
                        height: "129px",
                        borderRadius: "8px"
                      }}
                      className="uploadedPath"
                    /> : null
                }
              </div>
            </div>
          </Box>
        </>
      )}
      <div
        className="EventBtns"
        style={{ justifyContent: toggleState === 0 ? "flex-end" : "center", margin: "3rem auto 0 auto", width: "58%" }}
      >
        {
          toggleState !== 0 ?
            <button
              className="custom_btn_cancel_gray_hover"
              style={{ width: "284px" }}
              onClick={(e) =>
                toggleState - 1 > -1 &&
                setToggleState((prevState) => prevState - 1)
              }
            >
              {t("previous")}
            </button> : ""
        }
        <button
          className="custom_primary_btn_dark"
          style={{ width: "284px" }}
          // onClick={(e) =>
          //   toggleState + 1 < 5 &&
          //   setToggleState((prevState) => prevState + 1)
          // }
          onClick={() => handleSubmit(toggleState)}
        >
          {toggleState === 4 ? "CREATE" : "NEXT"}
        </button>
      </div>
    </div>
  );
};

export default CreateOnuEvent;
