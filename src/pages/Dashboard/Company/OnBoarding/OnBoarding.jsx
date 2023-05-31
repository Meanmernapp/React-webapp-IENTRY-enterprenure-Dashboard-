import { Box, Divider, TablePagination } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import noData from "../../../../assets/images/warning.svg";
import NotFoundDataWarning from '../../../../components/NotFoundDataWarning';
import { permissionObj } from '../../../../Helpers/permission';
import { GetAllOnBoardingProcess, GetOnBoarding } from '../../../../reduxToolkit/EmployeeOnBoarding/EmployeeOnBoardingApi';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

// On Boarding  module main funtion

const OnBoarding = () => {

    // hook
    const dispatch = useDispatch()
    //use State hook for local state management

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10);

    //use Selector hook to get state for redux store
    const { permission } = useSelector(state => state.authenticatioauthennSlice);
    const { getOnBoarding } = useSelector(state => state.employeeOnBoardingSlice);

    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    // custom Funtion
    // a funtion to control zone page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    // a funtion to control row per page 
    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    // useEffect
    useEffect(() => {
        const pagination = {
            order: true,
            page: 0,
            size: rowsPerPage,
            sortBy: "id"
        }
        dispatch(GetOnBoarding(pagination))
    }, [page, rowsPerPage])

    console.log(getOnBoarding)

    //return main content
    return (
        <Box>
            {/* header */}
            <div className='custom_head'>
                <div className='left'>
                    {/* <Link to="/dashboard/employee/company">
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </Link> */}
                    <p>{t("on_boarding")}</p>
                </div>
            </div>
            {/* content */}
            <Box className='on_boarding_container'>

                {/* item list */}
                {
                    getOnBoarding?.content?.length > 0 ?
                        getOnBoarding?.content?.map((item) => {
                            return (
                                <Box className='on_boarding_container_item'>
                                    {item?.id != null && permission?.includes(permissionObj?.WEB_ONBOARDING_UPDATE) ?
                                        <button className='btn'>
                                            <Link to={`/dashboard/employee/company/onboarding-UE/${item?.id}`}>
                                                <i className="fa fa-pencil" aria-hidden="true" />
                                            </Link>
                                        </button>
                                        :
                                        <button className='btn'>
                                            <Link to={`/dashboard/employee/company/onboarding-UE/${item?.id}`}
                                                onClick={() => {
                                                    localStorage.setItem("onBoardingRoleId", item?.roleId);
                                                    localStorage.setItem("onBoardingRoleName", item?.roleName);
                                                    // dispatch(GetAllOnBoardingProcess(item?.id))
                                                }}
                                            >
                                                <i className="fa fa-plus" aria-hidden="true" />
                                            </Link>
                                        </button>
                                    }

                                    {/* {
                                        item?.onboardingProcesses?.length < 0 && permission?.includes(permissionObj?.WEB_ONBOARDING_CREATE) &&
                                        <button className='btn'>
                                            <Link to={`/dashboard/employee/company/onboarding-UE/${item?.id}`}>
                                                <i className="fa fa-plus" aria-hidden="true" />
                                            </Link>
                                        </button>
                                    } */}


                                    <Box className='on_boarding_container_header'>
                                        <h4>ROLE</h4>
                                        <p>{item?.roleName || "-"} </p>

                                    </Box>
                                    <Divider sx={{ marginTop: "0.4rem", marginBottom: "0.4rem" }} />
                                    <Box className='on_boarding_container_content'>
                                        {/* containe */}
                                        {item?.id != null ?

                                            <Box sx={{ paddingLeft: "1rem" }}>
                                                <Box className='on_boarding_container_content_item'>
                                                    <h4>MANAGER</h4>
                                                    <Box className='list'>
                                                        <Box className='icon'></Box>
                                                        <p>{item?.managerName}</p>
                                                    </Box>
                                                </Box>
                                                <Box className='on_boarding_container_content_item'>
                                                    <h4>WORK STATION</h4>
                                                    <Box className='list'>
                                                        <Box className='icon'></Box>
                                                        <p>{item?.zoneName}</p>
                                                    </Box>
                                                </Box>
                                                <Box className='on_boarding_container_content_item'>
                                                    <h4>THINGS TO DO</h4>
                                                    <Box className='list'>
                                                        <Box className='icon'></Box>
                                                        <p>{item?.processNo}</p>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            :
                                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "1rem", alignItems: "center", flexDirection: 'column', width: '100%', gap: '1rem' }}>
                                                <img src={noData} alt="" />
                                                <p style={{ color: '#BC0000', fontSize: '24px', fontWeight: 'bold' }}>NO ON BOARDING</p>
                                            </Box>

                                        }





                                    </Box>

                                </Box>
                            )
                        })
                        :

                        <NotFoundDataWarning text={"NotFoundDataWarning"} />
                }


            </Box>

            <div className="d-flex justify-content-center">
                <TablePagination

                    component="div"
                    rowsPerPageOptions={[10, 15, 20, 30]}
                    count={getOnBoarding?.totalElements}
                    page={page}
                    onPageChange={handleChangePage}
                    labelRowsPerPage="On Boardings per page"
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </Box>

    )
}

export default OnBoarding