import { Box, Grid, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import cross from '../../../../assets/images/ic-cancel.svg'
import { Modal } from 'react-bootstrap';
const AddUpdateHospitality = () => {
    const [show, setShow] = useState(false)
    return (
        <>
            <div className='custom_head'>
                <div className='left'>
                    <Link to="/dashboard/employee/hospitality">
                        <i className="fa fa-arrow-left" aria-hidden="true"
                        // style={{
                        //     transform: lCode === "ar" ? "scaleX(-1)" : ""
                        // }}
                        ></i>
                    </Link>
                    <p>ADD ROOM</p>
                </div>
            </div>

            <Box>
                <div className="add_update_hospital">
                    <Grid display='flex' gap="0.8rem" alignItems="baseline">
                        <h4>
                            {/* {t('sender')} */}DATA
                        </h4>
                        <div className='span' ></div>
                    </Grid>

                    <Grid container gap="1rem" ml="2rem">

                        <Grid item xs={5} sx={{ marginTop: '2rem' }} >
                            <TextField size="small"
                                fullWidth
                              
                                type="text"
                                // label={t('email')}
                                label="NAME"
                                id="name"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                InputLabelProps={{
                                    style: {
                                        fontSize: "10px",
                                        fontWeight: 600,
                                        background: "#ffffff",
                                        padding: "0px 8px 0px 8px",
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
                                            fontSize: "8px",
                                        },
                                    },
                                }}
                            />
                        </Grid>

                        <Grid item xs={5} sx={{ marginTop: '2rem', }} >
                            <TextField size="small"
                                fullWidth
                              
                                type="text"
                                // label={t('imap_host')}
                                id="NoSleep"
                                label="No Sleep"
                                // value={imap}
                                // onChange={(e) => setImap(e.target.value)}
                                InputLabelProps={{
                                    style: {
                                        fontSize: "10px",
                                        fontWeight: 600,
                                        background: "#ffffff",
                                        padding: "0px 8px 0px 8px",
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
                                            fontSize: "8px",
                                        },
                                    },
                                }}
                            />
                        </Grid>


                        <Grid item xs={5} >
                            <TextField size="small"
                                fullWidth
                              
                                type="text"
                                label="ZONE"
                                // label={t('port')}
                                id="zone"
                                // value={port}
                                // onChange={(e) => setPort(e.target.value)}
                                InputLabelProps={{
                                    style: {
                                        fontSize: "10px",
                                        fontWeight: 600,
                                        background: "#ffffff",
                                        padding: "0px 8px 0px 8px",
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
                                            fontSize: "8px",
                                        },
                                    },
                                }}
                            />
                        </Grid>

                    </Grid>
                    <Grid className='email_footer'>
                        <button className='cancel' onClick={() => {
                            // handelEmailSettingUpdate()
                        }}>CANCEL</button>

                        <button className='add' onClick={() => { setShow(true) }}>ADD ROOM</button>
                        <AddRoomConfrimModal
                            show={show}
                            onHide={() => setShow(false)}


                        />
                    </Grid>

                </div>


            </Box>
        </>
    )
}


// modal for confirm
export const AddRoomConfrimModal = (props) => {
    console.log(props)
    const dispatch = useDispatch();

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
                    CREATE ROOM
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
                    To create the new room, please confirm the <br /> action, details of room to create.
                </p>

                <Box className='confirm_modal_hospital'>
                    <Box className='confirm_modal_hospital_item'>
                        <h4>NAME</h4>
                        <p>ROOM-10001</p>
                    </Box>
                    <Box className='confirm_modal_hospital_item'>
                        <h4>ZONE</h4>
                        <p>Meeting room 1</p>
                    </Box>
                    <Box className='confirm_modal_hospital_item'>
                        <h4>SLEEPS</h4>
                        <p><span>NO.</span> 1</p>
                    </Box>
                </Box>
                <div className="changeImgBottomDiv mt-3">
                    <button
                        className="changeImgCancelBtn"
                        style={{ fontSize: "12px" }}
                        onClick={() => props.onHide()}
                    >
                        CANCEL
                    </button>
                    <button
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

export default AddUpdateHospitality