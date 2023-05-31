import React from "react";
import threedotsicon from "../../../../assets/images/elipse.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import pencil from "../../../../assets/images/ic-pencil.png";
import del from "../../../../assets/images/ic-delete.png";
import listIcon from "../../../../assets/images/viewDetails.png"
import fileIcon from "../../../../assets/images/saveFile.png"

import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { ApproveExternalDocument, GetAllCompanybyProviderId, GetAllProviderDocuments, GetEmployeeProviderById, GetStatusListProvider } from "../../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import { t } from "i18next";
import { GetEmployeeContractorById } from "../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {

  return (
    <button
    className="btn-option"
    ref={ref}
    onClick={(e) => {
      // e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <img
      src={threedotsicon}
      className="img-fluid providerThreeDots"
      alt="threedotsicon"
    />
  </button>
  );
});

const ContractorOptionMenu = ({ dropDownProps, userId, cid, statusTo, onShow, documentId, data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(dropDownProps)

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} />
      {dropDownProps?.panel == 'provider' &&
        <Dropdown.Menu size="sm" title="go to details" className="dropdown_menu">

          {
            statusTo == 3 &&
            <Link to={'/dashboard/employee/contractors/contractor-approve-document'} onClick={() => {
              const data = {
                id: cid
              }
              dispatch(GetAllProviderDocuments(userId));
              dispatch(GetEmployeeContractorById(data))
              localStorage.setItem("cid", cid)
              localStorage.setItem("userId", userId)


            }}>
              <div className="dropdownDiv">
                {/* <img src={pencil} alt="pencil" /> */}
                <i class="fa fa-file" aria-hidden="true"></i>
                <span>{t("approve_document")}</span>
              </div>
            </Link>
          }


          <Link to="/dashboard/employee/contractors/update-contractor" state={{ state: data }}>
            <div className="dropdownDiv">
              <img src={pencil} alt="pencil" />

              <span>{t("update_supplier")}</span>
            </div>
          </Link>

          <Link to="/dashboard/employee/contractors/contractor-detail"
            state={{ state: data }}
          >
            <div className="dropdownDiv">
              <img src={listIcon} alt="pencil" />

              <span>{t("show_details")}</span>
            </div>
          </Link>

          {/* <Link to="/dashboard/document-panel">
            <div className="dropdownDiv">
              <img src={del} alt="delete" />
              <span>DELETE CONTRACTOR</span>
            </div>
          </Link> */}
        </Dropdown.Menu>
      }
      {dropDownProps?.panel == 'providerFileOption' &&
        <Dropdown.Menu size="sm" title="go to details" className="dropdown_menu_option_file">


          <Link to={'#'} >
            <div className="dropdownOptionFile" onClick={() => {
              const data = {
                comments: "",
                id: documentId,
                validated: true
              }

              dispatch(ApproveExternalDocument(data))
            }} >
              {/* <img src={pencil} alt="pencil" /> */}
              <i class="fa fa-check" aria-hidden="true"></i>
              <span>{t("approve_document")}</span>
            </div>
          </Link>

          <Link to={'#'}>
            <div className="dropdownOptionFile" onClick={() => onShow()}>
              <i class="fa fa-times  red" aria-hidden="true"></i>
              <span>{t("no_approve_document")}</span>
            </div>
          </Link>

          {/* <Link to="/dashboard/document-panel">
            <div className="dropdownDiv">
              <img src={del} alt="delete" />
              <span>DELETE CONTRACTOR</span>
            </div>
          </Link> */}
        </Dropdown.Menu>
      }
      {dropDownProps.panel == 'contractor' &&
        <Dropdown.Menu size="sm" title="go to details">
          <Link to={'/dashboard/employee/contractors/contractor-approve-document'}>
            <div className="dropdownDiv">
              <img src={pencil} alt="pencil" />
              <span>{t("approve_document")}</span>
            </div>
          </Link>
          <Link to={'/dashboard/employee/contractors/update-contractor'}>
            <div className="dropdownDiv">
              <img src={pencil} alt="pencil" />

              <span>{t("update_Data")}</span>
            </div>
          </Link>
          <Link to="/dashboard/document-panel">
            <div className="dropdownDiv">
              <img src={del} alt="delete" />
              <span>{t("delete_contractor")}</span>
            </div>
          </Link>
        </Dropdown.Menu>
      }
      {dropDownProps.panel == 'events' &&
        <Dropdown.Menu size="sm" title="go to details">
          <div className="dropdownDiv" style={{ cursor: 'pointer' }}>
            <img src={fileIcon} alt="fileIcon" />
            <span>{dropDownProps.firstItem}</span>
          </div>
          <div className="dropdownDiv" style={{ cursor: 'pointer' }}>
            <img src={listIcon} alt="viewDetails" />
            <span onClick={() => navigate('/dashboard/employee/events/incomming-envent-detail')}>{dropDownProps.secondItem}</span>
          </div>
        </Dropdown.Menu>
      }
    </Dropdown>
  );
};

