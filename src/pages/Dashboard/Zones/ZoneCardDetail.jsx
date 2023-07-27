import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import NotFoundAnything from "../../../components/NotFoundAnything";

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
        <div className="col-lg-12 col-md-12 p-0">
          <Table style={{ border: "hidden", marginTop: "1rem" }}>
            <thead >
              <tr>
                <th className="nameTD">{t("access_devices")?.toUpperCase()}</th>
                <th className="text-right">{CalculateTotalDevice(item)}{" "}{t("devices")?.toUpperCase()}</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td className="d_name">{t("MANTARA")}</td>
                <td className="text-right pr-5">{item?.accessDeviceProjection?.noMantra}</td>
              </tr>
              <tr >
                <td className="d_name"> {t("PDA")}</td>
                <td className="text-right pr-5">{item?.accessDeviceProjection?.noPda}</td>
              </tr>
              <tr >
                <td className="d_name">{t("TELPO450")}</td>
                <td className="text-right pr-5">{item?.accessDeviceProjection?.noTelpo450}</td>
              </tr>
              <tr >
                <td className="d_name">{t("TELPO980")}</td>
                <td className="text-right pr-5">{item?.accessDeviceProjection?.noTelpo980}</td>
              </tr>
              <tr >
                <td className="d_name">{t("TELPOF6")}</td>
                <td className="text-right pr-5">{item?.accessDeviceProjection?.noTelpoF6}</td>
              </tr>
              <tr >
                <td className="d_name">{t("TELPOk5")}</td>
                <td className="text-right pr-5">{item?.accessDeviceProjection?.noTelpoK5}</td>
              </tr>
              <tr >
                <td className="d_name">{t("TELPOF10")}</td>
                <td className="text-right pr-5">{item?.accessDeviceProjection?.noTelpoF10}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        {/* sub zone table list */}
        <div className="col-md-12 p-0 border_line pt-3">
          {
            item?.children?.length > 0 ?
              <>
                <h6 className="nameTD pb-3" style={{ fontWeight: '600', letterSpacing: "0.2rem" }}>{t("internal_monitoring")?.toUpperCase()}</h6>
                <Table style={{ border: "hidden" }}>
                  <thead style={{ border: "hidden" }}>
                    <tr>
                      <th className="sub_zone_status">{t("sub_zone")?.toUpperCase()}</th>
                      <th className="text-center sub_zone_status">{t("access_device")?.toUpperCase()}</th>
                      <th className="text-center sub_zone_status">{t("common_area")?.toUpperCase()}</th>
                      <th className="text-center sub_zone_status">{t("status")?.toUpperCase()}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      item?.children?.map((item, index) => {
                        return (

                          <tr style={{ border: "hidden",marginBottom:"1rem" }} key={index}>
                            <td className="nameTD d-flex gap-2 align-items-center">
                              {item?.name}
                              <Link to="/dashboard/employee/zones/singlezonedetails"
                              className="sub_zone"
                              >
                                {/* <sub> */}
                                  {t("more_details")}
                                  {/* </sub> */}
                              </Link>
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
                            <td className="text-center status_check" >
                              {item?.status?.name?.split("_").join(" ")} <i  class="fa fa-circle" aria-hidden="true"></i>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </>
              :
              <div className="">
                <h6 className="nameTD" style={{ fontWeight: '600', letterSpacing: "0.2rem" }}>{t("sub_zones")}</h6>
                <NotFoundAnything text={"no_sub_zone"} mt={"0rem"} />

              </div>
          }
        </div>
      </div>
    </>
  );
};

export default ZoneCardDetail;
