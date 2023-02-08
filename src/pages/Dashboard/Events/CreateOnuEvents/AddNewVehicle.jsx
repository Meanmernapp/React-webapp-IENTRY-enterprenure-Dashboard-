import React from 'react'
import { Modal } from "react-bootstrap";
import cancel from '../../../../assets/images/ic-cancel.svg'
import { TextField } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createOnuVehicle } from '../../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'

const AddNewVehicle = (props) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    // const vehicleData = useSelector(state => state?.EmployeeEventsSlice?.ounVehiclesData);

    const [vehicleObject, setVehicleObject] = useState({
        brand: "",
        subBrand: "",
        modal: "",
        plates: "",
        color: "",
        sn: "",
        vin: ""
    });
    const handleSubmitVehicle = () => {
        const body = {
            brand: vehicleObject?.brand,
            color: vehicleObject?.color,
            model: Number(vehicleObject?.modal),
            plate: vehicleObject?.plates,
            serialNumber: vehicleObject?.sn,
            subBrand: vehicleObject?.subBrand,
            vin: vehicleObject?.vin,
            createdAt: null,
            status: {
                id: 0,
                name: "Onuvehicle"
            },
            updatedAt: null,
        }
        dispatch(createOnuVehicle(body));
        setVehicleObject({
            brand: "",
            subBrand: "",
            modal: "",
            plates: "",
            color: "",
            sn: "",
            vin: ""
        })
        props.onHide();
    }
    return (
        <Modal
            className="events_modal"
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <img
                    src={cancel}
                    onClick={() => props.onHide()}
                    className="modalClose"
                    alt=""
                />
            </Modal.Header>
            <Modal.Body className="docsModalBody">
                <div className="heading">
                    ADD VEHICLE
                </div>
                <div>
                    <div className='mb-3'>
                        <TextField size="small"
                            sx={{ mt: "2px" }}
                            fullWidth


                            label="Brand"
                            value={vehicleObject.brand}
                            onChange={(e) => setVehicleObject({ ...vehicleObject, ["brand"]: e.target.value })}
                            InputLabelProps={{
                                style: {
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    background: "#ffffff",
                                    padding: "0px 0px 0px 4px",
                                },
                            }} // font size of input label
                            inputProps={{
                                sx: {
                                    border: "none",
                                    outline: "none",
                                    fontSize: "10px",
                                    letterSpacing: "0px",
                                    color: "#707070",
                                    "&::placeholder": {
                                        color: "#707070",
                                        fontSize: "12px",
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <TextField size="small"
                            sx={{ mt: "2px" }}
                            fullWidth


                            label="sub-Brand"
                            value={vehicleObject.subBrand}
                            onChange={(e) => setVehicleObject({ ...vehicleObject, ["subBrand"]: e.target.value })}
                            InputLabelProps={{
                                style: {
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    background: "#ffffff",
                                    padding: "0px 0px 0px 4px",
                                },
                            }} // font size of input label
                            inputProps={{
                                sx: {
                                    border: "none",
                                    outline: "none",
                                    fontSize: "10px",
                                    letterSpacing: "0px",
                                    color: "#707070",
                                    "&::placeholder": {
                                        color: "#707070",
                                        fontSize: "12px",
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <TextField size="small"
                            sx={{ mt: "2px" }}
                            fullWidth


                            label="Modal"
                            value={vehicleObject.modal}
                            onChange={(e) => setVehicleObject({ ...vehicleObject, ["modal"]: e.target.value })}
                            InputLabelProps={{
                                style: {
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    background: "#ffffff",
                                    padding: "0px 0px 0px 4px",
                                },
                            }} // font size of input label
                            inputProps={{
                                sx: {
                                    border: "none",
                                    outline: "none",
                                    fontSize: "10px",
                                    letterSpacing: "0px",
                                    color: "#707070",
                                    "&::placeholder": {
                                        color: "#707070",
                                        fontSize: "12px",
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <TextField size="small"
                            sx={{ mt: "2px" }}
                            fullWidth

                            label="PLATES"
                            value={vehicleObject.plates}
                            onChange={(e) => setVehicleObject({ ...vehicleObject, ["plates"]: e.target.value })}
                            InputLabelProps={{
                                style: {
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    background: "#ffffff",
                                    padding: "0px 0px 0px 4px",
                                },
                            }} // font size of input label
                            inputProps={{
                                sx: {
                                    border: "none",
                                    outline: "none",
                                    fontSize: "10px",
                                    letterSpacing: "0px",
                                    color: "#707070",
                                    "&::placeholder": {
                                        color: "#707070",
                                        fontSize: "12px",
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <TextField size="small"
                            sx={{ mt: "2px" }}
                            fullWidth

                            label="Color"
                            value={vehicleObject.color}
                            onChange={(e) => setVehicleObject({ ...vehicleObject, ["color"]: e.target.value })}
                            InputLabelProps={{
                                style: {
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    background: "#ffffff",
                                    padding: "0px 0px 0px 4px",
                                },
                            }} // font size of input label
                            inputProps={{
                                sx: {
                                    border: "none",
                                    outline: "none",
                                    fontSize: "10px",
                                    letterSpacing: "0px",
                                    color: "#707070",
                                    "&::placeholder": {
                                        color: "#707070",
                                        fontSize: "12px",
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <TextField size="small"
                            sx={{ mt: "2px" }}
                            fullWidth


                            label="S/N"
                            value={vehicleObject.sn}
                            onChange={(e) => setVehicleObject({ ...vehicleObject, ["sn"]: e.target.value })}
                            InputLabelProps={{
                                style: {
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    background: "#ffffff",
                                    padding: "0px 0px 0px 4px",
                                },
                            }} // font size of input label
                            inputProps={{
                                sx: {
                                    border: "none",
                                    outline: "none",
                                    fontSize: "10px",
                                    letterSpacing: "0px",
                                    color: "#707070",
                                    "&::placeholder": {
                                        color: "#707070",
                                        fontSize: "12px",
                                    },
                                },
                            }}
                        />
                    </div>
                    <div className='mb-3'>
                        <TextField size="small"
                            sx={{ mt: "2px" }}
                            fullWidth


                            label="VIN"
                            value={vehicleObject.vin}
                            onChange={(e) => setVehicleObject({ ...vehicleObject, ["vin"]: e.target.value })}
                            InputLabelProps={{
                                style: {
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    background: "#ffffff",
                                    padding: "0px 0px 0px 4px",
                                },
                            }} // font size of input label
                            inputProps={{
                                sx: {
                                    border: "none",
                                    outline: "none",
                                    fontSize: "10px",
                                    letterSpacing: "0px",
                                    color: "#707070",
                                    "&::placeholder": {
                                        color: "#707070",
                                        fontSize: "12px",
                                    },
                                },
                            }}
                        />
                    </div>

                </div>
                <div className='addNewVehicleBtns'>
                    <button
                        className='addNewVehicleCancelBtn'
                        onClick={() => props.onHide()}
                    >
                        CANCEL
                    </button>
                    <button
                        className='addNewVehicleAddBtn'
                        onClick={handleSubmitVehicle}
                    >
                        ADD
                    </button>
                </div>
            </Modal.Body>

        </Modal >

    );
}

export default AddNewVehicle