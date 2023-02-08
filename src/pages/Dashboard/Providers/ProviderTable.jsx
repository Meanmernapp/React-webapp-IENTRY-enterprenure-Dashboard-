import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetIncomingEventsPageable } from '../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi';
import { GetAllPageableProvider } from '../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi';
import TablePagination from '@mui/material/TablePagination';
import ProviderDropDown from "./SubComponents/providerDropDown";
import { t } from 'i18next';
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';

const ProviderTable = (toggleState) => {
  const dispatch = useDispatch();

  const { getAllPageableProvider } = useSelector(state => state.EmployeeProviderSlice)
  console.log(getAllPageableProvider)

  const [pagePagination, setPagePagination] = useState(0);
  const [rowsPerPageProvider, setRowsPerProvider] = useState(10);

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
  // var arr = [1, 2, 3, 4, 5, 6]

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
        getAllPageableProvider?.content?.length > 0 ?
          <div className="providersTables">
            <table style={{ width: "100%" }}>
              <thead>
                <th className='first_head'>{t("company_name")}</th>
                <th>{t("manager")}</th>
                <th>{t("status")}</th>
                <th>{t("email")}</th>
                <th>{t("number")}</th>
                <th className='last'>{t("options")}</th>
              </thead>
              {
                getAllPageableProvider?.content?.map((item, index) => (
                  <tr key={index}>
                    <td className='first'>{item?.acronym + " | "}
                      <span style={{ fontWeight: 'normal' }}>{item?.providerCompanyName}</span>

                    </td>
                    <td>{item?.user?.name}</td>
                    <td
                      style={{
                        fontWeight: "bold",
                        color: item?.user?.status?.id == 4 && "#0C4523" ||
                          item?.user?.status?.id === 3 && "#F2A100" ||
                          item?.user?.status?.id == 25 && "gray" ||
                          item?.user?.status?.id == 29 && "blue" ||
                          item?.user?.status?.id == 2 && "red"


                      }}
                    >{item?.user?.status?.name.replaceAll('_', ' ')}</td>
                    <td>{item?.user?.email}</td>
                    <td>{item?.user?.phoneNumber}</td>
                    <td className='last'>
                      <ProviderDropDown dropDownProps={dropDownProps} userId={item?.user?.id} pid={item?.id} statusTo={item?.user?.status?.id} />
                    </td>
                  </tr>
                ))
              }
            </table>
          </div> :

          <NotFoundDataWarning text={"No Provider Data"} />
      }
      {getAllPageableProvider?.content?.length > 0 &&
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={[10, 15, 20, 30]}
            count={getAllPageableProvider?.totalElements}
            page={pagePagination}
            onPageChange={handleChangePageProvider}
            labelRowsPerPage={t("providers_per_page")}
            rowsPerPage={rowsPerPageProvider}
            onRowsPerPageChange={handleChangeRowsPerPageProvider}
          />
        </div>
      }

    </>
  )
}

export default ProviderTable