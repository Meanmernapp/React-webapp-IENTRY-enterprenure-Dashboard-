import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import house_plane from "../../../assets/images/house_plane@2x.png";
import map_solid from "../../../assets/images/map-solid.svg";
import ic_info from "../../../assets/images/ic-info.svg";
import ShowDeviceModal from "./Modal/ShowDeviceModal";
import ShowDeviceMapModal from "./Modal/showDeviceMapModal";
import ShowDeviceListModal from "./Modal/ShowDeviceListModal";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { GetListZoneMap, GetZoneDevicesLists, SetZoneImageCoordinate, ZoneDetailFatherAndChild } from "../../../reduxToolkit/EmployeeZones/EmployeeZonesApi";
import { useDispatch, useSelector } from "react-redux";
import ImageMarker, { MarkerComponentProps } from 'react-image-marker';
import RemovePlanModal from "./Modal/RemovePlanModal";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


import { useDrag, useDrop } from "react-dnd";
import DeviceListZonePlane from "./DeviceListZonePlane";
import { set } from "lodash";
import { permissionObj } from "../../../Helpers/permission";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { Box } from "@mui/material";
import noData from "../../../assets/images/warning.svg";
import LefletMap from "../../../components/LefletMap";
import ZoneMapSelect from "../../../components/ZoneMapSelect";
import { ClearGetListZoneMap } from "../../../reduxToolkit/EmployeeZones/EmployeeZoneSlice";

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/
// show devices main function
const ShowDevices = () => {
  // translation
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  // use hook importer
  const dispatch = useDispatch();

  // use State hook for local state management
  const [ProfileImage, setProfileImage] = useState("");
  const [viewPlane, setViewPlane] = React.useState('');
  const [openNavigation, setOpenNavigation] = React.useState(false);
  const [selectedZone, setSelectedZone] = React.useState('');
  const [isDeviceList, setIsDeviceList] = React.useState(false);
  const [imageMarkers, setImageMarkers] = useState([]);
  const [defaultZone, setDefaultZone] = useState([]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [showPlaneModal, setShowPlaneModal] = useState(false)
  const [deletePlaneModal, setDeletePlaneModal] = useState(false)

  //use Selector hook to get state for redux store
  const { permission } = useSelector(state => state.authenticatioauthennSlice);
  const { zoneDetailFatherAndChild, getListZoneMap, createZonePlane, deleteImgZonePlane,

    setZoneImageCoordinate, getZoneDevicesLists, uploadImgZonePlane } = useSelector(state => state.EmployeeZonesSlice)

  console.log(getListZoneMap)




  const handleChange = (event) => {
    setViewPlane(event.target.value);
  };

  // get the position on x and y on drop 
  const printCoordinate = (e) => {
    const { width, height } = e.target.getBoundingClientRect();
    const { offsetX, offsetY } = e.nativeEvent

    setX(Math.round((offsetX / width) * 100));
    setY(Math.round((offsetY / height) * 100));
    // console.log("print coordinate", x, y);
  }

  //drop the device to the zone plane
  const [{ isOver }, drop] = useDrop({
    accept: 'image',
    drop: (item, monitor) => {
      addDeviceToImage(item?.id)
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });
  // put device on image
  const addDeviceToImage = (id) => {

    // console.log(id)

    const data = {
      deviceId: id,
      axisPositionX: y,
      axisPositionY: x,
      zonePlaneId: selectedZone?.id

    }
    // console.log("set coordinate", data)
    dispatch(SetZoneImageCoordinate({ data }))


  }
  // get list of zone map
  useEffect(() => {
    const data = {
      zoneId: localStorage?.getItem('singlezoneId')
    }
    console.log(data)
    dispatch(GetListZoneMap(data))
  }, [createZonePlane, deleteImgZonePlane, uploadImgZonePlane, viewPlane])

  // get the selected zone map
  useEffect(() => {

    const checked = getListZoneMap?.filter(item => item.id === viewPlane)
    // console.log(checked)
    setSelectedZone(checked[0])

  }, [selectedZone, viewPlane, getListZoneMap,deleteImgZonePlane])


  useEffect(() => {

    const filtered = getZoneDevicesLists?.filter(item => item.axisPositionX || item?.axisPositionY > 0)
    // console.log(filtered)
    const checkDeviceImg = filtered?.map(item => ({ top: item.axisPositionX, left: item.axisPositionY, ...item }))
    // console.log(checkDeviceImg)
    setImageMarkers(checkDeviceImg)
  }, [selectedZone, getZoneDevicesLists, viewPlane,deleteImgZonePlane])

  //get all device zone
  useEffect(() => {
    const data = {
      zonePlaneId: selectedZone?.id
    }
    dispatch(GetZoneDevicesLists(data))
  }, [selectedZone?.id, setZoneImageCoordinate])
  // get detail zone father and child
  useEffect(() => {
    dispatch(ZoneDetailFatherAndChild({ zoneId: localStorage?.getItem("singlezoneId") }))
  }, [setZoneImageCoordinate, viewPlane, selectedZone])


  console.log(viewPlane)
  console.log(defaultZone)
  // set map by default plane or map if no zone plane
  useEffect(() => {
    if (getListZoneMap?.length > 0) {
      setViewPlane(getListZoneMap[0].id)
    }
    if (getListZoneMap?.length === 0) {
      setViewPlane("map")
    }
  }, [deleteImgZonePlane])

  // useEffect(() => {
  //   getListZoneMap?.map((item) => {
  //     setViewPlane(item?.id)
  //  setDefaultZone(item?.id);
  //   })
  // }, [])


  return (
    <>
      <div className="container_fluid show_device">
        <div className="row">
          <div className="col-md-12">
            <div className="show_device_navigation" style={{ height: openNavigation ? "43px" : "" }} >
              <div className="show_device_navigation_item">
                <Link to="/dashboard/employee/zones/singlezonedetails" onClick={() => dispatch(ClearGetListZoneMap())}>
                  <i className="fa fa-arrow-left" aria-hidden="true" style={{
                    transform: lCode === "ar" ? "scaleX(-1)" : "",
                    margin: "0 10px"
                  }} ></i>
                </Link>
                <h4 onClick={() => setOpenNavigation(!openNavigation)}>{t("zone_information")}</h4>
              </div>
              <div>
                {/* <h6>{t("corporate")}</h6>
                <p><span>{zoneDetailFatherAndChild?.corporate || "-"}</span>{"-"} </p> */}
                <h6>{t("zone")}</h6>
                <p>{zoneDetailFatherAndChild?.name}</p>
              </div>
              <div >
                <FormControl sx={{ minWidth: 200, paddingBottom: "0.6rem" }} size="small" fullWidth>
                  <InputLabel id="demo-select-small">{t("view")}</InputLabel>
                  <Select size="small"
                    labelId="demo-select-small"
                    id="demo-select-small"
                    // value={viewPlane}
                    // value={!viewPlane ? defaultZone : viewPlane}
                    value={viewPlane}
                    label="View"
                    // defaultValue={defaultZone}
                    onChange={handleChange}
                  // onSelect={() => { checkedSelectedZone() }}
                  >
                    {
                      getListZoneMap?.map((item, index) => {
                        return (
                          <MenuItem key={index} value={item.id ? item.id : "map"}>{item.name}</MenuItem>
                        )
                      })
                    }
                    <MenuItem value={"map"} selected>{t("map")}</MenuItem>

                  </Select>
                </FormControl>
                {
                  viewPlane !== "map" && permission?.includes(permissionObj?.WEB_ZONE_DELETE_DEVICES) &&
                  <div >

                    <Link to="#"  className="remove_link"
                    onClick={()=>setDeletePlaneModal(true)}
                     >{t("remove_plane")?.toUpperCase()}</Link>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        {
          permission?.includes(permissionObj?.WEB_ZONE_CREATE_DEVICES) &&
          <div className="showdevice_addbtn"
          // data-toggle="modal"
          // data-target="#showdeviceModal"
          >
            <button className="custom_primary_btn_dark" onClick={() => setShowPlaneModal(true)}>
              <span>{t("add_plan")}</span>
              <img src={map_solid} alt="" />
            </button>
          </div>
        }
        {/* <div className="showdevice_addmap"
          data-toggle="modal"
          data-target="#showdevicemapModal">
          <button className="btn btn-primary">
            <span>ADD MAP</span>
            <img src={globe_asia_solid} alt="" />
          </button>
        </div> */}
        {
          permission?.includes(permissionObj?.WEB_ZONE_UPDATE_DEVICES) && viewPlane != "map" &&
          <div
            className="showdevice_list"
            data-toggle="modal"
            data-target="#showdevice_listModal">
            <button className="custom_primary_btn_dark" onClick={() => { setIsDeviceList(true) }}>
              <img src={ic_info} alt="" />
            </button>
          </div>
        }
        {/* image show  */}
        <div className="Image_container_zone" >
          {
            viewPlane === "map" ?
              <div >
                <ZoneMapSelect
                  latlng={[zoneDetailFatherAndChild?.latitud ||
                    localStorage.getItem("currentZoneLat")
                    , zoneDetailFatherAndChild?.longitud ||
                  localStorage.getItem("currentZoneLng")
                  ]}
                  className="zone_map"
                />
                {/* <div >
                  <iframe width="100%" height="598px" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0" src="https://maps.google.com/maps?width=100&amp;height=600&amp;hl=en&amp;q=spain&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                  </iframe>
                </div> */}
              </div>
              :
              <div className="zone_plane_drag_drop_container">
                <div className="image_container" >
                  <img
                    ref={drop}
                    src={
                      selectedZone?.path === "" ||
                        selectedZone?.path === null ||
                        selectedZone?.path === undefined ? house_plane :
                        `data:${selectedZone?.path};base64,${selectedZone?.image}`
                    }
                    onDrop={(e) => {
                      printCoordinate(e)
                    }}
                    alt="ddsf" />
                  {
                    viewPlane === selectedZone?.id &&
                    <>

                      {imageMarkers?.map((item, index) => {
                        console.log("hi", item)
                        return (
                          <Popup trigger={
                            <div class="marker" style={{ top: `${item?.top}%`, left: `${item?.left}%` }}>
                              <svg width="25px" height="36px" viewBox="0 0 48 72" fill={
                                item?.deviceType?.name === "MANTRA_MFSTAB_II" && "green"
                                || item?.deviceType?.name === "PDA_CARIBE_PL50L" && "blue"
                                || item?.deviceType?.name === "TELPO_F6" && "yellow"
                                || item?.deviceType?.name === "TELPO_TPS_980" && "red"
                                || item?.deviceType?.name === "TELPO_TPS_450" && "orange"
                                || item?.deviceType?.name === "TELPO_K5" && "lightblue"
                              }
                              >
                                <path id="MyPath" d="M24,0 C11.406,0 0,10.209 0,22.806 C0,35.4 10.407,50.436 24,72 C37.593,50.436 48,35.4 48,22.806 C48,10.209 36.597,0 24,0 L24,0 Z M24,33 C19.029,33 15,28.971 15,24 C15,19.029 19.029,15 24,15 C28.971,15 33,19.029 33,24 C33,28.971 28.971,33 24,33 L24,33 Z"></path>
                                <text x="50%" y="65%" text-anchor="middle" fill="white" font-size="22px" font-family="Arial" fontWeight="bold" dy=".3em">
                                  {item?.pin}
                                </text>
                              </svg>
                            </div>
                          }
                            position="top">
                            <div className="pop_up_zone_img">
                              <h1>{item?.deviceName}</h1>
                              <p>{item?.description}</p>
                            </div>
                          </Popup>
                        )
                      })
                      }
                    </>
                  }
                </div>

                {
                  isDeviceList &&
                  <div className="zone_plane_device_list">
                    <div className="cross_container">
                      <i class="fa fa-times cross_zone_device" aria-hidden="true"
                        onClick={() => { setIsDeviceList(false) }}
                      ></i>
                    </div>
                    <h4>{t("devices")}</h4>

                    {
                      getZoneDevicesLists?.length > 0 ?
                        getZoneDevicesLists?.map((item, index) => {
                          return <DeviceListZonePlane item={item} zoneplaneId={selectedZone} index={index} />
                        })

                        :
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "1rem", alignItems: "center", flexDirection: 'column', width: '100%', gap: '1rem' }}>
                          <img src={noData} alt="" />
                          <p style={{ color: '#BC0000', fontSize: '24px', fontWeight: 'bold' }}>{t("no_devices")}</p>
                        </Box>
                    }

                  </div>
                }
              </div>
          }
        </div>
        <ShowDeviceModal
          show={showPlaneModal}
          onHide={() => setShowPlaneModal(false)}
          setProfileImage={setProfileImage}
        />
        <ShowDeviceMapModal />
        <RemovePlanModal
          id={selectedZone?.id}
          show={deletePlaneModal}
          onHide={() => setDeletePlaneModal(false)}
        />
      </div>
    </>
  )
};

export default ShowDevices;
