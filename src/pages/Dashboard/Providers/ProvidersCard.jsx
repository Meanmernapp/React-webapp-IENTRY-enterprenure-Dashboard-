import React, { useState } from "react";
// Material ui
// import AddBuildingModel from "./Modal/AddBuildingModal";
import ProviderCardDetails from "./ProviderCardDetails";
import { Accordion } from 'react-bootstrap';
// import AddZoneModal from "./Modal/AddZoneModal";
import { Link } from 'react-router-dom';
import { t } from "i18next";

const ZonesCard = ({ getAllCompanybyProviderId }) => {
  console.log(getAllCompanybyProviderId)
  const [modalShow, setModalShow] = useState(false);
  const cardShow = ["Luis Enrique Cornejo Arreola ", "Diego Guerrero Estrada"];
  return (
    <>
      <Accordion defaultActiveKey="0">
        {
          getAllCompanybyProviderId?.content?.map((item, index) => (
            <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header className="accordionHeader">
                <div className="main">
                  <div className="leftText leftSide">
                    <img src={`data:image/jpeg;base64,${item?.user?.selfie}`} alt="" />
                    <p onClick={() => setModalShow(true)}>{item?.user?.name} </p>
                  </div>
                  {/* <div>

                    <Link style={{ fontSize: '10px', cursor: 'pointer', marginLeft: '10rem' }} to={"/dashboard/singlezonedetails"}>Manage Zone</Link>
                  </div> */}
                  <div className="rightText rightSide">
                    <span>{t("active")} </span>
                    <div className="circle_status_provide">

                    </div>
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <ProviderCardDetails item={item} />
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
