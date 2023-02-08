import React from 'react'
import { Link } from 'react-router-dom'
import TablePagination from '@mui/material/TablePagination';
import { Box, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { permissionObj } from '../../../../Helpers/permission';

const Hospitality = () => {
    const { permission } = useSelector(state => state.authenticatioauthennSlice);
    return (
        <>
            <div className='custom_head'>
                <div className='left'>
                    {/* <i className="fa fa-arrow-left" aria-hidden="true"></i> */}
                    <p>HOSPITALITY</p>
                </div>
                {
                    permission?.includes(permissionObj?.WEB_HOSPITALITY_CREATE) &&
                    <div className='right'>
                        <Link className='button' to="/dashboard/employee/hospitality/add-room">ADD ROOM<i className="fa fa-envelope" aria-hidden="true"></i></Link>
                    </div>
                }

            </div>
            <Box className='hospitality_container'>
                {
                    [1, 2, 3, 4, 5, 6].map(item => (
                        <div className='hospitality_card'>
                            <button className='btn'>
                                <Link to='/dashboard/employee/hospitality/room-detail'>
                                    <i className="fa fa-pencil" aria-hidden="true" />
                                </Link>
                            </button>
                            <Box className='on_boarding_container_header'>
                                <h4>ROOM</h4>
                                <p>Room-1001</p>

                            </Box>
                            <Divider sx={{ marginTop: "0.4rem", marginBottom: "0.4rem" }} />
                            <Box className='on_boarding_container_content'>
                                <Box className='on_boarding_container_content_item'>
                                    <h4>Zone</h4>
                                    <Box className='list'>
                                        <Box className='icon'></Box>
                                        <p>Building - A</p>
                                    </Box>
                                </Box>
                                <Box className='on_boarding_container_content_item'>
                                    <h4>Sleeps</h4>
                                    <Box className='list'>
                                        <Box className='icon'></Box>
                                        <p>3/4</p>
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                    ))
                }


            </Box>

            <Box className='d-flex justify-content-center'>

                <TablePagination
                    component="div"
                    rowsPerPageOptions={[2, 4, 6, 8, 12]}
                    count={3}
                    page={2}
                    // onPageChange={handleChangePageIcoming}
                    labelRowsPerPage="Rooms per page"
                // rowsPerPage={rowsPerPageIncoming}
                // onRowsPerPageChange={handleChangeRowsPerPageIncoming}
                />

            </Box>
        </>
    )
}


export default Hospitality