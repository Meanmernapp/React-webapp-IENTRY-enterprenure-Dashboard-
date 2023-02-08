import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { permissionObj } from "../../../Helpers/permission";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/


const TotalAccessService = ({ item }) => {
  // translation
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  //use Selector hook to get state for redux store
  const { permission } = useSelector(state => state.authenticatioauthennSlice);

  // funtion to calculate total device
  const CalculateTotalDevice = (item) => {
    const totalDevice = item?.accessDeviceDTO?.noMantra +
      item?.accessDeviceDTO?.noPda +
      item?.accessDeviceDTO?.noTelpo450 +
      item?.accessDeviceDTO?.noTelpo980 +
      item?.accessDeviceDTO?.noTelpoF6 +
      item?.accessDeviceDTO?.noTelpoK5

    return totalDevice
  }
  // return main page 
  return (
    <div className="buildingdetail_access_d">
      <Table
        style={{
          border: "hidden",
        }}
      >
        <thead style={{ border: "hidden" }}>
          <tr>
            <th style={{ display: 'flex', border: 'none', gap: "50px", alignItems: 'center', padding: "10px 0" }}>
              <h1>{t("total_acces_devices")}</h1>
              {
                permission?.includes(permissionObj?.WEB_DEVICE_CREATE) &&
                <Link
                  to="/dashboard/employee/zones/create-device"
                  state={{ zoneNameProps: item?.name }}
                  className="device_button"
                >
                  {t("add_device")}
                </Link>
              }
            </th>
            <th style={{ padding: "10px 0" }}>
              <p>
                {CalculateTotalDevice(item)}<span> {t("devices")}</span>
              </p>
            </th>
          </tr>
        </thead>
        <tbody className="tbody_access-device">
          <tr
            style={{
              border: "hidden",
              color: "#707070",
              fontSize: "12px",
              fontWeight: "600"
            }}
          >
            <td>{t("noMantra")}</td>
            <td className="text-center ">{item?.accessDeviceDTO?.noMantra}</td>
          </tr>
          <tr
            style={{
              border: "hidden",
              color: "#707070",
              fontSize: "12px",
              fontWeight: "600"
            }}
          >
            <td>{t("noPda")}</td>
            <td className="text-center">{item?.accessDeviceDTO?.noPda}</td>
          </tr>
          <tr
            style={{
              border: "hidden",
              color: "#707070",
              fontSize: "12px",
              fontWeight: "600"
            }}
          >
            <td>{t("noTelpo450")}</td>
            <td className="text-center">{item?.accessDeviceDTO?.noTelpo450}</td>
          </tr>
          <tr
            style={{
              border: "hidden",
              color: "#707070",
              fontSize: "12px",
              fontWeight: "600"
            }}
          >
            <td>{t("noTelpo980")}</td>
            <td className="text-center">{item?.accessDeviceDTO?.noTelpo980}</td>
          </tr>
          <tr
            style={{
              border: "hidden",
              color: "#707070",
              fontSize: "12px",
              fontWeight: "600"
            }}
          >
            <td>{t("noTelpoF6")}</td>
            <td className="text-center">{item?.accessDeviceDTO?.noTelpoF6}</td>
          </tr>
          <tr
            style={{
              border: "hidden",
              color: "#707070",
              fontSize: "12px",
              fontWeight: "600"
            }}
          >
            <td>{t("noTelpoK5")}</td>
            <td className="text-center">{item?.accessDeviceDTO?.noTelpoK5}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TotalAccessService;
