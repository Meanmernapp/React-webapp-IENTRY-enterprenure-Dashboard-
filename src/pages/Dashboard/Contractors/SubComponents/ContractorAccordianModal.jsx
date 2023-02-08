import React, { useState } from "react";
import { Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
                    {item} <sub onClick={() => setModalShow(true)}>add sub zone </sub>
                  </div>
                  <div>

                    <Link style={{ fontSize: '10px', cursor: 'pointer', marginLeft: '10rem' }} to={"/dashboard/singlezonedetails"}>Manage Zone</Link>
                  </div>
                  <div className="rightText">
                    status <span>active </span>
                    <div className="circle_status">

                    </div>
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                {/* <ZoneCardDetail /> */}
              </Accordion.Body>
            </Accordion.Item>
          ))
        }

      </Accordion>
      {/* <AddZoneModal

        title="sub-Zone"
        check="true"
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <AddBuildingModel /> */}
    </>
  );
};

export default ZonesCard;
