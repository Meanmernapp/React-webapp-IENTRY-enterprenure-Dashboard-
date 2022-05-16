import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import WorkShiftCardDetails from "./WorkShiftCardDetails";
const WorkShiftPanelCard = ({setRemoveUserModal}) => {
  const Shifts = ["MORNING WORK SHIFT", "NOON WORK SHIFT", "NIGHT WORK SHIFT"];

  return (
    <Accordion defaultActiveKey="0">
      {Shifts.map((item, index) => (
        <Accordion.Item eventKey={index} key={index}>
          <Accordion.Header className="accordionHeader">
            <div className="main">
              <div
                className="leftText"
                style={{ color: "#146F62", fontSize: "16px" }}
              >
                {item}
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <WorkShiftCardDetails setRemoveUserModal={setRemoveUserModal } />
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default WorkShiftPanelCard;
