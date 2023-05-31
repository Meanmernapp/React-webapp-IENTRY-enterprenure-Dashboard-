// import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
// import React, { useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import SaveIcon from "@mui/icons-material/Save";
// import { useNavigate } from "react-router-dom";
// import ViewCard from "./ViewCard";
// import { Box } from "@mui/system";
// import Popover from "@mui/material/Popover";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import TablePagination from "@mui/material/TablePagination";
// import { GetVehicleFilter, GetVehicleByContractorId, GetByUserId } from "../../../reduxToolkit/Contractor/ContractorApi";
// import { vehicleFilter, byUserId, vehicleByContractorId } from "../../../reduxToolkit/Contractor/ContractorSlice";
// import { useSelector } from "react-redux";
// import i18next, { t } from "i18next";

// const SearchVehicle = () => {
//   let navigate = useNavigate();
//   const dispatch = useDispatch();
//   const getVehicleFilter = useSelector(vehicleFilter);
//   const contractorData = useSelector(byUserId);
//   const getVehicleByContractorId = useSelector(vehicleByContractorId);

//   const contractorID = contractorData?.id; // by id

//   const [searchEmp, setSearchEmp] = useState("");

//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const open = Boolean(anchorEl);
//   const id = open ? "simple-popover" : undefined;

//   //pagination
//   const [orderBy, setOrderBy] = useState();
//   const [sortBy, setSortBy] = useState();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(8);

//   // functions
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value));
//     setPage(0);
//   };

//   let contractPagination = {
//     order: sortBy === "asc" ? true : false,
//     page: page,
//     size: rowsPerPage,
//     sortBy: orderBy ? orderBy : "id",
//   };

//   useEffect(() => {
//     GetByUserId(contractorID);
//     /*author mazhar iqbal
//       get vehicle filter attribute list
//     */
//     dispatch(GetVehicleFilter());
//   }, []);

//   useEffect(() => {
//     dispatch(GetVehicleByContractorId({ contractorID, contractPagination }));
//   }, [contractorData, page, rowsPerPage, orderBy, sortBy]);
//   return (
//     <div className="search-container">
//       <div className="head my-3">
//         <span className="search-container__heading">{t("vehicles")}</span>
//         <div className="d-flex">
//           <div className="ml-2">
//             <button
//               className="btn btn-lg"
//               onClick={() => navigate(`/dashboard/Contractor/addvehical`)}
//             >
//               {t("add_vehicle")}
//             </button>
//           </div>
//           <button
//             className="p-2    ms-2 "
//             style={{ width: "100%", height: "100%" }}
//           >
//             <i
//               class="fa fa-filter"
//               aria-hidden="true"
//               style={{ fontSize: "30px" }}
//               aria-describedby={id}
//               variant="contained"
//               onClick={handleClick}
//             ></i>
//           </button>
//         </div>
//       </div>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "left",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//       >
//         <div className="user-dropdown" style={{ width: "222px" }}>
//           <div className="user-dropdown__name d-flex flex-column border-0">
//             <h3 style={{ borderBottom: "2px solid green" }}>{t("filters")}</h3>
//             <h4 className="mt-3">{t("attributes")}</h4>
//             <Grid container>
//               <Grid item xs={12}>
//                 <Box sx={{ mt: "20px" }}>
//                   <FormControl fullWidth>
//                     <InputLabel id="demo-simple-select-label">
//                       {t("status")}
//                     </InputLabel>
//                     <Select size="small"
//                       labelId="demo-simple-select-label"
//                       id="demo-simple-select"
//                       defaultValue="employe"
//                       value={sortBy}
//                       label="EMPLOYEE"
//                       onChange={(e) => setSortBy(e.target.value)}
//                       sx={{
//                         fontSize: "16px",
//                         padding: "3px 3px 3px 10px",
//                       }}
//                     >
//                       <MenuItem
//                         value={10}
//                         sx={{
//                           fontSize: "16px",
//                         }}
//                       >
//                         ASC
//                       </MenuItem>
//                       <MenuItem
//                         value={20}
//                         sx={{
//                           fontSize: "16px",
//                         }}
//                       >
//                         DES
//                       </MenuItem>
//                     </Select>
//                   </FormControl>
//                 </Box>
//               </Grid>
//               <Grid item xs={12}>
//                 <Box sx={{ mt: "30px" }}>
//                   <FormControl fullWidth>
//                     <InputLabel id="demo-simple-select-label">
//                       {t("order_by")}
//                     </InputLabel>
//                     <Select size="small"
//                       labelId="demo-simple-select-label"
//                       id="demo-simple-select"
//                       value={orderBy}
//                       label="ORDER BY"
//                       onChange={(e) => setOrderBy(e.target.value)}
//                       sx={{
//                         fontSize: "16px",
//                         padding: "3px 3px 3px 10px",
//                       }}
//                     >
//                       {getVehicleFilter.length !== 0 &&
//                         getVehicleFilter?.map((item) => {
//                           return (
//                             <MenuItem
//                               value={item}
//                               sx={{
//                                 fontSize: "16px",
//                               }}
//                             >
//                               {item}
//                             </MenuItem>
//                           );
//                         })}
//                     </Select>
//                   </FormControl>
//                 </Box>
//               </Grid>
//             </Grid>
//           </div>
//         </div>
//       </Popover>
//       <Grid container sx={{ my: "30px", position: "relative" }}>
//         <Grid item xs={12}>
//           <TextField size="small"
//             label={t("filters")}
//             fullWidth
//             onChange={(e) => {
//               setSearchEmp(e.target.value);
//             }}


