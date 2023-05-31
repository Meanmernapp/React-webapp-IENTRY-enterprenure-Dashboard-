import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import employee from '../../../assets/images/employee-4.png'
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiInstance from '../../../Apis/Axios';
import emptyList from "../../../assets/images/folder.png"
let docID;
const ContractorEmployeDetail = () => {
    const navigate = useLocation();
    let { state } = navigate;
    let contractId = state?.state?.id;
    const [contractDetail, setContractDetail] = useState();
    const [companyContractor, setCompanyContractor] = useState();

    const getContractorDetail = async () => {
        await apiInstance.get(`contractor-service/get-by-id/${contractId}`
        ).then(function (response) {
            if (response.status == 200) {
                setContractDetail(response?.data?.data)
                docID = response?.data?.data?.user?.id;
                getContractorDocument(docID)
            }
        })
            .catch(function (error) {
                console.log("sad", error?.response?.data?.message)
                toast(error?.response?.data?.message)
                document.getElementById("overlay").style.display = "none"
            });
    }

    const getCompanyByContractor = async () => {
        await apiInstance.post(`contractor-employee-service/get-all-pageable/company/by-contractor-id/${contractId}`, {
            "order": true,
            "page": 0,
            "size": 10,
            "sortBy": "id"
        }
        ).then(function (response) {
            if (response.status == 200) {
                console.log("Company by Employe", response?.data?.data?.content.length)
                setCompanyContractor(response?.data?.data)
            }
        })
            .catch(function (error) {
                toast.error(error?.response?.data?.message)
                document.getElementById("overlay").style.display = "none"
            });
    }


    const getContractorDocument = async (userId) => {
        await apiInstance.get(`document-service/external/get-all/by-user-id/${docID}`
        ).then(function (response) {
        })
            .catch(function (error) {
                toast(error?.response?.data?.message)
                document.getElementById("overlay").style.display = "none"
            });
    }


    useEffect(() => {
        getContractorDetail()
        getCompanyByContractor();
    }, [])

    const createdDate = new Date(contractDetail?.createdAt);
    return (
        <div className='order-details'>
            <div className='head'>
                <div className='headLeft'>
                    <Link to="/dashboard/employee/suppliers">
                        <i className="fa fa-arrow-left" aria-hidden="true" style={{
                            transform: lCode === "ar" ? "scaleX(-1)" : "",
                            margin: "0 10px"
                        }}></i>
                    </Link>
                    <h2>CONTRACTOR DETAILS</h2>
                </div>
            </div>
            <div className="container">
                <div className="row content-row">
                    <div className="col-9 details">
                        <div className="status">
                            <div className="status-text-blue">{contractDetail?.status?.name}</div>
                            <div className="status-indicator-blue"></div>
                        </div>
                        <div className="content">
                            <div className="order">
                                <strong>Order</strong>
                                <span>{contractDetail?.status?.id}</span>
                                <div className="actual-details">
                                    {contractDetail?.user?.name}
                                </div>
                                <div className="faded-headings">
                                    Contractor
                                </div>
                                <div className="actual-details">
                                    {contractDetail?.user?.email}
                                </div>
                                <div className="faded-headings">
                                    Contractor
                                </div>
                                <div className="actual-details">
                                    {contractDetail?.user?.phoneNumber}
                                </div>
                                <div className="faded-headings">
                                    Celular
                                </div>
                            </div>
                            <div className="delivery-details">
                                <div className="faded-headings">
                                    Order Date
                                </div>
                                <div className="actual-details">
                                    {createdDate.toLocaleDateString("en-US")}
                                </div>
                                <div className="faded-headings">
                                    Delivery Date
                                </div>
                                <div className="actual-details">
                                    25/05/2021
                                </div>
                                <div className="faded-headings">
                                    Corporate
                                </div>
                                <div className="actual-details">
                                    {contractDetail?.acronym}
                                </div>
                            </div>
                            <div className="time-details">
                                <div className="faded-headings">
                                    Time Of Arrival
                                </div>
                                <div className="actual-details">
                                    18:33
                                </div>
                                <div className="faded-headings">
                                    18:33
                                </div>
                                <div className="actual-details">
                                    4427265969
                                </div>
                                <div className="faded-headings">
                                    Delivery Date
                                </div>
                                <div className="actual-details">
                                    4427265969
                                </div>
                                <div className="faded-headings">
                                    Delivery Date
                                </div>
                                <div className="actual-details">
                                    4427265969
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content-row contractor-cards">
                    <div className="row cards-section">
                        <div className="cards-first-row">
                            <div className="cards-heading">
                                EMPLOYEE
                            </div>
                            <div className="cards" style={{ maxWidth: "100%" }}>
                                {companyContractor && companyContractor?.content.length != 0 ?
                                    companyContractor.map(() => {
                                        return (
                                            <div className="card">
                                                <div className="card-body">
                                                    <img className='card-img-top' src={employee} alt="employee" />
                                                    <div className="card-content">
                                                        <div className="card-data-row">
                                                            <div className="headings">
                                                                Name
                                                            </div>
                                                            <div className="details">
                                                                Job Title
                                                            </div>
                                                        </div>
                                                        <div className="card-data-row">
                                                            <div className="headings">
                                                                Job Title
                                                            </div>
                                                            <div className="details">
                                                                email
                                                            </div>
                                                        </div>
                                                        <div className="card-data-row">
                                                            <div className="headings">
                                                                Gender
                                                            </div>
                                                            <div className="details">
                                                                Andrea Itzel González
                                                            </div>
                                                        </div>
                                                        <div className="card-data-row">
                                                            <div className="headings">
                                                                Email
                                                            </div>
                                                            <div className="details">
                                                                Andrea Itzel González
                                                            </div>
                                                        </div>
                                                        <div className="card-data-row">
                                                            <div className="headings">
                                                                Number
                                                            </div>
                                                            <div className="details">
                                                                Andrea Itzel González
                                                            </div>
                                                        </div>
                                                        <div className="view-details">
                                                            <Link to='/dashboard/employee/contractors/employee-contractor-details' >
                                                                <a href="">EMPLOYEE DETAILS</a>
                                                                <i className="fa fa-angle-right"></i>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        )
                                    }) : <img src={emptyList} style={{ width: "100px", height: "100%", margin: "auto" }} />}
                            </div>

                        </div>
                        <div className="cards-second-row">
                            <div className="cards-heading">
                                VEHICLE
                            </div>
                            <div className="cards">
                                <div className="card">
                                    <div className="card-body">
                                        <img className='card-img-top' src={employee} alt="employee" />
                                        <div className="card-content">
                                            <div className="card-data-row">
                                                <div className="headings">
                                                    Name
                                                </div>
                                                <div className="details">
                                                    Job Title
                                                </div>
                                            </div>
                                            <div className="card-data-row">
                                                <div className="headings">
                                                    Job Title
                                                </div>
                                                <div className="details">
                                                    email
                                                </div>
                                            </div>
                                            <div className="card-data-row">
                                                <div className="headings">
                                                    Gender
                                                </div>
                                                <div className="details">
                                                    Andrea Itzel González
                                                </div>
                                            </div>
                                            <div className="card-data-row">
                                                <div className="headings">
                                                    Email
                                                </div>
                                                <div className="details">
                                                    Andrea Itzel González
                                                </div>
                                            </div>
                                            <div className="card-data-row">
                                                <div className="headings">
                                                    Number
                                                </div>
                                                <div className="details">
                                                    Andrea Itzel González
                                                </div>
                                            </div>
                                            <div className="view-details">
                                                <Link to='/dashboard/employee/suppliers/provider-detail' state={{ approveDocumentState: "false" }} >
                                                    <a href="">EMPLOYEE DETAILS</a>
                                                    <i className="fa fa-angle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default ContractorEmployeDetail