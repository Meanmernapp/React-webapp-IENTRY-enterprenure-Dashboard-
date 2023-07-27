
import React from 'react'
import headerIcon from '../assets/icon/heading-solid.svg'
import { Tooltip } from '@mui/material'
const HeaderSettingButton = ({onAction,title}) => {
  return (
    <Tooltip title={title} placement='left'>
    <div className='mini_btn' onClick={()=>onAction()}>
        <img src={headerIcon} alt="setting" />
    </div>
    </Tooltip>
  )
}

export default HeaderSettingButton