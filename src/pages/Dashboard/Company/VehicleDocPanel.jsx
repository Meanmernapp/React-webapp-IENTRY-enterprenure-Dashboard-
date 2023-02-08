import React, { useEffect, useState } from 'react';
import deleteIcon from '../../../assets/images/ic-delete-red.svg';
import ic_download_file from '../../../assets/images/ic-download-file.svg';
import cancel from '../../../assets/images/ic-cancel.svg'
import { Link } from 'react-router-dom';
import AddDocsModal from './CompanyModals/addDocsModal';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyVehicles } from '../../../reduxToolkit/CompanyDocuments/VehicleDocumentsApi';
import { URL } from '../../../Apis/Constants'
import { deleteImg } from '../../../Apis/imageController';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { permissionObj } from '../../../Helpers/permission';
import securekey from '../../../config';
import cryptoJs from 'crypto-js';


function MyVerticallyCenteredModal(props) {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    const [loading, setLoading] = useState(false);

    /* Author: Rizwan ullah
       Func. to delete doc. and update list
    */
    const handleDeleteUser = () => {
        const body = {
            id: props.deleteid,
            option: "company_document_external_vehicle"
        }

        setLoading(true)
        deleteImg(body).then(() => {
            setLoading(false)
            dispatch(getCompanyVehicles());
            props.onHide();
            toast.success("Deleted successfully!")
        }).catch(error => {
            setLoading(false)
            toast.error("something went wrong.")
        })
    }


    return (
        <Modal
            className="documents-panel-modal"
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t('reomve_document')}
                </Modal.Title>
                <img onClick={() => props.onHide()} className="modalClose" src={cancel} alt="" />
            </Modal.Header>
            <Modal.Body className="docsModalBody">
                <div style={{
                    fontSize: "14px",
                    marginBottom: "1rem",
                    textAlign: "center",
                    color: "#707070",
                }}
                >
                    ¿Do you want to remove this document?
                </div>
                <div className="buttonArea">
                    <button className="btns btn btn-light" onClick={() => props.onHide()}>{t('cancel')}</button>
                    <button
                        className="btn btn-success"
                        onClick={handleDeleteUser}
                    >
                        {
                            loading ? "Removing...!" : t('remove')
                        }
                    </button>
                </div>
            </Modal.Body>

        </Modal>
    );
}


const VehicleDocPanel = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    const allVehicles = useSelector(state => state?.vehicleDocumentSlice?.allVehicles);
    const { permission } = useSelector(state => state.authenticatioauthennSlice);
    // console.log(allVehicles)

    const [deleteId, setdeleteId] = useState();
    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        dispatch(getCompanyVehicles())
    }, [])

    const handleDownloadDoc = (selectedId) => {


        const token = sessionStorage.getItem('bearerToken');
        const bytes = cryptoJs.AES.decrypt(token, securekey)
        const bearerToken = bytes.toString(cryptoJs.enc.Utf8);
        fetch(`${URL}image-service/download-by-id/${selectedId.id}/option/company_document_external_vehicle`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/png',
                "Authorization": "Bearer " + bearerToken,
            }
        })
            .then((response) => response.blob())
            .then((blob) => {

                /* Author: Rizwan ullah
                   Create blob link to download
                */
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `${selectedId.path}`,
                );
                console.log(link)

                /* Author: Rizwan ullah
                   Append to html link element page
                */
                document.body.appendChild(link);

                /* Author: Rizwan ullah
                   Start download
                */
                link.click();

                /* Author: Rizwan ullah
                   Clean up and remove the link
                */
                link.parentNode.removeChild(link);
            });
    }

    return (
        <>
            <div className="documentsPanel">
                <div className='head'>
                    <div className='headLeft'>
                        <Link to="/dashboard/employee/company">
                            <i className="fa fa-arrow-left" aria-hidden="true" style={{
                                transform: lCode === "ar" ? "scaleX(-1)" : ""
                            }}></i>
                        </Link>
                        <h2>{t('vehicle_doc_panel')}</h2>
                    </div>
                    {
                        permission?.includes(permissionObj?.WEB_EXTERNAL_VEHICLE_DOCUMENT_CREATE) &&
                        <button
                            onClick={() => setShow(true)}
                        >
                            <span>
                                {t('add_document')}</span>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                    }
                    <AddDocsModal
                        modalrelation="vehicle"
                        show={show}
                        onHide={() => setShow(false)}
                    />
                </div>
                <div className="row">
                    <div className="col-8">
                        <div className='documents-detail-sec'>
                            <div className="table-header">
                                <div className='font-weight-bold text-uppercase'>{t('document_name')}</div>
                                <div className='font-weight-bold text-uppercase text-center'>{t('form')}</div>
                                <div className='font-weight-bold text-uppercase text-center'>{t('download')}</div>
                                {
                                    permission?.includes(permissionObj?.WEB_EXTERNAL_VEHICLE_DOCUMENT_DELETE) &&
                                    <div className='font-weight-bold text-uppercase text-end'>{t('remove')}</div>
                                }
                            </div>
                            {
                                allVehicles?.map(item => (
                                    <div className='data-row first-row' key={item.id}>
                                        <div>{item.document}</div>
                                        <div className='text-center'>{item.path}</div>
                                        <div className='text-center'>
                                            {

                                                item?.path !== null ?
                                                    <img
                                                        className='cancel'
                                                        src={ic_download_file}
                                                        alt="cancel"
                                                        onClick={() => handleDownloadDoc(item)}
                                                    /> : ""
                                            }
                                        </div>
                                        <div className='text-end'>
                                            {permission?.includes(permissionObj?.WEB_EXTERNAL_VEHICLE_DOCUMENT_DELETE) &&
                                                <img
                                                    className='cancel'
                                                    src={deleteIcon}
                                                    alt="cancel"
                                                    onClick={() => {
                                                        setdeleteId(item?.id)
                                                        setModalShow(true)
                                                    }}
                                                />
                                            }

                                            <MyVerticallyCenteredModal
                                                show={modalShow}
                                                onHide={() => setModalShow(false)}
                                                deleteid={deleteId}
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* <div className="col-8 contractors">
                        <div className="table-heading">
                            <p>CONTRACTORS / PROVIDER</p>
                            <button>ADD DOCUMENT+</button>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className='documents-detail-sec'>

                            <div className="table-header">
                                <div>DOCUMENT NAME</div>
                                <div className='text-center'>FROM</div>
                                <div className='text-end'>REMOVE</div>
                            </div>
                            <div className='data-row first-row'>
                                <div>IMSS</div>
                                <div className='text-center'>IMSS</div>
                                <div className='text-end'>
                                    <img className='cancel' src={cancel} alt="cancel" />
                                </div>
                            </div>
                            <div className='data-row second-row'>
                                <div>IMSS</div>
                                <div className='text-center'>
                                    <img src={pdfImg} alt="pdf" />
                                    <p>formato_informacion _personal.pdf</p>
                                </div>
                                <div className='text-end'>
                                    <img className='cancel' src={cancel} alt="cancel" />
                                </div>
                            </div>
                            <div className='data-row third-row'>
                                <div>IMSS</div>
                                <div className='text-center'>IMSS</div>
                                <div className='text-end'>
                                    <img className='cancel' src={cancel} alt="cancel" />
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>

        </>
    )
}

export default VehicleDocPanel