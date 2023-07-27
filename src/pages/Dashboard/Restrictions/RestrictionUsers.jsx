import { Box, Grid, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SubHeaderNav from '../../../components/SubHeaderNav'
import CustomTextWithLine from '../../../components/CustomTextWithLine'
import { useTranslation } from 'react-i18next';
import ClearButton from '../../../components/ClearButton';
import useStyle from '../../../hooks/useStyle';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { supplierFile } from "../../../constant/userType";
import { GetContractorRestriction, GetSupplierRestriction, UpdateContractorRestriction, UpdateSupplierRestriction } from '../../../reduxToolkit/restrictions/RestrictionApi';

const RestrictionUsers = ({ userType }) => {
  // use hook
  const { t } = useTranslation();
  const { textField, smallBoxStyle } = useStyle()
  const dispatch = useDispatch();
  // use State
  const [waitTime, setWaitTime] = useState(0)
  // use Selector
  const { getSupplierRestriction, getContractorRestriction,
    updateContractorRestriction,updateSupplierRestriction
   } = useSelector(state => state.RestrictionSlice)
  // functions
  const clearAllCheck = () => {
    setWaitTime(0)
  }
  const handleUpdateRestriction = () => {
     
    if (userType === supplierFile) {
      const data ={
        id:getSupplierRestriction?.id,
        waitTime
      }
      dispatch(UpdateSupplierRestriction(data))
    } else {
      const data ={
        id:getContractorRestriction?.id,
        waitTime
      }
      dispatch(UpdateContractorRestriction(data))
    }
  }
  // lifeCycle
  useEffect(() => {
    if (userType === supplierFile) {
      dispatch(GetSupplierRestriction())
    } else {
      dispatch(GetContractorRestriction())
    }

  }, [updateContractorRestriction,updateSupplierRestriction])
  // update
  useEffect(() => {
    if (userType === supplierFile) {
      setWaitTime(getSupplierRestriction?.waitTime)
    } else {
      setWaitTime(getContractorRestriction?.waitTime)
    }

  }, [userType === supplierFile ? getSupplierRestriction?.id : getContractorRestriction?.id])

  return (
    <Box className='restriction'>
      <SubHeaderNav isNav={true} linkTo={`${userType}-restriction`} title={`${userType}-restriction`} />
      <Box sx={{ padding: "2rem 4rem 0rem 4rem" }}>

        <CustomTextWithLine title={t("options")} />
        <ClearButton flagTooltip={true} textTooltip={t("clear_all_inputs")} handleClear={clearAllCheck} />
        <Grid container paddingLeft="5.6rem" paddingTop='2rem' paddingBottom='4rem'>
          <Grid items md={6} >
            <Box sx={smallBoxStyle}>
              <TextField size="small"
                fullWidth
                className='helper_color'
                type="number"
                label={t("time_to_be_deleted")}
                id="time delete"
                value={waitTime}
                onChange={(e) => setWaitTime(e.target.value)}
                InputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  endAdornment: (
                    <InputAdornment position="end">
                      <span style={{
                        fontSize: "10px",
                        fontWeight: "bold"
                      }}> {t("sec")?.toUpperCase()}</span>
                    </InputAdornment>
                  ),
                }}
                sx={textField}
              />
            </Box>
          </Grid>
          <Grid items md={6}>

          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: "flex-end" }}>

          <button className='custom_primary_btn_dark' style={{ minWidth: '430px' }}
            onClick={() => handleUpdateRestriction()}
          >
            {t("update").toUpperCase()}
          </button>
        </Box>

      </Box>
    </Box>
  )
}

export default RestrictionUsers