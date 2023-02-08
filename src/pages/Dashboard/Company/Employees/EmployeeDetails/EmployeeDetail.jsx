import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GoPrimitiveDot } from 'react-icons/go'
import { AiOutlineSave } from 'react-icons/ai'
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DetailInfo from "./DetailInfo";
import DetailExtraData from "./DetailExtraData";
import DetailContract from "./DetailContract";
import DetailAccessRights from "./DetailAccessRights";
import DetailCards from "./DetailCards";
import DetailDocument from "./DetailDocument";
import DetailFireArms from "./DetailFireArms";
import DetailVehicles from "./DetailVehicles";
import ChangeImage from "../Modal/ChangeImage";
import exchangealt from "../../../../../assets/images/exchange-alt-solid.svg";
import person4 from '../../../../../assets/images/person-4.png';
import cancel from '../../../../../assets/images/ic-cancel.svg';
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { getSingleEmployeeDetail, getSingleEmployeeWithId } from "../../../../../reduxToolkit/CompanyEmployees/CompanyEmployeesApi";
import { useDispatch, useSelector } from "react-redux";
import { singleFireArmRefresh } from "../../../../../reduxToolkit/CompanyEmployees/CompanyEmployeesSlice";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { permissionObj } from "../../../../../Helpers/permission";

const AllowDenyModal = (props) => {
  const { dataobj } = props;
  return (
    <Modal
      className="filter_Event_model"
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className='fiter_event_model_head'>
        <Modal.Title
          style={{
            width: "100%",
            color: '#146F62',
            fontSize: "20px",
            fontWeight: "600",
            textAlign: "center",
            marginTop: "10px"
          }}
        >
          {dataobj?.title}
        </Modal.Title>
        <img
          src={cancel}
          style={{
            position: "absolute",
            padding: "1px",
            right: "3px",
            width: "15px",
            height: "15px",
            top: "3px",
            cursor: "pointer",
          }}
          onClick={() => props.onHide()}
        />
      </Modal.Header>
      <Modal.Body>
        <p style={{ fontSize: '12px', textAlign: 'center' }}>
          {dataobj?.desc}
        </p>
        <div className="changeImgBottomDiv">
          <button
            onClick={() => props.onHide()}
            className="changeImgCancelBtn"
          >
            CANCEL
          </button>
          <button
            className="changeImgChangeBtn"
          >
            CHANGE
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}


const EmployeeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const employeeDetail = useSelector(state => state?.CompanyEmployeesSlice?.singleEmployeeDetail);
  const companyRestrictionsData = useSelector(state => state?.EmployeeEventsSlice?.companyRestrictionsData);
  const { permission } = useSelector(state => state.authenticatioauthennSlice);
  console.log(employeeDetail)
  console.log(companyRestrictionsData)



  const [changeImageModal, setChangeImageModal] = useState(false);
  const [allowDeny, setAllowDeny] = useState(false);
  const [allowDenyObj, setAllowDenyObj] = useState({
    title: "",
    desc: ""
  });

  useEffect(() => {
    dispatch(getSingleEmployeeDetail(id));
    dispatch(getSingleEmployeeWithId(id))

    dispatch(singleFireArmRefresh({}));
  }, [])


  const handleStatus = (paramId) => {
    return paramId === 2 ? "#F2A100" :
      paramId === 3 ? "blue" :
        paramId === 4 ? "#0C4523" :
          paramId === 5 ? "orange" :
            paramId === 6 ? "#BC0000" : "black"
  }

  return (
    <>
      <div className='head align-items-start'>
        <div className='headLeft'>
          <Link to="/dashboard/employee/all-employees">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}></i>
          </Link>
          <h2>
            {t('user_data')}
            <sub
              style={{
                fontSize: "14px",
                marginLeft: "10px",
                color: handleStatus(employeeDetail?.status?.id)
              }}
            >
              {employeeDetail?.status?.name.replace(/\_/g, " ")}
              <GoPrimitiveDot
                style={{
                  color: handleStatus(employeeDetail?.status?.id),
                  fontSize: "25px",
                }}
              />
            </sub>
          </h2>
        </div>
        <div style={{ zIndex: "1000" }}>
          {permission?.includes(permissionObj?.WEB_EMPLOYEE_UPDATE) &&
            <button
              className="employeeDetailHeaderBtn"
              style={{ backgroundColor: "rgb(162, 203, 244)" }}
              onClick={() => {
                setAllowDeny(true);
                setAllowDenyObj({
                  title: "SEND QR CODE",
                  desc: "To send the QR CODE of the user, must confirm the action"
                })
              }}
            >
              {t('send_qr_code_by_email')}
              <MailOutlineIcon />
            </button>
          }
          {permission?.includes(permissionObj?.WEB_EMPLOYEE_UPDATE) &&
            <button
              className="employeeDetailHeaderBtn"
              style={{ backgroundColor: "rgb(188, 0, 0)" }}
              onClick={() => {
                setAllowDeny(true);
                setAllowDenyObj({
                  title: "UNLINK DEVICE",
                  desc: "To send the unlink the device of the user, must confirm the action"
                })
              }}
            >
              {t('unlink_device')}
              <PhoneIphoneIcon />
            </button>
          }
          {
            permission?.includes(permissionObj?.WEB_EMPLOYEE_UPDATE) &&
            <Link to={`/dashboard/employee/all-employees/update-employee/${employeeDetail?.id}`}>
              <button
                className="employeeDetailHeaderBtn"
                style={{ backgroundColor: "rgb(20, 111, 98)" }}
                onClick={() => { dispatch(getSingleEmployeeWithId(employeeDetail?.id)) }}
              >
                {t('update_data')}
                <AiOutlineSave style={{ fontSize: "20px" }} />
              </button>
            </Link>
          }

          <AllowDenyModal
            show={allowDeny}
            onHide={() => setAllowDeny(false)}
            dataobj={allowDenyObj}
          />
        </div>
      </div>
      <div className="text-center exchange_icon">
        {console.log(employeeDetail)}
        <img
          src={employeeDetail?.selfie != null ? `data:image/png;base64,${employeeDetail?.selfie}` : person4}
          className="img-fluid"
          style={{ width: 240, height: 240, borderRadius: "100%" }}
          alt="employeedetail-person4"
        />
        <Link
          to="#"
          onClick={() => setChangeImageModal(true)}
          className="position-relative"
        >
          {/* <span className="dot">
            <img
              src={exchangealt}
              className="img-fluid exchange_alt_m"
              alt="exchange_alt"
            />
          </span> */}
        </Link>
        <ChangeImage
          show={changeImageModal}
          onHide={() => setChangeImageModal(false)}
        />
      </div>
      <div className="pt-3 mb-4 row">
        {
          <div
            className={
              companyRestrictionsData?.extraDataExternal ? "col-lg-6 col-md-6 col-12" : "col-sm-12"
            }
          >
            <DetailInfo />
          </div>
        }

        {companyRestrictionsData?.extraDataExternal && (
          <DetailExtraData />
        )}
      </div>
      <DetailContract employeeDetail={employeeDetail} />
      <DetailAccessRights />
      <DetailCards option="detail" />
      <DetailDocument option="detail" />
      <DetailFireArms option="detail" />
      <DetailVehicles option="detail" />
    </>
  );
};

export default EmployeeDetail;
