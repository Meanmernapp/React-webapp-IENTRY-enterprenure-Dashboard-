import React, { useEffect } from 'react'
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from 'react-redux';
import deviceMarker from '../../../assets/images/ic-marker.svg'
import { SetZoneImageCoordinate } from '../../../reduxToolkit/EmployeeZones/EmployeeZonesApi';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/

// Zone  device list zone plane module main funtion
const DeviceListZonePlane = ({ item, zoneplaneId, index }) => {
    // translation
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    // use hook importer
    const dispatch = useDispatch();

    //drag
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { id: item?.deviceId },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }))
    return (

        <div className="device_lists">
            <div className="left">
                <img ref={drag} src={deviceMarker} alt="" />
                <p>{item?.deviceName}</p>
            </div>
            <div className="right">
                <p>{item?.pin}</p>
                {
                    (item?.axisPositionX || item?.axisPositionY) ?
                        <>
                            <i class="fa fa-times cross_zone_device" aria-hidden="true"
                                onClick={() => {

                                    const data = {
                                        deviceId: item?.deviceId,
                                        axisPositionX: "0",
                                        axisPositionY: "0",
                                        zonePlaneId: zoneplaneId?.id

                                    }
                                    dispatch(SetZoneImageCoordinate({ data }))
                                }}
                            ></i>
                        </> : ""
                }
            </div>
        </div>
    )
}

export default DeviceListZonePlane