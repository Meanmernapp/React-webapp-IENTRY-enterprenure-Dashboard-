import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import cancel from '../../../../assets/images/ic-cancel.svg'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { Box, TextField } from "@mui/material";

const AddNewDepartmentModal = (props) => {

    console.log(props)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const [department, setDepartment] = useState("")


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
            className="department_add_modal"
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t("add_department")}

                </Modal.Title>
                <img onClick={() => {
                    props.onHide();
                    setDepartment("")
                }} className="modalClose" src={cancel} alt="" />
            </Modal.Header>
            <Modal.Body className="department_modal_body">

                <label htmlFor="department" className="paragraph_title">
                    {t("enter_the_name_of_department")}
                </label>
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "100%",
                        fontSize: "20px",
                        height: "50px",
                        marginBottom: '1rem'
                    }}
                >
                    <TextField size="small"
                        fullWidth

                        label={t("department")}
                        id="department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    // sx={textField}
                    />
                </Box>

                <div className="d-flex">
                    <button className="custom_btn_cancel_gray_hover"
                        style={{ width: '180px' }}
                        onClick={() => {
                            props.onHide()
                            setDepartment("")
                        }}>{t("cancel")}</button>
                    <button className="custom_primary_btn_dark"
                        style={{ width: '180px' }}

                    // onClick={handleDeleteUser}
                    >
                        {t("create")}
                    </button>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default AddNewDepartmentModal