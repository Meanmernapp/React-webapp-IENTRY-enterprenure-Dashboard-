import React from 'react'
import { Link } from 'react-router-dom';
import { t } from "i18next";
import eyeIcon from '../../../assets/eye-solid.svg'
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';
import { status } from '../../../enums/statusEnum';
import { DetailsEmployeeProviderOrder } from "../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Tooltip } from '@mui/material';



const TableViewSuppliers = ({ userFor, isAllCheckedOrder, handleCheckboxChangeOrder, dataApi, handelDeleteAllOrders, selectOrderForDelete }) => {

    const dispatch = useDispatch()

    return (
        <div className="panelTables animated-div px-1 mt-1"
            style={{ width: "100%", paddingTop: "0rem" }}
        >
            {
                dataApi?.content?.length > 0 ?
                    <table style={{ width: "100%" }}>
                        <thead>
                            {
                                userFor == "employee" &&
                                <th className='first_head'>
                                    <Tooltip title={t("de_/_select_all").toUpperCase()} placement="top">
                                        <Checkbox
                                            className="grid-checkall checkbox"
                                            checked={isAllCheckedOrder}
                                            onChange={handelDeleteAllOrders}
                                            size="small"
                                        />
                                    </Tooltip>
                                    {/* <input type="checkbox" className="checkbox"
                                        checked={isAllCheckedOrder}
                                        onChange={handelDeleteAllOrders}
                                    /> */}
                                </th>
                            }
                            <th className='first_head'>{t("Folio")}</th>
                            {
                                userFor == "employee" &&
                                <>
                                    <th>{t("supplier")}</th>
                                    <th>{t("company")}</th>
                                </>
                            }
                            <th>{t("status")}</th>
                            <th>{t("supplier_employee")}</th>
                            <th>{t("supplier_vehicle")}</th>
                            <th>{t("item")}</th>
                            <th>{t("received_by")}</th>
                            <th>{t("delivered_date")}</th>
                            <th className='last'>{t("details")}</th>

                        </thead>
                        <tbody>

                            {
                                dataApi?.content?.map((item, index) => {
                                    const deliveryData = new Date(item?.deliveryDate);

                                    return (
                                        <tr key={item?.id}>
                                            {
                                                userFor == "employee" &&
                                                <td className='first'>
                                                    <Checkbox
                                                        className="grid-checkall checkbox"
                                                        checked={selectOrderForDelete?.includes(item?.id)}
                                                        id={item?.id}
                                                        onChange={handleCheckboxChangeOrder}
                                                        size="small"
                                                    />
                                                    {/* <input type="checkbox" className="checkbox"
                                                        checked={selectOrderForDelete?.includes(item?.id)}
                                                        id={item?.id}
                                                        onChange={handleCheckboxChangeOrder}
                                                    /> */}
                                                </td>
                                            }
                                            < td className='first align-middle' >
                                                {item?.folio || "-"}
                                            </td>
                                            {
                                                userFor == "employee" &&
                                                <>
                                                    <td style={{ maxWidth: 250 }}>
                                                        {(() => {
                                                            const supplierFullName = (item.supplierName || '') + ' ' + (item.supplierLastName || '') + ' ' + (item.supplierSecondLastName || '');
                                                            return (
                                                                <span className='align-middle' title={supplierFullName} style={{ textTransform: "none", maxWidth: "100%", display: "inline-block", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                                                    {supplierFullName.trim() !== '' ? supplierFullName : "-"}
                                                                </span>
                                                            );
                                                        })()}
                                                    </td>
                                                    <td >
                                                        {(() => {
                                                            const companyFullName = (item.supplierCompanyAcronym || "") + ' | ' + (item.supplierCompanyName || '');
                                                            return (
                                                                <>
                                                                    {companyFullName || "-"}
                                                                </>
                                                            );
                                                        })()}
                                                    </td>
                                                </>
                                            }
                                            <td>
                                                <span className={"viewcard-container__status " + " " + status[item?.statusId]}>
                                                    {t(status[item?.statusId])}</span></td>

                                            <td style={{ maxWidth: 250 }}>
                                                {(() => {
                                                    const supplierEmployeeFullName = (item.supplierEmployeeName || '') + ' ' + (item.supplierEmployeeLastName || '') + ' ' + (item.supplierEmployeeSecondLastName || '');
                                                    return (
                                                        <span title={supplierEmployeeFullName} style={{ textTransform: "none", maxWidth: "100%", display: "inline-block", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                                            {supplierEmployeeFullName.trim() !== '' ? supplierEmployeeFullName : "-"}
                                                        </span>
                                                    );
                                                })()}
                                            </td>
                                            <td>{(() => {
                                                const vehicleFullName = (item.supplierVehicleBrand || '') + ' | ' + (item.supplierVehicleSubBrand || '');
                                                return (
                                                    <span style={{ textTransform: "none", maxWidth: "100%", display: "inline-block", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>
                                                        {(vehicleFullName === '' || vehicleFullName.trim() === '|') ? "-" : vehicleFullName}
                                                    </span>
                                                );
                                            })()}</td>
                                            <td> {item?.item || "-"}</td>
                                            <td>{item?.userReceivedName || "-"}</td>
                                            <td> {deliveryData.toLocaleDateString("en-US")}</td>
                                            <td className='last_tr'>
                                                <Link to={"order-details"}
                                                    state={{ state: item }}
                                                    onClick={() => {
                                                        dispatch(DetailsEmployeeProviderOrder(item?.id))
                                                        localStorage.setItem("providerOrderDetail", item?.id)
                                                    }}
                                                >
                                                    <img
                                                        style={{ cursor: "pointer" }}
                                                        src={eyeIcon} alt="eye"
                                                    />
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table> :
                    <NotFoundDataWarning text={t("no_documents")} />
            }

        </div>
    )
}

export default TableViewSuppliers