import { useParams } from "react-router-dom";
import { TablePagination } from "@mui/material";
import company from '../../../../../assets/images/ic-building-outline.svg'
import companyImage from '../../../../../assets/images/Capture4.PNG'
import submitupload from '../../../../../assets/images/upload.PNG'
import { useEffect, useState } from "react";
import { createVehicleImgObject, ImagesByVehicleId, singleVehicleDetail } from "../../../../../reduxToolkit/CompanyVehicles/CompanyVehiclesApi";
import { useDispatch, useSelector } from "react-redux";
import NoEvent from "../../../Events/NoEvent";
import { uploadNewImage } from "../../../../../reduxToolkit/CompanyEmployees/CompanyEmployeesApi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'


const VehicleGallery = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    const { id } = useParams();
    let body;
    // const vehicleImgObject = useSelector(state => state?.CompanyVehiclesSlice?.vehicleImgObject);
    const imagesByVehicleIdList = useSelector(state => state?.CompanyVehiclesSlice?.imagesByVehicleIdList);
    const vehicleImgGallery = useSelector(state => state?.CompanyVehiclesSlice?.vehicleImgGallery);
    console.log(imagesByVehicleIdList)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [previewImage, setPreviewImage] = useState();
    const [toUpload, setToUpload] = useState();

    useEffect(() => {
        dispatch(singleVehicleDetail(id));
        body = {
            id: id,
            pagination: {
                order: true,
                page: page,
                size: rowsPerPage,
                sortBy: "id"
            }
        }
        dispatch(ImagesByVehicleId(body)).then(({ payload: { data: { data } } }) => {
            // dispatch(downloadVehicleImages(data?.content[1]?.id))
            // imagesByVehicleIdList?.content?.map((item => {
            // }))
        })

    }, [])

    const onImageChange = (e) => {
        setToUpload(e.target.files[0])
        const [file] = e.target.files;
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleUploadImg = () => {
        const body = {
            path: toUpload?.name,
            vehicle: {
                id: id
            }
        }

        if (toUpload?.size <= 512000) {
            dispatch(createVehicleImgObject(body)).then(({ payload: { data: { data } } }) => {
                let formData = new FormData();
                formData.append('id', data?.id);
                formData.append('option', "vehicle");
                formData.append('file', toUpload);
                dispatch(uploadNewImage(formData)).then(() => {
                    const body = {
                        id: id,
                        pagination: {
                            order: true,
                            page: page,
                            size: rowsPerPage,
                            sortBy: "id"
                        }
                    }
                    dispatch(ImagesByVehicleId(body))
                    setPreviewImage("")
                })
            })
        } else {
            toast.error("your image size is more than 500kb..!")
        }

    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        body = {
            id: id,
            pagination: {
                order: true,
                page: newPage,
                size: rowsPerPage,
                sortBy: "id"
            }
        }
        dispatch(ImagesByVehicleId(body));
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
        body = {
            id: id,
            pagination: {
                order: true,
                page: page,
                size: parseInt(event.target.value),
                sortBy: "id"
            }
        }
        dispatch(ImagesByVehicleId(body));
    };


    return (
        <>
            <div className="row">
                <div className="col-12 col-md-12 mt-5">
                    <p className="mb-2 infoEmpl_text">
                        {t('images')}
                        <img src={company} alt="vehicle" />
                    </p>
                    <div className="row my-4">
                        {
                            imagesByVehicleIdList?.content?.length !== 0 ?
                                <>
                                    {
                                        imagesByVehicleIdList?.content?.map(item => (
                                            <div className="col-md-3 mb-3" key={item}>
                                                <img
                                                    src={item?.image != null ? `data:image/png;base64,${item?.image}` : companyImage}
                                                    className="vehicleGallery"
                                                    alt="companyImage"
                                                />
                                            </div>
                                        ))
                                    }
                                    <div className="d-flex justify-content-center">
                                        <TablePagination
                                            component="div"
                                            rowsPerPageOptions={[2, 4, 6, 8]}
                                            count={imagesByVehicleIdList?.totalElements}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            labelRowsPerPage="Images per page"
                                            rowsPerPage={rowsPerPage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </div>
                                </>
                                :
                                <NoEvent title={t('images')} />
                        }
                    </div>
                </div>
                <div className="col-12">
                    <p className="mb-2 infoEmpl_text">
                        {t('upload_images')}
                    </p>
                    <div className="empdetail_c" style={{ height: "auto" }}>
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-6 mb-3">
                                <label
                                    htmlFor="file-input"
                                    className="dottedborderbox"
                                    style={{
                                        width: "70%",
                                        height: "130px",
                                        margin: "auto",
                                    }}
                                >
                                    <img
                                        src={submitupload}
                                        alt="submitupload"
                                        className="submitupload"
                                    />
                                    <input
                                        type="file"
                                        id="file-input"
                                        accept="image/*, video/*"
                                        onChange={onImageChange}
                                    />
                                    <p>
                                        drag {"&"} drop <br /> your image <br /> size 20 mb max
                                    </p>
                                </label>
                            </div>
                            <div className="col-5 mb-3">
                                {
                                    previewImage ?
                                        <img src={previewImage} className="vehicleGallery" alt="companyImage" /> : null
                                }
                            </div>
                        </div>
                        <div className="changeImgBottomDiv justify-content-center">
                            <button
                                className="changeImgCancelBtn"
                                onClick={() => setPreviewImage("")}
                            >
                                {t('cancel')}
                            </button>
                            <button
                                className="changeImgChangeBtn"
                                onClick={handleUploadImg}
                            >
                                {t('update_it')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
export default VehicleGallery;