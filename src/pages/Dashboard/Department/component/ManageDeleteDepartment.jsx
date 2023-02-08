import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import cancel from '../../../../assets/images/ic-cancel.svg'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'

const ManageDeleteDepartment = (props) => {

    console.log(props)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";


    // const handleDeleteUser = () => {

    //     if (props.deleteitemname === "role") {
    //         setLoading(true)
    //         deleteRole(props.deleteid?.id).then(({ data: { data } }) => {
    //             toast.success("Role is deleted successfully..!")
    //             const body = {
    //                 order: true,
    //                 page: 0,
    //                 size: 4,
    //                 sortBy: "id"
    //             }
    //             dispatch(getEmployeeRoles(body));

    //             props.onHide();
    //             setLoading(false)
    //         }).catch(error => {
    //             toast.error("error in deleting role..!")
    //             setLoading(false)
    //         })
    //     } else if (props.deleteitemname === "user") {
    //         removeUserRole(props.deleteid?.id).then(({ data: { data } }) => {
    //             const body = {
    //                 order: true,
    //                 page: 0,
    //                 size: 4,
    //                 sortBy: "id"
    //             }
    //             dispatch(getEmployeeRoles(body))
    //             toast.success("user removed from this role")
    //             props.onHide();
    //             setLoading(false)
    //         }).catch(error => {
    //             toast.error("something went wrong in removeroletouser")
    //             setLoading(false)
    //         })
    //     }
    // }

    if (props?.modalis === "department") {

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
                    <p className="paragraph_deps">You are about to delete the department <span>Department Name</span>,
                        to apply the action. You must confirm the request.
                        All the user belong it will remove from it</p>
                }
                {
                    props.modalis === "user" &&
                    <p className="paragraph_deps">You are about to remove <span>Employee Name</span> from Department
                        <span>Department Name</span> , to apply the action. You must confirm the request. All the employees no longer have department.</p>
                }
                {props.modalis === "users" &&
                    <p className="paragraph_deps">You are about to remove <span> 11</span> Employees from Department
                        <span> Department Name</span>, to apply the action. You must confirm the request. All the employees no longer have department.</p>

                }

                <div className="d-flex">
                    <button className="custom_btn_cancel_gray_hover"
                        style={{ width: '180px' }}
                        onClick={() => props.onHide()}>{t("cancel")}</button>
                    <button className="custom_primary_btn_dark"
                        style={{ width: '180px' }}
                    // onClick={handleDeleteUser}
                    >
                        {t("confirm")}
                    </button>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default ManageDeleteDepartment