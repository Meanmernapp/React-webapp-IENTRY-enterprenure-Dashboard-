import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TablePagination from '@mui/material/TablePagination';
import EventDropDown from './subComponents/EventsDropDown';
import { GetRecordsEventsPageable } from '../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi';
import NoEvent from './NoEvent';
import { handlePagination } from '../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'


const Records = ({ toggleState, selectEventForDelete, isAllChecked, recordsData, handelDeleteAll, handleCheckboxChange }) => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const dispatch = useDispatch();
  let body;
  var today = new Date();
  let time_in_miliseconds = today.getTime();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dropDownProps = {
    panel: 'records',
    firstItem: 'DOWNLOAD FILE',
    secondItem: 'VIEW DETAILS',
    thirdItem: 'CANCEL EVENT',
    fourthItem: 'APPROVE EVENT',
  }

  useEffect(() => {
    body = {
      date: time_in_miliseconds,
      pagination: {
        order: true,
        page: page,
        size: rowsPerPage,
        sortBy: "id"
      }
    }
    dispatch(GetRecordsEventsPageable(body));
  }, [])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(handlePagination({
      name: "page",
      value: newPage
    }));
    body = {
      date: time_in_miliseconds,
      pagination: {
        "order": true,
        "page": newPage,
        "size": rowsPerPage,
        "sortBy": "id"
      }
    }
    dispatch(GetRecordsEventsPageable(body));
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    dispatch(handlePagination({
      name: "size",
      value: parseInt(event.target.value)
    }));
    body = {
      date: time_in_miliseconds,
      pagination: {
        "order": true,
        "page": page,
        "size": parseInt(event.target.value),
        "sortBy": "id"
      }
    }
    dispatch(GetRecordsEventsPageable(body));
  };

  return (
    <>
      {
        recordsData?.content?.length !== 0 ?
          <>
            <div className="panelTables px-1 animated-div" >
              <table style={{ width: "100%" }}>
                <thead>
                  <th className='first_head'>
                    <input type="checkbox" className="checkbox"
                      checked={isAllChecked}
                      onChange={handelDeleteAll}
                    />
                  </th>
                  <th className='first-head'>{t('name')}</th>
                  <th>{t('zone')}</th>
                  <th>{t('host')}</th>
                  <th>{t('date')}</th>
                  <th className='last'>{t('option')}</th>
                </thead>
                {
                  recordsData?.content?.map(item => (
                    <tr key={item.id}>
                      <td className='first'>
                        <input type="checkbox" className="checkbox"
                          checked={selectEventForDelete?.includes(item?.id)}
                          id={item?.id}
                          onChange={handleCheckboxChange}
                        />
                      </td>
                      <td className='first'>{item?.name}</td>
                      <td>{item?.reservation?.zone?.name}</td>
                      <td>{item?.host?.name}</td>
                      <td>
                        {new Date(item?.createdAt).toJSON().split("T")[0]}<br />
                        {new Date(item?.createdAt).toJSON().split("T")[1].split(".")[0]}
                      </td>
                      <td className='tableIcon'>
                        <EventDropDown dropDownProps={dropDownProps} event={item} />
                      </td>
                    </tr>
                  ))
                }
              </table>
            </div>
            <div className='d-flex justify-content-center align-items-center px-3 pt-3'>
              {/* <p>{`Total ${recordsData?.totalElements} of ${recordsData?.numberOfElements}`}</p> */}
              <TablePagination
                component="div"
                rowsPerPageOptions={[10, 20, 30]}
                count={recordsData?.totalElements}
                page={page}
                onPageChange={handleChangePage}
                labelRowsPerPage={t('events_per_page')}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </> :
          <NoEvent title="records Events" />
      }
    </>
  )
}

export default Records