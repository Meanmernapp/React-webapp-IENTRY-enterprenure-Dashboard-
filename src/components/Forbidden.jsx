import { Box } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

import logo from "../assets/images/iEntry_corporate.png";

import forbit from "../assets/images/no-touch.png";
const Forbidden = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-2);
    return (
        <Box className="forbidden">
            <Box className="forbidden_container">

                <img src={forbit} alt="logo" width="500px" height="500px" />
                <Box className="forbidden_container_item">

                    <h4>FORBIDDEN</h4>
                    <h3>403</h3>
                    <p>We are sorry, but you do not have <br /> access to this page or resource.</p>
                    <button onClick={goBack}>BACK TO HOME</button>
                    <img src={logo} alt="" width="80px" height="80px" />
                </Box>
            </Box>
        </Box>
    )
}

export default Forbidden