/*
Author : Arman Ali
Module: create Vehicle
github: https://github.com/Arman-Arzoo
*/
import React from 'react'
import { Modal } from "react-bootstrap";
import { useTranslation } from 'react-i18next'
import useStyle from '../../../../../hooks/useStyle';
import { Box, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useEffect } from 'react';
import DeleteModal from '../../../../Modals/DeleteModal';
import RemoveDriver from './RemoveDriver';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddDriver, UpdateDriver } from '../../../../../reduxToolkit/Vehicle/VehicleApi';
import SelectWithSearch from '../../../../../components/SelectWithSearch';
import { toast } from 'react-toastify';

const DriverModal = (props) => {

    // destructure from prop
    const { id,data, title, checkmodal } = props;
    // id : id of the current vehicle details
    // title: title of your modal
    // checkmodal: checkmodal is other add or update
    // data: data of current card driver 

    // use hook
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { textField, smallBoxStyle } = useStyle()
    const [showDriver, setShowDriver] = useState(false)
    // data input state
    const [employee, setEmployee] = useState("");
    const [permissionType, setPermissionType] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")

    // useSlector
    const { getallEmployee } = useSelector(state => state.employeeOnBoardingSlice);
    const { premmissionType } = useSelector(state => state.VehicleSlice)
    //reset
    const reset = ()=>{
        setEmployee("")
        setPermissionType("")
        setFrom("")
        setTo("")
    }

    // funtion for handle select
    const handleSelect = (selectedOption) => {
        setEmployee(selectedOption?.userId)
      };

    // handel driver function
    const handelDriver = () => {
       
        if(checkmodal == "update"){
           
          if(permissionType === 2){
            if(!from || !to || !employee || !permissionType){
                console.log(typeof(from))
                const data = {
                    id,
                    from: typeof(from) == "number" ? from : from?.getTime(),
                    to: typeof(to) == "number" ? to : to.getTime(),
                    userId: employee,
                    vehicleId: id,
                    vehiclePermissionTypeId: permissionType
                }
                dispatch(UpdateDriver(data));
                props.onHide();
            }else{
                toast.warn("Please Fill All The Field")
            }
          }else{
            if( !employee || !permissionType){
                // console.log(typeof(from))
                const data = {
                    id,
                    // from: typeof(from) == "number" ? from : from?.getTime(),
                    // to: typeof(to) == "number" ? to : to.getTime(),
                    userId: employee,
                    vehicleId: id,
                    vehiclePermissionTypeId: permissionType
                }
                dispatch(UpdateDriver(data));
                props.onHide();
            }else{
                toast.warn("Please Fill All The Field")
            }
          }
           
         

        }
        else{
            console.log(permissionType)
            if(permissionType === 2){
                if(!from || !to || !employee || !permissionType){   
                    toast.warn("Please Fill All The Fields")
                }
                else{
                    if(from?.getTime() > to.getTime()){
                        toast.warn("To, must be more than From attribute")
        
                    }else{
                        const data = {
                            from: from?.getTime(),
                            to: to.getTime(),
                            userId: employee,
                            vehicleId: id,
                            vehiclePermissionTypeId: permissionType
                        }
                        dispatch(AddDriver(data))
                        reset()
                        props.onHide()
                    }
                   
                }
            }else{
                alert("permission type 1")
                if( !employee || !permissionType){   
                    toast.warn("Please Fill All The Fields")
                }
                else{
                    
                        const data = {
                            // from: from?.getTime(),
                            // to: to.getTime(),
                            userId: employee,
                            vehicleId: id,
                            vehiclePermissionTypeId: permissionType
                        }
                        dispatch(AddDriver(data))
                        reset()
                        props.onHide()
                    
                   
                }
            }
       
    }
    }
     
    useEffect(() => {
       if( checkmodal === "update" ){
       
        setPermissionType(data?.vehiclePermissionTypeId || "")
        setFrom(data?.from || "")
        setTo(data?.to || "")
       }
    }, [data?.id])

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="files_upload_conatiner">

                <Modal.Header className='header_top'>
                    <Modal.Title id="contained-modal-title-vcenter ">
                        {title}
                    </Modal.Title>
                    <i onClick={() => {
                        props.onHide()
                        reset()

                    }} className="fa fa-times cross" aria-hidden="true"></i>
                </Modal.Header>

                <Modal.Body>
                    <div className="driver_form">
                        <Box sx={smallBoxStyle} >
                          
                            <SelectWithSearch
                                options={getallEmployee}
                                label={t("employee")}
                                update={data}
                                checkUpdate={checkmodal}
                                onSelect={handleSelect}
                            />
                        </Box>
                        <Box sx={smallBoxStyle} >
                            <FormControl fullWidth
                                sx={textField}>
                                <InputLabel id="PERMISSIONTYPE">
                                    {t("permission_type")}
                                </InputLabel>
                                <Select size="small"
                                    labelId="PERMISSIONTYPE"
                                    id="PERMISSIONTYPEId"
                                    label={t("permission_type")}
                                    value={permissionType}
                                    onChange={(e) => setPermissionType(e.target.value)}
                                >
                                    {
                                        premmissionType?.map((item, index) => {
                                            return (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            )
                                        })

                                    }

                                </Select>
                            </FormControl>
                        </Box>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack>
                                <DesktopDatePicker
                                    label={t('from')}
                                    inputFormat="dd/MM/yyyy"
                                    disablePast
                                    value={from}
                                    disabled={permissionType ===1}
                                    onChange={(date) => setFrom(date)}
                                    renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack>
                                <DesktopDatePicker
                                    label={t('to')}
                                    inputFormat="dd/MM/yyyy"
                                    disablePast
                                    value={to}
                                    disabled={permissionType ===1}
                                    onChange={(date) => setTo(date)}
                                    renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                        {
                            checkmodal == "update" &&
                            <p className='remove' onClick={() => {
                                setShowDriver(true);
                                props.onHide()

                            }}>{t("remove_driver")}</p>
                        }
                    </div>

                    <div className='footer'>
                        <button
                            onClick={() => {
                                props.onHide();
                                reset()

                            }}
                            className='custom_btn_cancel_gray_hover'
                            style={{ width: "180px" }}>{t("cancel")}</button>
                        <button
                            onClick={() => { handelDriver() }}
                            className='custom_primary_btn_dark'
                            style={{ width: "178px" }}>{ checkmodal == "update" ? t("update"): t("add")}</button>
                    </div>
                </Modal.Body>
            </Modal>
            <RemoveDriver
                show={showDriver}
                data={{id, name:data?.name}}
                onHide={() => setShowDriver(false)}
                title_modal={t("remove_driver")}
                modal_name="remove_driver"
            />


        </>
    )
}

export default DriverModal