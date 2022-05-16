import React from "react";
import { Table } from "react-bootstrap";

const TotalAccessService = () => {
  return (
    <div className="buildingdetail_access_d">
      <Table
        style={{
          border: "hidden",
        }}
      >
        <thead style={{ border: "hidden" }}>
          <tr>
            <th>
              <h1>TOTAL ACCESS DEVICES</h1>
            </th>
            <th>
              <p>
                30
                <span> / 32 DEVICES</span>
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ border: "hidden" }}>
            <td>
              <h3>PDA</h3>
            </td>
            <td>
              <h4>
                4<span> / 16</span>
              </h4>
            </td>
          </tr>
          <tr style={{ border: "hidden" }}>
            <td>
              <h3>BIOMETRICS</h3>
            </td>
            <td>
              <h4>
                8<span> / 8</span>
              </h4>
            </td>
          </tr>
          <tr style={{ border: "hidden" }}>
            <td>
              <h3>DELAY</h3>
            </td>
            <td>
              <h4>
                6<span> / 6</span>
              </h4>
            </td>
          </tr>
          <tr>
            <td>
              <h3>TERMINAL</h3>
            </td>
            <td>
              <h4>
                1<span> / 2</span>
              </h4>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TotalAccessService;
