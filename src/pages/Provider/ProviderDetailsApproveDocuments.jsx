import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import personPng from "../../assets/defaultImages/userDef.svg";
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import DocumentStatusThree from "../../components/DocumentStatusThree";
import { CreateSupplierDocValue, DownloadProviderImage, GetProviderEmployeeDetail, GetSingleProvider, SetSupplierDocValue } from "../../reduxToolkit/Providers/providersApi";
import UnlinkDeviceChangeModal from "./Modal/UnlinkDeviceChangeModal";
import DeleteModal from "../Modals/DeleteModal";
import genderId from "../../hooks/genderId";


const ProviderOrderDetail = ({ approveDocument }) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  // use State
  const dispatch = useDispatch();
  const [selectDocumentsForDelete, setSelectDocumentsForDelete] = useState([])
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [deleteDocShow, setDeleteDocShow] = useState(false)
  const [unlinkShow, setUnlinkShow] = useState(false)
  // use Selector
  const { getProviderEmployeeDetail } = useSelector(state => state?.providersSlice)
  const { setSupplierDocValue, createSupplierDocValue } = useSelector(state => state?.providersSlice)

  const { saveProviderImage, imageChangeCheck } = useSelector(state => state.providersSlice)

  useEffect(() => {
    dispatch(GetProviderEmployeeDetail(localStorage.getItem("provideridfordetail")))
  }, [setSupplierDocValue, createSupplierDocValue, saveProviderImage, imageChangeCheck])


  return (
    <>
      {/* head with back link */}
      <div className='head'>
        <div className='headLeft'>
          <Link to="/dashboard/supplier/employees">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              margin: "0 10px"
            }}

            ></i>
          </Link>
          <h2>
            {t('employee_details')}
          </h2>
        </div>
        <div className="container-top-right-btns">
          {
            !approveDocument &&
            <button className="unlink-btn-1"
              onClick={() => setUnlinkShow(true)}
            >
              <i class="fa fa-mobile" aria-hidden="true"></i>
              {t("unlink_device")}
            </button>
          }


          <Link to="/dashboard/supplier/update-employee">
            <button className="add-btn-1"
              onClick={() => { dispatch(GetSingleProvider(getProviderEmployeeDetail?.user?.id)) }}
            >
              <i class="fa fa-floppy-o" aria-hidden="true"></i>
              {t("update")}
            </button>

          </Link>
          {
            approveDocument &&
            <button className="delete-btn-1"


              onClick={() => {
                // setDeleteDocShow(true)
              }}

            >
              <i class="fa fa-trash-o" aria-hidden="true"></i>
              {t('delete')}
            </button>
          }
        </div>
      </div>
      <div className="row employee_provider_detail_flow"
        style={{ gap: lCode === "ar" ? "1rem" : "" }}
      >


        <div className="col-md-3 __userData ">
          <img src={
            getProviderEmployeeDetail?.user?.selfie ? `data:image/png;base64,${getProviderEmployeeDetail?.user?.selfie}`
              : personPng} className="__userImage"

          />
          <div className="__body">
            <p>{t("name")}</p>
            <span>

              {
                getProviderEmployeeDetail?.user?.name ?
                  getProviderEmployeeDetail?.user?.name
                  + " " +
                  (getProviderEmployeeDetail?.user?.secondLastName != null ? getProviderEmployeeDetail?.user?.secondLastName : " ") + " " +
                  getProviderEmployeeDetail?.user.lastName
                  : "-"
              }
            </span>
            <p className="ishead">{t("email")}</p>
            <span>{getProviderEmployeeDetail?.user?.email}</span>
            <p className="ishead">{t("phone_number")}</p>
            <span>{getProviderEmployeeDetail?.user?.phoneNumber}</span>

            <p className="ishead">{t("gender")}</p>
            <span>{getProviderEmployeeDetail?.user?.genderId ? genderId(getProviderEmployeeDetail?.user?.genderId) : "-----"}</span>
          </div>
        </div>
        <div className="col-md-8  documents_status_item">

          <div className="document_header">

            <p className="document_title">{t("documents")}</p>
            {
              approveDocument &&
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
            dataTable={getProviderEmployeeDetail?.documents}
            approve={approveDocument}
            setDocValue={SetSupplierDocValue}
            createDocValue={CreateSupplierDocValue}
            downloadImg={DownloadProviderImage}
            optionDownload={"supplier_document"}
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

export default ProviderOrderDetail;
