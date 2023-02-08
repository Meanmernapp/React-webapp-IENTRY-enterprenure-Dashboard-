import React, { useEffect } from 'react';
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { GetHeaders } from '../../../../../reduxToolkit/headers/HeadersApi';

const DetailExtraData = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const lCode = Cookies.get("i18next") || "en";
    const employeeDetail = useSelector(state => state?.CompanyEmployeesSlice?.singleEmployeeDetail);
    const { headersList } = useSelector(state => state.headersSlice);

    const singleEmployeeWithId = useSelector(state => state?.CompanyEmployeesSlice?.singleEmployeeWithId);
    console.log("jjjjjjjlll", singleEmployeeWithId)

    console.log(employeeDetail)
    useEffect(() => {
        dispatch(GetHeaders())
    }, [])

    return (
        <div
            className="col-lg-6 col-md-6 col-12"
            style={{
                paddingRight: "15px",
                paddingLeft: "15px"
            }}
        >
            <div className="infoEmpl_text mb-2">{t('extra_data')}</div>
            <div
                className="main_content empdetail_c"
                style={{
                    height: "90%",
                }}
            >
                <Table
                    style={{
                        width: "100%",
                        border: "hidden",
                        marginRight: "15px",
                        marginLeft: "15px",
                    }}
                >
                    <tbody>
                        <tr style={{ border: "hidden" }}>
                            <td>
                                <p>{headersList?.header1 || "header_1"}</p>
                                <h2>{singleEmployeeWithId?.user?.extraData?.field1 || "-"}</h2>
                            </td>
                            <td>
                                <p>{headersList?.header2 || "header_2"}</p>
                                <h2>{singleEmployeeWithId?.user?.extraData?.field2 || "-"}</h2>
                            </td>
                        </tr>
                        <tr style={{ border: "hidden" }}>
                            <td>
                                <p>{headersList?.header3 || "header_3"}</p>
                                <h2>{singleEmployeeWithId?.user?.extraData?.field3 || "-"}</h2>
                            </td>
                            <td>
                                <p>{headersList?.header4 || "header_4"}</p>
                                <h2>{singleEmployeeWithId?.user?.extraData?.field4 || "-"}</h2>
                            </td>
                        </tr>
                        <tr style={{ border: "hidden" }}>
                            <td>
                                <p>{headersList?.header5 || "header_5"}</p>
                                <h2>{singleEmployeeWithId?.user?.extraData?.field5 || "-"}</h2>
                            </td>
                            <td>
                                <p>{headersList?.header6 || "header_6"}</p>
                                <h2>{singleEmployeeWithId?.user?.extraData?.field6 || "-"}</h2>
                            </td>
                        </tr>
                        <tr style={{ border: "hidden" }}>
                            <td>
                                <p>{headersList?.header7 || "header_7"}</p>
                                <h2>{singleEmployeeWithId?.user?.extraData?.field7 || "-"}</h2>
                            </td>
                            <td>
                                <p>{headersList?.header8 || "header_8"}</p>
                                <h2>{singleEmployeeWithId?.user?.extraData?.field8 || "-"}</h2>
                            </td>
                        </tr>
                        <tr style={{ border: "hidden" }}>
                            <td>
                                <p>{headersList?.header9 || "header_9"}</p>
                                <h2>{singleEmployeeWithId?.user?.extraData?.field9 || "-"}</h2>
                            </td>
                            <td>
                                <p>{headersList?.header10 || "header_10"}</p>
                                <h2>{singleEmployeeWithId?.user?.extraData?.field10 || "-"}</h2>
                            </td>
                        </tr>
                        <tr style={{ border: "hidden" }}>
                            <td>
                                <p>{headersList?.header11 || "header_11"}</p>
                                <h2>{singleEmployeeWithId?.user?.extraData?.field11 || "-"}</h2>
                            </td>
                            <td>
                                <p>{headersList?.header12 || "header_12"}</p>
                                <h2>{singleEmployeeWithId?.user?.extraData?.field12 || "-"}</h2>
                            </td>
                        </tr>
                        <tr style={{ border: "hidden" }}>
                            <td>
                                <p>{headersList?.header13 || "header_13"}</p>
                                <h2>{singleEmployeeWithId?.user?.extraData?.field13 || "-"}</h2>
                            </td>
                            <td>
                                <p>{headersList?.header14 || "header_14"}</p>
                                <h2>{singleEmployeeWithId?.user?.extraData?.field14 || "-"}</h2>
                            </td>
                        </tr>
                        <tr style={{ border: "hidden" }}>
                            <td>
                                <p>{headersList?.header15 || "header_15"}</p>
                                <h2>{singleEmployeeWithId?.user?.extraData?.field15 || "-"}</h2>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default DetailExtraData