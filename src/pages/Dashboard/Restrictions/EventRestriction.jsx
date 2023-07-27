import { Box, Checkbox, Grid, InputAdornment, TextField, Tooltip, Typography } from '@mui/material'
import React from 'react'
import SubHeaderNav from '../../../components/SubHeaderNav'
import CustomTextWithLine from '../../../components/CustomTextWithLine'
import { useTranslation } from 'react-i18next';
import ClearButton from '../../../components/ClearButton';
import useStyle from '../../../hooks/useStyle';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetEventRestriction, UpdateEventRestriction } from '../../../reduxToolkit/restrictions/RestrictionApi';
import { useSelector } from 'react-redux';
import { useState } from 'react';
const EventRestriction = () => {
  // useHook
  const { t } = useTranslation();
  const { textField, smallBoxStyle } = useStyle()
  const dispatch = useDispatch();
  // state
  const [alertTimeIncoming, setAlertTimeIncoming] = useState(0)
  const [isOnuEvent, setIsOnuEvent] = useState(false)
  const [alertTimeInvitation, setalertTimeInvitation]= useState(0)
  // useSelector
  const { getEventRestriction,updateEventRestriction } = useSelector(state => state?.RestrictionSlice)
  console.log(getEventRestriction)
  // functions
  const clearAllCheck = () => {
    setAlertTimeIncoming(0)
    setIsOnuEvent(false)
    setalertTimeInvitation(0)
  }

  const handleUpdateEvent = ()=>{
   const data = {
      alertTimeIncoming,
      id: getEventRestriction?.id,
      isOnuEvent,
    }
    dispatch(UpdateEventRestriction(data))
  }
  // lifeCycle
  useEffect(() => {
    dispatch(GetEventRestriction())
  }, [updateEventRestriction])
  // update
  useEffect(()=>{
    setAlertTimeIncoming(getEventRestriction?.alertTimeIncoming)
    setIsOnuEvent(getEventRestriction?.isOnuEvent)
    setalertTimeInvitation(getEventRestriction?.alertTimeInvitation)
  },[getEventRestriction?.id])
  return (
    <Box className='restriction'>
      <SubHeaderNav isNav={true} linkTo={'event-restriction'} title={"restrictions"} />
      <Box sx={{ padding: "2rem 4rem 0rem 4rem" }}>

        <CustomTextWithLine title={t("event")} />
        <ClearButton flagTooltip={true} textTooltip={t("clear_all_inputs")} handleClear={clearAllCheck} />
        <Grid container paddingLeft="5.6rem" paddingTop='2rem' paddingBottom='4rem'>
          <Grid items md={6} >
            <Box sx={smallBoxStyle}>
              <TextField size="small"
                fullWidth
                className='helper_color'
                type="number"
                label={t("alert_time_to_incoming")}
                id="SYNC TIME"
                helperText={t("leave_0_to_avoid_send_it")?.toUpperCase()}
                value={alertTimeIncoming}
                onChange={(e) => setAlertTimeIncoming(e.target.value)}
                InputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  endAdornment: (
                    <InputAdornment position="end">
                      <span style={{
                        fontSize: "10px",
                        fontWeight: "bold"
                      }}> {t("min")?.toUpperCase()}</span>
                    </InputAdornment>
                  ),
                }}
                sx={textField}
              />
            </Box>
          </Grid>
          <Grid items md={6}>
            <Box className='check_box_with_title' paddingLeft={"2rem"}>

              <Checkbox
                className="grid-checkall checkbox"
                checked={isOnuEvent}
                onChange={(e)=>setIsOnuEvent(e.target.checked)}
                size="small"
              />
              <Typography variant='body1'>
                {t("is_onu_envent")?.toUpperCase()}
              </Typography>

            </Box>
          </Grid>
        </Grid>
        {/* <CustomTextWithLine title={t("invitation")} />
        <Grid container paddingLeft="5.6rem" paddingTop='2rem' paddingBottom='4rem'>
          <Grid items md={6} >
            <Box sx={smallBoxStyle}>
              <TextField size="small"
                fullWidth
                className='helper_color'
                type="number"
                label={t("alert_time_to_incoming_invitation")}
                id="SYNC TIME"
                helperText={t("leave_0_to_avoid_send_it")?.toUpperCase()}
                value={alertTimeInvitation}
                onChange={(e) => setalertTimeInvitation(e.target.value)}
                InputProps={{
                  inputMode: 'numeric',
                  pattern: '[0-9]*',
                  endAdornment: (
                    <InputAdornment position="end">
                      <span style={{
                        fontSize: "10px",
                        fontWeight: "bold"
                      }}> {t("min")?.toUpperCase()}</span>
                    </InputAdornment>
                  ),
                }}
                sx={textField}
              />
            </Box>
          </Grid>
          <Grid items md={6}>
          </Grid>
        </Grid> */}

        <Box sx={{ display: 'flex', justifyContent: "flex-end" }}>

          <button className='custom_primary_btn_dark' style={{ minWidth: '430px' }}
          onClick={()=>handleUpdateEvent()}
          >
            {t("update").toUpperCase()}
          </button>
        </Box>

      </Box>
    </Box>
  )
}

export default EventRestriction