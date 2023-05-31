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
                  <div className="rightText rightSide"
                  
                  >
                    <span
                    style={
                      item?.user?.status?.id == 1 && {color:"808080"} ||
                      item?.user?.status?.id == 2 && {color:"yellow"} ||
                      item?.user?.status?.id == 3 && {color:"blue"} ||
                      item?.user?.status?.id == 4 && {color:"green"} ||
                      item?.user?.status?.id == 5 && {color:"orange"} ||
                      item?.user?.status?.id == 6 && {color:"red"} 

                      
                    }
                    >{item?.user?.status?.name.replaceAll(
                      "_",
                      " "
                    )} </span>
                    <div className="circle_status_provider" 
                    style={
                      item?.user?.status?.id == 1 && {background:"808080"} ||
                      item?.user?.status?.id == 2 && {background:"yellow"} ||
                      item?.user?.status?.id == 3 && {background:"blue"} ||
                      item?.user?.status?.id == 4 && {background:"green"} ||
                      item?.user?.status?.id == 5 && {background:"orange"} ||
                      item?.user?.status?.id == 6 && {background:"red"} 
                    }
                    />
                   
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <ProviderCardDetails item={item} doc="employee" />
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
