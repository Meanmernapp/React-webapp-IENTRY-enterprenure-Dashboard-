import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import ic_check from "../../../assets/images/ic-check.svg";

const ZoneCardDetail = () => {
  return (
    <>
      <div className="row zoneCardDetail">
        <div className="col-lg-6 col-md-8 p-0">
          <Table style={{ border: "hidden", marginTop: "5px" }}>
            <thead style={{ border: "hidden" }}>
              <tr>
                <th className="nameTD">TOTAL ACCESS DEVICES</th>
                <th className="text-center">32 DEVICES</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ border: "hidden" }}>
                <td>PDA</td>
                <td className="text-center">16</td>
              </tr>
              <tr style={{ border: "hidden" }}>
                <td>BIOMETRIC</td>
                <td className="text-center">8</td>
              </tr>
              <tr style={{ border: "hidden" }}>
                <td>DELAY</td>
                <td className="text-center">5</td>
              </tr>
              <tr style={{ border: "hidden" }}>
                <td>Terminal</td>
                <td className="text-center">5</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="col-md-11 p-0">
          <h6 className="nameTD">SUB - ZONES</h6>
          <Table style={{ border: "hidden" }}>
            <thead style={{ border: "hidden" }}>
              <tr>
                <th>NAME</th>
                <th className="text-center">ACCESS DEVICE</th>
                <th className="text-center">COMMON AREA</th>
                <th className="text-center">status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ border: "hidden" }}>
                <td className="nameTD">
                  Querétaro <Link to="/dashboard/singlezonedetails"><sub>MORE DETAILS</sub></Link>
                </td>
                <td className="text-center">
                  <img src={ic_check} alt="ic-img" />
                </td>
                <td className="text-center">
                  <img src={ic_check} alt="ic-img" />
                </td>
                <td className="text-center">
                  active <i className="fa fa-circle" aria-hidden="true"></i>
                </td>
              </tr>
              <tr style={{ border: "hidden" }}>
                <td className="nameTD">
                  Corregidora <Link to="/dashboard/singlezonedetails"><sub>MORE DETAILS</sub></Link>
                </td>
                <td className="text-center">
                  <img src={ic_check} alt="ic-img" />
                </td>
                <td className="text-center">
                  <img src={ic_check} alt="ic-img" />
                </td>
                <td className="text-center">
                  active <i className="fa fa-circle" aria-hidden="true"></i>
                </td>
              </tr>

              <tr style={{ border: "hidden" }}>
                <td className="nameTD">
                  Tequisquiapan <Link to="/dashboard/singlezonedetails"><sub>MORE DETAILS</sub></Link>
                </td>
                <td className="text-center">
                  <img src={ic_check} alt="ic-img" />
                </td>
                <td className="text-center">
                  <img src={ic_check} alt="ic-img" />
                </td>
                <td className="text-center">
                  active <i className="fa fa-circle" aria-hidden="true"></i>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ZoneCardDetail;
