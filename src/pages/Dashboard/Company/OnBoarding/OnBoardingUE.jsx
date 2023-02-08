import { Box, Grid, InputLabel, MenuItem, Select, TextField, FormControl, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap';
import cross from '../../../../assets/images/ic-cancel.svg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { permissionObj } from '../../../../Helpers/permission';
import { useEffect } from 'react';
import { CreateListWithProcess, CreateOnBoarding, CreateOnBoardingProcess, DeleteOnboardingProcess, GetAllEmployee, GetAllOnBoardingProcess, GetAllZone, GetOnBoardingById, UpdateOnBoarding } from '../../../../reduxToolkit/EmployeeOnBoarding/EmployeeOnBoardingApi';
import { ResetOnboardingById, ResetOnboardingProcess } from '../../../../reduxToolkit/EmployeeOnBoarding/EmployeeOnBoardingSlice';
import { toast } from 'react-toastify';
import NotFoundDataWarning from '../../../../components/NotFoundDataWarning';
import uuid from 'react-uuid';

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

// On Boarding UE module main funtion
const OnBoardingUE = () => {
    // assign a variable to value
    let max = 500;
    //hook
    const params = useParams()
    const dispatch = useDispatch()

    //use State hook for local state management
    const [show, setShow] = useState(false)
    const [confirmShow, setConfirmShow] = useState(false)
    const [deleteShow, setDeleteShow] = useState(false)
    const [deleteId, setDeleteId] = useState("");
    const [message, setMessage] = useState("")
    const [manager, setManager] = useState("");
    const [workStation, setWorkStation] = useState("")
    const [workStationName, setWorkStationName] = useState("");
    const [managerName, setManagerName] = useState("")
    const [createStep, setCreateStep] = useState([])


    //use Selector hook to get state for redux store
    const { permission } = useSelector(state => state.authenticatioauthennSlice);
    const { getallzone } = useSelector(state => state.employeeOnBoardingSlice);
    const { getallEmployee } = useSelector(state => state.employeeOnBoardingSlice);
    const { getOnBoardingById } = useSelector(state => state.employeeOnBoardingSlice);
    const { createOnBoardingProcess } = useSelector(state => state.employeeOnBoardingSlice);
    const { deleteOnboardingProcess } = useSelector(state => state.employeeOnBoardingSlice);
    const { updateOnBoarding } = useSelector(state => state.employeeOnBoardingSlice);
    const { createOnBoarding } = useSelector(state => state.employeeOnBoardingSlice);
    const { getAllOnBoardingProcess } = useSelector(state => state.employeeOnBoardingSlice);




    const DeleteStep = (id) => {
        setCreateStep((current) =>
            current.filter((item) => item.id !== id)
        );
    }
    console.log(createStep)

    const createProcessIds = createStep?.map(item => {
        return ({
            process: item?.process,
            onboarding: {
                id: item?.id
            }
        })
    })

    // object for create and update onboarding
    const createOnboardingActionData = {


        introduction: message,
        managerId: manager,
        managerName: managerName,
        processNo: getOnBoardingById?.name,
        roleId: localStorage.getItem("onBoardingRoleId"),
        roleName: localStorage.getItem("onBoardingRoleName"),
        zoneId: workStation,
        zoneName: workStationName


    }
    const updateOnboardingActionData = {

        id: params?.id,
        introduction: message,
        managerId: manager,
        zoneId: workStation,
    }


    // useEffect to check update data
    useEffect(() => {
        setManager(getOnBoardingById?.user?.id || "")
        setMessage(getOnBoardingById?.introduction || "")
        setWorkStation(getOnBoardingById?.zone?.id || "")

    }, [getOnBoardingById?.id, params?.id])
    // useEffect for get all on boarding  and process by it ID
    useEffect(() => {
        if (params?.id != "null") {
            dispatch(GetOnBoardingById(params?.id))
            dispatch(GetAllOnBoardingProcess(params?.id))
        } else {
            dispatch(ResetOnboardingById())
            dispatch(ResetOnboardingProcess())
        }
    }, [deleteOnboardingProcess, createOnBoardingProcess, updateOnBoarding, createOnBoarding])

    useEffect(() => {
        dispatch(GetAllZone())
        dispatch(GetAllEmployee())
    }, [])

    return (
        <Box>
            {/* header */}
            <div className='custom_head'>
                <div className='left'>
                    <Link to="/dashboard/employee/company/onboarding">
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </Link>
                    <p> {params?.id != "null" ? "UPDATE ON BOARDING" : "CREATE ON BOARDING"} </p>
                </div>
            </div>

            <Box className='on_boarding_create_edit'>
                <Box className='on_boarding_detail'>
                    <h4>DETAILS</h4>
                    <h5>ROLE</h5>
                    <p>{getOnBoardingById?.role?.name || localStorage.getItem("onBoardingRoleName")}</p>

                    <Grid container gap="1.5rem" >

                        <FormControl fullWidth>
                            <InputLabel>WORK STATION</InputLabel>
                            <Select size="small"
                                label="WORK STATION"
                                value={workStation}
                                defaultValue={getOnBoardingById?.zone?.id || ""}
                                onChange={(e) => setWorkStation(e.target.value)}

                            >
                                {
                                    getallzone?.map(item => (

                                        <MenuItem value={item?.id} onClick={() => { setWorkStationName(item?.name) }}>{item?.name}</MenuItem>
                                    ))
                                }

                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel>MANAGER</InputLabel>
                            <Select size="small"
                                label="MANAGER"
                                value={manager}
                                defaultValue={getOnBoardingById?.user?.id || ""}
                                onChange={(e) => setManager(e.target.value)}
                            >

                                {
                                    getallEmployee?.map(item => (

                                        <MenuItem value={item?.id} onClick={() => { setManagerName(item?.name) }}>{item?.name}</MenuItem>
                                    ))
                                }


                            </Select>
                        </FormControl>

                        <Grid sx={{ position: 'relative', width: "100%" }}>
                            <TextField size="small"
                                fullWidth

                                type="text"
                                label="WELCOME MESSAGE"
                                id="message"
                                value={message}

                                onChange={(e) => setMessage(e.target.value)}
                                multiline
                                rows={5}

                                maxRows={10}
                                InputLabelProps={{
                                    style: {
                                        fontSize: "10px",
                                        fontWeight: 600,
                                        background: "#ffffff",
                                        padding: "0px 8px 0px 8px",
                                    },
                                }} // font size of input label
                                inputProps={{
                                    maxLength: 500,
                                    sx: {
                                        border: "none",
                                        outline: "none",
                                        fontSize: "10px",
                                        letterSpacing: "0px",
                                        innerHeight: "200px",

                                        color: "#707070",
                                        "&::placeholder": {
                                            color: "#707070",
                                            fontSize: "8px",
                                        },
                                    },
                                }}
                            />
                            <Typography
                                className='bottom_number'
                                sx={{
                                    position: 'absolute',
                                    bottom: "-31px",
                                    right: 0,

                                }}>
                                {message?.length}/{max} MAX
                            </Typography>

                        </Grid>
                    </Grid>

                </Box>
                <Box className='on_boarding_todo'>
                    <h4>TO DO</h4>
                    <h6>THINGS TO DO: {getAllOnBoardingProcess?.length}</h6>
                    <Box className='on_boarding_todo_list_container'>
                        {
                            params?.id != "null" && (
                                getAllOnBoardingProcess?.length > 0 ?
                                    getAllOnBoardingProcess?.map(item => (
                                        <Box className='on_boarding_todo_lists'>
                                            <p>{item?.process}</p>
                                            {
                                                permission?.includes(permissionObj?.WEB_ONBOARDING_DELETE) &&
                                                <i onClick={() => { setDeleteShow(true); setDeleteId(item?.id); }} className="fa fa-trash" aria-hidden="true"></i>
                                            }

                                        </Box>

                                    )) :

                                    <NotFoundDataWarning text={"NO THINGS TO DO"} />
                            )
                        }
                        {
                            params?.id === "null" && (
                                createStep?.length > 0 ?
                                    createStep?.map(item => (
                                        <Box className='on_boarding_todo_lists'>
                                            <p>{item?.process}</p>
                                            {
                                                permission?.includes(permissionObj?.WEB_ONBOARDING_DELETE) &&
                                                <i
                                                    // onClick={() => { setDeleteShow(true); setDeleteId(item?.id); }}
                                                    onClick={() => { DeleteStep(item?.id) }}
                                                    className="fa fa-trash" aria-hidden="true"></i>
                                            }

                                        </Box>

                                    )) :

                                    <NotFoundDataWarning text={"NO THINGS TO DO"} />
                            )

                        }
                        <DeleteDeviceModal
                            show={deleteShow}
                            onHide={() => setDeleteShow(false)}
                            deleteid={deleteId}


                        />

                    </Box>
                    <button
                        onClick={() => { setShow(true) }}
                        className='add_new_step_btn'>CLICK HERE TO ADD NEW STEP <i className="fa fa-plus plus" aria-hidden="true"></i></button>
                    <AddStepModal
                        show={show}
                        onHide={() => setShow(false)}
                        onboardingId={params?.id}
                        setCreateStep={setCreateStep}
                    />

                    <br />
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                        <button
                            onClick={() => { setConfirmShow(true) }}
                            className='create_btn'>{params?.id != "null" ? "UPDATE ON BOARDING" : "CREATE ON BOARDING"}</button>
                        <ConfirmModal
                            show={confirmShow}
                            onHide={() => setConfirmShow(false)}
                            data={params?.id != "null" ? updateOnboardingActionData : createOnboardingActionData}
                            checkId={params?.id}
                            createProcessIds={createStep}

                        />
                    </Box>
                </Box>


            </Box>
        </Box>
    )
}


// modal for add step
export const AddStepModal = (props) => {
    console.log(props)

    const dispatch = useDispatch();
    const [message, setMessage] = useState("")
    let max = 500

    const addStepAction = () => {

        const data = {
            process: message,
            onboarding: {
                id: props?.onboardingId
            }

        }
        if (message) {
            if (props.onboardingId != "null") {

                dispatch(CreateOnBoardingProcess(data)).then(() => {
                    props.onHide()
                    setMessage("")
                })
                props?.onHide()
            } else {

                props?.setCreateStep(prevState => [...prevState, { id: uuid(), process: message }]);
                setMessage("")
                props?.onHide()
            }
        } else {
            toast.warn("Please Enter an Intruction")
        }


    }

    return (
        <Modal
            className="filter_device_model"
            {...props}
            // size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='fiter_event_model_head'>
                <Modal.Title
                    style={{
                        width: "100%",
                        color: '#146F62',
                        fontSize: "16px",
                        fontWeight: "600",
                        textAlign: "center",
                        marginTop: "10px",
                        letterSpacing: "7px"
                    }}
                >
                    ADD STEP
                </Modal.Title>
                <img
                    src={cross}
                    style={{
                        position: "absolute",
                        padding: "1px",
                        right: "3px",
                        width: "15px",
                        height: "15px",
                        top: "3px",
                        cursor: "pointer",
                    }}
                    onClick={() => props.onHide()}
                />
            </Modal.Header>
            <Modal.Body>
                <p className='title'>
                    Fill on the input the step to follow it
                </p>
                <Grid sx={{ position: 'relative', width: "100%" }}>
                    <TextField size="small"
                        fullWidth

                        type="text"
                        label="INSTRUCTION"
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        multiline
                        rows={5}

                        maxRows={10}
                        InputLabelProps={{
                            style: {
                                fontSize: "10px",
                                fontWeight: 600,
                                background: "#ffffff",
                                padding: "0px 8px 0px 8px",

                            },
                        }} // font size of input label
                        inputProps={{
                            maxLength: 500,
                            sx: {
                                border: "none",
                                outline: "none",
                                fontSize: "10px",
                                letterSpacing: "0px",
                                innerHeight: "200px",

                                color: "#707070",
                                "&::placeholder": {
                                    color: "#707070",
                                    fontSize: "8px",
                                },

                            },
                        }}
                    />
                    <Typography
                        className='bottom_number_modal'
                        sx={{
                            position: 'absolute',
                            bottom: "-18px",
                            right: 0,
                            fontSize: '10px',
                            color: "#707070"

                        }}>
                        {message.length}/{max} MAX
                    </Typography>

                </Grid>
                <div className="changeImgBottomDiv mt-4">
                    <button
                        className="changeImgCancelBtn"
                        style={{ fontSize: "12px" }}
                        onClick={() => {
                            props.onHide()
                            setMessage("")
                        }}
                    >
                        CANCEL
                    </button>
                    <button

                        className="changeImgChangeBtn"
                        style={{ fontSize: "12px" }}
                        onClick={() => {
                            addStepAction()
                        }}

                    >
                        CONFIRM
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}


//model for confirmation
export const ConfirmModal = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const createOnboardingAction = () => {

        console.log(props?.data)
        console.log(props?.checkId)
        if (props?.checkId === "null") {

            console.log(props.data)

            if (props?.data?.managerName != "" && props?.data?.managerName != "" && props?.data?.managerName != "") {
                dispatch(CreateOnBoarding(props?.data)).then((res) => {

                    console.log(res?.payload?.data?.data?.id)
                    dispatch(CreateListWithProcess(props.createProcessIds?.map(item => {
                        return ({
                            process: item?.process,
                            onboarding: {
                                id: res?.payload?.data?.data?.id
                            }
                        })
                    })
                    )).then(() => {
                        navigate("/dashboard/employee/company/onboarding")
                        props.onHide()
                    })

                })
            } else {
                toast.warn("Please Fill All Fields")
            }

        } else {
            dispatch(UpdateOnBoarding(props?.data)).then(() => {
                navigate("/dashboard/employee/company/onboarding")
                props?.onHide()
            })
        }

    }

    return (
        <Modal
            className="filter_device_model"
            {...props}
            // size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='fiter_event_model_head'>
                <Modal.Title
                    style={{
                        width: "100%",
                        color: '#146F62',
                        fontSize: "16px",
                        fontWeight: "600",
                        textAlign: "center",
                        marginTop: "10px",
                        letterSpacing: "7px"
                    }}
                >
                    {props?.checkId != "null" ? "UPDATE BOARDING" : "CREATE BOARDING"}
                </Modal.Title>
                <img
                    src={cross}
                    style={{
                        position: "absolute",
                        padding: "1px",
                        right: "3px",
                        width: "15px",
                        height: "15px",
                        top: "3px",
                        cursor: "pointer",
                    }}
                    onClick={() => props.onHide()}
                />
            </Modal.Header>
            <Modal.Body>
                <p style={{ fontSize: '14px', textAlign: 'center', paddingBottom: "1.5rem" }}>
                    {
                        props?.checkId != "null" ?
                            (<>to create the on boading for role TI ,<br /> confirm the action.</>) : (
                                <>to update the on boading for role TI , <br /> confirm the action.</>
                            )
                    }

                </p>

                <div className="changeImgBottomDiv mt-3">
                    <button
                        className="changeImgCancelBtn"
                        style={{ fontSize: "12px" }}
                        onClick={() => props.onHide()}
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={() => {
                            createOnboardingAction()
                        }}
                        className="changeImgChangeBtn"
                        style={{ fontSize: "12px" }}

                    >
                        CONFIRM
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

//model for delete
export const DeleteDeviceModal = (props) => {
    console.log(props)
    const dispatch = useDispatch();


    // a function to handel delete device
    const handleDeleteProcess = (id) => {



        dispatch(DeleteOnboardingProcess(id)).then(() => {
            // dispatch(ClearDeleteDeviceToListPayroll())
            props.onHide()
            // toast.success("Process Delete Successfully")
        })
    }


    return (
        <Modal
            className="filter_device_model"
            {...props}
            // size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='fiter_event_model_head'>
                <Modal.Title
                    style={{
                        width: "100%",
                        color: '#146F62',
                        fontSize: "16px",
                        fontWeight: "600",
                        textAlign: "center",
                        marginTop: "10px"
                    }}
                >
                    REMOVE STEP
                </Modal.Title>
                <img
                    src={cross}
                    style={{
                        position: "absolute",
                        padding: "1px",
                        right: "3px",
                        width: "15px",
                        height: "15px",
                        top: "3px",
                        cursor: "pointer",
                    }}
                    onClick={() => props.onHide()}
                />
            </Modal.Header>
            <Modal.Body>
                <p style={{ fontSize: '14px', textAlign: 'center', paddingBottom: "1.5rem" }}>

                    You are about to remove the step from the list,<br /> press the button
                    <span style={{ fontWeight: 'bold', color: '#707070' }}> CONFIRM </span>the action
                </p>
                <div className="changeImgBottomDiv mt-3">
                    <button
                        className="changeImgCancelBtn"
                        style={{ fontSize: "12px" }}
                        onClick={() => props.onHide()}
                    >
                        CANCEL
                    </button>
                    <button
                        onClick={() => { handleDeleteProcess(props?.deleteid) }}
                        className="changeImgChangeBtn"
                        style={{ fontSize: "12px" }}

                    >
                        CONFIRM
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}


export default OnBoardingUE