export default ContractorOptionMenu;



// bludder

// import React from "react";
// import threedotsicon from "../../../../assets/images/elipse.png";
// import Dropdown from "react-bootstrap/Dropdown";
// import { Link } from "react-router-dom";
// import pencil from "../../../../assets/images/ic-pencil.png";
// import del from "../../../../assets/images/ic-delete.png";
// import listIcon from "../../../../assets/images/viewDetails.png"
// import fileIcon from "../../../../assets/images/saveFile.png"
// import viewDetail from "../../../../assets/images/viewDetails.png"

// import { useNavigate } from 'react-router-dom';

// import { useTranslation } from 'react-i18next'
// import Cookies from "js-cookie";
// import { GetEmployeeContractorById } from "../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
// import { useDispatch } from "react-redux";
// import { GetAllProviderDocuments } from "../../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";

// const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {



//   return (
//     <div
//       className="text-center"
//       ref={ref}
//       onClick={(e) => {
//         // e.preventDefault();
//         onClick(e);
//       }}
//     >
//       {children}
//       <img
//         src={threedotsicon}
//         className="img-fluid providerThreeDots"
//         alt="threedotsicon"
//       />
//     </div>
//   );
// });

// const ContractorOptionMenu = ({ dropDownProps, data }) => {
//   const navigate = useNavigate();
//   const lCode = Cookies.get("i18next") || "en";
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   return (
//     <Dropdown>
//       <Dropdown.Toggle as={CustomToggle} />
//       <Dropdown.Menu size="sm" title="go to details"
//         style={{ height: "unset" }}>
//         {/* /dashboard/contractors-outlet/contractor-approve-document */}
//         {data?.user?.status?.id == 3 &&
//           <Link to="/dashboard/employee/contractors/contractor-approve-document">
//             <div className="dropdownDiv "
//               onClick={() => {
//                 alert("Hi")
//                 const data = {
//                   id: data?.id
//                 };
//                 dispatch(GetAllProviderDocuments(data?.user?.id));
//                 dispatch(GetEmployeeContractorById(data))
//               }}
//             >
//               <img src={fileIcon} alt="pencil" />
//               {t("approve_documents")}
//             </div>
//           </Link>}
//         <Link to="/dashboard/employee/contractors/update-contractor" state={{ state: data }}>
//           <div className="dropdownDiv ">
//             <img src={pencil} alt="pencil" />
//             <span>{t("update_data")}</span>
//           </div>
//         </Link>

//         <Link
//           to="/dashboard/employee/contractors/contractor-detail"
//           state={{ state: data }}>
//           <div className="dropdownDiv ">
//             <img src={viewDetail} alt="delete" />
//             <span>{t("show_details")}</span>
//           </div>
//         </Link>
//       </Dropdown.Menu>
//     </Dropdown>
//   );
// };

// export default ContractorOptionMenu;
