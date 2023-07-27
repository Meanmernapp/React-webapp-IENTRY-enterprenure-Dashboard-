import React from 'react'
import listIcon from '../assets/ic-list-detail.svg'
import GridIcon from '../assets/grip-vertical-solid.svg'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@mui/material';
const DisplayView = ({ view, setView }) => {
  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();
  // lCode === "ar"
  return (
    <div className="grid_list">
      <Tooltip title={t("list_view").toUpperCase()} placement="bottom">
        <div
          className={`${lCode === "ar" ? "listA" : "list"}  ${view === "list" ? "active" : ""}`}
          onClick={() => {
            setView("list")
          }}
        >
          <img src={listIcon} alt="list" />
        </div>
      </Tooltip>
      <Tooltip title={t("detail_view").toUpperCase()} placement="bottom">
        <div className={`${lCode === "ar" ? "gridA" : "grid"} ${view === "grid" ? "active" : ""} `}
          onClick={() => {
            setView("grid")
          }}
        >
          <img src={GridIcon} alt="grid" />
        </div>
      </Tooltip>
    </div>
  )
}

export default DisplayView