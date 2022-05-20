import React, { useEffect, useState } from "react";

import exchangealt from "../../../../assets/images/exchange-alt-solid.svg";
import person4 from "../../../../assets/images/person-4.png";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import userregular from "../../../../assets/images/user-regular.svg";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Link, useLocation } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
// Material Ui Components
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";

import NewCard from "./Modal/NewCard";

import pdfpng from "../../../../assets/images/PDF.PNG";

import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AccessRightCard from "./AccessRightCard";
import ChangeImage from "./Modal/ChangeImage";
import { employeeInfo, getExtraData, getRoles, getUserByEmail, getUserByUserId, getWorkStations, createEmployee, preRegisterUser, UpdateExtraData, deleteUser, updateUser } from "../../../../Apis/CompanyEmployee";
import { getComopanyRestructions } from "../../../../Apis/companydata";
import { toast } from "react-toastify";
import { override } from "../../../../Helpers/spinnercss";
import HashLoader from "react-spinners/HashLoader";



const AddEmployeeRecord = () => {
  const location = useLocation();
  const updateUserId = location.pathname.split("addemployee/")[1]
  // console.log(location)

  const { data } = JSON.parse(sessionStorage.getItem("userdata"));
  const employeeData = JSON.parse(sessionStorage.getItem("getuserbyuserid"));
  // const deleteId = localStorage.getItem("deleteId");

  const [updateUserData, setUpdateUserData] = useState();

  // const [companyRestructions, setCompanyRestructions] = useState();
  // const [userInfo, setUserInfo] = useState();
  // const [extraData, setExtraData] = useState();
  // const [value, setValue] = useState(new Date("2014-08-18T21:11:54"));
  const companyId = "bc9789f1-3f16-4759-851d-5501cc37ec97";

  const [changeImageModal, setChangeImageModal] = useState();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [cellular, setCellular] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postcode, setPostCode] = useState("");
  const [homeNumber, setHomeNumber] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [arabicName, setArabicName] = useState("");
  const [wasVacinated, setWasVacinated] = useState("");
  const [role, setRole] = useState({
    name: "",
    id: ""
  });
  const [workStation, setWorkStation] = useState({
    name: "",
    id: ""
  });
  const [employeeId, setEmployeeId] = useState();
  const [contractStatus, setContractStatus] = useState();
  const [startdate, setStartdate] = useState();
  const [endDate, setEndDate] = useState();
  const [newCardModal, setNewCardModal] = useState(false);

  const [contractRoles, setContractRoles] = useState();
  const [contractAllowedZones, setContractAllowedZones] = useState();




  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const cards = [
    {
      VnumberPlate: "vehicle numberplate",
      VNFC: "16852635",
      ValidUnitil: "04-05-2015",
      Status: "Active",
    },
    {
      VnumberPlate: "vehicle numberplate",
      VNFC: "16852635",
      ValidUnitil: "04-05-2015",
      Status: "Active",
    },
    {
      VnumberPlate: "vehicle numberplate",
      VNFC: "16852635",
      ValidUnitil: "04-05-2015",
      Status: "Active",
    },
    {
      VnumberPlate: "vehicle numberplate",
      VNFC: "16852635",
      ValidUnitil: "04-05-2015",
      Status: "Active",
    },
  ];
  const myFunction = (day) => {
    var harday = document.getElementById(day);
    if (day) {
      let hardayId = harday?.classList?.contains("slectday");
      if (hardayId) {
        document.getElementById(day)?.classList?.remove("slectday");
      } else {
        document.getElementById(day)?.classList.add("slectday");
      }
    }
  };

  const preRegisterUserObj = {
    name: name,
    email: email,
    phoneNumber: cellular
  }
  const getWorkStationsObj = {
    companyId: companyId,
    email: email,
    userId: data.id
  }


  useEffect(() => {

    getRoles().then(({ data: { data } }) => {
      setContractRoles(data)
      // console.log(data);
    }).catch(error => {
      toast.error("something went wrong.")
    })

    getWorkStations(getWorkStationsObj).then(({ data: { data } }) => {
      setContractAllowedZones(data)
      // console.log(data);
    }).catch(error => {
      toast.error("something went wrong.")
    })

    // getComopanyRestructions(companyId).then(({ data: data }) => {
    //   console.log(companyRestructions);
    //   setCompanyRestructions(data?.data);
    // }).catch(error => {
    //   toast.error("something went wrong.")
    // })

    // employeeInfo(data?.id).then(({ data: data }) => {
    //   setUserInfo(data)
    //   console.log(data)
    // }).catch(error => {
    //   toast.error("something went wrong.")
    // })

    // getExtraData(data?.id).then(({ data: data }) => {
    // setExtraData(data)
    // console.log(data)
    // }).catch(error => {
    // toast.error("something went wrong.")
    // })


    if (updateUserId) {
      // console.log(updateUserId);
      getUserByUserId(updateUserId).then(({ data: { data } }) => {
        console.log("data")
        setUpdateUserData(data);
        setName(data?.user.name);
        setGender(data?.user.gender);
        setCellular(data?.user.phoneNumber);
        setStatus(data?.user.status.name);
        setEmail(data?.user.email);
        setDob(data?.user.dob);
        setAddress1(data?.user?.extraData.address1);
        setAddress2(data?.user?.extraData.address2);
        setState(data?.user?.extraData.town);
        setCountry(data?.user?.extraData.country);
        setPostCode(data?.user?.extraData.postCode);
        setHomeNumber(data?.user?.extraData.homePhone);
        setBloodType(data?.user?.extraData.bloodType);
        setArabicName(data?.user?.extraData.arabicName);
        setWasVacinated(data?.user?.extraData.wasVaccinated);
        setRole({
          name: data?.user?.role.name,
          id: data?.user?.role.id
        })
      }).catch(error => {
        // toast.error("something went wrong in geting update user data")
      })
    }


  }, [])

  const requireFieldsFunc = () => {
    if (name !== "" && gender !== "" && cellular !== "" && status !== "" && email !== "" && dob !== "" &&
      role !== "" && employeeId !== "" && startdate !== "" && workStation !== "" && contractStatus !== "" && endDate !== "") {
      return true;
    }
  }
  // console.log(name, gender, cellular, status, email, dob,
  //   address1, address2, state, country, postcode, homeNumber,
  //   bloodType, arabicName, wasVacinated, role, role, employeeId, contractStatus, workStation,
  //   startdate, endDate
  // )

  const handleSaveChanges = () => {
    if (updateUserData) {


      const updatedUserObj = {
        companyId: companyId,
        email: email,
        userId: updateUserData?.user?.id,
        userTypes: updateUserData?.user?.userType.name,
        user: {
          createdAt: 0,
          deviceId: "string",
          dob: 0,
          email: email,
          extraData: {
            address1: address1,
            address2: address2,
            arabicName: arabicName,
            bloodType: bloodType,
            contractorName: homeNumber,
            country: country,
            homePhone: homeNumber,
            id: updateUserData?.user?.extraData.id,
            note: "string",
            postalCode: postcode,
            town: state,
            wasVaccinated: wasVacinated
          },
          firebaseId: updateUserData?.user?.firebaseId,
          gender: {
            id: 1,
            name: gender
          },
          id: updateUserData?.user?.id,
          name: name,
          password: "string",
          phoneNumber: cellular,
          secret: updateUserData?.user?.secret,
          status: {
            id: updateUserData?.user?.status.id,
            name: updateUserData?.user?.status.name
          },
          updatedAt: 0,
          userType: {
            id: updateUserData?.user?.userType.id,
            name: updateUserData?.user?.userType.name,
          }
        }
      }

      updateUser(updatedUserObj).then(({ data: { data } }) => {
        toast.success("data updated successfully..!")
        console.log(data)
      }).catch(error => {
        console.log(error)
      })

    } else {
      // if (requireFieldsFunc) {

      // } else {
      //   toast.error("Please Fill all fields")
      // }

      getUserByEmail(email).then(({ data: { data } }) => {
        toast.error("Email Already Exist")
        // console.log(data)
      }).catch(error => {
        preRegisterUser(preRegisterUserObj).then(({ data: { data } }) => {

          const employeeObj = {
            user:
            {
              // pre-registr user id
              id: data.id
            },
            company:
            {
              id: companyId
            },
            zone:
            {
              // id: workStation?.id
              id: "580592fc-5c76-4bc2-beb5-d8d6a370100f"
            },
            role:
            {
              // id: role?.id
              id: "6ba4e1d9-a6c2-49f9-a5fc-25b5ec373cb1"
            },
            employeeId: employeeId,
            startDate: 1639065970000,
            endDate: 1639065970000
          }

          createEmployee(employeeObj).then(({ data: { data } }) => {
            toast.success("Employee Created Successfully..!")
            // console.log(data)
            const extraDatabody = {
              id: data?.id,
              town: state,
              country: country,
              postalCode: postcode,
              homePhone: 44225676632,
              arabicName: arabicName,
              bloodType: bloodType,
              contractorName: homeNumber,
              note: "none.",
              wasVaccinated: wasVacinated,
              address2: address2,
              address1: address1
            }
            UpdateExtraData(extraDatabody, data?.id).then(({ data: data }) => {
              console.log(data)
            }).catch(error => {
              // toast.error("something went wrong.")
            })
          }).catch(error => {
            // toast.error("something went wrong.")
          })
          // console.log(data)
        }).catch(error => {
          toast.error("something went wrong. Please check your fields")
        })

      })

    }


  }


  return (
    <>
      {/* Employess Detail Page Start */}
      {
        // updateUserId && updateUserData ?
          <>
            <div className="head">
              <h2>
                <Link to='/dashboard/company'>
                  <ArrowBackIcon style={{ fontSize: "30px", marginRight: "30px" }} />
                </Link>
                User Data
              </h2>
              <span
                style={{
                  backgroundColor: "#BC0000",
                  color: "white",
                  fontWeight: "600",
                  padding: "5px",
                  width: "153px",
                  borderRadius: "100px",
                  textAlign: "center",
                  position: "absolute",
                  textTransform: "uppercase",
                  float: "left",
                  marginLeft: "300px",
                }}
              >
                Inactive
              </span>
              <div>
                <button
                  className="btn "
                  style={{ backgroundColor: "#BC0000", marginBottom: "5px" }}
                >
                  Unlink Device
                  <PhoneIphoneIcon />
                </button>
                <button
                  className="btn"
                  style={{ width: "100%", backgroundColor: "#A2CBF4" }}
                >
                  SEND QR CODE BY EMAIL
                  <MailOutlineIcon />
                </button>
              </div>
            </div>
            <div className="main_all_p">
              <div className="text-center exchange_icon">
                <img
                  src={person4}
                  className="img-fluid"
                  alt="employeedetail-person4"
                />

                <Link
                  to="#"
                  onClick={() => setChangeImageModal(true)}
                  className="position-relative"
                >
                  <span className="dot ">
                    <img
                      src={exchangealt}
                      className="img-fluid exchange_alt_m"
                      alt="exchange_alt"
                    />
                  </span>
                </Link>
              </div>
              <div className="pt-3 mb-4 row">
                <div className="col-lg-6 col-md-12 col-12">
                  <p className="mb-2 infoEmpl_text">INFORMATION</p>

                  <div
                    className="main_content empdetail_c"
                    style={{ height: "342px" }}
                  >
                    <div className="mb-4 row addemp_input_m gy-4">
                      <div className="mt-5">
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                          }}
                        >
                          <TextField
                            fullWidth
                            placeholder="LUIS ENRIQUE"
                            label="NAME"
                            id="NAME"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                            className=""
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <img
                                    src={userregular}
                                    className="user_regular_img"
                                    alt="acadd_logo"
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Box>
                      </div>

                      <div className="col-lg-6">
                        <Box>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Gender
                            </InputLabel>
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
                      <div className="col-lg-6">
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                          }}
                        >
                          <TextField
                            fullWidth
                            placeholder="4426562658"
                            label="CELULAR"
                            id="CELULAR"
                            value={cellular}
                            onChange={(e) => setCellular(e.target.value)}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <PhoneIphoneIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Box>
                      </div>
                      {
                        updateUserId !== undefined ?
                          <div className="col-lg-6">
                            <Box>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Status
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={status}
                                  onChange={(e) => setStatus(e.target.value)}
                                  label="Status"
                                >
                                  <MenuItem value={10}>Active</MenuItem>
                                  <MenuItem value={20}>InActive</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </div> : ""
                      }

                      <div className="col-lg-6">
                        <FormControl fullWidth>
                          <Box
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
                              label="EMAIL"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              id="EMAIL"
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <MailOutlineIcon />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Box>
                        </FormControl>
                      </div>
                      <div className="col-lg-6">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <Stack spacing={3}>
                            <DesktopDatePicker
                              label="DOB"
                              inputFormat="MM/dd/yyyy"
                              value={dob}
                              onChange={(e) => setDob(e)}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </Stack>
                        </LocalizationProvider>
                      </div>
                    </div>
                  </div>
                </div>

                {/* {
            companyRestructions?.extraDataEmployee ? */}
                <div className="col-lg-6 col-md-12 col-12 ">
                  <p className="mb-2 infoEmpl_text">extra data</p>

                  <div className="main_content empdetail_c">
                    <div className="mb-4 mt-1 row addemp_input_m gy-4">
                      <div className="col-lg-6">
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                          }}
                        >
                          <TextField
                            fullWidth
                            placeholder="Paseos de san miguel 5041"
                            label="ADDRESS 1"
                            id="ADDRESS 1"
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                          />
                        </Box>
                      </div>
                      <div className="col-lg-6">
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                          }}
                        >
                          <TextField
                            fullWidth
                            placeholder="Paseos de san miguel 5041"
                            label="ADDRESS 2"
                            id="ADDRESS 2"
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                          />
                        </Box>
                      </div>

                      <div className="col-lg-6">
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                          }}
                        >
                          <TextField
                            fullWidth
                            placeholder="Querétaro"
                            label="STATE"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            id="STATE"
                          />
                        </Box>
                      </div>
                      <div className="col-lg-6">
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                          }}
                        >
                          <TextField
                            fullWidth
                            placeholder="México"
                            label="COUNTRY"
                            id="COUNTRY"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </Box>
                      </div>
                      <div className="col-lg-6">
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                          }}
                        >
                          <TextField
                            fullWidth
                            placeholder="76118"
                            label="POST CODE"
                            value={postcode}
                            onChange={(e) => setPostCode(e.target.value)}
                            id="POST CODE"
                          />
                        </Box>
                      </div>
                      <div className="col-lg-6">
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                          }}
                        >
                          <TextField
                            fullWidth
                            placeholder="4425625658"
                            label="HOME NUMBER"
                            value={homeNumber}
                            onChange={(e) => setHomeNumber(e.target.value)}
                            id="HOME NUMBER"
                          />
                        </Box>
                      </div>

                      <div className="col-lg-6">
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                          }}
                        >
                          <TextField
                            fullWidth
                            placeholder="A+"
                            label="BLOOD TYPE"
                            value={bloodType}
                            onChange={(e) => setBloodType(e.target.value)}
                            id="BLOOD TYPE"
                          />
                        </Box>
                      </div>

                      <div className="col-lg-6">
                        <Box
                          sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                          }}
                        >
                          <TextField
                            fullWidth
                            placeholder="لويس إنريكي كورنيجو أريولا"
                            label="ARABIC NAME"
                            id="ARABIC NAME"
                            value={arabicName}
                            onChange={(e) => setArabicName(e.target.value)}
                          />
                        </Box>
                      </div>

                      <div className="col-lg-6">
                        <Box>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              GENDER
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={gender}
                              label="Age"
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <MenuItem value={10}>MALE</MenuItem>
                              <MenuItem value={20}>FEMALE</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                      <div className="col-lg-6">
                        <Box>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              WAS VACINATED
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={wasVacinated}
                              label="Age"
                              onChange={(e) => setWasVacinated(e.target.value)}
                            >
                              <MenuItem value={10}>YES</MenuItem>
                              <MenuItem value={20}>NO</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
                    </div>
                  </div>
                </div>
                {/* : ""
          } */}
              </div>
              <div className="mb-5">
                {/* Section Two start */}

                <div className="contract_access_r">
                  <div className="access_right_m">
                    <p className="mb-2">CONTRACT</p>
                    <div className="main_content access_right_card ">
                      <div className="d-flex">
                        <div className="col-lg-6">
                          <div className="mt-4 mb-5 col-lg">
                            <Box>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Role
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={role.name}
                                  name={role.id}
                                  onChange={(e) => setRole({
                                    name: e.target.value,
                                    id: e.target.name
                                  })}
                                >
                                  {
                                    contractRoles?.map(item => (
                                      <MenuItem value={item.name} name={item.id}>{item.name}</MenuItem>
                                    ))
                                  }
                                </Select>
                              </FormControl>
                            </Box>
                          </div>

                          <div className="mt-4 mb-5 col-lg">
                            <Box
                              sx={{
                                width: "100%",
                                maxWidth: "100%",
                                fontSize: "20px",
                                height: "40px",
                              }}
                            >
                              <TextField
                                fullWidth
                                placeholder="IBL-454515151"
                                label="EMPLOYEE ID"
                                id="EMPLOYEE ID"
                                value={employeeId}
                                onChange={(e) => setEmployeeId(e.target.value)}
                              />
                            </Box>
                          </div>

                          <div className="mt-4 mb-5 col-lg">
                            <Box>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Contract Status
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="Age"
                                  value={contractStatus}
                                  onChange={(e) => setContractStatus(e.target.value)}
                                >
                                  <MenuItem value={10}>GENERAL EMPLOYEE</MenuItem>
                                  <MenuItem value={20}>MANAGER</MenuItem>
                                </Select>
                              </FormControl>
                            </Box>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mt-4 mb-5 col-lg">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <Stack spacing={3}>
                                <DesktopDatePicker
                                  label="START DATE"
                                  inputFormat="MM/dd/yyyy"
                                  value={startdate}
                                  onChange={(e) => setStartdate(e)}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                              </Stack>
                            </LocalizationProvider>
                          </div>
                          <div className="mt-4 mb-5 col-lg">
                            <Box>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  WORK STATION
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="Age"
                                  value={workStation.name}
                                  name={workStation.id}
                                  onChange={(e) => setWorkStation({
                                    name: e.target.value,
                                    id: e.target.name
                                  })}
                                >
                                  {
                                    contractAllowedZones?.map(item => (
                                      <MenuItem value={item.name} name={item.id}>{item.name}</MenuItem>
                                    ))
                                  }
                                </Select>
                              </FormControl>
                            </Box>
                          </div>
                          <div className="mt-4 mb-5 col-lg">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <Stack spacing={3}>
                                <DesktopDatePicker
                                  label="END DATE"
                                  inputFormat="MM/dd/yyyy"
                                  value={endDate}
                                  onChange={(e) => setEndDate(e)}
                                  renderInput={(params) => <TextField {...params} />}
                                />
                              </Stack>
                            </LocalizationProvider>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contract_access_r">
                {/* <div className="access_right_m">
            <p className="mb-2 infoEmpl_text">ACCESS RIGHTS</p>
            <div className="main_content access_right_card ">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Box
                  className="mt-5"
                  sx={{
                    width: "100%",
                    maxWidth: "50%",
                    fontSize: "20px",
                    height: "40px",
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder="MORNING SHIFT"
                    label="SCHEDULE ACCESS"
                    id="SCHEDULE ACCESS"
                  />
                </Box>

                <div className="c_c_custom_s">
                  <input
                    type="checkbox"
                    data-toggle="collapse"
                    data-target="#collapsediv1"
                  />
                  <span>OR CUSTOM SCHEDULE</span>
                </div>
              </div>

              <div id="collapsediv1" className="collapse div1">
                <div>
                  <div className="separator">
                    or choose
                    <br></br>
                    custom schedule
                  </div>
                  <AccessRightCard
                    heading1="zones"
                    heading2="days"
                    update
                    isAddemployee={true}
                  />
                </div>
              </div>
            </div>
          </div> */}
              </div>

              <div className=" type_nfc_card">
                {/* <div className="pt-4 access_textt">
            <Link to="">cards</Link>
            <span className="pull-right">
              <button
                className="btn btn-lg add_card_modal "
                onClick={() => setNewCardModal(true)}
              >
                ADD CARD
                <i className="fa fa-plus addemp_plus" aria-hidden="true"></i>
              </button>
            </span>
          </div>
          <div className="col-lg-12 pt-3 row">
            <div className="col-lg-4 col-md-4 col-6">
              <div className="d-flex updown_icon">
                <p>type</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="col-lg-2 col-md-2 col-6">
              <div className="d-flex updown_icon">
                <p>nfc</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 col-6">
              <div className="d-flex updown_icon">
                <p>VALID UNTIL</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="col-lg-2 col-md-2 col-6">
              <div className="d-flex updown_icon">
                <p>STATUS</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div className="col-lg-2 col-md-2 col-6">
              <div className="d-flex updown_icon">
                <p>OPTION</p>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-down-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {cards?.map((card) => (
            <div className="mb-4 coomon_accessCarsd main_content">
              <div className="card_content_inline">
                <div className="col-lg-4 col-md-4 col-6">
                  <p>{card.VnumberPlate}</p>
                </div>
                <div className="col-lg-2 col-md-2 col-6">
                  <p>{card.VNFC}</p>
                </div>
                <div className="col-lg-2 col-md-4 col-6">
                  <p>{card.VNFC}</p>
                </div>
                <div className="col-lg-2 col-md-2 col-6">
                  <input type="checkbox" />
                </div>
                <div className="col-lg-2 col-md-2 col-6">
                  <DeleteOutlineIcon style={{ color: "red" }} />
                </div>
              </div>
            </div>
          ))}

          <div className="pt-4 access_textt addemp_sm">
            <Link to="">
              Documents
              <span className="pull-right">
                <button className="btn btn-lg add_card_modal ">
                  MANAGE FILES
                  <i className="fa fa-plus addemp_plus" aria-hidden="true"></i>
                </button>
              </span>
            </Link>
          </div>
          <div className="col-md-3 ">
            <div className="mt-5 mb-4 main_content document_card">
              <div className="text-center card-title document_head">
                <span>JOB APPLICATION</span>
              </div>
              <div className="document_img">
                <img src={pdfpng} />
              </div>
              <div className="text-center card-text document_name">
                formato_informacion _personal.pdf
                <br /> <span>14-05-2021 15:</span>
              </div>
            </div>
          </div>

          <div className="pt-4 access_textt addemp_sm">
            <Link to="">
              FIREARMS
              <span className="pull-right">
                <button className="btn btn-lg add_card_modal ">
                  ADD FIREARM
                  <i className="fa fa-plus addemp_plus" aria-hidden="true"></i>
                </button>
              </span>
            </Link>
          </div>
          <div className="mt-5 mb-4 main_content firearms_card">
            <div className="text-center firearms_txt">
              <h4>
                NO FIREARMS
                <span>
                  <i
                    className="fa fa-exclamation-circle"
                    aria-hidden="true"
                  ></i>
                </span>
              </h4>
            </div>
          </div>

          <div className="pt-4 access_textt addemp_sm">
            <Link to="">
              VEHICLES
              <span className="pull-right">
                <button className="btn btn-lg add_card_modal ">
                  ADD VEHICLE
                  <i className="fa fa-plus addemp_plus" aria-hidden="true"></i>
                </button>
              </span>
            </Link>
          </div>
          <div className="mt-5 mb-5 main_content firearms_card">
            <div className="text-center firearms_txt">
              <h4>
                NO VEHICLES
                <span>
                  <i
                    className="fa fa-exclamation-circle"
                    aria-hidden="true"
                  ></i>
                </span>
              </h4>
            </div>
          </div>*/}

                <div className="addemp_dletuser">
                  <div className="pull-right d-flex align-items-center mb-4">
                    <Link to="/dashboard/company">
                      <span style={{ cursor: "pointer" }}>CANCEL</span>
                    </Link>
                    <button className="btn btn-danger btn-lg" onClick={handleSaveChanges}>
                      SAVE CHANGES
                    </button>
                  </div>
                </div>
              </div>
              {/* Section Two End*/}
            </div>
          </>
          // :
          // <div className="overlay">
          //   <HashLoader loading="true" css={override} size={50} color="#fff" />
          // </div>
      }

      <NewCard
        title="New Card"
        show={newCardModal}
        onHide={() => setNewCardModal(false)}
      />
      <ChangeImage
        title="Change Image"
        check="false"
        show={changeImageModal}
        onHide={() => setChangeImageModal(false)}
      />
    </>
  );
};

export default AddEmployeeRecord;
