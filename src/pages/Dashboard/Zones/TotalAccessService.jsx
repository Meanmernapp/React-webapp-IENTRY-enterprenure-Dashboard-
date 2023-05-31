import React, { useEffect, useState, useRef } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { permissionObj } from "../../../Helpers/permission";
import AddDeviceModal from "./Modal/AddDeviceModal";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import Tooltip from '@mui/material/Tooltip';
import mobile_app from '../../../assets/images/mobile_app_image.png'
import fixed_app from '../../../assets/images/fixed_app_image.png'
import entry_ic from '../../../assets/images/arrow-up-solid-image.png'
import exit_ic from '../../../assets/images/arrow-down-solid-image.png'
import both_ic from '../../../assets/images/ic-both-entries-image.png'
import DeviceLogModal from "../Devices/Modals/DeviceLogModal";
import ic_list_detail from '../../../assets/images/ic-list-detail_grey.svg'
import { TABLES } from "../../../Apis/Tables";
import RemoveModal from "../../Modals/RemoveModal";

/*
Author : Arman Ali
Module: Zone
github: https://github.com/Arman-Arzoo
*/


const TotalAccessService = (props) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const navigate = useNavigate()

  //use Selector hook to get state for redux store
  const { permission } = useSelector(state => state.authenticatioauthennSlice);

  const [modalShow, setModalShow] = useState(false);



  // destructure from prop
  const { item, freeadded, devicedeleted } = props;

  const [added, setadded] = useState(false);
  const [selectDeviceForDelete, setSelectDeviceForDelete] = useState([])
  const [deleteDeviceShow, setDeleteDeviceShow] = useState(false)
  const [deletedFlag, setDeletedFlag] = useState(false)
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [showDeleteDeviceModal, setShowDeleteDeviceModal] = useState(false)
  const [showLogModal, setShowLogModal] = useState(false)
  const [logDevice, setLogDevice] = useState()
  const [logFlag, setLogFlag] = useState(false)

  const title_modal = `delete_devices`;
  const element_modal = `device_s`;
  // const delete_table = `device`;
  const delete_table = `${TABLES.DEVICES}`;
  const title_modal_remove = `remove_devices`;

  // This section is for reload the device list when a device is added
  useEffect(() => {
    setadded(false)
    props.onfreeadded()
  }, [added])

  // This section is for reload the device list when a device is deleted
  useEffect(() => {
    setDeletedFlag(false)
    props.ondevicedeleted()
    setSelectDeviceForDelete([])
  }, [deletedFlag])

  // this function control select all id or unSelect all
  const handelDeleteAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = item?.devices?.map(item => {
        return item?.id
      })
      setSelectDeviceForDelete(selectAllIds)
    } else {
      setSelectDeviceForDelete([])
    }

  }
  // this function handle only specific id base on selection
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setSelectDeviceForDelete([...selectDeviceForDelete, e.target.id]);
    } else {
      setSelectDeviceForDelete(selectDeviceForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };

  //To unckeck all the checkboxes
  const resetAllCheckboxes = () => {
    const checkboxes = document.querySelectorAll(".checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  //Uncheck all the checkboxes when a device is added o removed
  useEffect(() => {
    resetAllCheckboxes();
    setSelectDeviceForDelete([]);
    setIsAllChecked(false);
  }, [added, deletedFlag]);

  // funtion to calculate total device
  const CalculateTotalDevice = (item) => {
    const totalDevice = item?.accessDeviceProjection?.noMantra +
      item?.accessDeviceProjection?.noPda +
      item?.accessDeviceProjection?.noTelpo450 +
      item?.accessDeviceProjection?.noTelpo980 +
      item?.accessDeviceProjection?.noTelpoF6 +
      item?.accessDeviceProjection?.noTelpoK5 +
      item?.accessDeviceProjection?.noTelpoF10

    return totalDevice
  }
  // return main page 
  return (
    <>
      <div className="buildingdetail_access_d">
        <Table
          style={{
            border: "hidden",
          }}
        >
          <thead style={{ border: "hidden" }}>
            <tr>
              <th style={{ display: 'flex', border: 'none', gap: "50px", alignItems: 'center', padding: "10px 0" }}>
                <h1>{t("total_acces_devices")}</h1>
                {
                  permission?.includes(permissionObj?.WEB_ZONE_CREATE_DEVICES) &&
                  <span className="device_button"
                    onClick={() => { setModalShow(true) }}
                  >
                    {t("add_device")} +
                  </span>
                }
              </th>
              <th style={{ padding: "10px 0" }}>
                <p>
                  {CalculateTotalDevice(item)}<span> {t("devices")}</span>
                </p>
              </th>
            </tr>
          </thead>
          <tbody className="tbody_access-device">
            <tr
              style={{
                border: "hidden",
                color: "#707070",
                fontSize: "12px",
                fontWeight: "600"
              }}
            >
              <td>{t("Mantra")}</td>
              <td className="text-center ">{item.accessDeviceProjection?.noMantra}</td>
            </tr>
            <tr
              style={{
                border: "hidden",
                color: "#707070",
                fontSize: "12px",
                fontWeight: "600"
              }}
            >
              <td>{t("Pda")}</td>
              <td className="text-center">{item.accessDeviceProjection?.noPda}</td>
            </tr>
            <tr
              style={{
                border: "hidden",
                color: "#707070",
                fontSize: "12px",
                fontWeight: "600"
              }}
            >
              <td>{t("Telpo450")}</td>
              <td className="text-center">{item.accessDeviceProjection?.noTelpo450}</td>
            </tr>
            <tr
              style={{
                border: "hidden",
                color: "#707070",
                fontSize: "12px",
                fontWeight: "600"
              }}
            >
              <td>{t("Telpo980")}</td>
              <td className="text-center">{item.accessDeviceProjection?.noTelpo980}</td>
            </tr>
            <tr
              style={{
                border: "hidden",
                color: "#707070",
                fontSize: "12px",
                fontWeight: "600"
              }}
            >
              <td>{t("TelpoF6")}</td>
              <td className="text-center">{item.accessDeviceProjection?.noTelpoF6}</td>
            </tr>
            <tr
              style={{
                border: "hidden",
                color: "#707070",
                fontSize: "12px",
                fontWeight: "600"
              }}
            >
              <td>{t("TelpoK5")}</td>
              <td className="text-center">{item.accessDeviceProjection?.noTelpoK5}</td>
            </tr>
            <tr
              style={{
                border: "hidden",
                color: "#707070",
                fontSize: "12px",
                fontWeight: "600"
              }}
            >
              <td>{t("TelpoF10")}</td>
              <td className="text-center">{item.accessDeviceProjection?.noTelpoF10}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      {
        item?.devices?.length > 0 &&
        <div className="container-top-right-btns mb-1">
          {
            permission?.includes(permissionObj?.WEB_ZONE_DELETE_DEVICES) &&
            <button className="delete-btn-1 mr-3"
              disabled={selectDeviceForDelete?.length === 0}
              onClick={() => {
                setDeleteDeviceShow(true)
                setDeletedFlag(false)
              }}
            >
              <i class="fa fa-trash-o" aria-hidden="true"></i>
              {t('remove')}
            </button>
          }
        </div>
      }
      <div className="col-12 panelTables animated-div px-1" style={{ overflow: 'none', height: 'auto' }}>
        {
          item?.devices?.length > 0 &&
          <table style={{ width: "100%" }}>
            <thead>
              {
                permission?.includes(permissionObj?.WEB_ZONE_DELETE_DEVICES) &&
                <th className='first_head'>
                  <input type="checkbox" className="checkbox"
                    checked={isAllChecked}
                    onChange={handelDeleteAll}
                  />
                </th>
              }
              <th className='first_head'>{t("name")}</th>
              <th>{t("ip")}</th>
              <th>{t("mac")}</th>
              <th>{t("s/n")}</th>
              <th dangerouslySetInnerHTML={{ __html: t('device_type_table') }} />
              <th dangerouslySetInnerHTML={{ __html: t('access_type_table') }} />
              <th>{t("status")}</th>
              {
                permission?.includes(permissionObj?.WEB_ZONE_UPDATE_DEVICES) &&
                <th className='last'>{t("update")}</th>
              }
              <th className='last'>{t("log")}</th>
            </thead>
            {
              item?.devices?.length > 0 &&
              item?.devices?.map(item => {
                if (item?.deleted === false) {
                  return (
                    <tr key={item?.id}>
                      {
                        permission?.includes(permissionObj?.WEB_ZONE_DELETE_DEVICES) &&
                        <td className='first'>
                          <input type="checkbox" className="checkbox"
                            checked={selectDeviceForDelete?.includes(item?.id)}
                            id={item?.id}
                            onChange={handleCheckboxChange}
                          />
                        </td>
                      }
                      <td className='first'>{item?.name}</td>
                      <td>{item?.ip}</td>
                      <td>{item?.mac}</td>
                      <td>{item?.serialNumber}</td>
                      <td className={"img_device_table"}
                        style={{ padding: "0.5rem 0" }}
                      >
                        {
                          <>
                            <Tooltip title={item?.deviceType?.name} placement="right" arrow>
                              <img src={item?.deviceType?.id === 1 ? fixed_app : mobile_app
                              } alt=""
                              />
                            </Tooltip>
                          </>
                        }

                      </td>
                      <td className={"img_arrow_table"}
                      >
                        {
                          <>
                            <Tooltip title={item?.deviceAccessType?.id === 3 && t('entry_exit').toUpperCase() ||
                              item?.deviceAccessType?.id === 2 && t('exit').toUpperCase() ||
                              item?.deviceAccessType?.id === 1 && t('entry').toUpperCase()} placement="right" arrow>
                              <img src={item?.deviceAccessType?.id === 3 && both_ic ||
                                item?.deviceAccessType?.id === 2 && exit_ic ||
                                item?.deviceAccessType?.id === 1 && entry_ic

                              } alt=""
                              />
                            </Tooltip>
                          </>
                        }
                      </td>
                      <td style={{
                        fontWeight: "bold",
                        font: "normal normal bold 12px/15px Montserrat",
                        color: item?.status?.id === 11 ? "#0C4523" : "#BC0000"
                      }}>
                        {item?.status?.id === 11 ? t('active').toUpperCase() : t('inactive').toUpperCase()}</td>
                      {
                        permission?.includes(permissionObj?.WEB_ZONE_UPDATE_DEVICES) &&
                        <td className='tableIcon'>
                          <Link to={`/dashboard/employee/zones/update-device/${item?.id}`}
                            state={{ zoneNameProps: item?.name }}
                          >
                            <button className='btn-option'
                            >
                              <i className="fa fa-pencil" aria-hidden="true"
                                style={{ color: "#146F62" }}
                              ></i>
                            </button>
                          </Link>
                        </td>
                      }
                      <td className='tableIcon'>
                        <button className='btn-option'
                          onClick={() => {
                            const data = {
                              id: item?.id,
                              name: item?.name,
                            }

                            setLogDevice(data)
                            setShowLogModal(true)
                            setLogFlag(true)
                          }}>
                          <img
                            src={ic_list_detail}
                            alt="ic_list_detail"
                          />
                        </button>
                      </td>
                    </tr>
                  )
                }
              })}


          </table>
        }
      </div>
      <AddDeviceModal
        title={t("add_device")}
        check="true"
        show={modalShow}
        onHide={() => setModalShow(false)}
        item={item}
        added={added}
        onAdded={() => setadded(true)}
        flag={deletedFlag}
      />
      <DeviceLogModal
        show={showLogModal}
        onHide={() => setShowLogModal(false)}
        data={logDevice}
        flag={logFlag}
        onLog={() => setLogFlag(false)}
      />
      <RemoveModal
        show={deleteDeviceShow}
        onHide={() => setDeleteDeviceShow(false)}
        data={selectDeviceForDelete}
        title_modal={title_modal}
        element_modal={element_modal}
        flag={deletedFlag}
        onDelete={() => setDeletedFlag(true)}
        delete_table={delete_table}
      />
    </>
  );
};

export default TotalAccessService;
