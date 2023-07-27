import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TablePagination from '@mui/material/TablePagination';
import { getAllEmployeeContractors } from '../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice';
import { GetAllEmployeeContractors } from '../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi';
import { useTranslation } from 'react-i18next'
import Cookies from "js-cookie";
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import DropDownMenuProfile from '../../../components/DropDownMenuProfile';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { MODELS } from '../../../Apis/Models';
import { TABLES } from '../../../Apis/Tables';
import { status } from '../../../enums/statusEnum';
import { Checkbox, Tooltip } from '@mui/material';

const ContractorTable = ({ isAllCheckedContractor, selectContractorForDelete, deleteContractorShow,
  setSelectContractorForDelete, setIsAllCheckedContractor, searchByFilters, handleChangePage, handleChangeRowsPerPage, page, rowsPerPage }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();

  // use selector
  const fetchAllContractors = useSelector(getAllEmployeeContractors);

  // Props to the filter window
  const moduleId = `${MODELS.Employee}`;
  const option = `${TABLES.EMPLOYEES}`;

  const [pagePagination, setPagePagination] = useState(0);
  const [rowsPerPageProvider, setRowsPerProvider] = useState(20);
  const [searchContractor, setSearchContractor] = useState("");
  const [filterDialogShow, setFilterDialogShow] = useState(false)
  const [finalArray, setFinalArray] = useState([])

  const handleDetailOrApprove = (id, statusUser, userId) => {
    if (statusUser <= 3) {
      navigate(`/dashboard/employee/contractors/contractor-approve-document/${id}`)
    } else {

      navigate(`/dashboard/employee/contractors/contractor-detail/${id}`)
    }

  }
  const handleUpdate = (id) => {

    navigate(`/dashboard/employee/contractors/update-contractor/${id}`)
  }



  const handleChangePageProvider = (event, newPage) => {
    setPagePagination(newPage);
  };

  const handleChangeRowsPerPageProvider = event => {
    setRowsPerProvider(parseInt(event.target.value));
    setPagePagination(0);
  };

  // this function control select all id or unSelect all
  const handleDeleteAll = (e) => {
    setIsAllCheckedContractor(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = searchByFilters?.content?.map(item => {
        return item?.id
      })
      setSelectContractorForDelete(selectAllIds)


    } else {
      setSelectContractorForDelete([])
    }

  }
  // this function handle only specific id base on selection
  const handleCheckboxChange = (e) => {

    if (e.target.checked) {
      setSelectContractorForDelete([...selectContractorForDelete, e.target.id]);
    } else {
      setSelectContractorForDelete(selectContractorForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };
  useEffect(() => {
    const body = {
      pagination: {
        "order": true,
        "page": pagePagination,
        "size": rowsPerPageProvider,
        "sortBy": "id"
      }
    }
    /*author mazhar iqbal
     get all contractors
   */
    dispatch(GetAllEmployeeContractors(body));
  }, [pagePagination, rowsPerPageProvider])

  return (
    <>

      {

        searchByFilters?.content?.length !== 0 ?
          <div className="panelTables px-1">
            <table style={{ width: "100%" }}>
              <thead>
                <th className='first_head'>
                  <Tooltip title={t("de_/_select_all").toUpperCase()} placement="top">
                    <Checkbox
                      className="grid-checkall checkbox"
                      checked={isAllCheckedContractor}
                      onChange={handleDeleteAll}
                      size="small"
                    />
                  </Tooltip>
                  {/* <input type="checkbox" className="checkbox"
                    checked={isAllCheckedContractor}
                    onChange={handleDeleteAll}
                  /> */}
                </th>
                <th className='first_head'>{t("company_name")}</th>
                <th>{t("name")}</th>
                <th>{t("last_name")}</th>
                <th>{t("second_last_name")}</th>
                <th>{t("status")}</th>
                <th>{t("email")}</th>
                <th>{t("employee_phone_number")}</th>
                <th>{t("contractor_status")}</th>
                <th className='last'>{t("options")}</th>
              </thead>
              <tbody>
                {
                  searchByFilters?.content?.filter((user) => {
                    if (searchContractor === "") {
                      return user?.contractorCompanyName;
                    } else if (
                      user?.contractorCompanyName
                        ?.toLowerCase()
                        .includes(searchContractor?.toLowerCase())
                    ) {
                      return user;
                    }
                  })?.map((item, index) => (
                    <tr key={index}>
                      <td className='first'>
                        <Checkbox
                          className="grid-checkall checkbox"
                          checked={selectContractorForDelete?.includes(item?.id)}
                          id={item?.id}
                          onChange={handleCheckboxChange}
                          size="small"
                        />
                        {/* <input type="checkbox" className="checkbox"
                          checked={selectContractorForDelete?.includes(item?.id)}
                          id={item?.id}
                          onChange={handleCheckboxChange}
                        /> */}
                      </td>
                      <td className='first'>
                        <div className="text-left">{" "}
                          <span style={{ textTransform: "none" }}>{item?.acronym} |</span><span className='font-weight-normal' style={{ textTransform: "none" }}>

                            {' ' + item?.contractorCompanyName}</span></div></td>
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
                          {t(status[item?.contractorStatusId])}</span></td>
                      <td className='tableIcon'  >
                        <DropDownMenuProfile

                          menuList={[
                            {
                              name: item?.statusId <= 3 ? t("approve_document") : t("show_details"),
                              icon: item?.statusId <= 3 ? <InsertDriveFileIcon fontSize="small" /> : <TextSnippetIcon fontSize="small" />, onClick: () => handleDetailOrApprove(item?.id, item?.statusId, item?.userId)
                            },
                            { name: t("update_contractor"), icon: < ModeEditOutlinedIcon fontSize="small" />, onClick: () => handleUpdate(item?.id) },
                          ]}

                        />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div> :
          (

            <NotFoundDataWarning text={"NO CONTRACTORS"} />
          )}

      <div className="d-flex justify-content-center">
        <TablePagination
          component="div"
          rowsPerPageOptions={[20, 40, 60]}
          count={searchByFilters?.totalElements}
          page={page}
          onPageChange={handleChangePage}
          labelRowsPerPage={t("contractors_per_page")}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

    </>
  )
}

export default ContractorTable