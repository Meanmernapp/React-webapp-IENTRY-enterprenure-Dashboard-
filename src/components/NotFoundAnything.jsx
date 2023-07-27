
import { Box } from '@mui/material'
import React from 'react'
import noData from "../assets/images/warning.svg";

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/
const NotFoundAnything = ({ text,mt }) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: "center",
            flexDirection: 'column',
            alignContent: "center",
            width: '100%',
            gap: '1rem',
            marginTop: mt ? mt : '3rem'

        }}>
            <img src={noData} alt="" />
            <p style={{ color: '#BC0000', fontSize: '24px', fontWeight: 'bold' }}>{text}</p>
        </Box>
    )
}

export default NotFoundAnything