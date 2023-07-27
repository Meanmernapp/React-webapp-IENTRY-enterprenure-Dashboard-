import { Box, Checkbox, Grid, Tooltip, Typography } from '@mui/material'
import React from 'react'
import SubHeaderNav from '../../../components/SubHeaderNav'
import CustomTextWithLine from '../../../components/CustomTextWithLine'
import { useTranslation } from 'react-i18next';
import ClearButton from '../../../components/ClearButton';
const RestrictionLayout = () => {
  const { t } = useTranslation();
  const clearAllCheck = ()=>{

  }
  return (
    <Box className='restriction'>
      <SubHeaderNav isNav={true} linkTo={'user-restriction'} title={"user_restriction"} />
      <Box sx={{ padding: "2rem 4rem 0rem 4rem" }}>

        <CustomTextWithLine title={t("options")} />
        <ClearButton flagTooltip={true} textTooltip={t("clear_all_inputs")} handleClear={clearAllCheck}/>
        <Grid container  paddingLeft="5.6rem" paddingTop='2rem' paddingBottom='4rem'>
          <Grid items md={6} >
           
          </Grid>
          <Grid items md={6}>
            
          </Grid>
        </Grid>
        <Box sx={{display:'flex', justifyContent:"flex-end"}}>

        <button  className='custom_primary_btn_dark' style={{minWidth:'430px'}}>
          {t("update_restrictions").toUpperCase()}
        </button>
        </Box>

      </Box>
    </Box>
  )
}

export default RestrictionLayout