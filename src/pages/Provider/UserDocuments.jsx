
import React, { useEffect, useState } from 'react'
import DocumentStatusThree from '../../components/DocumentStatusThree'
import { CreateSupplierDocValue, DownloadProviderImage, GetAllSupplierDocumentsById, SetSupplierDocValue } from '../../reduxToolkit/Providers/providersApi'
import { useDispatch, useSelector } from 'react-redux';
import { t } from "i18next"
import cryptoJs from 'crypto-js';
import securekey from '../../config';
import { CreateContractorDocValue, GetAllContractorDocuments, SetContractorDocValue } from '../../reduxToolkit/Contractor/ContractorApi';
import DeleteModal from '../Modals/DeleteModal';
const UserDocuments = ({ docType }) => {
    // user
    const userdata = sessionStorage.getItem('userdata');
    const bytess = cryptoJs.AES.decrypt(userdata || "", securekey)
    const userstring = bytess.toString(cryptoJs.enc.Utf8);
    const user = userstring ? JSON.parse(userstring)?.data?.data : ""
    console.log(user?.id)
    // use Hook
    const dispatch = useDispatch()
    // use state
    const [selectDocumentsForDelete, setSelectDocumentsForDelete] = useState([])
    const [isAllChecked, setIsAllChecked] = useState(false)
    const [deleteDocShow, setDeleteDocShow] = useState(false)
    // use Selc
    const { getAllSupplierDocumentsById, setSupplierDocValue, createSupplierDocValue } = useSelector(state => state.providersSlice);
    const {getAllContractorDocuments,createContractorDocValue ,setContractorDocValue } = useSelector(state => state.ContractorSlice);
    const { uploadImg, changeCount } = useSelector(state => state.sharedSlice)
    console.log(getAllSupplierDocumentsById)


    useEffect(() => {
        switch (docType) {
            case 'supplier':
                dispatch(GetAllSupplierDocumentsById(user?.id))
                break;
            case 'contractor':
                dispatch(GetAllContractorDocuments(user?.id))
                break;

            default:
                return null
        }
    }, [createSupplierDocValue, setSupplierDocValue, uploadImg, changeCount,
        createContractorDocValue, setContractorDocValue,])
    return (
        <>
        <div className='documents_status_three_container'>
            <div className="documents_status_section">
                <h2 className='title'>{t("documents_to_upload")}</h2>
                <p className='tagline'>{t("please_upload_document")}</p>
                <button className='delete-btn-1'
                    disabled={selectDocumentsForDelete?.length > 0 ? false : true}
                    onClick={()=> setDeleteDocShow(true)}
                >
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                    {t("delete")}
                </button>
                <div className="documents_status_item">
                    <DocumentStatusThree
                        dataTable={docType === "suppier" && getAllSupplierDocumentsById ||
                        docType === "contractor" && getAllContractorDocuments
                        
                    }
                        approve={true}
                        optionDownload={docType === "suppier" && "supplier_document" ||
                        docType === "contractor" && "contractor_document" 
                    }
                        isAllChecked={isAllChecked}
                        setIsAllChecked={setIsAllChecked}
                        selectDocumentsForDelete={selectDocumentsForDelete}
                        setSelectDocumentsForDelete={setSelectDocumentsForDelete}
                        setDocValue={docType === "suppier" &&  SetSupplierDocValue ||
                        docType === "contractor" && SetContractorDocValue}
                        createDocValue={docType === "suppier" && CreateSupplierDocValue ||
                        docType === "contractor" && CreateContractorDocValue}
                        downloadImg={DownloadProviderImage}
                    />
                </div>
            </div>
        </div>

        <DeleteModal
          show={deleteDocShow}
          onHide={() => setDeleteDocShow(false)}
          data={selectDocumentsForDelete}
          title_modal={t("delete_documents")}
          element_modal={t("documents")}
          isReset={setSelectDocumentsForDelete}
          isAllReset={setIsAllChecked}
        />
        </>
    )
}

export default UserDocuments