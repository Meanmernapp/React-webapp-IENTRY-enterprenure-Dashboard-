import React from 'react'
import { Link } from 'react-router-dom';
import { t } from "i18next";
import eyeIcon from '../../../assets/eye-solid.svg'
import NotFoundDataWarning from '../../../components/NotFoundDataWarning';

const TableViewSuppliers = ({ userFor, isAllCheckedOrder, handleCheckboxChangeOrder, dataApi, handelDeleteAllOrders, selectOrderForDelete }) => {

    return (
        <div className="employee_list_view animated-div"
            style={{ width: "100%", paddingTop: "0rem" }}
        >
            {
                dataApi?.content?.length > 0 ?
                    <table style={{ width: "100%" }}>
                        <thead>
                            {
                                userFor == "employee" &&
                                <th className='first_head'>
                                    <input type="checkbox" className="checkbox"
                                        checked={isAllCheckedOrder}
                                        onChange={handelDeleteAllOrders}
                                    />
                                </th>
                            }
                            <th className='first_head'>{t("Folio")}</th>
                            {
                                userFor == "employee" &&
                                <>
                                <th>{t("supplier")}</th>
                            <th>{t("supplier_company")}</th>
                                </>
                            }
                            <th>{t("status")}</th>
                            <th>{t("supplier_employee")}</th>
                            <th>{t("supplier_vehicle")}</th>
                            <th>{t("item")}</th>
                            <th>{t("recieved_by")}</th>
                            <th>{t("delivered_date")}</th>
                            <th className='last'>{t("options")}</th>

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
                                                    <input type="checkbox" className="checkbox"
                                                        checked={selectOrderForDelete?.includes(item?.id)}
                                                        id={item?.id}
                                                        onChange={handleCheckboxChangeOrder}
                                                    />
                                                </td>
                                            }
                                            < td className='first' >
                                                {item?.folio || "-"}
                                            </td>
                                            {
                                                userFor == "employee" &&
                                                <>
                                                <td>{item?.supplier?.user?.name || "-"}</td>
                                            <td >{item?.supplier?.supplierCompanyName || "-"}</td>
                                                </>
                                            }
                                            <td>
                                                <p style={{
                                                    color: item?.status?.id == 28 && "gray" ||
                                                        item?.status?.id == 29 && "blue" ||
                                                        item?.status?.id == 30 && "yellow" ||
                                                        item?.status?.id == 36 && "red",
                                                    fontWeight: "bold"
                                                }}>
                                                    {item?.status?.name.split("_").join(" ")} </p>

                                            </td>

                                            <td > {item?.supplierEmployee?.user?.name || "-"} </td>
                                            <td>{item?.supplierVehicle?.vehicle?.brand || "-"} |{item?.supplierVehicle?.vehicle?.subBrand || "-"}</td>
                                            <td> {item?.item || "-"}</td>
                                            <td>{item?.userReceived || "-"}</td>
                                            <td> {deliveryData.toLocaleDateString("en-US")}</td>
                                            <td className='last_tr'>
                                                <Link to={"contractor-details"}
                                                    state={{ state: item }}>
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