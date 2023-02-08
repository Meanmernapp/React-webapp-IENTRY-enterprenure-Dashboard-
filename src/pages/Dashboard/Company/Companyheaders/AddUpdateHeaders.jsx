import React from 'react'
import { t } from 'i18next'
import ic_map_marker from '../../../../assets/images/ic-map-market.svg';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Box, Divider, Grid, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetHeaders, UpdateHeaders } from '../../../../reduxToolkit/headers/HeadersApi';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    clearField: {
        '&:hover': {
            backgroundColor: "#0000001A"
        }
    }
}));

const AddUpdateHeaders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const lCode = Cookies.get("i18next") || "en";
    const { headersList } = useSelector(state => state.headersSlice);
    // console.log(headersList)

    const [headerObj, setHeaderObj] = useState({
        header1: "",
        header2: "",
        header3: "",
        header4: "",
        header5: "",
        header6: "",
        header7: "",
        header8: "",
        header9: "",
        header10: "",
        header11: "",
        header12: "",
        header13: "",
        header14: "",
        header15: ""
    })





    const handleClearFields = () => {
        setHeaderObj({
            header1: "",
            header2: "",
            header3: "",
            header4: "",
            header5: "",
            header6: "",
            header7: "",
            header8: "",
            header9: "",
            header10: "",
            header11: "",
            header12: "",
            header13: "",
            header14: "",
            header15: ""
        })

    }

    useEffect(() => {
        dispatch(GetHeaders()).unwrap().then(({ data: { data } }) => {
            setHeaderObj({
                header1: data?.header1 || "header_1",
                header2: data?.header2 || "header_2",
                header3: data?.header3 || "header_3",
                header5: data?.header4 || "header_4",
                header6: data?.header5 || "header_5",
                header7: data?.header6 || "header_6",
                header8: data?.header7 || "header_7",
                header9: data?.header8 || "header_8",
                header10: data?.header9 || "header_9",
                header11: data?.header10 || "header_10",
                header12: data?.header11 || "header_11",
                header13: data?.header12 || "header_12",
                header14: data?.header13 || "header_13",
                header15: data?.header14 || "header_14",
                header4: data?.header15 || "header_15",
            })
        })
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target
        setHeaderObj({ ...headerObj, [name]: value })
    }

    const handleHeaders = () => {
        headerObj.id = headersList?.id
        headerObj.company = {
            id: headersList?.company?.id
        }
        dispatch(UpdateHeaders(headerObj)).then(() => {
            navigate("/dashboard/employee/company")
        })
    }


    const textField = {
        textAlign: lCode === "ar" ? "right" : "left",
        textTransform: "uppercase",
        "& 	.MuiOutlinedInput-notchedOutline": {
            textAlign: lCode === "ar" ? "right" : "left",
        },
        "& 	.MuiInputLabel-root": {
            fontSize: 12,
            left: lCode === "ar" ? "inherit" : "0",
            right: lCode === "ar" ? "1.75rem" : "0",
            transformOrigin: lCode === "ar" ? "right" : "left"
        }
    }


    return (
        <div className='company-header'>
            <div className='head'>
                <div className='headLeft'>
                    <Link to="/dashboard/employee/company">
                        <i className="fa fa-arrow-left" aria-hidden="true" style={{
                            transform: lCode === "ar" ? "scaleX(-1)" : "",
                            margin: "0 10px"
                        }}></i>
                    </Link>
                    <h2>{t('custom headers')}</h2>
                </div>
            </div>
            <Box className='headerMain'>
                {/* <p className='extraDataTitle'>{t("extra data users")}</p>
                <Divider className='hrLine' /> */}

                <Grid display='flex' gap="0.8rem" alignItems="baseline">
                    <p className='extraDataTitle'>{t('extra data users')}</p>
                    <div className='hrLine'></div>
                </Grid>
                {/* clear all field */}
                <Grid container width="96%" justifyContent='flex-end'>
                    <Grid container alignItems='center' gap='0.5rem'
                        width="auto"
                        className={classes?.clearField}
                        onClick={() => handleClearFields()}
                    >
                        <Grid item>
                            <Typography sx={{ color: "#BC0000", fontSize: "12px" }}>{t("clean_all_fields")}</Typography>
                        </Grid>
                        <Grid item sx={{ color: "#BC0000" }}>
                            {/* <Icon>delete</Icon> */}
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </Grid>
                    </Grid>

                </Grid>
            </Box>
            <Grid container spacing={2} justifyContent="center" >
                <Grid item xs={12} md={5}>
                    <TextField size="small"
                        fullWidth

                        label={t("header 1")}
                        name="header1"
                        value={headerObj?.header1}
                        onChange={(e) => handleChange(e)}
                        sx={textField}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField size="small"
                        fullWidth

                        label={t("header 2")}
                        name="header2"
                        value={headerObj?.header2}
                        onChange={(e) => handleChange(e)}
                        sx={textField}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField size="small"
                        fullWidth

                        label={t("header 3")}
                        name="header3"
                        value={headerObj?.header3}
                        onChange={(e) => handleChange(e)}
                        sx={textField}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField size="small"
                        fullWidth

                        label={t("header 4")}
                        name="header4"
                        value={headerObj?.header4}
                        onChange={(e) => handleChange(e)}
                        sx={textField}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField size="small"
                        fullWidth

                        label={t("header 5")}
                        name="header5"
                        value={headerObj?.header5}
                        onChange={(e) => handleChange(e)}
                        sx={textField}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField size="small"
                        fullWidth

                        label={t("header 6")}
                        name="header6"
                        value={headerObj?.header6}
                        onChange={(e) => handleChange(e)}
                        sx={textField}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField size="small"
                        fullWidth

                        label={t("header 7")}
                        name="header7"
                        value={headerObj?.header7}
                        onChange={(e) => handleChange(e)}
                        sx={textField}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField size="small"
                        fullWidth

                        label={t("header 8")}
                        name="header8"
                        value={headerObj?.header8}
                        onChange={(e) => handleChange(e)}
                        sx={textField}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField size="small"
                        fullWidth

                        label={t("header 9")}
                        name="header9"
                        value={headerObj?.header9}
                        onChange={(e) => handleChange(e)}
                        sx={textField}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField size="small"
                        fullWidth

                        label={t("header 10")}
                        name="header10"
                        value={headerObj?.header10}
                        onChange={(e) => handleChange(e)}
                        sx={textField}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField size="small"
                        fullWidth

                        label={t("header 11")}
                        name="header11"
                        value={headerObj?.header11}
                        onChange={(e) => handleChange(e)}
                        sx={textField}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField size="small"
                        fullWidth

                        label={t("header 12")}
                        name="header12"
                        value={headerObj?.header12}
                        onChange={(e) => handleChange(e)}
                        sx={textField}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField size="small"
                        fullWidth

                        label={t("header 13")}
                        name="header13"
                        value={headerObj?.header13}
                        onChange={(e) => handleChange(e)}
                        sx={textField}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField size="small"
                        fullWidth

                        label={t("header 14")}
                        name="header4"
                        value={headerObj?.header4}
                        onChange={(e) => handleChange(e)}
                        sx={textField}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <TextField size="small"
                        fullWidth

                        label={t("header 15")}
                        name="header15"
                        value={headerObj?.header15}
                        onChange={(e) => handleChange(e)}
                        sx={textField}
                    />
                </Grid>
                <Grid item xs={12} md={5}> </Grid>
                <Grid item xs={12} md={10} align="right">
                    <button
                        className='create'
                        onClick={() => handleHeaders()}
                    >
                        {t("save extra data headers")}
                    </button>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddUpdateHeaders

