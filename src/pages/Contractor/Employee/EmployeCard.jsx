import React from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import UserDemoImg from "../../../assets/images/userDemoImg.png";
import i18next, { t } from "i18next";

const EmployeCard = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="viewcard-container  mb-3 mr-3" style={{ width: "300px" }}>
      {data?.status?.id == 2 ? (
        <span
          className="viewcard-container__status"
          style={{ color: "#FEDE00" }}
        >
          {data?.status?.name.replaceAll("_", " ")}
          <FiberManualRecordIcon sx={{ fontSize: 40 }} />
        </span>
      ) : null}

      {data?.status?.id == 3 ? (
        <span
          className="viewcard-container__status "
          style={{ color: "#006594" }}
        >
          {data?.status?.name.replaceAll("_", " ")}
          <FiberManualRecordIcon />
        </span>
      ) : null}
      {data?.status?.id == 4 ? (
        <span className="viewcard-container__status employe-status-Vacation">
          {data?.status?.name.replaceAll("_", " ")} <FiberManualRecordIcon />
        </span>
      ) : null}
      {data?.status?.id == 5 ? (
        <span
          className="viewcard-container__status"
          style={{ color: "orange" }}
        >
          {data?.status?.name.replaceAll("_", " ")} <FiberManualRecordIcon />
        </span>
      ) : null}
      {data?.status?.id == 6 ? (
        <span className="viewcard-container__status" style={{ color: "red" }}>
          {data?.status?.name.replaceAll("_", " ")}{" "}
          <FiberManualRecordIcon style={{ color: "red" }} />
        </span>
      ) : null}
      {data?.selfie ? (
        <img
          src={`data:image/png;base64,${data?.selfie}`}
          className="viewcard-container__img"
          alt="hero image"
        />
      ) : (
        <img
          src={UserDemoImg}
          className="viewcard-container__img"
          alt="hero image"
        />
      )}
      <Grid container>
        <Grid item xs={5}>
          <span className="viewcard-container__title">{t("name")}</span>
        </Grid>
        <Grid item xs={7}>
          <span className="viewcard-container__desc">{data?.name}</span>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          <span className="viewcard-container__title">{t("gender")}</span>
        </Grid>
        <Grid item xs={7}>
          <span className="viewcard-container__desc">
            {data?.gender?.name ? data?.gender?.name : "--"}
          </span>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          <span className="viewcard-container__title">{t("email")}</span>
        </Grid>
        <Grid item xs={7}>
          <span className="viewcard-container__desc">{data?.email}</span>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          <span className="viewcard-container__title">{t("number")}</span>
        </Grid>
        <Grid item xs={7}>
          <span className="viewcard-container__desc">{data?.phoneNumber}</span>
        </Grid>
      </Grid>
      {data?.status?.id == 3 ? (
        <span
          className="viewcard-container__link mt-2"
          onClick={() =>
            navigate(`/dashboard/contractor/employee-upload-documets/${data?.id}`)
          }
        >
          {t("complete_document")} <KeyboardArrowRightIcon style={{
            transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
            margin: "0 10px"
          }} />
        </span>
      ) : (
        <span
          className="viewcard-container__link mt-2"
          onClick={() =>
            navigate(`/dashboard/contractor/employee-contract-detail/${data?.id}`)
          }
        >
          {t("employee_details")} <KeyboardArrowRightIcon style={{
            transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
            margin: "0 10px"
          }} />
        </span>
      )}
    </div>
  );
};

export default EmployeCard;
