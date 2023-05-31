import React from "react";
import threedotsicon from "../../../../assets/images/elipse.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import pencil from "../../../../assets/images/ic-pencil.png";
import del from "../../../../assets/images/ic-delete.png";
import listIcon from "../../../../assets/images/viewDetails.png"
import fileIcon from "../../../../assets/images/saveFile.png"
import { t } from "i18next";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
  return (
    <div
      className="text-center"
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
    </div>
  );
});

const ProviderDropDown = ({ contractor, dropDownProps }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} />
      <Dropdown.Menu size="sm" title="go to details" className="dropDownMenu">
        {dropDownProps.panel == 'events' &&
          <>
            <div className="dropdownDiv" style={{ cursor: 'pointer' }}>
              <img src={fileIcon} alt="fileIcon" />
              <span>{dropDownProps.firstItem}</span>
            </div>
            <div className="dropdownDiv" style={{ cursor: 'pointer' }}>
              <img src={listIcon} alt="viewDetails" />
              <span>{dropDownProps.secondItem}</span>
            </div>

          </>
        }
        {dropDownProps.panel == 'provider' || dropDownProps.panel == 'contractor' &&
          <>
            <Link to={contractor ? '/dashboard/employee/contractors/contractor-approve-document' : '/dashboard/employee/suppliers/approve-documents'}>
              <div className="dropdownDiv">
                <img src={pencil} alt="pencil" />
                <span>{t("approve_document")}</span>
              </div>
            </Link>
            <Link to={contractor ? '/dashboard/employee/contractors/update-contractor' : '/dashboard/employee/suppliers/update-suppliers'}>
              <div className="dropdownDiv">
                <img src={pencil} alt="pencil" />

                <span>{t("update_date")}</span>
              </div>
            </Link>
            <Link to="/dashboard/document-panel">
              <div className="dropdownDiv">
                <img src={del} alt="delete" />
                <span>{t("delete_contractor")}</span>
              </div>
            </Link>
          </>
        }

      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProviderDropDown;
