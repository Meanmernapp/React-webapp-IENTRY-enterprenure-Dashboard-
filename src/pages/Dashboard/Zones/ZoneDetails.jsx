import React from "react";
import ZoneCard from "./ZoneCard";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

const ZoneDetails = () => {
  // translation
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  return (
    <div className="company-detail">
      <div className="head">
        <h2>{t("panel_device")}</h2>
        <button
          className="btn btn-lg "
          data-toggle="modal"
          data-target="#addzones_modal"
        >
          {t("add_zone")}
          <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>
      <div className="zones_head_m">
        <h2>{t("zones")}</h2>
        <p>{t("total")} 4</p>
      </div>
      <div>
        <ZoneCard />
      </div>
    </div>
  );
};

export default ZoneDetails;
