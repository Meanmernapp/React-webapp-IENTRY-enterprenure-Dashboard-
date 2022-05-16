import React, { useState } from "react";
// Material ui
import AddBuildingModel from "./Modal/AddBuildingModal";
import ZoneCardDetail from "./ZoneCardDetail";
import { Accordion } from 'react-bootstrap';
import AddZoneModal from "./Modal/AddZoneModal";

const ZonesCard = () => {
  const [modalShow, setModalShow] = useState(false);
  const Zones = ["Querétaro", "México", "Querétaro"];
  return (
    <>
      <Accordion defaultActiveKey="0">
        {
          Zones.map((item, index) => (
            <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header className="accordionHeader">
                <div className="main">
                  <div className="leftText">
                    {item} <sub onClick={() => setModalShow(true)}>add sub zone - Zone +</sub>
                  </div>
                  <div className="rightText">
                    status <span>active {"."}</span>
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <ZoneCardDetail />
              </Accordion.Body>
            </Accordion.Item>
          ))
        }

      </Accordion>
      <AddZoneModal
        title="sub-Zone"
        check="true"
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <AddBuildingModel />
    </>
  );
};

export default ZonesCard;
