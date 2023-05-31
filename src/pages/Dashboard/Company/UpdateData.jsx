import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";



import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



import submitupload from "../../../assets/images/upload.PNG";
import ic_save from "../../../assets/images/ic-save.svg";
import LefletMap from "../../../components/LefletMap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateComopanyImg,
} from "../../../Apis/companydata";
import { toast } from "react-toastify";
import {
  companyDataToUpdate,
  getCompanyRestrictionObj,
  getSelectRestrictionObj,
  updateCompany,
  updateCompanyRestrictions,
} from "../../../reduxToolkit/UpdateCompany/UpdateCompanyApi";
import { mapCoordinates } from "../../../reduxToolkit/UpdateCompany/UpdateCompanySlice";
// language translator import
import { useTranslation } from 'react-i18next'
import Cookies from "js-cookie";
import MuiTextField from "../../../components/MuiTextField";

const UpdateData = () => {
  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    user: {
      data: { id },
    },
  } = useSelector((state) => state.authenticatioauthennSlice);
  const { SelectRestrictionData } = useSelector(
    (state) => state.UpdateCompanySlice
  );
  const { companyDataToUpdateObj } = useSelector(
    (state) => state.UpdateCompanySlice
  );
  const { CompanyRestrictionData } = useSelector(
    (state) => state.UpdateCompanySlice
  );
  const { latLngObj } = useSelector(
    (state) => state.UpdateCompanySlice
  );

  const { permission } = useSelector(state => state.authenticatioauthennSlice);

  const [showMap, setShowMap] = useState(false);
  const [updateCompanyImg, setUpdateCompanyImg] = useState();
  const [companyImg, setCompanyImg] = useState();

  const [email, setEmail] = useState(false);
  const [sms, setSms] = useState(false);
  const [drive, setDrive] = useState(false);

  const [isOnu, setIsOnu] = useState(false);
  const [fireArms, setFireArms] = useState(false);

  const [extraData, setExtraData] = useState(false);
  const [biocrValidation, setBiocrValidation] = useState(false);
  const [contractorOption, setContractorOption] = useState();
  const [providerOption, setProviderOption] = useState();

  const [alertInvitationOption, setAlertInvitationOption] = useState();
  const [alertEventOption, setAlertEventOption] = useState();

  const [companyData, setCompanyData] = useState({
    acronym: "",
    name: "",
    address: "",
    latitud: "",
    longitud: "",
    ip: "",
    mision: "",
    vision: "",
    introduction: "",
  });

  useEffect(() => {
    /*
    author rizwan ullah
     get restriction object to display on update data section
     */
    dispatch(getSelectRestrictionObj());

    /*
    author rizwan ullah
    get company data to display 
    */
    if (id) {
      dispatch(companyDataToUpdate(id)).then(
        ({
          payload: {
            data: { data },
          },
        }) => {
          console.log(data)
          dispatch(mapCoordinates({
            address: data?.address,
            lat: data?.latitud,
            lng: data?.longitud
          }))
          setCompanyData({
            acronym: data?.acronym,
            name: data?.name,
            // address: data?.address,
            // latitud: data?.latitud,
            // longitud: data?.longitud,
            ip: data?.ip,
            mision: data?.mision,
            vision: data?.vision,
            introduction: data?.introduction,
          });

          /*
          author rizwan ullah
          get company restrictions from database.
          */
          // dispatch(getCompanyRestrictionObj(data?.id)).then(
          //   ({
          //     payload: {
          //       data: { data },
          //     },
          //   }) => {

          //     setEmail(data?.emailService);
          //     setSms(data?.smsService);
          //     setDrive(data?.driveService);

          //     setIsOnu(data?.isOnuEvent);
          //     setFireArms(data?.fireArmsModule);

          //     setExtraData(data?.extraDataExternal);
          //     setBiocrValidation(data?.biocrValidationExternal);
          //     // setContractorCheck(data?.)
          //     // setProviderCheck(data?.)
          //     setContractorOption(data?.contractorRestriction?.id || "");
          //     setProviderOption(data?.providerRestriction?.id || "");

          //     // setAlertInvitation(data?.)
          //     // setAlertEvent(data?.)
          //     setAlertInvitationOption(data?.alertTimeIncomingInvitation || "");
          //     setAlertEventOption(data?.alertTimeIncomingEvent || "");
          //   }
          // );
        }
      );
    }
  }, []);

  /* manage image when loaded from local device.*/
  const onImageChange = (e) => {
    setUpdateCompanyImg(e.target.files[0]);
    const [file] = e.target.files;
    setCompanyImg(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  console.log(latLngObj?.address)
  const handleSubmit = () => {
    // company update object.
    const body = {
      id: companyDataToUpdateObj?.id,
      status: {
        id: companyDataToUpdateObj?.status?.id,
      },
      acronym: companyData?.acronym,
      name: companyData?.name,
      address: latLngObj?.address,
      latitud: latLngObj?.lat,
      longitud: latLngObj?.lng,
      ip: companyData?.ip,
      mision: companyData?.mision,
      vision: companyData?.vision,
      introduction: companyData?.introduction,
    };
    /* update company data.*/
    dispatch(updateCompany(body)).then(
      ({
        payload: {
          data: { data },
        },
      }) => {
        dispatch(mapCoordinates({
          address: "",
          lat: "",
          lng: ""
        }))

        let formData = new FormData();
        formData.append("id", data?.id);
        formData.append("option", "company");
        formData.append("file", updateCompanyImg);

        /* restric if image is not uploaded don't call Api*/
        if (updateCompanyImg !== undefined && updateCompanyImg?.size <= 512000) {
          /* company image Update */
          updateComopanyImg(formData)
            .then((data) => {
              // console.log(data);
            })
            .catch((error) => {
              toast.error(
                "something went wrong in updating image company section"
              );
            });
        }
        // google map key
        // AIzaSyDRCcydEnjt7P-riOx4X-Dm4F1HDntPEDg

        const body = {
          id: CompanyRestrictionData?.id,
          alertTimeIncomingEvent: Number(alertEventOption),
          alertTimeIncomingInvitation: Number(alertInvitationOption),
          biocrValidationExternal: biocrValidation,
          company: {
            ip: data?.ip,
          },
          contractorRestriction: {
            id: contractorOption,
          },
          driveService: drive,
          emailService: email,
          extraDataExternal: extraData,
          fireArmsModule: fireArms,
          isOnuEvent: isOnu,
          providerRestriction: {
            id: providerOption,
          },
          smsService: sms,
        };
        /* author: Rizwan ullah
         Update company restrictions.*/
        dispatch(updateCompanyRestrictions(body)).then(() => {
          dispatch(mapCoordinates({
            address: "",
            lat: "",
            lng: ""
          }))

          // toast.success("Company Data updated successfully!");
          navigate("/dashboard/employee/company");
        })
      }
    );
  };

  return (
    <div className="dragdrop_row">
      <div className="head">
        <div className="headLeft">
          <Link to="/dashboard/employee/company">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}></i>
          </Link>
          <h2>{t("corporate_data")}</h2>
        </div>
        <button onClick={handleSubmit}>
          <span>{t("update_data")}</span>
          <img src={ic_save} alt="ic_save" />
        </button>
      </div>
      <div className="mt-5 row">
        <h4>{t("data")}</h4>
        <div className="col-lg-3">
          <MuiTextField
            label={t("company_name")}
            name="name"
            value={companyData.name}
            handleChange={handleChange}
          />
        </div>
        <div className="col-lg-3">
          <MuiTextField
            label={t('acronym')}
            name="acronym"
            value={companyData.acronym}
            handleChange={handleChange}
          />
        </div>
        <div className="col-lg-6 position-relative">
          <MuiTextField
            label={t('address')}
            name="address"
            disable={true}
            value={latLngObj?.address}
          // handleChange={handlFChange}
          />
          <p className="pull-right" onClick={() => setShowMap(!showMap)}>
            {t('show_in_map')}
          </p>
          {/* condition if user want to show mapor not */}
          {showMap ? (
            <LefletMap
              // latlng={[1.5234234, 3.45345345]}
              latlng={[latLngObj?.lat, latLngObj?.lng]}
            />
          ) : ""}
        </div>
      </div>
      <div className="mt-3 row">
        <div className="col-md-6">
          <h4>{t('image_logo')}</h4>
          <div className="updata_img_m">
            <label htmlFor="file-input" className="dottedborderbox">
              <img
                src={submitupload}
                alt="submitupload"
                className="submitupload"
              />
              <input
                type="file"
                id="file-input"
                accept="image/*, video/*"
                onChange={onImageChange}
              />
              <p>
                drag {"&"} drop <br /> your image <br /> size 20 mb max
              </p>
            </label>
          </div>
        </div>
        <div className="col-md-6 text-center mt-3">
          {/* {companyImg ? ( */}
          <img
            src={
              companyImg
                ? companyImg
                : `data:;base64,${companyDataToUpdateObj?.image}`
            }
            // src={companyImg}
            className="uploadedPath"
          />
          {/* // ) : null} */}
        </div>
      </div>
      <div className="mt-5 row">
        <div className="col-lg-6">
          <TextField size="small"
            fullWidth

            multiline
            rows={3}
            label={t('mission')}
            name="mision"
            id="outlined-size-normal"
            // defaultValue={latLngObj?.mision || ""}
            value={companyData?.mision}
            onChange={handleChange}
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
          <FormHelperText id="outlined-weight-helper-text">0/500 MAX.</FormHelperText>
        </div>
        <div className="col-lg-6">
          <TextField size="small"
            fullWidth

            multiline
            rows={3}
            label={t('vision')}
            name="vision"
            id="outlined-size-normal"
            // defaultValue={latLngObj?.vision || ""}
            value={companyData?.vision}
            onChange={handleChange}
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
          <FormHelperText id="outlined-weight-helper-text">0/500 MAX.</FormHelperText>
        </div>
        <div className="col-lg-12">
          <TextField size="small"
            fullWidth

            multiline
            rows={4}
            label={t('introduction')}
            name="introduction"
            id="outlined-size-normal"
            // defaultValue={latLngObj?.introduction || ""}
            value={companyData?.introduction}
            onChange={handleChange}
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
          <FormHelperText id="outlined-weight-helper-text">0/500 MAX.</FormHelperText>
        </div>
      </div>
      {/* <div className="row restrictions_text">
        <h4>{t('restrictios')}</h4>
        
        <h4 className="restrictionParts part1">{t('services')}</h4>
        <div className="col-md-6">
          <div className="my-3 updateDataDiv">
            <div className="checkBoxWithText">
              <h6 id="updatedata">{t('email_service')}</h6>
              <label className="container1">
                <input
                  type="checkbox"
                  name="check"
                  checked={email}
                  onChange={(e) => setEmail(e.target.checked)}
                />
                <span className="checkmark"
                  style={{
                    right: lCode === "ar" ? "" : "2rem",
                    left: lCode === "ar" ? "2rem" : ""
                  }}
                ></span>
              </label>
            </div>
            <p>
              <span>{t('info')}</span>Send updates to User update through email.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="my-3 updateDataDiv">
            <div className="checkBoxWithText">
              <h6 id="updatedata">{t('sms_service')} </h6>
              <label className="container1">
                <input
                  type="checkbox"
                  name="check"
                  checked={sms}
                  onChange={(e) => setSms(e.target.checked)}
                />
                <span className="checkmark"
                  style={{
                    right: lCode === "ar" ? "" : "2rem",
                    left: lCode === "ar" ? "2rem" : ""
                  }}></span>
              </label>
            </div>
            <p>
              <span>{t('info')} </span>Send sms to actions, reset password, confirm
              account, etc.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="my-3 updateDataDiv">
            <div className="checkBoxWithText">
              <h6 id="updatedata">{t('drive_service')} </h6>
              <label className="container1">
                <input
                  type="checkbox"
                  name="check"
                  checked={drive}
                  onChange={(e) => setDrive(e.target.checked)}
                />
                <span className="checkmark"
                  style={{
                    right: lCode === "ar" ? "" : "2rem",
                    left: lCode === "ar" ? "2rem" : ""
                  }}></span>
              </label>
            </div>
            <p>
              <span>{t('info')} </span>Storage image on the cloud.
            </p>
          </div>
        </div>
       
        <h4 className="restrictionParts part2">{t('extra_modules')}</h4>
        <div className="col-md-6">
          <div className="my-3 updateDataDiv">
            <div className="checkBoxWithText">
              <h6 id="updatedata">{t('is_onu_event_type')} </h6>
              <label className="container1">
                <input
                  type="checkbox"
                  name="check"
                  checked={isOnu}
                  onChange={(e) => setIsOnu(e.target.checked)}
                />
                <span className="checkmark"
                  style={{
                    right: lCode === "ar" ? "" : "2rem",
                    left: lCode === "ar" ? "2rem" : ""
                  }}></span>
              </label>
            </div>
            <p>
              <span>{t('info')} </span>Change the design and add more data.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="my-3 updateDataDiv">
            <div className="checkBoxWithText">
              <h6 id="updatedata">{t('fire_arms_module')}</h6>
              <label className="container1">
                <input
                  type="checkbox"
                  name="check"
                  checked={fireArms}
                  onChange={(e) => setFireArms(e.target.checked)}
                />
                <span className="checkmark"
                  style={{
                    right: lCode === "ar" ? "" : "2rem",
                    left: lCode === "ar" ? "2rem" : ""
                  }}></span>
              </label>
            </div>
            <p>
              <span>{t('info')} </span>The employees will have permission to has fire
              arms.
            </p>
          </div>
        </div>
        
        <h4 className="restrictionParts part3">{t('for_external')}</h4>
        <div className="col-md-6">
          <div className="my-3 updateDataDiv">
            <div className="checkBoxWithText">
              <h6 id="updatedata">{t('extra_data_for_external')} </h6>
              <label className="container1">
                <input
                  type="checkbox"
                  name="check"
                  checked={extraData}
                  onChange={(e) => setExtraData(e.target.checked)}
                />
                <span className="checkmark"
                  style={{
                    right: lCode === "ar" ? "" : "2rem",
                    left: lCode === "ar" ? "2rem" : ""
                  }}></span>
              </label>
            </div>
            <p>
              <span>{t('info')} </span>The external must fill the extra data required
              for the company
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="my-3 updateDataDiv">
            <div className="checkBoxWithText">
              <div>
                <h6 id="updatedata">{t('biocr_validation_for_externals')} </h6>
                <h6 id="updatedata">(providers/contractors) </h6>
              </div>
              <label className="container1">
                <input
                  type="checkbox"
                  name="check"
                  checked={biocrValidation}
                  onChange={(e) => setBiocrValidation(e.target.checked)}
                />
                <span className="checkmark"
                  style={{
                    right: lCode === "ar" ? "" : "2rem",
                    left: lCode === "ar" ? "2rem" : ""
                  }}></span>
              </label>
            </div>
            <p>
              <span>{t('info')} </span>The provider/contractor must make the face
              recognition algorithmic
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="my-3 updateDataDiv">
            <div className="checkBoxWithText">
              <h6 id="updatedata">{t('contractor_option')}</h6>
            </div>
            <FormControl
              fullWidth
              sx={{
                marginTop: "1rem",
                width: "50%",
              }}
            >
              <InputLabel id="demo-simple-select-label">{t('option')}</InputLabel>
              <Select size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={
                  CompanyRestrictionData?.contractorRestriction?.id || ""
                }
                label="OPTION"
                value={contractorOption}
                onChange={(e) => setContractorOption(e.target.value)}
                sx={{
                  fontSize: "14px",
                }}
              >
                {SelectRestrictionData?.map((item) => (
                  <MenuItem
                    value={item?.id}
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p>
              <span>{t('info')} </span>to link which documents will apply for them.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="my-3 updateDataDiv">
            <div className="checkBoxWithText">
              <h6 id="updatedata">{t('supplier_option')}</h6>
            </div>
            <FormControl
              fullWidth
              sx={{
                marginTop: "1rem",
                width: "50%",
              }}
            >
              <InputLabel id="demo-simple-select-label">{t('option')}</InputLabel>
              <Select size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={
                  CompanyRestrictionData?.providerRestriction?.id || ""
                }
                label="OPTION"
                value={providerOption}
                onChange={(e) => setProviderOption(e.target.value)}
                sx={{
                  fontSize: "14px",
                }}
              >
                {SelectRestrictionData?.map((item) => (
                  <MenuItem
                    value={item?.id}
                    sx={{
                      fontSize: "14px",
                    }}
                  >
                    {item?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p>
              <span>{t('info')} </span>to link which documents will apply for them.
            </p>
          </div>
        </div>
       
        <h4 className="restrictionParts part4">{t('alerts')}</h4>
        <div className="col-md-6">
          <div className="my-3 updateDataDiv">
            <div className="checkBoxWithText">
              <h6 id="updatedata">{t('alert_time_incoming_invitation')}</h6>
            </div>
            <TextField size="small"
              label="TIME"
              type="number"

              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              value={alertInvitationOption}
              onChange={(e) => setAlertInvitationOption(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">{t('min')}</InputAdornment>
                ),
              }}
            />
            <p>
              <span>{t('info')} </span>Show an alert 1 hour beofre the invitation
              start
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="my-3 updateDataDiv">
            <div className="checkBoxWithText">
              <h6 id="updatedata">{t('alert_time_incoming_event')}</h6>
            </div>
            <TextField size="small"
              label="TIME"
              type="number"

              id="outlined-start-adornment"
              sx={{ m: 1, width: "25ch" }}
              value={alertEventOption}
              onChange={(e) => setAlertEventOption(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">{t('min')}</InputAdornment>
                ),
              }}
            />
            <p>
              <span>{t('info')} </span>Show an alert 1 hour before the event start
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default UpdateData;
