/*
Author : Arman Ali
Module: create Vehicle
github: https://github.com/Arman-Arzoo
*/
import React from 'react'
import { blueColor, greenColor, orangeColor, redColor, yellowColor } from '../constant/variable';

const VehicleStatus = ({ statusName, data, top, right }) => {
  //statusName: name of the status
  // data : data of the current api
  // top: top position to show
  // right : right adjudment
  // this funtion check status id and return corresponding color
  const checkStatus = (id) => {
    switch (id) {
      case 2:
        return yellowColor;
      case 3:
        return blueColor;
      case 4:
        return greenColor;
      case 5:
        return orangeColor;
      case 6:
        return redColor;
      default:
        return undefined;
    }
  }
  return (
    <div className="status_indication" style={{ top: top, right: right }}>
      <span style={{ color: checkStatus(data?.status?.id) }}>{statusName}</span>
      <div style={{ background: checkStatus(data?.status?.id) }} className="circle_icon" ></div>
    </div>
  )
}

export default VehicleStatus