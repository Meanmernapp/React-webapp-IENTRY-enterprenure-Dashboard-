import { Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import i18next, { t } from "i18next";

const ContractCard = (props) => {
  const navigate = useNavigate()
  const { data } = props;
  const endDate = new Date(data?.endDate);
  const startDate = new Date(data?.starDate);

  return (
    <div className="contract-card">
      <Grid container>
        <Grid item xs={5} sx={{ display: "flex" }}>
          <spna className="contract-card__heading">{t("contracts")}</spna>
          <spna className="contract-card__no"> #102</spna>
        </Grid>
        <Grid item xs={7}>
          {data?.status?.id == 22 ? (
            <span className="viewcard-container__status">
              {data?.status?.name.replaceAll("_", " ")}
              <FiberManualRecordIcon
                sx={{ fontSize: 40 }}
              />
            </span>
          ) : null}

          {data?.status?.id == 21 ? (
            <span className="viewcard-container__status employe-status-documents">
              {data?.status?.name.replaceAll("_", " ")}
              <FiberManualRecordIcon />
            </span>
          ) : null}
          {data?.status?.id == 23 ? (
            <span className="viewcard-container__status employe-status-Vacation">
              {data?.status?.name.replaceAll("_", " ")} <FiberManualRecordIcon style={{ color: "red" }} />
            </span>
          ) : null}
        </Grid>
        <span className="contract-card__contractor">{t("contract")}</span>
        <span className="contract-card__name">
          {data?.contractor?.user?.name}
        </span>
        <span className="contract-card__contractor">
          {t("contractor_company")} <br></br>
          <b style={{ fontSize: "14px", fontWeight: 900, marginBottom: "3px", display: "inline-block" }}> {data?.contractor?.acronym} | </b>{data?.contractor?.contractorCompanyName}
        </span>
        <div className="contract-card__detail">
          <Grid container>
            <Grid item xs={6}>
              <span className="contract-card__title">{t("start_contract")}</span>
            </Grid>
            <Grid item xs={6}>
              <span className="contract-card__desc">{startDate.toLocaleDateString("en-US")}</span>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <span className="contract-card__title">{t("end_contract")}</span>
            </Grid>
            <Grid item xs={6}>
              <span className="contract-card__desc">
                {endDate.toLocaleDateString("en-US")}
              </span>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <span className="contract-card__title">{t("no_employees")}</span>
            </Grid>
            <Grid item xs={6}>
              <span className="contract-card__desc">{data?.noEmployees}</span>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <span className="contract-card__title">{t("vehicles")}</span>
            </Grid>
            <Grid item xs={6}>
              <span className="contract-card__desc">{data?.noVehicles}</span>
            </Grid>
          </Grid>
        </div>
      </Grid>
      <span
        className="viewcard-container__link mt-2 d-flex"
        onClick={() => navigate(`/dashboard/contractor/user-contract-detail/${data?.id}`)}>
        {t("vehicle_details")}
        <KeyboardArrowRightIcon style={{
          transform: i18next.dir() === "rtl" ? "scaleX(-1)" : "",
          margin: "0 10px"
        }} />
      </span>

    </div>
  );
};

export default ContractCard;
