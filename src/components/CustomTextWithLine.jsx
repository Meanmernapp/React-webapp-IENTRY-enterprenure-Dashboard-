/*
Author : Arman Ali
Module: create Vehicle
github: https://github.com/Arman-Arzoo
*/
import React from 'react'

const CustomTextWithLine = ({title,spacing}) => {
  //title : title name with line 

  return (
    <div className={`headline_with_line ${spacing}`}>
    <span >{title}</span>
    <div className="centerline"></div>
</div>
  )
}

export default CustomTextWithLine