
import React from 'react'
import settingIcon from '../assets/icon/ic-setting.svg'
import { Tooltip } from '@mui/material'
const SettingButton = ({onAction,title}) => {
  return (
    <Tooltip title={title} placement='left'>
    <div className='mini_btn' onClick={()=>onAction()}>
        <img src={settingIcon} alt="setting" />
    </div>
    </Tooltip>
  )
}

export default SettingButton