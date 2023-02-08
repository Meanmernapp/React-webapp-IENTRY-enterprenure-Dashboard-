import React from 'react';
import ic_file from '../../../../../assets/images/ic-file-green.svg';
import pdfpng from "../../../../../assets/images/pdf.svg";
import ic_download_file from "../../../../../assets/images/ic-download-file.svg";
import DetailNoData from './DetailNoData';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { URL } from '../../../../../Apis/Constants';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import cryptoJs from 'crypto-js';
import securekey from '../../../../../config'
const DetailDocument = ({ option }) => {

    const token = sessionStorage.getItem('bearerToken');
    const bytes = cryptoJs.AES.decrypt(token, securekey)
    const bearerToken = bytes.toString(cryptoJs.enc.Utf8);
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const employeeDocumentsList = useSelector(state => state?.CompanyEmployeesSlice?.employeeDocumentsList);
    const singleEmployeeDetail = useSelector(state => state?.CompanyEmployeesSlice?.singleEmployeeDetail);

    console.log(employeeDocumentsList)

    const handleDownload = (item) => {
        fetch(`${URL}image-service/download-by-id/${item?.id}/option/document_employee`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
                "Authorization": `Bearer ${bearerToken}`,
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    "report.pdf",
                );
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            });
    }

    return (
        <>
            <div className='detailTitleText'>
                <p className='d-flex align-items-center'>
                    <span>{t('documents')}</span>
                    <img src={ic_file} alt="ic_file" style={{
                        margin: "0 5px"
                    }} />
                </p>
                {
                    option === "update" ?
                        <Link to={`/dashboard/employee/all-employees/${singleEmployeeDetail?.user?.status?.id === 3 ? 'employee-docs-complete' : 'employee-docs'} `}>
                            <button className='updateSectionBtn'>
                                {t('manage_files')}
                            </button>
                        </Link> : null
                }
            </div>
            {
                employeeDocumentsList.length !== 0 ?
                    <div className="row mb-5 mx-0">
                        {
                            employeeDocumentsList.map(item => (
                                <div className="col-md-2 p-2" key={item?.id}>
                                    <div className="documentDetailCard">
                                        <p
                                            className={`title ${item?.path === null ? 'mb-5' : 'mb-0'}`}
                                        >
                                            {item?.companyDocumentEmployee?.document}
                                        </p>
                                        {
                                            item?.companyDocumentEmployee?.path !== null ?
                                                <img src={pdfpng} className="pdfpng" alt="pdfpng" />
                                                :
                                                null
                                        }
                                        {
                                            item?.companyDocumentEmployee?.path !== null ?
                                                <img
                                                    src={ic_download_file}
                                                    className="ic_download_file"
                                                    alt="ic_download_file"
                                                    onClick={() => handleDownload(item)}
                                                /> : null
                                        }
                                        {item?.companyDocumentEmployee?.path !== null ?
                                            <p className='name'>{item?.companyDocumentEmployee?.path}</p> : null
                                        }
                                        <p className='date'>{new Date(item?.createdAt).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div> :
                    <DetailNoData title={t('no_documents')} />
            }
        </>
    )
}

export default DetailDocument