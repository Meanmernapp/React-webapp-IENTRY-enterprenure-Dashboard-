import { Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CarDemoImg from "../../../assets/images/carDemoImg.png";
import i18next,{ t } from "i18next";

const ViewCard = ({ vehicles }) => {

  const navigate = useNavigate();

  return (
    <div className="viewcard-container mb-3 mr-3" style={{ width: "300px" }}>
      {vehicles?.status?.id == 2 ? (
        <span className="viewcard-container__status employe-status-documents">
          {vehicles?.status?.name.replaceAll("_", " ")}
          <FiberManualRecordIcon sx={{ fontSize: 40 }} />
        </span>
      ) : null}

      {vehicles?.status?.id == 3 ? (
        <span
          className="viewcard-container__status "
          style={{ color: "#006594" }}
        >
          {vehicles?.status?.name.replaceAll("_", " ")}
          <FiberManualRecordIcon />
        </span>
      ) : null}
      {vehicles?.status?.id == 4 ? (
        <span
          className="viewcard-container__status employe-status-Vacation"
          style={{ color: "#0C4523" }}
        >
          {vehicles?.status?.name.replaceAll("_", " ")}{" "}
          <FiberManualRecordIcon />
        </span>
      ) : null}
      {vehicles?.status?.id == 5 ? (
        <span
          className="viewcard-container__status"
          style={{ color: "orange" }}
        >
          {vehicles?.status?.name.replaceAll("_", " ")}{" "}
          <FiberManualRecordIcon />
        </span>
      ) : null}
      {vehicles?.status?.id == 6 ? (
        <span className="viewcard-container__status" style={{ color: "red" }}>
          {vehicles?.status?.name.replaceAll("_", " ")}{" "}
          <FiberManualRecordIcon />
        </span>
      ) : null}
      {vehicles?.image ? (
        <img
          src={`data:image/png;base64,${vehicles?.image}`}
          className="viewcard-container__img"
          alt="hero image"
        />
      ) : (
        <img
          src={CarDemoImg}
          className="viewcard-container__img"
          alt="hero image"
        />
      )}
      <Grid container>
        <Grid item xs={5}>
          <span className="viewcard-container__title">{t("brand")}</span>
        </Grid>
        <Grid item xs={7}>
          <span className="viewcard-container__desc">{vehicles?.brand}</span>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          <span className="viewcard-container__title">{t("sub_brand")}</span>
        </Grid>
        <Grid item xs={7}>
          <span className="viewcard-container__desc">{vehicles?.subBrand}</span>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          <span className="viewcard-container__title">{t("modal")}</span>
        </Grid>
        <Grid item xs={7}>
          <span className="viewcard-container__desc">{vehicles?.model}</span>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          <span className="viewcard-container__title">{t("color")}</span>
        </Grid>
        <Grid item xs={7}>
          <span className="viewcard-container__desc">{vehicles?.color}</span>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={5}>
          <span className="viewcard-container__title">{t("plates")}</span>
        </Grid>
        <Grid item xs={7}>
          <span className="viewcard-container__desc">{vehicles?.plate}</span>
        </Grid>
      </Grid>
      {/* <Grid container>
        <Grid item xs={5}>
          <span className="viewcard-container__title">Type</span>
        </Grid>
        <Grid item xs={7}>
          <span className="viewcard-container__desc">Double Tratin</span>
        </Grid>
      </Grid> */}
      {vehicles?.status?.id == 3 ? (
        <span
          className="viewcard-container__link"
          onClick={() =>
            navigate(`/dashboard/contractor/upload-vehicle-documents/${vehicles?.id}`)
          }
        >
          {t("complete_document")} <KeyboardArrowRightIcon style={{
            transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
            margin: "0 10px"
          }} />
        </span>
      ) : (
        <span
          className="viewcard-container__link"
          onClick={() =>
            navigate(`/dashboard/contractor/vehicle-contract-detail/${vehicles?.id}`)
          }
        >
          {t("vehicle_details")} <KeyboardArrowRightIcon style={{
            transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
            margin: "0 10px"
          }} />
        </span>
      )}
    </div>
  );
};

export default ViewCard;
