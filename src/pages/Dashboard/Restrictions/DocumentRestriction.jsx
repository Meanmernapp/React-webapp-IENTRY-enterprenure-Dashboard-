import { Box, Checkbox, FormControl, Grid, InputLabel, MenuItem, Select, Tooltip, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import SubHeaderNav from '../../../components/SubHeaderNav'
import CustomTextWithLine from '../../../components/CustomTextWithLine'
import { useTranslation } from 'react-i18next';
import ClearButton from '../../../components/ClearButton';
import AutoCompleteSearch from '../../../components/AutoCompleteSearch';
import { useState } from 'react';
import { GetDocumentRestriction, GetDocumentRestrictionsingle, UpdateDocumentRestriction } from '../../../reduxToolkit/restrictions/RestrictionApi';
import { useDispatch, useSelector } from 'react-redux';
import useStyle from '../../../hooks/useStyle';
const DocumentRestriction = () => {
  // use hook
  const { t } = useTranslation();
  const { textField,smallBoxStyle } = useStyle()
  const dispatch = useDispatch()
  // useState
  const [value, setValue] = useState("")
  // use Reducer
  const { getDocumentRestriction, updateDocumentRestriction, getDocumentRestrictionsingle } = useSelector(state => state.RestrictionSlice)
  console.log(getDocumentRestrictionsingle)
  // functions
  const clearAllCheck = () => {
    setValue("")
  }
  // update
  const handleUpdateDoc = () => {
    const data = {
      id: getDocumentRestrictionsingle?.mediaOptionId,
      mediaOptionId: value,

    }
    dispatch(UpdateDocumentRestriction(data))
  }
  // life Cycle
  useEffect(() => {
    dispatch(GetDocumentRestriction())
  }, [])
  useEffect(() => {
    dispatch(GetDocumentRestrictionsingle())
  }, [updateDocumentRestriction])
  // before update
  useEffect(() => {
    setValue(getDocumentRestrictionsingle?.mediaOptionId)
  }, [getDocumentRestrictionsingle?.id])
  const dataTransform = (tras) => {

    const newData = tras?.map(item => {
      return {
        label: item?.name,
        id: item?.id

      }
    })
    return newData;
  }
  return (
    <Box className='restriction'>
      <SubHeaderNav isNav={true} linkTo={'document-restriction'} title={"document_restriction"} />
      <Box sx={{ padding: "2rem 4rem 0rem 4rem" }}>

        <CustomTextWithLine title={t("options")} />
        <ClearButton flagTooltip={true} textTooltip={t("clear_all_inputs")} handleClear={clearAllCheck} />
        <Grid container paddingLeft="5.6rem" paddingTop='2rem' paddingBottom='4rem'>
          <Grid items md={6} >
           
            <Box sx={smallBoxStyle}>
              <FormControl
                fullWidth
                size='small'
                sx={textField}
              >
                <InputLabel id="notify_department_through">
                  {t("notify_department_through")}
                </InputLabel>
                <Select size="small"
                
                  labelId="denotify_department_through"
                  id="notify_department_through_id"
                  label={t("notify_department_through")}
                  defaultValue={value | ""}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                >
                  {
                    getDocumentRestriction?.map((item, index) => {
                      return (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      )
                    })

                  }


                </Select>
              </FormControl>
            </Box>

          </Grid>
          <Grid items md={6}>

          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: "flex-end" }}>

          <button className='custom_primary_btn_dark' style={{ minWidth: '430px' }}
            onClick={() => handleUpdateDoc()}
          >
            {t("update").toUpperCase()}
          </button>
        </Box>

      </Box>
    </Box>
  )
}

export default DocumentRestriction