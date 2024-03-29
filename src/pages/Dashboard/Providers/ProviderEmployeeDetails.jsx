import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import personPng from "../../../assets/defaultImages/userDef.svg";
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
import ApproveDocument from "./ApproveDocument";
import DocumentTable from "../../Modals/DocumentTable";
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
    const params = useParams()


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

            providerId: params?.id,

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

            providerId: params?.id,

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
            id: params?.id
        };

        dispatch(GetEmployeeProviderById(data))
        dispatch(GetAllProviderDocuments(localStorage.getItem("userId")));
    }, [])

    return (
        <>
            <div className="head">
                <div className="headLeft">
                    <h2>
                        <Link to="/dashboard/employee/suppliers">
                            <ArrowBackIcon
                                style={{
                                    color: "#146F62",
                                    fontSize: "30px",
                                    marginRight: "30px",
                                }}
                            />
                        </Link>
                        {t("supplier_detail")}

                    </h2>
                </div>
            </div>
            <div className="row employee_provider_detail">
                <Link to={`/dashboard/employee/suppliers/update-suppliers/${getEmployeeProviderById?.id}`}>
                    <button className="__update_btn" >
                        {t("update_data")}
                        <i class="fa fa-floppy-o" aria-hidden="true"></i>
                    </button>
                </Link>
                <div className="col-md-4 __userData">
                    <img 
                    style={{background:'white'}}
                    src={getEmployeeProviderById?.selfie ? `data:image/png;base64,${getEmployeeProviderById?.selfie}` : personPng} className="__userImage" />
                    <div className="__body">
                        <p>{t("name")}</p>
                        <span>{getEmployeeProviderById?.user?.name}</span>
                        <p className="ishead">{t("email")}</p>
                        <span> {getEmployeeProviderById?.user?.email}</span>
                        <p className="ishead">{t("phone_number")}</p>
                        <span>{getEmployeeProviderById?.user?.phoneNumber}</span>
                        <p className="ishead">{t("password")}</p>
                        <span>**************</span>
                        <p className="ishead">{t("gender")}</p>
                        <span>{getEmployeeProviderById?.user?.gender?.name}</span>
                    </div>
                </div>
                <div className="col-md-7 employee_files_details">

                    {
                        getAllProviderDocuments?.length > 0 ?

                            <DocumentTable dataTable={getAllProviderDocuments} approve={false} optionDownload="document_external" />
                            :
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "50vh" }}>

                                <NotFoundDataWarning text={"No Documents"} />
                            </div>
                    }

                </div>


            </div>
            {/* employee provider detials */}
            <div className="provider_container">
                <h4>{t("employees")}</h4>
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
                        labelRowsPerPage={t("employees_per_page")}
                        rowsPerPage={rowsPerPageIncoming}
                        onRowsPerPageChange={handleChangeRowsPerPageIncoming}
                    />
                </div>
            }

            {/* employee vehicle details */}
            <div className="provider_employee_details">
                <h4>{t("vehicles")}</h4>
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
                        labelRowsPerPage={t("vehicles_per_page")}
                        rowsPerPage={rowsPerPageVehicle}
                        onRowsPerPageChange={handleChangeRowsPerPageVehicle}
                    />
                </div>
            }

        </>
    );
};

export default ProviderEmployeeDetails;
