import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TablePagination from '@mui/material/TablePagination';
import emptyList from "../../../assets/images/warning.svg";
import { getAllEmployeeContractors } from '../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice';
import { GetAllEmployeeContractors } from '../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi';
import ContractorOptionMenu from './SubComponents/ContractorOptionMenu';
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from 'react-i18next'
import threedotsicon from "../../../assets/images/elipse.png";

import Cookies from "js-cookie";
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';

const ContractorTable = ({ isAllCheckedContractor, selectContractorForDelete, deleteContractorShow,
  setSelectContractorForDelete, setIsAllCheckedContractor }) => {
  const dispatch = useDispatch();

  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();

  const fetchAllContractors = useSelector(getAllEmployeeContractors);

  const [pagePagination, setPagePagination] = useState(0);
  const [rowsPerPageProvider, setRowsPerProvider] = useState(10);
  const [searchContractor, setSearchContractor] = useState("");

  const handleChangePageProvider = (event, newPage) => {
    setPagePagination(newPage);
  };

  const handleChangeRowsPerPageProvider = event => {
    setRowsPerProvider(parseInt(event.target.value));
    setPagePagination(0);
  };

  const dropDownProps = {
    panel: 'provider',
    firstItem: 'DOWNLOAD FILE',
    secondItem: 'VIEW DETAILS '
  }

  // this function control select all id or unSelect all
  const handelDeleteAll = (e) => {
    setIsAllCheckedContractor(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = fetchAllContractors?.content?.map(item => {
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
      <div className="contractor-detail-page-sec">
        <input
          type="text"

          className="contractor-detail-page-search"
          value={searchContractor}
          onChange={(e) => {
            setSearchContractor(e.target.value);
          }}
        />
        <SearchIcon className="contractor-detail-page-search__icon" />
      </div>
      {
        fetchAllContractors?.content?.length !== 0 ?
          <div className="panelTables px-1">
            <table style={{ width: "100%" }}>
              <thead>
                <th className='first_head'>
                  <input type="checkbox" className="checkbox"
                    checked={isAllCheckedContractor}
                    onChange={handelDeleteAll}
                  />
                </th>
                <th className='first_head'>{t("company_name")}</th>
                <th>{t("manager")}</th>
                <th>{t("status")}</th>
                <th>{t("email")}</th>
                <th>NUMBER</th>
                <th className='last'>{t("options")}</th>
              </thead>
              <tbody>
                {
                  fetchAllContractors?.content?.filter((user) => {
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
                        <input type="checkbox" className="checkbox"
                          checked={selectContractorForDelete?.includes(item?.id)}
                          id={item?.id}
                          onChange={handleCheckboxChange}
                        />
                      </td>
                      <td className='first'>{item?.contractorCompanyName}</td>
                      <td>{item?.user?.name} </td>
                      <td style={{
                        fontWeight: "bold",
                        fontSize: 14,
                        color: item?.user?.status?.id == 4 && "#0C4523" ||
                          item?.user?.status?.id === 3 && "#F2A100" ||
                          item?.user?.status?.id == 25 && "gray" ||
                          item?.user?.status?.id == 29 && "blue" ||
                          item?.user?.status?.id == 2 && "red"


                      }}>{item?.user?.status?.name.replaceAll('_', ' ')}</td>
                      <td>{item?.user?.email}</td>
                      <td>{item?.user?.phoneNumber}</td>
                      <td className='tableIcon'>
                        <ContractorOptionMenu dropDownProps={dropDownProps} userId={item?.user?.id} cid={item?.id} statusTo={item?.user?.status?.id} data={item} />
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
          rowsPerPageOptions={[10, 20, 30]}
          count={fetchAllContractors?.totalElements}
          page={pagePagination}
          onPageChange={handleChangePageProvider}
          labelRowsPerPage="Contractors per page"
          rowsPerPage={rowsPerPageProvider}
          onRowsPerPageChange={handleChangeRowsPerPageProvider}
        />
      </div>

    </>
  )
}

export default ContractorTable