//             sx={{
//               textAlign: i18next.dir() == "rtl" ? "right" : "left",
//               "& 	.MuiOutlinedInput-notchedOutline": {
//                 textAlign: i18next.dir() == "rtl" ? "right" : "left",
//               },
//               "& 	.MuiInputLabel-root": {
//                 fontSize: 12,
//                 left: i18next.dir() == "rtl" ? "inherit" : "0",
//                 right: i18next.dir() == "rtl" ? "1.75rem" : "0",
//                 transformOrigin: i18next.dir() == "rtl" ? "right" : "left"
//               }
//             }}
//           />
//         </Grid>
//       </Grid>
//       <Grid className="d-flex flex-wrap" sx={{ overFlow: "hidden" }}>
//         {getVehicleByContractorId?.content
//           ?.filter((user) => {
//             if (searchEmp === "") {
//               return user;
//             } else if (
//               user?.color?.toLowerCase().includes(searchEmp?.toLowerCase())
//             ) {
//               return user;
//             }
//           })
//           .map((item) => (
//             <ViewCard vehicles={item} />
//           ))}
//       </Grid>
//       <div className="d-flex justify-content-center">
//         <TablePagination
//           component="div"
//           rowsPerPageOptions={[8, 16, 24]}
//           count={getVehicleByContractorId?.totalElements}
//           page={page}
//           onPageChange={handleChangePage}
//           labelRowsPerPage={t("vehicles_per_page")}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           sx={{
//             "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root": {
//               transform: i18next.dir() == "rtl" ? "scaleX(-1)" : "",
//             }
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default SearchVehicle;



import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TablePagination from '@mui/material/TablePagination';
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import eyeIcon from '../../../assets/eye-solid.svg';
import BoyAvatar from '../../../assets/images/boyAvatarT.svg';
import womanAvatar from '../../../assets/images/womanAvatarT.png';
import DisplayView from '../../../components/DisplayView';
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';
import checkStatus from '../../../hooks/checkStausColor';
import statusId from '../../../hooks/statusId';
import { GetGenderListProvider } from '../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi';
import { GetAllStatusProvider, GetProviderVehicleDetail } from '../../../reduxToolkit/Providers/providersApi';
import BootstrapTooltip from '../../../utils/BootstrapTooltip';
import ViewCard from "./ViewCard";
import { ContractorlistOfVehicles } from "../../../reduxToolkit/Contractor/ContractorApi";


