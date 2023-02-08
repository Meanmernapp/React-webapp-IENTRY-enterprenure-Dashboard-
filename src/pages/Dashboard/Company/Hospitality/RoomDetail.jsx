import { Avatar, Box, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import cross from '../../../../assets/images/ic-cancel.svg'
import { permissionObj } from '../../../../Helpers/permission'

const RoomDetail = () => {
    const [show, setShow] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    const { permission } = useSelector(state => state.authenticatioauthennSlice);
    return (
        <>
            <Box className='custom_head'>
                <Box className='left'>
                    <Link to="/dashboard/employee/hospitality">
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </Link>
                    <p>ROOM DETAIL</p>
                </Box>
                {
                    permission?.includes(permissionObj?.WEB_HOSPITALITY_UPDATE) &&
                    <Box className='right'>
                        <Link className='button' to="/dashboard/employee/hospitality/add-room">UPDATE ROOM<i className="fa fa-envelope" aria-hidden="true"></i></Link>
                    </Box>
                }

            </Box>
            <Box className='room_details_container '>
                <Grid display='flex' gap="0.8rem" alignItems="baseline">
                    <h4>DATA
                    </h4>
                    <div className='span' ></div>
                </Grid>
                <Box className='room_data'>
                    <Box className='room_data_child'>
                        <Box className='room_data_item'>
                            <h5>Name</h5>
                            <p>ROOM-10001</p>
                        </Box>

                        <Box className='room_data_item'>
                            <h5>SLEEPS</h5>
                            <p><span>NO.</span>{" "}2</p>
                        </Box>

                    </Box>
                    <Box className='room_data_item'>
                        <h5>ZONE</h5>
                        <p>Meeting room 1</p>
                    </Box>


                </Box>
                <Box className='room_sleep_container'>

                    <Grid display='flex' gap="0.8rem" alignItems="baseline">
                        <h4>SLEEP
                        </h4>
                        <div className='span' ></div>
                    </Grid>

                    <p className='p'>3/4 Sleep</p>
                    <Box className='room_sleep_card_container'>
                        {
                            [1, 2].map(item => (
                                <Box className='room_sleep_card'>

                                    <Box className='room_sleep_card_left'>
                                        <Avatar src="#" wid>

                                        </Avatar>
                                        <Link to="#">see details</Link>
                                    </Box>
                                    <Box className='room_sleep_card_right'>
                                        <Box>
                                            <h5>NAME</h5>
                                            <p>Luis Enrique Cornejo Arreola</p>

                                        </Box>
                                        <Box className='room_sleep_card_right-divider'>
                                            <Box>
                                                <h5>EMAIL</h5>
                                                <p>lcornejo@ibl.mx</p>
                                            </Box>
                                            <Box>
                                                <h5>TELEPHONE</h5>
                                                <p>+524425895056</p>
                                            </Box>
                                        </Box>
                                        <Box className='room_sleep_card_right-divider'>
                                            <Box>
                                                <h5>EMPLOYEE ID</h5>
                                                <p>IBL-004</p>
                                            </Box>
                                            <Box sx={{ marginLeft: "2rem" }}>
                                                <h5>ROLE</h5>
                                                <p>CTE</p>
                                            </Box>
                                        </Box>
                                    </Box>
                                    {
                                        permission?.includes(permissionObj?.WEB_HOSPITALITY_DELETE) &&
                                        <Box className='icon'>

                                            <i onClick={() => { setShowDelete(true) }} className="fa fa-trash" aria-hidden="true"></i>

                                            <ConfirmDeleteModal
                                                show={showDelete}
                                                onHide={() => setShowDelete(false)}
                                            />
                                        </Box>
                                    }

                                </Box>
                            ))
                        }
                    </Box>


                </Box>
                <Box className='footer'>

                    <button onClick={() => setShow(true)}>ADD NEW OCCUPANT <i class="fa fa-plus" aria-hidden="true"></i></button>

                    <AddNewOccupantModal
                        show={show}
                        onHide={() => setShow(false)}
                    />
                </Box>
            </Box>

        </>
    )
}

// modal for new occupant
export const AddNewOccupantModal = (props) => {
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
                    ADD OCCUPANT
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
                    Select the new occupant from the <br /> employee list
                </p>

                <Box marginTop="1rem" marginBottom='1rem'
                    sx={{
                        width: "100%",
                        maxWidth: "100%",
                        fontSize: "20px",
                        height: "40px",
                    }}
                >
                    <FormControl fullWidth>
                        <InputLabel>EMPLOYEE</InputLabel>
                         <Select size="small"
                            // value={orderby}
                            label="EMPLOYEE"
                        // onChange={handleOrderBy}
                        // onChange={(e) => {
                        //     handelAddDevice(e)
                        // }}
                        >
                            {/* {
                                getAllDevicePayroll?.map(device => ( */}

                            <MenuItem value={"1"}>{"option"}</MenuItem>
                            {/* ))

                            } */}

                        </Select>
                    </FormControl>
                </Box>

                <Grid display='flex' gap="0.8rem" alignItems="baseline" className='line'>
                    <h4>SELECTED</h4>
                    <div className='span' ></div>
                </Grid>

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

// modal for delete
export const ConfirmDeleteModal = (props) => {
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
                    REMOVE OCCUPANT
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
                    You are about to remove the occupant <br />
                    <span style={{ color: "#707070", fontWeight: "bold" }}>Luis Cornejo</span>  from the room, <br /> press the button
                    <span style={{ color: "#707070", fontWeight: "bold" }}> CONFIRM</span> the action.
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
                        className="changeImgChangeBtn"
                        style={{ fontSize: "12px" }}

                    >
                        CONFIRM
                    </button>
                </div>
            </Modal.Body>
        </Modal >
    )
}


export default RoomDetail