import React from 'react';
import { Table } from "react-bootstrap";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'

const DetailContract = ({ employeeDetail }) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    return (
        <>
            <div className="infoEmpl_text mb-2">{t('contract')}</div>
            <div
                style={{
                    height: "10rem !important"
                }}
                className="main_content empdetail_c1"
            >
                <div className="row p-3">
                    <Table style={{ border: "hidden" }}>
                        <tbody>
                            <tr style={{ border: "hidden" }}>
                                <td>
                                    <p>{t('role')}</p>
                                </td>
                                <td>
                                    <p>{t('employee_id')}</p>
                                </td>
                                <td>
                                    <p>{t('end_date')}</p>
                                </td>
                            </tr>
                            <tr style={{ border: "hidden", }}>
                                <td>
                                    <h2>{employeeDetail?.role}</h2>
                                </td>
                                <td>
                                    <h2>{employeeDetail?.employeeId}</h2>
                                </td>
                                <td>
                                    <h2>{"not found in list"}</h2>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>{t('work_station')}</p>
                                </td>
                                <td>
                                    <p>{t('contract_status')}</p>
                                </td>
                                <td>
                                    <p>{t('start_date')}</p>
                                </td>
                            </tr>
                            <tr style={{ border: "hidden" }}>
                                <td>
                                    <h2>{employeeDetail?.workStation}</h2>
                                </td>
                                <td>
                                    <h2>{"not found in list"}</h2>
                                </td>
                                <td>
                                    <h2>{"not found in list"}</h2>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}

export default DetailContract