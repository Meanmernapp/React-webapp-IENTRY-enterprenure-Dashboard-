import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

/*
Author : Arman Ali
Module: Zone 
github: https://github.com/Arman-Arzoo
*/

const ZoneCardDetail = ({ item }) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  // a function to calculate total device
  const CalculateTotalDevice = (item) => {
    const totalDevice = item?.accessDeviceProjection?.noMantra +
      item?.accessDeviceProjection?.noPda +
      item?.accessDeviceProjection?.noTelpo450 +
      item?.accessDeviceProjection?.noTelpo980 +
      item?.accessDeviceProjection?.noTelpoF6 +
      item?.accessDeviceProjection?.noTelpoK5 +
      item?.accessDeviceProjection?.noTelpoF10

    return totalDevice
  }

  // return main page 
  return (
    <>
      <div className="row zoneCardDetail">
        {/* total access device table */}
        <div className="col-lg-6 col-md-8 p-0">
          <Table style={{ border: "hidden", marginTop: "5px" }}>
            <thead >
              <tr>
                <th className="nameTD">{t("total_access_devices")}</th>
                <th className="text-center">{CalculateTotalDevice(item)}{" "}{t("devices")}</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td>{t("MANTARA")}</td>
                <td className="text-center">{item?.accessDeviceProjection?.noMantra}</td>
              </tr>
              <tr >
                <td> {t("PDA")}</td>
                <td className="text-center">{item?.accessDeviceProjection?.noPda}</td>
              </tr>
              <tr >
                <td>{t("TELPO450")}</td>
                <td className="text-center">{item?.accessDeviceProjection?.noTelpo450}</td>
              </tr>
              <tr >
                <td>{t("TELPO980")}</td>
                <td className="text-center">{item?.accessDeviceProjection?.noTelpo980}</td>
              </tr>
              <tr >
                <td>{t("TELPOF6")}</td>
                <td className="text-center">{item?.accessDeviceProjection?.noTelpoF6}</td>
              </tr>
              <tr >
                <td>{t("TELPOk5")}</td>
                <td className="text-center">{item?.accessDeviceProjection?.noTelpoK5}</td>
              </tr>
              <tr >
                <td>{t("TELPOF10")}</td>
                <td className="text-center">{item?.accessDeviceProjection?.noTelpoF10}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        {/* sub zone table list */}
        <div className="col-md-11 p-0">
          <h6 className="nameTD" style={{ fontWeight: '600', letterSpacing: "0.2rem" }}>{t("sub_zones")}</h6>
          <Table style={{ border: "hidden" }}>
            <thead style={{ border: "hidden" }}>
              <tr>
                <th>{t("name")}</th>
                <th className="text-center">{t("access_device")}</th>
                <th className="text-center">{t("common_area")}</th>
                <th className="text-center">{t("status")}</th>
              </tr>
            </thead>
            <tbody>
              {
                item?.children?.map((item, index) => {
                  return (

                    <tr style={{ border: "hidden" }} key={index}>
                      <td className="nameTD">
                        {item?.name} <Link to="/dashboard/dashboard/employee/zones/singlezonedetails"><sub>{t("more_details")}</sub></Link>
                      </td>
                      <td className="text-center">
                        {
                          item?.devices.length == 0 &&
                          <i class="fa fa-times" aria-hidden="true" style={{ color: "red", fontSize: "1.2rem" }}></i>
                        }
                        {
                          item?.devices.length > 0 &&
                          <i class="fa fa-check" aria-hidden="true" style={{ color: 'green', fontSize: "1.2rem" }}></i>
                        }

                      </td>
                      <td className="text-center">
                        {
                          item?.commonArea == null &&
                          <i class="fa fa-times" aria-hidden="true" style={{ color: "red", fontSize: "1.2rem" }}></i>
                        }
                        {
                          item?.commonArea != null &&
                          <i class="fa fa-check" aria-hidden="true" style={{ color: 'green', fontSize: "1.2rem" }}></i>
                        }
                      </td>
                      <td className="text-center" style={{ color: '#146f62', fontWeight: "bold" }}>
                        {item?.status?.name} <i style={{ fontSize: '10px', color: '#146f62' }} class="fa fa-circle" aria-hidden="true"></i>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ZoneCardDetail;
