import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SubHeaderNav = ({ isNav, title }) => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  const lCode = Cookies.get("i18next") || "en";
  return (
    <Box sx={{paddingTop:"1rem", display:"flex" ,alignItems:"center", gap:"0.5rem"}}>
      {
        isNav &&
        <Link to={"#"}>
          <ArrowBackIcon onClick ={()=> navigate(-1)}  sx={{fontSize:"2rem",color:"primary.main", fontWeight:'bold'}}/>
         </Link> 
      }
      <Typography variant='h4' color="primary.main" fontWeight="bold" fontSize="2rem">
        {t(title)}
      </Typography>

    </Box>
  )
}

export default SubHeaderNav