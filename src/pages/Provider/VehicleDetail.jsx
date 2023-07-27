import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import car from "../../assets/defaultImages/defaultCar.svg";
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import DocumentStatusThree from "../../components/DocumentStatusThree";
import { CreateSupplierDocValue, CreateToExternalVehicle, DownloadProviderImage, GetProviderVehicleDetail, GetProviderVehicleStatus, GetSingleProviderVehicle, SetSupplierDocValue, SetToExternalVehicle } from "../../reduxToolkit/Providers/providersApi";
import UnlinkDeviceChangeModal from "./Modal/UnlinkDeviceChangeModal";
import DeleteModal from "../Modals/DeleteModal";
import genderId from "../../hooks/genderId";


const VehicleDetail = ({ approveDocumentVehicle }) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  // use State
  const dispatch = useDispatch();
  const [selectDocumentsForDelete, setSelectDocumentsForDelete] = useState([])
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [deleteDocShow, setDeleteDocShow] = useState(false)
  const [unlinkShow,setUnlinkShow] = useState(false)
  // use Selector
  const { getProviderVehicleDetail,createToExternalVehicle,setToExternalVehicle,updateProviderVehicleData,saveProviderVehicleImage } = useSelector(state => state?.providersSlice)

    useEffect(() => {
        dispatch(GetProviderVehicleDetail(localStorage.getItem("vehicleidfordetail")))
    }, [updateProviderVehicleData, createToExternalVehicle, setToExternalVehicle,saveProviderVehicleImage])


    useEffect(() => {
        dispatch(GetProviderVehicleStatus())
    }, [])



  return (
    <>
      {/* head with back link */}
      <div className='head'>
        <div className='headLeft'>
          <Link to="/dashboard/supplier/vehicles">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}

            ></i>
          </Link>
          <h2>
            {getProviderVehicleDetail?.vehicle?.status?.id == 3 ? t('upload_vehicle_documents') : t('vehicle_details')}
          </h2>
        </div>
        <div className="container-top-right-btns">
          {/* {
            !approveDocumentVehicle &&
            <button className="unlink-btn-1"
            onClick={()=> setUnlinkShow(true)}
             >
              <i class="fa fa-mobile" aria-hidden="true"></i>
              {t("unlink_device")}
            </button>
          } */}


          <Link to="/dashboard/supplier/update-vehicles">
            <button className="add-btn-1"
              onClick={() => { dispatch(GetSingleProviderVehicle(getProviderVehicleDetail?.vehicle?.id)) }}
            >
              <i class="fa fa-floppy-o" aria-hidden="true"></i>
              {t("update")}
            </button>

          </Link>
          {
            approveDocumentVehicle &&
            <button className="delete-btn-1"

              // disabled={selectDocumentsForDelete?.length === 0}
              // onClick={() => {
              //   setDeleteDocShow(true)
              // }}

            >
              <i class="fa fa-trash-o" aria-hidden="true"></i>
              {t('delete')}
            </button>
          }
        </div>
      </div>
      <div className="row employee_provider_detail_flow" 
      style={{gap: lCode === "ar" ? "1rem":""}}
      >


        <div className="col-md-3 __userData ">
          <img style={{boxShadow: "0px 0px 6px #00000066"}} src={
            getProviderVehicleDetail?.vehicle?.image ? `data:image/png;base64,${getProviderVehicleDetail?.vehicle?.image}`
              : car} className="__userImage"

          />
          <div className="__body vehicle_body" >
            <div className="row">
              <div className="col-6">
              <p className="ishead">{t("brand")}</p>
            <span>{getProviderVehicleDetail?.vehicle?.brand || "-"}</span>
              </div>
              <div className="col-6">
              <p className="ishead">{t("sub_brand")}</p>
            <span>{getProviderVehicleDetail?.vehicle?.subBrand || "-"}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
              <p className="ishead">{t("color")}</p>
            <span>{getProviderVehicleDetail?.vehicle?.color || "-"}</span>
              </div>
              <div className="col-6">
              <p className="ishead">{t("model")}</p>
            <span>{getProviderVehicleDetail?.vehicle?.model || "-"}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
              <p className="ishead">{t("plates")}</p>
            <span>{getProviderVehicleDetail?.vehicle?.plate || "-"}</span>
              </div>
              <div className="col-6">
              <p className="ishead">{t("vin")}</p>
            <span>{getProviderVehicleDetail?.vehicle?.vin || "-"}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
              <p className="ishead">{t("s/n")}</p>
            <span>{getProviderVehicleDetail?.vehicle?.serialNumber || "-"}</span>
              </div>
             
            </div>
           
            
          
          </div>
        </div>
        <div className="col-md-8  documents_status_item">
          <div className="document_header">

          <p className="document_title">{t("documents")}</p>
          {
            approveDocumentVehicle &&
            <button className="delete-btn-1"

              disabled={selectDocumentsForDelete?.length === 0}
              onClick={() => {
                setDeleteDocShow(true)
              }}

            >
              <i class="fa fa-trash-o" aria-hidden="true"></i>
              {t('delete')}
            </button>
          }
          </div>

          <DocumentStatusThree
            dataTable={getProviderVehicleDetail?.documents}
            approve={approveDocumentVehicle}
            setDocValue={SetToExternalVehicle}
            createDocValue={CreateToExternalVehicle}
            downloadImg={DownloadProviderImage}
            optionDownload={"supplier_vehicle_document"}
            isAllChecked={isAllChecked}
            setIsAllChecked={setIsAllChecked}
            selectDocumentsForDelete={selectDocumentsForDelete}
            setSelectDocumentsForDelete={setSelectDocumentsForDelete}

          />
        </div>
      </div>

      <DeleteModal
        title_modal={t("delete_document")}
        data={selectDocumentsForDelete}
        show={deleteDocShow}
        onHide={() => setDeleteDocShow(false)}
        isReset={setSelectDocumentsForDelete}
        isAllReset={setIsAllChecked}
      />
      <UnlinkDeviceChangeModal
        show={unlinkShow}
        onHide={() => setUnlinkShow(false)}
      />
    </>
  );
};

export default VehicleDetail;
