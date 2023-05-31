import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import cancel from '../../../../assets/images/ic-cancel.svg'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { Box, TextField } from "@mui/material";
import { CreateDepartment } from "../../../../reduxToolkit/Department/DepartmentApi";
import { toast } from "react-toastify";

const AddNewDepartmentModal = (props) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const [department, setDepartment] = useState("")
    // add department  handler function
    const handleAddDepartment = () => {

        const data = {
            name: department
        }
        if (department) {
            dispatch(CreateDepartment(data))
            props.onHide();
            setDepartment("")
        } else {
            toast.warn("Name is required")
        }

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
                        onClick={handleAddDepartment}
                    >
                        {t("create")}
                    </button>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default AddNewDepartmentModal    