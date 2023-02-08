import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TablePagination from '@mui/material/TablePagination';
import { GetIncomingEventsPageable, GetValidationEventsPageable } from '../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi';
import NoEvent from './NoEvent';
import EventDropDown from './subComponents/EventsDropDown';
import { handlePagination } from '../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'

const Validation = () => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const dispatch = useDispatch();
  const validationData = useSelector(state => state?.EmployeeEventsSlice?.validationEvents);
  // const validationData = useSelector(state => state?.EmployeeEventsSlice?.incomingEvents);
  console.log(validationData)
  let body;
  var today = new Date();
  let time_in_miliseconds = today.getTime();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dropDownProps = {
    panel: 'valication',
    firstItem: 'DOWNLOAD FILE',
    secondItem: 'VIEW DETAILS',
    thirdItem: 'CANCEL EVENT',
    fourthItem: 'APPROVE EVENT',
  }

  useEffect(() => {
    var today = new Date();
    let time_in_miliseconds = today.getTime();

    const body = {
      date: time_in_miliseconds,
      pagination: {
        order: true,
        page: page,
        size: rowsPerPage,
        sortBy: "id"
      }
    }
    dispatch(GetValidationEventsPageable(body));
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    // console.log(newPage)
    dispatch(handlePagination({
      name: "page",
      value: newPage
    }));
    body = {
      date: time_in_miliseconds,
      pagination: {
        order: true,
        page: newPage,
        size: rowsPerPage,
        sortBy: "id"
      }
    }
    dispatch(GetValidationEventsPageable(body));
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
        order: true,
        page: page,
        size: parseInt(event.target.value),
        sortBy: "id"
      }
    }
    dispatch(GetValidationEventsPageable(body));
  };


  return (
    <>
      {
        validationData?.content?.length !== 0 ?
          <>
            <div className="eventTables" >
              <table style={{ width: "100%" }}>
                <thead>
                  <th className='first-head'>{t('name')}</th>
                  <th>{t('zone')}</th>
                  <th>{t('host')}</th>
                  <th>{t('date')}</th>
                  <th className='last'>{t('option')}</th>
                </thead>
                {
                  validationData?.content?.map(item => (
                    <tr key={item.id}>
                      <td className='first'>{item?.name}</td>
                      <td>{item?.reservation?.zone?.name}</td>
                      <td>{item?.host?.name}</td>
                      <td>
                        {new Date(item?.createdAt).toJSON().split("T")[0]}<br />
                        {new Date(item?.createdAt).toJSON().split("T")[1].split(".")[0]}
                      </td>
                      <td className='last'>
                        <EventDropDown dropDownProps={dropDownProps} event={item} />
                      </td>
                    </tr>
                  ))
                }
              </table>
            </div>
            <div className='d-flex justify-content-center align-items-center px-3 pt-3'>
              {/* <p>{`Total ${validationData?.totalElements} of ${validationData?.numberOfElements}`}</p> */}
              <TablePagination
                component="div"
                rowsPerPageOptions={[10, 20, 30]}
                count={validationData?.totalElements}
                page={page}
                onPageChange={handleChangePage}
                labelRowsPerPage={t('events_per_page')}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div></>
          :
          <NoEvent title={t('validations_events')} />
      }
    </>
  )
}

export default Validation