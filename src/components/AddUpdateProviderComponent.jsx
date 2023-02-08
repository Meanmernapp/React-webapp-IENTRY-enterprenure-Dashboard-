import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import { debounce } from "lodash";
import { Box } from "@mui/system";
import { toast } from 'react-toastify';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import apiInstance from "../Apis/Axios";
import { useDispatch } from "react-redux";
import { GetAllGender } from "../reduxToolkit/Contractor/ContractorApi";
import { useSelector } from "react-redux";
import { allGender } from "../reduxToolkit/Contractor/ContractorSlice";

let no;
const AddUpdateProviderContractor = ({
  addProviderFlag,
  addContractorFlag,
  updateProviderFlag,
  updateContractorFlag,
}) => {
  let dispatch = useDispatch()
  const getAllGender = useSelector(allGender)
  const [acronym, setAcronym] = useState();
  const [companyName, setCompanyName] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [status, setStatus] = useState();
  const [gender, setGender] = useState();
  const [updateProvider, setUpdateProvider] = useState(false);
  const [addContractor, setaddContractor] = useState(false);
  const [updateContractor, setupdateContractor] = useState(false);
  const [addProvider, setaddProvider] = useState(false);

  const [findEmail, setFindEmail] = useState(false)
  const [findNo, setFindNo] = useState(false)
  const [formData, setFormData] = useState();

  const [userID, setUserID] = useState();
  let navigate = useNavigate();
  useEffect(() => {
    console.log(
      { addProviderFlag },
      { addContractorFlag },
      { updateProviderFlag },
      { updateContractorFlag }
    );
    setaddProvider(addProviderFlag);
    setaddContractor(addContractorFlag);
    setUpdateProvider(updateProviderFlag);
    setupdateContractor(updateContractorFlag);
    dispatch(GetAllGender())
  }, []);
  no = phoneNumber
  let eml = "luis.cornejo.2610@gmail.com";
  const getByEmail = async (vv) => {
    const result = await apiInstance.get(`user-service​/get-by-email​/${eml}`).then(function (response) {
      if (response.status == 200) {
        let id = response?.data?.data?.id;
        setUserID(id)
        setFindEmail(true)
        setName(response?.data?.data?.name)
        setPhoneNumber(response?.data?.data?.phoneNumber)
        setGender(response?.data?.data?.gender?.name)
      }
    })
      .catch(function (error) {
        return error.response;
      });
  };

  let phone = "+524427065909"
  const getByPhone = async () => {
    const result = await apiInstance.get(`user-service/get-by-phone-number/${no}`).then(function (response) {
      if (response.status == 200) {
        let id = response?.data?.data?.id;
        toast("User Find With Phone Number")
        setUserID(id)
        setFindNo(true)
        setName(response?.data?.data?.name)
        setGender(response?.data?.data?.gender?.name)
        setEmail(response?.data?.data?.email)
      }
    }).catch(function (error) {
      // toast("this user has no data")
      document.getElementById("overlay").style.display = "none"
    });

  };


  const delayedPhoneSearch = useMemo(
    () => debounce(() => getByPhone(), 100),
    []
  );

  const onlyCreateContract = async (id) => {
    const y = await apiInstance.post(`contractor-service/create`, {
      "user": {
        "id": id
      },
      "acronym": acronym,
      "contractorCompanyName": companyName
    }
    ).then(function (response) {
      toast("contractor was created successfully")
      navigate("/dashboard/employee/contractors", { replace: true });
    })
      .catch(function (error) {
        toast(error?.response?.data?.message)
        document.getElementById("overlay").style.display = "none"
      });
  }



  const handleSubmit = async () => {
    if (findNo == false && findEmail == false) {
      const y = await apiInstance.post(`authentication-service/pre-register-user`, { email, name, phoneNumber }
      ).then(function (response) {
        if (response.status == 201) {
          let id = response?.data?.data?.id;
          onlyCreateContract(id);
        }
      })
        .catch(function (error) {
          toast("Pre Register User fail")
          document.getElementById("overlay").style.display = "none"

        });
    }
    else {
      onlyCreateContract(userID);
    }
  }

  return (
    <>
      <div className="head">
        <h2>
          <Link to="">
            <ArrowBackIcon
              style={{
                color: "#146F62",
                fontSize: "30px",
                marginRight: "30px",
              }}
            />
          </Link>

          {addProvider && "ADD PROVIDER"}
          {addContractor && "ADD CONTRACTOR"}
          {updateContractor && "UPDATE CONTRACTOR"}
          {updateProvider && "UPDATE PROVIDER"}
        </h2>
        <div style={{ display: "flex" }}>
          {/* <Link to="/dashboard/uploademployeefile"> */}


          <button className="btn btn-lg" onClick={() => {
            if (acronym && companyName && name && email && phoneNumber) {
              handleSubmit()
            }
            else {
              toast.info("Please fill all fields")
            }
          }}>
            {addProvider && "ADD PROVIDER"}
            {addContractor && "ADD CONTRACTOR"}
            {updateContractor && "UPDATE CONTRACTOR"}
            {updateProvider && "UPDATE PROVIDER"}
            <SaveIcon />
          </button>

        </div>
      </div>
      <div className="mt-5  add_provider">
        <div className="col-md-6 add_provider_content">
          <p className="provider_header">
            {/* {!updateProvider
              ? addContractor && "CONTRACTOR COMPANY"
              : "Provider Company"}
               */}

            {(addProvider || updateProvider) && "Provider Company"}
            {(addContractor || updateContractor) && "CONTRACTOR COMPANY"}
          </p>

          <Box
            className="add_provider_text_field"
            style={{ marginTop: "28.5px" }}
            sx={{
              width: "100%",
              maxWidth: "100%",
              fontSize: "20px",
              height: "40px",
            }}
          >
            <TextField size="small"
              fullWidth

              label="Acronym"
              id="Acronym"
              value={acronym}
              onChange={(e) => setAcronym(e.target.value)}
              className=""
            />
          </Box>
          <Box
            className="add_provider_text_field"
            sx={{
              width: "100%",
              maxWidth: "100%",
              fontSize: "20px",
              height: "40px",
            }}
          >
            <TextField size="small"
              fullWidth

              label="Company Name"
              id="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className=""
            />
          </Box>
          <p className="provider_header">
            {(addProvider || updateProvider) && "Provider Company"}
            {(addContractor || updateContractor) && "CONTRACTOR COMPANY"}
          </p>
          <Box
            className="add_provider_text_field"
            style={{ marginTop: "28.5px" }}
            sx={{
              width: "100%",
              maxWidth: "100%",
              fontSize: "20px",
              height: "40px",
            }}
          >
            <TextField size="small"
              fullWidth

              label="NAME"
              id="NAME"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=""

            />
          </Box>
          <Box
            className="add_provider_text_field"
            sx={{
              width: "100%",
              maxWidth: "100%",
              fontSize: "20px",
              height: "40px",
            }}
          >
            <TextField size="small"
              fullWidth

              label="Email"
              id="Email"
              value={email}

              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box
            className="add_provider_text_field"
            sx={{
              width: "100%",
              maxWidth: "100%",
              fontSize: "20px",
              height: "40px",
            }}
          >
            <TextField size="small"
              fullWidth

              label="Phone Number"
              id="Phone Number"
              value={phoneNumber}

              onChange={(e) => {
                setPhoneNumber(e.target.value)
              }}
              onBlur={() =>
                (findEmail ? null : delayedPhoneSearch(phoneNumber))
              }
              className="NoShadowInput"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PhoneIphoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          {!addContractor && (
            <Box
              className="add_provider_text_field"
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  label="Status"
                >
                  <MenuItem value={10}>Active</MenuItem>
                  <MenuItem value={20}>Vacations</MenuItem>
                  <MenuItem value={20}>Locked</MenuItem>
                  <MenuItem value={20}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          <Box
            style={{ padding: "0px 12px" }}
            sx={{
              width: "100%",
              maxWidth: "100%",
              fontSize: "20px",
              height: "40px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">{gender ? gender : "Gender"}</InputLabel>
              <Select size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                displayEmpty={false}
                label="Age"
                defaultValue={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                {getAllGender && getAllGender?.map((item) => {
                  return (
                    <MenuItem value={item?.id}>{item?.name}</MenuItem>
                  )
                })}


              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
    </>
  );
};

export default AddUpdateProviderContractor;
