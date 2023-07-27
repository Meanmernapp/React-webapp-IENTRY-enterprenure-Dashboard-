import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetIncomingEventsPageable } from '../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi';
import { GetAllPageableProvider } from '../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi';
import TablePagination from '@mui/material/TablePagination';
import ProviderDropDown from "./SubComponents/providerDropDown";
import { t } from 'i18next';
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';
import threedotsicon from "../../../assets/images/elipse.png";
import DropDownMenuProfile from '../../../components/DropDownMenuProfile';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useNavigate } from 'react-router-dom';
import { status } from '../../../enums/statusEnum';
import { Checkbox, Tooltip } from '@mui/material';


const ProviderTable = ({ toggleState, getAllPageableProvider, selectSupplierForDelete, isAllChecked, handelDeleteAll, handleCheckboxChange, searchByFilters, handleChangePage, handleChangeRowsPerPage, page, rowsPerPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [pagePagination, setPagePagination] = useState(0);
  const [rowsPerPageProvider, setRowsPerProvider] = useState(20);

  const handleChangePageProvider = (event, newPage) => {
    setPagePagination(newPage);
  };

  const handleChangeRowsPerPageProvider = event => {
    setRowsPerProvider(parseInt(event.target.value));
    setPagePagination(0);
  };

  const [showDropDown, setShowDropDown] = useState(false);
  const handleButtonClick = () => {
    setShowDropDown(true);
  };

  const handelDetailOrApprove = (id, statusUser, userId) => {
    if (statusUser <= 3) {
      navigate(`/dashboard/employee/suppliers/approve-documents/${id}`)
    } else {

      navigate(`/dashboard/employee/suppliers/suppliers_deatail_page/${id}`)
    }

  }
  const handelUpdate = (id) => {

    navigate(`/dashboard/employee/suppliers/update-suppliers/${id}`)

  }

  useEffect(() => {


    const body = {

      pagination: {
        "order": true,
        "page": pagePagination,
        "size": rowsPerPageProvider,
        "sortBy": "id"
      }
    }
    dispatch(GetAllPageableProvider(body));
  }, [pagePagination, rowsPerPageProvider])

  return (
    <>
      {
        searchByFilters?.content?.length > 0 ?
          <div className="panelTables px-1">
            <table style={{ width: "100%" }}>
              <thead>
                <th className='first_head'>
                  <Tooltip title={t("de_/_select_all").toUpperCase()} placement="top">
                    <Checkbox
                      className="grid-checkall checkbox"
                      checked={isAllChecked}
                      onChange={handelDeleteAll}
                      size="small"
                    />
                  </Tooltip>
                  {/* <input type="checkbox" className="checkbox"
                    checked={isAllChecked}
                    onChange={handelDeleteAll}
                  /> */}
                </th>
                <th className='first_head'>{t("company_name")}</th>
                <th>{t("name")}</th>
                <th>{t("last_name")}</th>
                <th>{t("second_last_name")}</th>
                <th>{t("status")}</th>
                <th>{t("email")}</th>
                <th>{t("employee_phone_number")}</th>
                <th>{t("supplier_status")}</th>
                <th className='last'>{t("options")}</th>
              </thead>
              {
                searchByFilters?.content?.map((item, index) => (
                  <tr key={index}>
                    <td className='first'>
                      <Checkbox
                        className="grid-checkall checkbox"
                        checked={selectSupplierForDelete?.includes(item?.id)}
                        id={item?.id}
                        onChange={handleCheckboxChange}
                        size="small"
                      />
                      {/* <input type="checkbox" className="checkbox"
                        checked={selectSupplierForDelete?.includes(item?.id)}
                        id={item?.id}
                        onChange={handleCheckboxChange}
                      /> */}
                    </td>
                    <td className='first'>{item?.acronym + " | "}
                      <span style={{ fontWeight: 'normal' }}>{item?.supplierCompanyName}</span>

                    </td>
                    <td>{item?.name} </td>
                    <td>{item?.lastName || '-'} </td>
                    <td>{item?.secondLastName || '-'} </td>
                    <td>
                      <span className={"viewcard-container__status " + " " + status[item?.statusId]}>
                        {t(status[item?.statusId])}</span></td>
                    <td>{item?.email}</td>
                    <td>{item?.phoneNumber}</td>
                    <td>
                      <span className={"viewcard-container__status " + " " + status[item?.contractorStatusId]}>
                        {t(status[item?.supplierStatusId])}</span></td>
                    <td className='tableIcon'>
                      <DropDownMenuProfile

                        menuList={[
                          {
                            name: item?.statusId <= 3 ? t("approve_document") : t("show_details"),
                            icon: item?.statusId <= 3 ? <InsertDriveFileIcon fontSize="small" /> : <TextSnippetIcon fontSize="small" />, onClick: () => handelDetailOrApprove(item?.id, item?.statusId, item?.userId)
                          },
                          { name: t("update_supplier"), icon: <ModeEditOutlinedIcon fontSize="small" />, onClick: () => handelUpdate(item?.id) },
                        ]}

                      />
                      {/* <button className='btn-option' onClick={handleButtonClick}> */}
                      {/* <ProviderDropDown dropDownProps={dropDownProps} userId={item?.user?.id} pid={item?.id} statusTo={item?.user?.status?.id} /> */}
                      {/* <img
                            src={threedotsicon}
                            className="img-fluid providerThreeDots"
                            alt="threedotsicon"
                          /> */}
                      {/* <ProviderDropDown dropDownProps={dropDownProps} userId={item?.user?.id} pid={item?.id} statusTo={item?.user?.status?.id} />  */}
                      {/* </button> */}
                      {/* <ProviderDropDown dropDownProps={dropDownProps} userId={item?.user?.id} pid={item?.id} statusTo={item?.user?.status?.id} /> */}
                      {/* {showDropDown && <ProviderDropDown dropDownProps={dropDownProps} userId={item?.user?.id} pid={item?.id} statusTo={item?.user?.status?.id} />} */}
                    </td>
                    {/* <td className='last'>
                      <ProviderDropDown dropDownProps={dropDownProps} userId={item?.user?.id} pid={item?.id} statusTo={item?.user?.status?.id} />
                    </td> */}
                  </tr>
                ))
              }
            </table>
          </div> :

          <NotFoundDataWarning text={"No Supplier Data"} />
      }
      {searchByFilters?.content?.length > 0 &&
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={[20, 40, 60]}
            count={searchByFilters?.totalElements}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage={t("suppliers_per_page")}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      }

    </>
  )
}

export default ProviderTable