import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Material Ui Components
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Stack from "@mui/material/Stack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TablePagination from '@mui/material/TablePagination';
import Checkbox from "@mui/material/Checkbox";
import Typography from '@mui/material/Typography';

// images
import exchangealt from "../../../../assets/images/exchange-alt-solid.svg";
import person4 from "../../../../assets/images/user-png.png";
import person5 from "../../../../assets/images/user-png-140.png";
import userregular from "../../../../assets/images/user-regular.svg";


// modals
import NewCard from "./Modal/NewCard";
import ChangeImage from "./Modal/ChangeImage";
import {
  getUserByEmail,
  createEmployee,
  preRegisterUser,
  UpdateExtraData,
} from "../../../../Apis/CompanyEmployee";
import { Divider, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getRoles, getWorkStations, getDepartments, addWorkShift, addCustomWorkShift, userInfoStatus, createImgObj, uploadNewImage, getSelfie, downloadSelfie, GetContractStatus } from "../../../../reduxToolkit/CompanyEmployees/CompanyEmployeesApi";
import ContractorAccessCard from "../../Contractors/ContractorAccessCard";
import { GetAllWorkSchdule, GetWorkTimeAccess } from "../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import { getAllWorkSchdule, getcustomSchdulTime, getWorkTimeAccess } from "../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice";
import { useTranslation } from "react-i18next";
import { GetHeaders } from "../../../../reduxToolkit/headers/HeadersApi";
import Cookies from "js-cookie";
import { Stepper, Step, StepLabel } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import Step1Details from "./EnrollmentSteps/Step1Details";
import Step2OtherDetails from "./EnrollmentSteps/Step2OtherDetails"
import Step3EmployeeContract from './EnrollmentSteps/Step3EmployeeContract'
import SwipeableViews from 'react-swipeable-views';
import Step4AccessRights from "./EnrollmentSteps/Step4AccessRights";
import Step5TakeSelfie from "./EnrollmentSteps/Step5TakeSelfie";
import Step6CapturerFinger from "./EnrollmentSteps/Step6CaptureFinger";
import Step7Card from "./EnrollmentSteps/Step7Card";
import Step8Summary from "./EnrollmentSteps/Step8Summary";


const smallBoxStyle = {
  width: "100%",
  maxWidth: "100%",
  fontSize: "20px",
  height: "40px",
}


const CreateEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation()
  const lCode = Cookies.get("i18next") || "en";
  const companyRestrictionsData = useSelector(state => state?.EmployeeEventsSlice?.companyRestrictionsData);
  const employeeRoles = useSelector(state => state?.CompanyEmployeesSlice?.employeeRoles);
  const employeeWorkStations = useSelector(state => state?.CompanyEmployeesSlice?.employeeWorkStations);
  const userInfoStatusList = useSelector(state => state?.CompanyEmployeesSlice?.userInfoStatusList);
  const { contractStatusList } = useSelector(state => state?.CompanyEmployeesSlice)
  const employeeDepartments = useSelector(state => state?.CompanyEmployeesSlice?.employeeDepartments);
  const { headersList } = useSelector(state => state.headersSlice);
  const workShiftAccessTime = useSelector(getWorkTimeAccess);
  const workShiftSchdule = useSelector(getAllWorkSchdule);
  const customSchdulTime = useSelector(getcustomSchdulTime);
  const companyId = "a6bd2887-0f4a-4e5f-b0b5-000d9817ab23";
  const [changeImageModal, setChangeImageModal] = useState();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [cellular, setCellular] = useState("");
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [field3, setField3] = useState("");
  const [field4, setField4] = useState("");
  const [field5, setField5] = useState("");
  const [field6, setField6] = useState("");
  const [field7, setField7] = useState("");
  const [field8, setField8] = useState("");
  const [field9, setField9] = useState("");
  const [field10, setField10] = useState("");
  const [field11, setField11] = useState("");
  const [field12, setField12] = useState("");
  const [field13, setField13] = useState("");
  const [field14, setField14] = useState("");
  const [field15, setField15] = useState("");
  const [role, setRole] = useState();
  const [workStation, setWorkStation] = useState();
  const [employeeId, setEmployeeId] = useState();
  const [contractStatus, setContractStatus] = useState();
  const [startdate, setStartdate] = useState();
  const [endDate, setEndDate] = useState();
  const [newCardModal, setNewCardModal] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [checkboxState, setCheckboxState] = useState(false);
  const [WorkShift, setWorkShift] = useState();
  const [imageToUpload, setImageToUpload] = useState(null);
  const [imgUpload, setImgUpload] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [workShiftsList, setWorkShiftsList] = useState([]);
  const [customizedList, setCustomizedList] = useState([]);

  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    secondLastName: '',
    genderId: '',
    phoneNumber: '',
    statusId: '',
    email: '',
    dob: null,
  });

  const [extraData, setExtraData] = useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: '',
    field8: '',
    field9: '',
    field10: '',
    field11: '',
    field12: '',
    field13: '',
    field14: '',
    field15: '',
  })

  const [employeeData, setEmployeeData] = useState({
    departmentId: '',
    employeeId: '',
    startDate: null,
    endDate: null,
    roleId: '',
    zoneId: '',
    contractStatusId: ''
  })

  const handleFormChangeUserData = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormChangeExtraData = (e) => {
    const { name, value } = e.target;
    setExtraData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormChangeEmployeeData = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const steps = [t("details"), t("other_details"), t("employee_contract"), t("access_rights"), t("take_selfie"), t("capture_fingerprint"), t("card"), t("summary")];

  const isStepOptional = (step) => {
    return step === 1 || step === 3 || step === 4 || step === 5 || step === 6;
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };


  let contractPagination = {
    order: true,
    page: page,
    size: rowsPerPage,
    sortBy: "id",
  };

  useEffect(() => {
    dispatch(getRoles());
    dispatch(getWorkStations());
    dispatch(getDepartments());
    dispatch(GetAllWorkSchdule());
    dispatch(userInfoStatus());
    dispatch(GetHeaders())
    dispatch(GetContractStatus())
  }, [])


  // const requireFieldsFunc = () => {
  //   if (name !== "" && gender !== "" && cellular !== "" && status !== "" && email !== "" && dob !== "" &&
  //     role !== "" && employeeId !== "" && startdate !== "" && workStation !== "" && contractStatus !== "" && endDate !== "") {
  //     return true;
  //   }
  // }

  const handleSaveChanges = () => {
    if (email && name && cellular && gender && status && dob && role && workStation && employeeId && contractStatus && startdate && endDate) {
      console.log("name", name, "email", email, "gender", gender,
        "cellular", cellular,
        "status", status, "dov", dob, "role", role, "workStation", workStation,
        "employeeId", employeeId,
        "contractStatus", contractStatus, "startdate", startdate,
        "endDate", endDate)

      getUserByEmail(email).then(({ data }) => {
        toast.error(data.message)
      }).catch(error => {
        const preRegisterUserObj = {
          name: name,
          email: email,
          phoneNumber: cellular
          // gender:{}
        }
        preRegisterUser(preRegisterUserObj).then((
          // { data: { data } }
          res
        ) => {

          // toast.success("Pre-Register User Created Successfully..!");
          console.log("preee", res?.data?.data)
          console.log("preee", res?.data)
          if (res?.data?.data != null) {
            if (checkboxState) {
              let customSchdule = [];
              customSchdulTime?.map((item) => {
                customSchdule.push({
                  user: { id: res?.data?.data?.id },
                  zone: { id: item?.zone?.id.split(",", 1)[0] },
                  day: { id: item?.day?.id },
                  from: item?.from,
                  to: item?.to,
                });
              });
              if (customSchdulTime?.length !== 0) {
                dispatch(addCustomWorkShift(customSchdule));
              }
            } else {
              if (WorkShift) {
                const workShiftBody = {
                  userId: res?.data?.data?.id,
                  workShiftId: WorkShift
                }
                dispatch(addWorkShift(workShiftBody));
              }
            }

            const employeeObj = {
              user: {
                id: res?.data?.data?.id // pre-register user id
              },
              company: {
                id: companyId
              },
              zone: {
                id: workStation
              },
              role: {
                id: role
              },
              employeeId: employeeId,
              startDate: startdate?.getTime(),
              endDate: endDate?.getTime()
            }
            createEmployee(employeeObj).then(({ data: { data } }) => {
              toast.success("Employee Created Successfully..!")
              console.log("need to pass", data)

              const body = {
                accessMethod: {
                  id: 5,
                },
                user: {
                  id: data?.user?.id,
                },
                description: "Face recognition"
              }

              if (imgUpload?.size) {
                dispatch(createImgObj(body)).then((res) => {
                  console.log("reeeee", res)
                  let formData = new FormData();
                  formData.append('id', res?.payload?.data?.data?.id);
                  formData.append('option', "user");
                  formData.append('file', imgUpload);

                  dispatch(uploadNewImage(formData))
                  // .then(() => {
                  //   dispatch(getSelfie(data?.id)).then(({ payload: { data: { data } } }) => {
                  //     dispatch(downloadSelfie(data?.id));
                  //     setImgUpload(null)
                  //   })
                  // })

                })
              }
              const extraDatabody = {
                "header1": field1 || "",
                "header2": field2 || "",
                "header3": field3 || "",
                "header4": field4 || "",
                "header5": field5 || "",
                "header6": field6 || "",
                "header7": field7 || "",
                "header8": field8 || "",
                "header9": field9 || "",
                "header10": field10 || "",
                "header11": field11 || "",
                "header12": field12 || "",
                "header13": field13 || "",
                "header14": field14 || "",
                "header15": field15 || "",
                "id": ""
              }

              UpdateExtraData(extraDatabody, data?.user?.id).then(() => {
                // toast.success("Extra Data updated successfully..!")
              }).catch(error => {
                // toast.error("something went wrong in extra data section.")
              })
              navigate("/dashboard/employee/all-employees", { replace: true });

            }).catch(error => {
              toast.error("something went wrong in creating employee.")
            })
          } else {
            toast.error(res?.data?.message)

          }
          // console.log(data)
        }).catch(error => {
          console.log("errrr", error)
          // toast.error("something went wrong in pre-register user. Please check your fields")
        })
      })
    } else {
      toast.warn("Please Fill All The Feilds")
    }

  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(GetWorkTimeAccess({ id: WorkShift, contractPagination }));
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    dispatch(GetWorkTimeAccess({ id: WorkShift, contractPagination }));
  };

  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 13px)',
      right: 'calc(50% + 13px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#707070',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#707070',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderTopWidth: 1,
      borderRadius: 1,
    },
  }));

  return (
    <>
      <div className='head'>
        <div className='headLeft'>
          <Link to="/dashboard/employee/all-employees">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px",
            }}></i>
          </Link>
          <h2>{t("enrollment")}</h2>
        </div>
      </div>

      <div className="text-center exchange_icon">
        <img
          src={
            imageToUpload === null
              ? person5
              : imageToUpload
          }
          className="img-fluid"
          // style={{ width: 240, height: 240, borderRadius: "100%" }}
          alt="employeedetail-person4"
        />
        
      </div>

      

      <Stepper className="stepper-font mt-3" activeStep={activeStep} alternativeLabel connector={<QontoConnector />}>
        {steps.map((label, index) => {
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">{t('(optional)')}</Typography>
            );
          }
          return (
            <Step key={index}>
              <StepLabel className="text-center stepper-font" {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>

      {/* {activeStep === 0 && ( */}
      <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
        <div className="enrollment-wrapper justify-content-right mt-5 mb-4">
          <Step1Details
            userData={userData}
            onChange={handleFormChangeUserData}
            setUserData={setUserData} />
          <div className="create-enrollment-footer mt-3 row pr-2" >
            <button
              className='col-6' style={{ background: '#fcfcfc', border: 'none', boxShadow: 'none' }}
            >

            </button>
            <button
              className='custom_primary_btn_dark col-6'
              disabled={activeStep === steps.length - 1} onClick={() => setActiveStep(prevStep => prevStep + 1)}>
              {t('next').toUpperCase()}
            </button>
          </div>
        </div>
        {/* } */}
        <div className="enrollment-wrapper justify-content-right mt-5 mb-4">
          <Step2OtherDetails
            extraData={extraData}
            onChange={handleFormChangeExtraData}
            setExtraData={setExtraData}
            headersList={headersList} />
            
          <div className="create-enrollment-footer mt-3 row pr-2" >
            <button className='btn_cancel_background_gray_hover col-6' onClick={() => setActiveStep(prevStep => prevStep - 1)}
              style={{ color: "#BC0000" }}>
              {t("back")}
            </button>
            <button
              className='custom_primary_btn_dark col-6'
              disabled={activeStep === steps.length - 1} onClick={() => setActiveStep(prevStep => prevStep + 1)}>
              {t('next').toUpperCase()}
            </button>
          </div>
        </div>

        <div className="enrollment-wrapper justify-content-right mt-5 mb-4">
          <Step3EmployeeContract
            employeeData={employeeData}
            employeeRoles={employeeRoles}
            employeeWorkStations={employeeWorkStations}
            contractStatusList={contractStatusList}
            employeeDepartments={employeeDepartments}
            onChange={handleFormChangeEmployeeData}
            setEmployeeData={setEmployeeData} />
          <div className="create-enrollment-footer mt-3 row pr-2" >
            <button className='btn_cancel_background_gray_hover col-6' onClick={() => setActiveStep(prevStep => prevStep - 1)}
              style={{ color: "#BC0000" }}>
              {t("back")}
            </button>
            <button
              className='custom_primary_btn_dark col-6'
              disabled={activeStep === steps.length - 1} onClick={() => setActiveStep(prevStep => prevStep + 1)}>
              {t('next').toUpperCase()}
            </button>
          </div>
        </div>

        <div className="enrollment-wrapper justify-content-right mt-5 mb-4">
          <Step4AccessRights
            employeeData={employeeData}
            workShiftsList={workShiftsList}
            setWorkShiftsList={setWorkShiftsList}
            customizedList={customizedList}
            setCustomizedList={setCustomizedList}
            onChange={handleFormChangeEmployeeData}
            setEmployeeData={setEmployeeData} />
          <div className="create-enrollment-footer mt-3 row pr-2" >
            <button className='btn_cancel_background_gray_hover col-6' onClick={() => setActiveStep(prevStep => prevStep - 1)}
              style={{ color: "#BC0000" }}>
              {t("back")}
            </button>
            <button
              className='custom_primary_btn_dark col-6'
              disabled={activeStep === steps.length - 1} onClick={() => setActiveStep(prevStep => prevStep + 1)}>
              {t('next').toUpperCase()}
            </button>
          </div>
        </div>

        <div className="enrollment-wrapper justify-content-right mt-5 mb-4">
          <Step5TakeSelfie
            employeeData={employeeData}
            onChange={handleFormChangeEmployeeData}
            setEmployeeData={setEmployeeData} />
          <div className="create-enrollment-footer mt-3 row pr-2" >
            <button className='btn_cancel_background_gray_hover col-6' onClick={() => setActiveStep(prevStep => prevStep - 1)}
              style={{ color: "#BC0000" }}>
              {t("back")}
            </button>
            <button
              className='custom_primary_btn_dark col-6'
              disabled={activeStep === steps.length - 1} onClick={() => setActiveStep(prevStep => prevStep + 1)}>
              {t('next').toUpperCase()}
            </button>
          </div>
        </div>

        <div className="enrollment-wrapper justify-content-right mt-5 mb-4">
          <Step6CapturerFinger
            employeeData={employeeData}
            onChange={handleFormChangeEmployeeData}
            setEmployeeData={setEmployeeData} />
          <div className="create-enrollment-footer mt-3 row pr-2" >
            <button className='btn_cancel_background_gray_hover col-6' onClick={() => setActiveStep(prevStep => prevStep - 1)}
              style={{ color: "#BC0000" }}>
              {t("back")}
            </button>
            <button
              className='custom_primary_btn_dark col-6'
              disabled={activeStep === steps.length - 1} onClick={() => setActiveStep(prevStep => prevStep + 1)}>
              {t('next').toUpperCase()}
            </button>
          </div>
        </div>

        <div className="enrollment-wrapper justify-content-right mt-5 mb-4">
          <Step7Card
            employeeData={employeeData}
            onChange={handleFormChangeEmployeeData}
            setEmployeeData={setEmployeeData} />
          <div className="create-enrollment-footer mt-3 row pr-2" >
            <button className='btn_cancel_background_gray_hover col-6' onClick={() => setActiveStep(prevStep => prevStep - 1)}
              style={{ color: "#BC0000" }}>
              {t("back")}
            </button>
            <button
              className='custom_primary_btn_dark col-6'
              disabled={activeStep === steps.length - 1} onClick={() => setActiveStep(prevStep => prevStep + 1)}>
              {t('next').toUpperCase()}
            </button>
          </div>
        </div>

        <div className="enrollment-wrapper justify-content-right mt-5 mb-4">
          <Step8Summary
            userData={userData}
            extraData={extraData}
            employeeRoles={employeeRoles}
            employeeWorkStations={employeeWorkStations}
            contractStatusList={contractStatusList}
            employeeDepartments={employeeDepartments}
            workShiftsList={workShiftsList}
            customizedList={customizedList}
            onChange={handleFormChangeEmployeeData}
            employeeData={employeeData}
            headersList={headersList} />
          <div className="create-enrollment-footer mt-3 row pr-2" >
            <button className='btn_cancel_background_gray_hover col-6' onClick={() => setActiveStep(prevStep => prevStep - 1)}
              style={{ color: "#BC0000" }}>
              {t("back")}
            </button>
            <button
              className='custom_primary_btn_dark col-6'
              disabled={activeStep === steps.length - 1} onClick={() => setActiveStep(prevStep => prevStep + 1)}>
              {t('next').toUpperCase()}
            </button>
          </div>
        </div>

      </SwipeableViews>





      <NewCard
        title="New Card"
        show={newCardModal}
        onHide={() => setNewCardModal(false)}
      />
      {/* <ChangeImage
        title="Change Image"
        check="false"
        show={changeImageModal}
        onHide={() => setChangeImageModal(false)}
      /> */}
    </>
  );
};

export default CreateEmployee;
