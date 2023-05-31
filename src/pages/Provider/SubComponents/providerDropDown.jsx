import React from "react";
import threedotsicon from "../../../assets/images/elipse.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import pencil from "../../../assets/images/ic-pencil.png";
import del from "../../../assets/images/ic-delete.png";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';


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

const ProviderDropDown = ({ contractor }) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} />
      <Dropdown.Menu size="sm" title="go to details">
        <Link to='/dashboard/supplier/supplier-order-detail'
        // to={contractor ? '/dashboard/contractors-outlet/contractor-approve-document' : '/dashboard/supplier-order-detail'}
        >
          <div className="dropdownDiv">
            <img src={pencil} alt="pencil" />
            <span>{t("employee_contract_detail")}</span>
          </div>
        </Link>
        <Link to={contractor ? '/dashboard/employee/contractors/update-contractor' : '/dashboard/employee/suppliers/update-suppliers'}>
          <div className="dropdownDiv">
            <img src={pencil} alt="pencil" />

            <span>{t("update_data")}</span>
          </div>
        </Link>
        <Link to="/dashboard/document-panel">
          <div className="dropdownDiv">
            <img src={del} alt="delete" />
            <span>{t("delete_contractor")}</span>
          </div>
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProviderDropDown;
