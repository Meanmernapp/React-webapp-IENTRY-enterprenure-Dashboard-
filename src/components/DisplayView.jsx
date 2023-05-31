import React from 'react'
import listIcon from '../assets/ic-list-detail.svg'
import GridIcon from '../assets/grip-vertical-solid.svg'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next';
const DisplayView = ({ view, setView }) => {
  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();
  // lCode === "ar"
  return (
    <div className="grid_list">
      <div className={`${lCode === "ar"? "gridA":"grid"} ${view === "grid" ? "active" : ""} `}
        onClick={() => {
          setView("grid")
        }}
      >
        <img src={GridIcon} alt="list" />
      </div>
      <div
        className={`${lCode === "ar"? "listA":"list"}  ${view === "list" ? "active" : ""}`}
        onClick={() => {
          setView("list")
        }}
      >
        <img src={listIcon} alt="list" />
      </div>
    </div>
  )
}

export default DisplayView