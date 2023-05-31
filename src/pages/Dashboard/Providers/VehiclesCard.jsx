import React, { useState } from "react";
// Material ui
// import AddBuildingModel from "./Modal/AddBuildingModal";
import ProviderCardDetails from "./ProviderCardDetails";
import { Accordion } from 'react-bootstrap';
// import AddZoneModal from "./Modal/AddZoneModal";
import { Link } from 'react-router-dom';
import { t } from "i18next";

const VehiclesCard = ({ getAllCompanyVehiclebyId }) => {
    console.log(getAllCompanyVehiclebyId)
    const [modalShow, setModalShow] = useState(false);
    const cardShow = ["Luis Enrique Cornejo Arreola ", "Diego Guerrero Estrada"];
    return (
        <>
            <Accordion defaultActiveKey="0">
                {
                    getAllCompanyVehiclebyId?.content?.map((item, index) => (
                        <Accordion.Item eventKey={index} key={index}>
                            <Accordion.Header className="accordionHeader">
                                <div className="main">
                                    <div className="leftText leftSide">
                                        <img src={`data:image/jpeg;base64,${item?.vehicle?.image}`} alt="" />
                                        <p onClick={() => setModalShow(true)}>{item?.vehicle?.brand + "|" + item?.vehicle?.subBrand} </p>
                                    </div>
                                    {/* <div>

                    <Link style={{ fontSize: '10px', cursor: 'pointer', marginLeft: '10rem' }} to={"/dashboard/singlezonedetails"}>Manage Zone</Link>
                  </div> */}
                                    <div className="rightText rightSide">
                                        <span
                                        style={
                                            item?.vehicle?.status?.id == 1 && {color:"808080"} ||
                                            item?.vehicle?.status?.id == 2 && {color:"yellow"} ||
                                            item?.vehicle?.status?.id == 3 && {color:"blue"} ||
                                            item?.vehicle?.status?.id == 4 && {color:"green"} ||
                                            item?.vehicle?.status?.id == 5 && {color:"orange"} ||
                                            item?.vehicle?.status?.id == 6 && {color:"red"} 
                      
                                            
                                          }
                                        >{item?.vehicle?.status?.name.replaceAll(
                                            "_",
                                            " "
                                          )} </span>
                                        <div className="circle_status_provider"
                                        style={
                                            item?.vehicle?.status?.id == 1 && {background:"808080"} ||
                                            item?.vehicle?.status?.id == 2 && {background:"yellow"} ||
                                            item?.vehicle?.status?.id == 3 && {background:"blue"} ||
                                            item?.vehicle?.status?.id == 4 && {background:"green"} ||
                                            item?.vehicle?.status?.id == 5 && {background:"orange"} ||
                                            item?.vehicle?.status?.id == 6 && {background:"red"} 
                                          }
                                        />

                                      
                                    </div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ProviderCardDetails item={item} doc="vehicle"/>
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

export default VehiclesCard;
