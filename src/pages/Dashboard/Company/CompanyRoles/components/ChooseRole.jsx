
import { Box, TextField } from '@mui/material';
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ic_cancel from '../../../../../assets/images/ic-cancel.svg';
import chevron_right_solid from '../../../../../assets/images/chevron-right-solid.svg';

const ChooseRole = ({
    data,
    mobileAvailableList,
    setMobileAvaliableList,
    websiteAvailableList,
    setWebsiteAvailableList,
    mobileChooseList,
    setMobileChooseList,
    websiteChooseList,
    setWebsiteChooseList,
    mobileSelected,
    setMobileSelected,
    websiteSelected,
    setWebsiteSelected,
    onHandler

}) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleRoles = (role) => {
        onHandler(role)
    }
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item
                eventKey="0"
                className="outerAccordionItem"
            >
                <Accordion.Header>{t("app")} <sub>{`(${mobileChooseList?.length})`}</sub> </Accordion.Header>
                <Accordion.Body className='mainAccordionBody'>
                    <Accordion defaultActiveKey="1" id='1'>
                        {/* @company */}
                        <Accordion.Item
                            eventKey={"1"}
                            key="1"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("company")?.toUpperCase()}</Accordion.Header>
                            {mobileChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 1 && role?.isMobileApp) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 3
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @profile */}
                        <Accordion.Item
                            eventKey={"5"}
                            key="5"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("profile")?.toUpperCase()}</Accordion.Header>
                            {mobileChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 5 && role?.isMobileApp) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 3
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @announcement */}
                        <Accordion.Item
                            eventKey={"4"}
                            key="4"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("announcement")?.toUpperCase()}</Accordion.Header>
                            {mobileChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 4 && role?.isMobileApp) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 3
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @Event */}
                        <Accordion.Item
                            eventKey={"3"}
                            key="3"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("event")?.toUpperCase()}</Accordion.Header>
                            {mobileChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 3 && role?.isMobileApp) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 3
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @invitation*/}
                        <Accordion.Item
                            eventKey={"2"}
                            key="2"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("invitation")?.toUpperCase()}</Accordion.Header>
                            {mobileChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 2 && role?.isMobileApp) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 3
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @device */}
                        <Accordion.Item
                            eventKey={"17"}
                            key="17"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("devices")?.toUpperCase()}</Accordion.Header>
                            {mobileChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 17 && role?.isMobileApp) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 3
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                    </Accordion>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item
                eventKey="1"
                className="outerAccordionItem"
            >
                <Accordion.Header>{t("web_app")} <sub>{`(${websiteChooseList?.length})`}</sub> </Accordion.Header>
                <Accordion.Body className='mainAccordionBody'>
                    <Accordion defaultActiveKey="1" id='1'>
                        {/* @company */}
                        <Accordion.Item
                            eventKey={"1"}
                            key="1"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("company")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 1 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @profile */}
                        <Accordion.Item
                            eventKey={"5"}
                            key="5"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("profile")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 5 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @employee */}
                        <Accordion.Item
                            eventKey={"9"}
                            key="9"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("employee")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 9 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @document employee */}
                        <Accordion.Item
                            eventKey={"10"}
                            key="10"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("document_employee")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 10 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4    
                                                
                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @document supplier*/}
                        <Accordion.Item
                            eventKey={"11"}
                            key="11"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("document_supplier")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 11 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @document contractor */}
                        <Accordion.Item
                            eventKey={"29"}
                            key="29"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("document_contractor")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 29 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @document supplier vehicle */}
                        <Accordion.Item
                            eventKey={"12"}
                            key="12"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("document_supplier_vehicle")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 12 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @document contractor */}
                        <Accordion.Item
                            eventKey={"30"}
                            key="30"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("document_contractor_vehicle")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 30 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @Workshif */}
                        <Accordion.Item
                            eventKey={"13"}
                            key="13"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("workshift")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 13 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @previllage */}
                        <Accordion.Item
                            eventKey={"14"}
                            key="14"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("privillage")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 14 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @vehicle */}
                        <Accordion.Item
                            eventKey={"15"}
                            key="15"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("vehicle")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 15 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @document contractor */}
                        <Accordion.Item
                            eventKey={"16"}
                            key="16"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("zones")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 16 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @device */}
                        <Accordion.Item
                            eventKey={"17"}
                            key="17"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("device")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 17 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @reports */}
                        <Accordion.Item
                            eventKey={"18"}
                            key="18"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("document_contractor")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 18 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @backup */}
                        <Accordion.Item
                            eventKey={"19"}
                            key="19"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("backup")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 19 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @payroll */}
                        {/* <Accordion.Item
                            eventKey={"20"}
                            key="20"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("payroll")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 20 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item> */}
                        {/* @onBoarding */}
                        <Accordion.Item
                            eventKey={"21"}
                            key="21"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("onboarding")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 21 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @hospitality */}
                        <Accordion.Item
                            eventKey={"22"}
                            key="22"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("hospitality")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 22 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @email setting */}
                        <Accordion.Item
                            eventKey={"23"}
                            key="23"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("email_setting")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 23 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @announcement */}
                        <Accordion.Item
                            eventKey={"4"}
                            key="4"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("announcement")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 4 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                         {/* @web access log */}
                         <Accordion.Item
                            eventKey={"28"}
                            key="28"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("web_access_log")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 28 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                src={chevron_right_solid}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                            {/* USER_ACCESS_LOG */}
                            <Accordion.Item
                            eventKey={"27"}
                            key="27"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("user_access_log")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 27 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                src={chevron_right_solid}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @log */}
                        <Accordion.Item
                            eventKey={"8"}
                            key="8"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("log")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 8 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @access history */}
                        {/* <Accordion.Item
                            eventKey={"24"}
                            key="24"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("access_history")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 24 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item> */}
                        {/* @supplier */}
                        <Accordion.Item
                            eventKey={"7"}
                            key="7"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("supplier")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 7 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @contractor */}
                        <Accordion.Item
                            eventKey={"6"}
                            key="6"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("contractor")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 6 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @event */}
                        <Accordion.Item
                            eventKey={"3"}
                            key="3"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("event")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 3 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @attendence */}
                        <Accordion.Item
                            eventKey={"35"}
                            key="35"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("attendance")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 35 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                        {/* @backup */}
                        <Accordion.Item
                            eventKey={"31"}
                            key="31"
                            className="innerAccordionItem"
                        >
                            <Accordion.Header>{t("department")?.toUpperCase()}</Accordion.Header>
                            {websiteChooseList?.map(role => {
                                // Check if role.isSelected is false
                                if (role?.moduleId === 31 && role?.isMobileApp == false) {
                                    return (
                                        <Accordion.Body
                                            key={role.id} // Add a unique key prop for each item in the map() function
                                            id={role.id}
                                            onClick={() => handleRoles({
                                                selected: role,
                                                check: 4
                                                
                                                
                                        
                                            })}
                                        >
                                            <span>{t(role?.name)}</span>
                                            <img
                                                 src={ic_cancel}
                                                alt="chevron_right_solid"
                                            />
                                        </Accordion.Body>
                                    );
                                } else {
                                    return null; // Return null if role.isSelected is true
                                }
                            })
                            }
                        </Accordion.Item>
                    </Accordion>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default ChooseRole