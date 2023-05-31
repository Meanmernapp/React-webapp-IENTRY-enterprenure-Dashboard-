import React from 'react'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from 'react-router-dom';
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';


const UpdateOrder = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    return (
        <>
            <div className="head">
                <div className="headLeft">
                    <h2>
                        <Link to="/dashboard/supplier/providers-outlet">
                            <ArrowBackIcon
                                style={{
                                    color: "#146F62",
                                    fontSize: "30px",
                                    marginRight: "30px",
                                }}
                            />
                        </Link>
                        {t("update_order")}
              
                        {/* {approveDocument && "APPROVE DOCUMENTS"} */}
                    </h2>


                </div>
            </div>
            <div className="complete_order_container">
                <div className='complete_order_body'>
                    <div className='left'>
                        <h4>{t("data")}</h4>
                        <div className='left_conatiner'>
                            <div className='card_header'>
                                <h4>{t("supplier_information")}</h4>
                                <p><span>GMT | </span>Servicios Especializados Agropecuarios</p>
                                <h6>{t("company")}</h6>
                            </div>

                            <div className='card_body'>
                                <h4 className='mb-3'>{t("delivery_information")}</h4>
                                <div className="card_body_item">
                                    <h5>{t("eta")}</h5>
                                    <p>26/08/2023 11:30</p>
                                </div>
                                <div className="card_body_item">
                                    <h5>{t("corporate")}</h5>
                                    <p>IBL Corporate</p>
                                </div>
                                <div className="card_body_item">
                                    <h5>{t("item")}</h5>
                                    <p>5 boxes of Soap</p>
                                </div>
                                <div className="card_body_item">
                                    <h5>{t("description")}</h5>
                                    <p>Take care, ítems fragile</p>
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className='right'>
                        <h4>{t("provider_data")}</h4>
                        <div className='right_container'>
                            <Grid item xs={12}>
                                <Box sx={{ mt: "6px" }}>
                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">{t("employee")}</InputLabel>
                                        <Select size="small"

                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // defaultValue="EMPLOYEE"
                                            // value={employee}
                                            label={t("employee")}
                                            // onChange={(e) => setEmployee(e.target.value)}
                                            sx={{
                                                fontSize: "10px",
                                                padding: "3px 3px 3px 10px",
                                            }}
                                        >
                                            <MenuItem
                                                value={10}
                                                sx={{
                                                    fontSize: "10px",
                                                }}
                                            >
                                                Active
                                            </MenuItem>
                                            <MenuItem
                                                value={20}
                                                sx={{
                                                    fontSize: "10px",
                                                }}
                                            >
                                                In-active
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ mt: "4rem" }}>
                                    <FormControl fullWidth >
                                        <InputLabel id="demo-simple-select-label">{t("vehicle")}</InputLabel>
                                        <Select size="small"

                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            // defaultValue="EMPLOYEE"
                                            // value={employee}
                                            label={t("vehicle")}
                                            // onChange={(e) => setEmployee(e.target.value)}
                                            sx={{
                                                fontSize: "10px",
                                                padding: "3px 3px 3px 10px",
                                            }}
                                        >
                                            <MenuItem
                                                value={10}
                                                sx={{
                                                    fontSize: "10px",
                                                }}
                                            >
                                                Active
                                            </MenuItem>
                                            <MenuItem
                                                value={20}
                                                sx={{
                                                    fontSize: "10px",
                                                }}
                                            >
                                                In-active
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </div>

                    </div>
                </div>

                <div className='footer'>
                    <button>{t("update_order")}</button>
                </div>
            </div>
        </>
    )
}

export default UpdateOrder