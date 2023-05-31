import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import cancel from '../../../../assets/images/ic-cancel.svg'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { DeleteDepartment, RemoveAlluserFromDepartment, RemoveUserFromDepartment } from "../../../../reduxToolkit/Department/DepartmentApi";

const ManageDeleteDepartment = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    // delete handler function
    const handleDelete = () => {

        if (props?.modalis === "department") {

            dispatch(DeleteDepartment(props?.data?.id))
            props.onHide()

        }
        if (props?.modalis === "user") {
            dispatch(RemoveUserFromDepartment(props?.data?.id))
            props.onHide()
        }
        if (props?.modalis === "users") {
            dispatch(RemoveAlluserFromDepartment(props?.data?.id))
            props.onHide()
        }

    }
    return (
        <Modal
            className="department_and_user_delete-modal"
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.modalis === "department" && t("delete_department")}
                    {props.modalis === "user" && t("remove_employee")}
                    {props.modalis === "users" && t("remove_employees")}
                </Modal.Title>
                <img onClick={() => props.onHide()} className="modalClose" src={cancel} alt="" />
            </Modal.Header>
            <Modal.Body className="department_modal_body">
                {
                    props.modalis === "department" &&
                    <p className="paragraph_deps">You are about to delete the department <span>{props?.data?.name}</span>,
                        to apply the action. You must confirm the request.
                        All the user belong it will remove from it</p>
                }
                {
                    props.modalis === "user" &&
                    <p className="paragraph_deps">You are about to remove <span>{props?.data?.Ename}</span> from Department
                        <span> {" "}{props?.data?.Dname}</span> , to apply the action. You must confirm the request. All the employees no longer have department.</p>
                }
                {props.modalis === "users" &&
                    <p className="paragraph_deps">You are about to remove <span> {props?.data?.Tuser}</span> Employees from Department
                        <span> {" "}{props?.data?.Dname}</span>, to apply the action. You must confirm the request. All the employees no longer have department.</p>

                }

                <div className="d-flex">
                    <button className="custom_btn_cancel_gray_hover"
                        style={{ width: '180px' }}
                        onClick={() => props.onHide()}>{t("cancel")}</button>
                    <button className="custom_primary_btn_dark"
                        style={{ width: '180px' }}
                        onClick={handleDelete}
                    >
                        {t("confirm")}
                    </button>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default ManageDeleteDepartment