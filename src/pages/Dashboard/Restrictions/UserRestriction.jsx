import { Box, Checkbox, Grid, Tooltip, Typography } from '@mui/material'
import React from 'react'
import SubHeaderNav from '../../../components/SubHeaderNav'
import CustomTextWithLine from '../../../components/CustomTextWithLine'
import { useTranslation } from 'react-i18next';
import ClearButton from '../../../components/ClearButton';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserRestriction, UpdateUserRestriction } from '../../../reduxToolkit/restrictions/RestrictionApi';
import { useEffect } from 'react';
import { useState } from 'react';
const UserRestriction = () => {
  // hook
  const { t } = useTranslation();
  const dispatch = useDispatch()
  // useState
  const [biocrValidationExternal, setBiocrValidationExternal] = useState(false)
  const [extraDataExternal, setExtraDataExternal] = useState(false)
  const [sendEmailWhenCreateContractor, setSendEmailWhenCreateContractor] = useState(false)
  const [sendEmailWhenCreateEmployee, setSendEmailWhenCreateEmployee] = useState(false)
  const [sendEmailWhenCreateSupplier, setSendEmailWhenCreateSupplier] = useState(false)
  const [sendEmailWhenUpdateContractor, setSendEmailWhenUpdateContractor] = useState(false)
  const [sendEmailWhenUpdateEmployee, setSendEmailWhenUpdateEmployee] = useState(false)
  const [sendEmailWhenUpdateSupplier, setSendEmailWhenUpdateSupplier] = useState(false)
  // use Reducer
  const { getUserRestriction,updateUserRestriction } = useSelector(state => state?.RestrictionSlice)
  console.log(getUserRestriction)
  // functions
  const clearAllCheck = () => {

    setBiocrValidationExternal(false)
    setExtraDataExternal(false)
    setSendEmailWhenCreateContractor(false)
    setSendEmailWhenCreateEmployee(false)
    setSendEmailWhenCreateSupplier(false)
    setSendEmailWhenUpdateContractor(false)
    setSendEmailWhenUpdateEmployee(false)
    setSendEmailWhenUpdateSupplier(false)

  }
  // update
  const handelUpdate = () => {
    const data = {
      biocrValidationExternal,
      extraDataExternal,
      id: getUserRestriction?.id,
      sendEmailWhenCreateContractor,
      sendEmailWhenCreateEmployee,
      sendEmailWhenCreateSupplier,
      sendEmailWhenUpdateContractor,
      sendEmailWhenUpdateEmployee,
      sendEmailWhenUpdateSupplier
    }
    dispatch(UpdateUserRestriction(data))
  }
  // life cycle
  useEffect(() => {
    dispatch(GetUserRestriction())
  }, [updateUserRestriction])
  // while update
  useEffect(() => {

    setBiocrValidationExternal(getUserRestriction?.biocrValidationExternal)
    setExtraDataExternal(getUserRestriction?.extraDataExternal)
    setSendEmailWhenCreateEmployee(getUserRestriction?.sendEmailWhenCreateEmployee)
    setSendEmailWhenUpdateEmployee(getUserRestriction?.sendEmailWhenUpdateEmployee)
    setSendEmailWhenCreateContractor(getUserRestriction?.sendEmailWhenCreateContractor)
    setSendEmailWhenUpdateContractor(getUserRestriction?.sendEmailWhenUpdateContractor)
    setSendEmailWhenCreateSupplier(getUserRestriction?.sendEmailWhenCreateSupplier)
    setSendEmailWhenUpdateSupplier(getUserRestriction?.sendEmailWhenUpdateSupplier)

  }, [getUserRestriction?.id])
  return (
    <Box className='restriction'>
      <SubHeaderNav isNav={true} linkTo={'user-restriction'} title={"user_restriction"} />
      <Box sx={{ padding: "2rem 4rem 0rem 4rem" }}>

        <CustomTextWithLine title={t("options")} />
        <ClearButton flagTooltip={true} textTooltip={t("clear_all_inputs")} handleClear={() => clearAllCheck()} />
        <Grid container paddingLeft="5.6rem" paddingTop='2rem' paddingBottom='4rem'>
          <Grid items md={6} >
            <Box className='check_box_with_title' paddingTop="1rem">

              <Checkbox
                className="grid-checkall checkbox"
                checked={biocrValidationExternal}
                onChange={(e) => setBiocrValidationExternal(e.target.checked)}
                size="small"
              />
              <Typography variant='body1'>
                {t("blocr_for_externals_(visitors,_contractors,_suppliers)")?.toUpperCase()}
              </Typography>

            </Box>
            <Box className='check_box_with_title' paddingTop="1rem">

              <Checkbox
                className="grid-checkall checkbox"
                checked={sendEmailWhenCreateEmployee}
                onChange={(e) => setSendEmailWhenCreateEmployee(e.target.checked)}
                size="small"
              />
              <Typography variant='body1'>
                {t("send_email_to_employee_when_create")?.toUpperCase()}
              </Typography>

            </Box>
            <Box className='check_box_with_title' paddingTop="1rem">

              <Checkbox
                className="grid-checkall checkbox"
                checked={sendEmailWhenCreateContractor}
                onChange={(e) => setSendEmailWhenCreateContractor(e.target.checked)}
                size="small"
              />
              <Typography variant='body1'>
                {t("send_email_to_contractor_when_create")?.toUpperCase()}
              </Typography>

            </Box>
            <Box className='check_box_with_title' paddingTop="1rem">

              <Checkbox
                className="grid-checkall checkbox"
                checked={sendEmailWhenCreateSupplier}
                onChange={(e) => setSendEmailWhenCreateSupplier(e.target.checked)}
                size="small"
              />
              <Typography variant='body1'>
                {t("send_email_to_supplier_when_create")?.toUpperCase()}
              </Typography>

            </Box>

          </Grid>
          <Grid items md={6}>
            <Box className='check_box_with_title' paddingTop="1rem">

              <Checkbox
                className="grid-checkall checkbox"
                checked={extraDataExternal}
                onChange={(e) => setExtraDataExternal(e.target.checked)}
                size="small"
              />
              <Typography variant='body1'>
                EXTRA DATA FOR EXTERNALS (VISITORS, CONTRACTS, SUPPLIERS)
                {t("extra_data_for_externals_(visitors,_contracts_suppliers)")?.toUpperCase()}
              </Typography>

            </Box>
            <Box className='check_box_with_title' paddingTop="1rem">

              <Checkbox
                className="grid-checkall checkbox"
                checked={sendEmailWhenUpdateEmployee}
                onChange={(e) => setSendEmailWhenUpdateEmployee(e.target.checked)}
                size="small"
              />
              <Typography variant='body1'>
                {t("send_email_to_employee_when_update")?.toUpperCase()}
              </Typography>

            </Box>
            <Box className='check_box_with_title' paddingTop="1rem">

              <Checkbox
                className="grid-checkall checkbox"
                checked={sendEmailWhenUpdateContractor}
                onChange={(e) => setSendEmailWhenUpdateContractor(e.target.checked)}
                size="small"
              />
              <Typography variant='body1'>
                {t("send_email_to_contractor_when_update")?.toUpperCase()}
              </Typography>

            </Box>
            <Box className='check_box_with_title' paddingTop="1rem">

              <Checkbox
                className="grid-checkall checkbox"
                checked={sendEmailWhenUpdateSupplier}
                onChange={(e) => setSendEmailWhenUpdateSupplier(e.target.checked)}
                size="small"
              />
              <Typography variant='body1'>
                {t("send_email_to_supplier_when_update")?.toUpperCase()}
              </Typography>

            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: "flex-end" }}>

          <button className='custom_primary_btn_dark' style={{ minWidth: '430px' }}
            onClick={() => handelUpdate()}
          >
            {t("update").toUpperCase()}
          </button>
        </Box>

      </Box>
    </Box>
  )
}

export default UserRestriction