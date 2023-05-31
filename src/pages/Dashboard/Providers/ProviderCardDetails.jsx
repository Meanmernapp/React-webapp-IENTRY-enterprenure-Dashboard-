import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import ic_check from "../../../assets/images/ic-check.svg";
import file from "../../../assets/images/file.png";
import DownloadIcon from "@mui/icons-material/Download";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DownloadEmployeeProviderOrderFiles, GetAllProviderDocuments } from "../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import ProviderDropDown from "./SubComponents/providerDropDown";
import ApproveDenyModal from "./ProviderModels/ApproveDenyModal";
import { getBottomNavigationUtilityClass } from "@mui/material";
import { t } from "i18next";
import DocumentTable from "../../Modals/DocumentTable";


const ZoneCardDetail = ({ item,doc }) => {
  const [filePresent, setfilePresent] = useState(true);
  const [fileIdPresent, setfileIdPresent] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [docId , setDocId] = useState("")

  const dispatch = useDispatch()
  const { getAllProviderDocuments } = useSelector(state => state.EmployeeProviderSlice);
  console.log(getAllProviderDocuments);
  const { approveExternalDocument } = useSelector(state => state.EmployeeProviderSlice);
  console.log(approveExternalDocument);


  const dropDownProps = {
    panel: 'providerFileOption',
    firstItem: 'DOWNLOAD FILE',
    secondItem: 'VIEW DETAILS '
  }

  useEffect(() => {
    dispatch(GetAllProviderDocuments(localStorage.getItem("userId")))
  }, [approveExternalDocument])


  return (
    <>
      <div className="row ">
        <div className="col-md-12 ">
          {
            <>
           
              <DocumentTable 
              dataTable={item?.documents} 
              approve={ doc == "employee" && item?.user?.status?.id == 3 ? true : false ||
              doc == "vehicle" && item?.vehicle?.status?.id == 3 ? true : false} 
              documentId={setDocId} 
              docValue="valueType"
              optionDownload="document_external"/>
              <ApproveDenyModal show={showModal} onHide={() => setShowModal(false)} documentId={docId} />
            </>
          }
        </div>
      </div>
    </>
  );
};

export default ZoneCardDetail;
