/*
Author: Mazhar Iqbal
Module: Work Shift Panel      
*/

//Work Shift Panel
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import TablePagination from '@mui/material/TablePagination';
import { Accordion } from "react-bootstrap";
import WorkShiftCardDetails from "./WorkShiftCardDetails";
import { GetAllWorkShifts } from "../../../../reduxToolkit/CompanyWorkShift/CompanyWorkShiftApi";
import { AllWorkShiftTime } from "../../../../reduxToolkit/CompanyWorkShift/CompanyWorkShiftSlice";
import { GetZoneTree } from "../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';
import { Checkbox } from "@mui/material";

const WorkShiftPanelCard = ({ setRemoveUserModal, selectForDelete, handleCheckboxChange, setUpdateModal, setIsUpdate, setUpdateData }) => {

  const fetchAllWorkTime = useSelector(AllWorkShiftTime);
  const { createContract, updateWorkShiftName } = useSelector(state => state.CompanyWorkShiftSlice)
  const { deleteItemsApi } = useSelector(state => state.CommonsSlice);


  // use hook importer
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";

  //pagination
  const [pagePagination, setPagePagination] = useState(0);
  const [rowsPerPageProvider, setRowsPerProvider] = useState(8);

  const handleChangePageProvider = (event, newPage) => {
    setPagePagination(newPage);
  };

  const handleChangeRowsPerPageProvider = event => {
    setRowsPerProvider(parseInt(event.target.value));
    setPagePagination(0);
  };
  useEffect(() => {
    const pagination = {
      "order": true,
      "page": pagePagination,
      "size": rowsPerPageProvider,
      "sortBy": "id"
    }
    //get all work shifts
    dispatch(GetAllWorkShifts(pagination));
  }, [pagePagination, rowsPerPageProvider, createContract, updateWorkShiftName, deleteItemsApi])

  useEffect(() => {
    //get zone tree
    dispatch(GetZoneTree());
  }, [])

  const [eleId, setEleId] = useState("");
  const callFun = (id) => {
    setEleId(id)
  }

  return (
    <Accordion defaultActiveKey="0">
      {fetchAllWorkTime && fetchAllWorkTime?.content?.map((item, index) => {
        return (
          <Accordion.Item eventKey={index} key={index}
            onClick={() => callFun(item?.id)}
          >
            <Accordion.Header className="workshift_header" >
              <div className="main">
                <div className="d-flex gap-2 align-items-center">
                 
                  <Checkbox
                  onClick={(event) => event.stopPropagation()}
                    className="grid-checkall checkbox"
                    checked={selectForDelete?.includes(item?.id)}
                    id={item?.id}
                    onChange={handleCheckboxChange}
                    size="small"
                  />
                  <div className="title_name">
                    {item?.name ? item?.name?.toUpperCase() : "No Shift Name"}
                  </div>
                </div>
                <div className="edit">
                  <EditOutlinedIcon onClick={() => {
                    setUpdateModal(true)
                    setUpdateData(item)
                    setIsUpdate(true)
                  }} />
                </div>

              </div>
            </Accordion.Header>
            <Accordion.Body>
              {eleId == item?.id ? <WorkShiftCardDetails setRemoveUserModal={setRemoveUserModal} id={item?.id} shiftName={item} /> : "null"}
            </Accordion.Body>
          </Accordion.Item>
        )
      })}
      <div className="d-flex justify-content-center">
        <TablePagination
          component="div"
          rowsPerPageOptions={[8, 16, 24]}
          count={fetchAllWorkTime?.totalElements}
          page={pagePagination}
          onPageChange={handleChangePageProvider}
          labelRowsPerPage="Work Shift per page"
          rowsPerPage={rowsPerPageProvider}
          onRowsPerPageChange={handleChangeRowsPerPageProvider}
        />
      </div>
    </Accordion>
  );
};

export default WorkShiftPanelCard;