const SearchVehicle = () => {
  const lCode = Cookies.get("i18next") || "en";
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [view, setView] = useState("grid")
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [selectEmployeeForDelete, setSlectEmployeeForDelete] = useState([])
  const [isAllChecked, setIsAllChecked] = useState(false)

  const { saveProviderVehicleImage } = useSelector(state => state?.providersSlice)
  const { contractorlistOfVehicles } = useSelector(state => state?.ContractorSlice)
  
console.log(contractorlistOfVehicles)





  // functions
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };


  // this function control select all id or unSelect all
  const handelDeleteAll = (e) => {
    setIsAllChecked(e.target.checked)
    if (e.target.checked) {
      const selectAllIds = contractorlistOfVehicles?.content?.map(item => {
        return item?.id
      })
      setSlectEmployeeForDelete(selectAllIds)


    } else {
      setSlectEmployeeForDelete([])
    }

  }
  // this function handle only specific id base on selection
  const handleCheckboxChange = (e) => {

    if (e.target.checked) {
      setSlectEmployeeForDelete([...selectEmployeeForDelete, e.target.id]);
    } else {
      setSlectEmployeeForDelete(selectEmployeeForDelete.filter((removeid) => removeid !== e.target.id));
    }
  };

  // useEffect 
  useEffect(() => {
    dispatch(GetGenderListProvider())
    dispatch(GetAllStatusProvider())

  }, [])

  useEffect(() => {

    const body = {
      contractorId: localStorage.getItem("contractorId"),
      pagination: {
        "order": sortBy === 'asc' ? true : false,
        "page": page,
        "size": rowsPerPage,
        "sortBy": orderBy ? orderBy : "id"
      }
    }
    dispatch(ContractorlistOfVehicles(body));
  }, [page, rowsPerPage, orderBy, sortBy,saveProviderVehicleImage])
  return (
    <>
      {/* head with back link */}
      <div className='head'>
        <div className='headLeft'>
          <h2>{t('vehicles')}</h2>
          <DisplayView view={view} setView={setView} />
        </div>
        <div className="container-top-right-btns"
        >

          {/* <button className="import-file-btn-1"
          >
            {(t('import'))}
            <br />
            {(t('file'))}
          </button> */}
          {

            // permission?.includes(permissionObj?.WEB_VEHICLE_CREATE) &&
            <button className="add-btn-1"

              onClick={() => navigate("/dashboard/contractor/addvehical")}
            >
              <i class="fa fa-plus" aria-hidden="true"></i>
              {t('add')}
            </button>

          }
          <button className="delete-btn-1"
            disabled={selectEmployeeForDelete?.length === 0}
            onClick={() => {
              // setDeleteVehicleShow(true)
            }}

          >
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            {t('delete')}
          </button>
          <button
            className="custom_primary_btn_dark"
            style={{ width: "48px", height: "48px" }}
          // onClick={() => setModalShow(true)}
          >
            <FilterAltIcon style={{ fontSize: "32px" }} />
          </button>
        </div>
      </div>

      {/* main */}
      {
        view === "grid" &&

        <div className="d-flex gap-1 pl-2">

          <input type="checkbox" className="checkbox"
            checked={isAllChecked}
            onChange={handelDeleteAll}
          />

          <span className="text_size_12">de/select all</span>
        </div>
      }
      {
        view === "grid" &&
        <>
          {
            contractorlistOfVehicles?.content?.length > 0 ?

              <ViewCard
                apidata={contractorlistOfVehicles}
                selectForDelete={selectEmployeeForDelete}
                handleCheckboxChange={handleCheckboxChange}
              />
              :
              <>
                <NotFoundDataWarning text={t("no_data")} />

              </>
          }
        </>
      }

      {
        view === "list" &&

        <div className="panelTables px-1 animated-div"
        // ref={elementRef}
        >
          {
            contractorlistOfVehicles?.content?.length > 0 ?
              <table style={{ width: "100%" }}>
                <thead>
                  <th className='first_head'>
                    <input type="checkbox" className="checkbox"
                      checked={isAllChecked}
                      onChange={handelDeleteAll}
                    />
                  </th>
                  <th className='first_head'>{t("brand")}</th>
                  <th>{t("sub_brand")}</th>
                  <th>{t("model")}</th>
                  <th>{t("color")}</th>
                  <th>{t("plates")}</th>
                  <th>{t("s/n")}</th>
                  <th>{t("vin")}</th>
                  <th>{t("status")}</th>
                  <th>{t("options")}</th>
                  <th className='last'>{t("update")}</th>
                </thead>

                {
                  contractorlistOfVehicles?.content?.map((item, index) => {
                    const dob = item?.dob ? new Date(item?.dob) : ""

                    return (
                      <tr key={item?.id}>
                        <td className='first'>
                          <input type="checkbox" className="checkbox"
                            checked={selectEmployeeForDelete?.includes(item?.id)}
                            id={item?.id}
                            onChange={handleCheckboxChange}
                          />
                        </td>
                        < td className='first ' >
                          {/* <img src={item?.genderId === 1 && BoyAvatar ||
                            item?.genderId === 2 && womanAvatar ||
                            item?.genderId === null && BoyAvatar

                          } alt="" className="name_avatar mr-2" /> */}
                          {
                            item?.brand || "-"
                            // + " " + 
                            // item?.secondLastName + " " + 
                            //  item?.lastName
                          }
                        </td>
                        <td>{item?.subBrand || "-"}</td>
                        <td >{item?.model || "-"}</td>
                        <td >{item?.color || "-"}</td>
                        <td >{item?.plate || "-"}</td>
                        <td >{item?.serialNumber || "-"}</td>
                        <td >{item?.vin || "-"}</td>
                        <td style={{ color: checkStatus(item?.status?.id), fontWeight: 'bold', fontSize: "12px" }}> {statusId(item?.status?.id) || "-"} </td>

                        <td className='tableIcon'>
                          <BootstrapTooltip title={item?.status?.id == 3 ? t('complete_documents') : t('vehicle_details')} placement="top">
                            <button className='btn-option'
                              onClick={() => {
                                item?.status.id == 3 ?

                                  navigate(`/dashboard/contractor/upload-vehicle-documents/${item?.id}`) :
                                  navigate(`/dashboard/contractor/vehicle-contract-detail/${item?.id}`)
                                dispatch(GetProviderVehicleDetail(item?.id));

                                localStorage.setItem("vehicleidfordetail", item?.id)



                              }}

                            >
                              <img
                                src={eyeIcon} alt="eye"
                              />
                            </button>
                          </BootstrapTooltip>
                        </td>
                        <td className='tableIcon'>
                          <button className='btn-option'
                             onClick={() => navigate(`/dashboard/supplier/update-vehicles`)}
                  
                          >
                            <i className="fa fa-pencil" aria-hidden="true"
                              style={{ color: "#146F62" }}
                            
                            ></i>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }

              </table> :
              <NotFoundDataWarning text={t("no_data")} />
          }

        </div>

      }


      {
        contractorlistOfVehicles?.content?.length > 0 &&
        <div className="d-flex justify-content-center">
          <TablePagination
            component="div"
            rowsPerPageOptions={[8, 16, 24, 32]}
            count={contractorlistOfVehicles?.totalElements}
            page={page}
            onPageChange={handleChangePage}
            labelRowsPerPage={t('vehicles_per_page')}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      }
    </>
  )
}

export default SearchVehicle

