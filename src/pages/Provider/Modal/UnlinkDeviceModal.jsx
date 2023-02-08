import React from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const UnlinkDeviceModal = (props) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <button onClick={props.onHide} className="modal-close-btn">
                X
            </button>
            <span className="main-modal-heading">{t("unlink_device")}</span>
            <div className="unlink-modal-body">
                <span className="modal-desc-text">Do you want to unpair the device? In order to be able to log in other.</span>
                <span className="modal-desc-text">confirm your password and then confirm the operation.</span>

                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ marginTop: "20px" }}>
                        <TextField size="small"
                            fullWidth


                            label={t("link_device")}
                            id="linkDevice"
                            //   value={}
                            //   onChange={(e) => setName(e.target.value)}
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
                            sx={{
                                textAlign: lCode === "ar" ? "right" : "left",
                                "& 	.MuiOutlinedInput-notchedOutline": {
                                    textAlign: lCode === "ar" ? "right" : "left",
                                },
                                "& 	.MuiInputLabel-root": {
                                    fontSize: 12,
                                    left: lCode === "ar" ? "inherit" : "0",
                                    right: lCode === "ar" ? "1.75rem" : "0",
                                    transformOrigin: lCode === "ar" ? "right" : "left"
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ position: "relative", marginBottom: "10px" }}>
                        <TextField size="small"
                            fullWidth
                            type="password"


                            label={t("password")}
                            id="password"
                            //   value={}
                            //   onChange={(e) => setName(e.target.value)}
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
                            sx={{
                                textAlign: lCode === "ar" ? "right" : "left",
                                "& 	.MuiOutlinedInput-notchedOutline": {
                                    textAlign: lCode === "ar" ? "right" : "left",
                                },
                                "& 	.MuiInputLabel-root": {
                                    fontSize: 12,
                                    left: lCode === "ar" ? "inherit" : "0",
                                    right: lCode === "ar" ? "1.75rem" : "0",
                                    transformOrigin: lCode === "ar" ? "right" : "left"
                                }
                            }}
                        />
                        <span className="input-icons"><VisibilityIcon /></span>
                    </Grid>
                </Grid>
                <div className="btn-div">
                    <button className="button-sec btn-cancel" onClick={props.onHide}>{t("cancel")}</button>
                    <button className="button-sec btn-confirm">{t("confirm")}</button>
                </div>
            </div>
        </Modal>
    )
}

export default UnlinkDeviceModal