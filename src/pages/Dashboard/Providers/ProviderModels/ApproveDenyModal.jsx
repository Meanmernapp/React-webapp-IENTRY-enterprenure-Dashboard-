import { FormControl, InputLabel, MenuItem, Select, TextField, Grid } from "@mui/material";
import SelectInput from "@mui/material/Select/SelectInput";
import { Box } from "@mui/system";
import React, { useState } from "react";
import {
    Col,
    Container,
    Dropdown,
    DropdownButton,
    Form,
    Modal,
    Row,
    Tab,
    Table,



} from "react-bootstrap";
import { useDispatch } from "react-redux";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { ApproveExternalDocument } from "../../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import { t } from "i18next";

const ApproveDenyModal = (props) => {
    const [commentText, setCommentText] = useState("")
    const dispatch = useDispatch();
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="approveModal"

        >
            <button onClick={props.onHide} className="modal-close-btn">
                X
            </button>
            <span className="main-modal-heading">{t("not_approve_document")}</span>
            <div className="unlink-modal-body">
                <span className="modal-desc-text">Enter the reason what the document is not approved.</span>
                {/* <span className="modal-desc-text">confirm your password and then confirm the operation.</span> */}

                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ marginTop: "20px" }}>
                        <TextField size="small"
                            fullWidth


                            label="Decription"
                            id="description"
                            multiline
                            rows={2}
                            maxRows={4}


                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            InputLabelProps={{
                                style: {
                                    fontSize: "10px",
                                    fontWeight: 600,
                                    background: "#ffffff",
                                    padding: "0px 8px 0px 8px",
                                },
                            }} // font size of input label
                            inputProps={{
                                sx: {
                                    border: "none",
                                    outline: "none",
                                    fontSize: "10px",
                                    letterSpacing: "0px",
                                    color: "#707070",
                                    "&::placeholder": {
                                        color: "#707070",
                                        fontSize: "8px",
                                    },
                                },
                            }}
                        />
                    </Grid>

                </Grid>
                <div className="btn-div">
                    <button className="button-sec btn-cancel" style={{ color: 'red' }} onClick={props.onHide}>{t("cancel")}</button>
                    <button className="button-sec btn-confirm"
                        onClick={() => {
                            const data = {
                                comments: commentText,
                                id: props?.documentId,
                                validated: false
                            }
                            dispatch(ApproveExternalDocument(data))
                            props.onHide()
                        }}
                    >{t("confirm")?.toUpperCase()}</button>
                </div>
            </div>
        </Modal>
    )
}

export default ApproveDenyModal