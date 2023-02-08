import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import personPng from "../../../assets/images/person.png";
import file from "../../../assets/images/file.png";
import DownloadIcon from "@mui/icons-material/Download";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import TablePagination from '@mui/material/TablePagination';
import ProvidersCard from './ProvidersCard'
import { DownloadEmployeeProviderOrderFiles, GetAllCompanybyProviderId, GetAllCompanyVehiclebyId, GetAllProviderDocuments, GetEmployeeProviderById } from "../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import VehiclesCard from "./VehiclesCard";
import NotFoundAnything from "../../../components/NotFoundAnything";
import { useTranslation } from 'react-i18next'
import Cookies from "js-cookie";
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
const ProviderEmployeeDetails = ({ employeeDetailsFlag, approveDocumentFlag }) => {


    const lCode = Cookies.get("i18next") || "en";
    const { t } = useTranslation();


    const [filePresent, setfilePresent] = useState(true);
    const [fileIdPresent, setfileIdPresent] = useState(true);

    const [pageIncoming, setPageIncoming] = useState(0);
    const [rowsPerPageIncoming, setRowsPerPageincoming] = useState(4);

    const [orderBy, setOrderBy] = useState();
    const [sortBy, setSortBy] = useState();

    const [pageVehicle, setPageVehicle] = useState(0);
    const [rowsPerPageVehicle, setRowsPerPageVehicle] = useState(4);

    const [orderByVehicle, setOrderByVehicle] = useState();
    const [sortByVehicle, setSortByVehicle] = useState();

    const dispatch = useDispatch();


    const { getAllProviderDocuments } = useSelector(state => state.EmployeeProviderSlice);
    console.log(getAllProviderDocuments);
    const { getEmployeeProviderById } = useSelector(state => state.EmployeeProviderSlice);
    console.log(getEmployeeProviderById);
    const { getAllCompanybyProviderId } = useSelector(state => state.EmployeeProviderSlice);
    console.log(getAllCompanybyProviderId);
    const { getAllCompanyVehiclebyId } = useSelector(state => state.EmployeeProviderSlice);
    console.log(getAllCompanyVehiclebyId);



    const handleChangePageIcoming = (event, newPage) => {
        setPageIncoming(newPage);
    };

    const handleChangeRowsPerPageIncoming = event => {
        setRowsPerPageincoming(parseInt(event.target.value));
        setPageIncoming(0);
    };

    const handleChangePageVehicle = (event, newPage) => {
        setPageVehicle(newPage);
    };

    const handleChangeRowsPerPageVehicle = event => {
        setRowsPerPageVehicle(parseInt(event.target.value));
        setPageVehicle(0);
    };

    useEffect(() => {
        const body = {

            providerId: localStorage.getItem("pid"),

            pagination: {
                "order": sortBy === 'asc' ? true : false,
                "page": pageIncoming,
                "size": rowsPerPageIncoming,
                "sortBy": orderBy ? orderBy : "id"
            }
        }
        dispatch(GetAllCompanybyProviderId(body))

    }, [pageIncoming, rowsPerPageIncoming, orderBy, sortBy])


    useEffect(() => {
        const body = {

            providerId: localStorage.getItem("pid"),

            pagination: {
                "order": sortByVehicle === 'asc' ? true : false,
                "page": pageVehicle,
                "size": rowsPerPageVehicle,
                "sortBy": orderByVehicle ? orderByVehicle : "id"
            }
        }
        dispatch(GetAllCompanyVehiclebyId(body))

    }, [pageVehicle, rowsPerPageVehicle, orderByVehicle, sortByVehicle])

    useEffect(() => {
        const data = {
            id: localStorage.getItem("pid")
        };

        dispatch(GetEmployeeProviderById(data))
        dispatch(GetAllProviderDocuments(localStorage.getItem("userId")));
    }, [])

    return (
        <>
            <div className="head">
                <div className="headLeft">
                    <h2>
                        <Link to="/dashboard/employee/providers">
                            <ArrowBackIcon
                                style={{
                                    color: "#146F62",
                                    fontSize: "30px",
                                    marginRight: "30px",
                                }}
                            />
                        </Link>
                        {" PROVIDER Detail "}

                    </h2>
                </div>
            </div>
            <div className="row employee_provider_detail">
                <Link to="/dashboard/employee/providers/update-providers">
                    <button className="__update_btn" >
                        {t("update_data")}
                        <i class="fa fa-floppy-o" aria-hidden="true"></i>
                    </button>
                </Link>
                <div className="col-md-4 __userData">
                    <img src={personPng} className="__userImage" />
                    <div className="__body">
                        <p>Name</p>
                        <span>{getEmployeeProviderById?.user?.name}</span>
                        <p className="ishead">Email</p>
                        <span> {getEmployeeProviderById?.user?.email}</span>
                        <p className="ishead">Phone Number</p>
                        <span>{getEmployeeProviderById?.user?.phoneNumber}</span>
                        <p className="ishead">Password</p>
                        <span>**************</span>
                        <p className="ishead">Gender</p>
                        <span>{getEmployeeProviderById?.user?.gender?.name}</span>
                    </div>
                </div>
                <div className="col-md-7 employee_files_details">

                    {
                        getAllProviderDocuments?.length > 0 ?
                            <>
                                <div
                                    className="__header"
                                    style={{ paddingRight: "40px" }}
                                >
                                    <p>FileName</p>
                                    <p>File</p>

                                </div>
                                {
                                    getAllProviderDocuments?.map((item) => {
                                        const date = new Date(item?.createdAt);
                                        return (
                                            <div className="__body">
                                                <div className="__file">
                                                    <div className="__name">
                                                        <p>{item?.companyDocumentExternal?.document}</p>
                                                        {item?.document && <span>{item?.document}</span>}
                                                    </div>
                                                    {item?.path ? (
                                                        <div className="__file_icon">
                                                            <img src={file} />
                                                            <div style={{ paddingLeft: "10px" }}>
                                                                <p> {item?.path}</p>
                                                                <span>{date.toLocaleString('en-GB')}</span>
                                                            </div>
                                                            <DownloadIcon className="download_icon" onClick={() => {
                                                                const data = {
                                                                    option: 'document_external',
                                                                    id: item?.id
                                                                }
                                                                dispatch(DownloadEmployeeProviderOrderFiles(data))
                                                            }} />
                                                        </div>
                                                    ) : (
                                                        <p className="noFile">NO FILE</p>
                                                    )}

                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </> :
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "50vh" }}>

                                <NotFoundDataWarning text={"No Documents"} />
                            </div>
                    }

                </div>


            </div>
            {/* employee provider detials */}
            <div className="provider_container">
                <h4>EMPLOYEES</h4>
                {
                    getAllCompanybyProviderId?.content?.length > 0 ?
                        <ProvidersCard getAllCompanybyProviderId={getAllCompanybyProviderId} />
                        :
                        <NotFoundDataWarning text={"No Employee"} />

                }

            </div>

            {getAllCompanybyProviderId?.content?.length > 0 &&

                <div className="d-flex justify-content-center">
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[2, 4, 6, 8, 12]}
                        count={getAllCompanybyProviderId?.totalElements}
                        page={pageIncoming}
                        onPageChange={handleChangePageIcoming}
                        labelRowsPerPage="Employee per page"
                        rowsPerPage={rowsPerPageIncoming}
                        onRowsPerPageChange={handleChangeRowsPerPageIncoming}
                    />
                </div>
            }

            {/* employee vehicle details */}
            <div className="provider_employee_details">
                <h4>VEHICLES</h4>
                {
                    getAllCompanyVehiclebyId?.content?.length > 0 ?
                        <VehiclesCard getAllCompanyVehiclebyId={getAllCompanyVehiclebyId} />
                        :
                        <NotFoundDataWarning text={"No Vehicle"} />
                }
            </div>

            {
                getAllCompanyVehiclebyId?.content?.length > 0 &&
                <div className="d-flex justify-content-center">
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[2, 4, 6, 8, 12]}
                        count={getAllCompanyVehiclebyId?.totalElements}
                        page={pageVehicle}
                        onPageChange={handleChangePageVehicle}
                        labelRowsPerPage="Vehicles per page"
                        rowsPerPage={rowsPerPageVehicle}
                        onRowsPerPageChange={handleChangeRowsPerPageVehicle}
                    />
                </div>
            }

        </>
    );
};

export default ProviderEmployeeDetails;
