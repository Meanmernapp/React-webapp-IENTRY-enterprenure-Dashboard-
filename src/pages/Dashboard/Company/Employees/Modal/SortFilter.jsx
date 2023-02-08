import React, { useEffect, useState } from "react";
import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { Button, ButtonGroup } from "react-bootstrap";
import { FormControl } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { orderByEmployees } from "../../../../../Apis/CompanyEmployee";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'


const SortFilter = ({ setModalShow, handlFilters }) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    // const [week, setWeek] = useState();
    // const [year, setYear] = useState();
    const [orderby, setOrderby] = useState("status.id");
    const [orderbyArray, setOrderbyArray] = useState();
    const [sort, setSort] = useState("asc");

    // const [orderby, setOrderby] = useState();
    // const [sort, setSort] = useState();


    const orderByApi = () => {
        orderByEmployees().then(({ data: { data } }) => {
            setOrderbyArray(data)
            console.log(data)
        }).catch(error => {
            // toast.error("something went wrong.")
        })
    }

    useEffect(() => {
        handlFilters(orderby, sort);
        orderByApi();
    }, [orderby, sort])



    return (
        <div className="col-md-3 filter_parent pb-4">
            <p className="filter_header">
                {t('filters')}
                <CloseIcon
                    style={{ marginTop: "10px", color: "red", cursor: "pointer" }}
                    onClick={() => setModalShow(false)}
                />
            </p>
            <div
                className="filter_body"
                style={{ display: "flex", justifyContent: "space-between" }}
            >
                <div className="col-md-12">
                    <p>{t('attributes')}</p>
                    <Box
                        style={{ marginTop: "20px !important" }}
                        className="mt-2"
                        sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel>{t('order_by')}</InputLabel>
                            <Select size="small"
                                value={orderby}
                                label={t('order_by')}
                                onChange={(e) => setOrderby(e.target.value)}
                            >
                                {
                                    orderbyArray?.map(item => (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box
                        className="mt-2"
                        sx={{
                            width: "100%",
                            maxWidth: "100%",
                            fontSize: "20px",
                            height: "40px",
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">{t('sort')}</InputLabel>
                            <Select size="small"
                                value={sort}
                                label={t('sort')}
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <MenuItem value="asc">ASC</MenuItem>
                                <MenuItem value="des">DES</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                {/* <div className="col-md-6 dates_week_part">
                    <p>Dates</p>
                    <ButtonGroup
                        className="filter_btn_group"
                        style={{ width: "100%", margin: "20px", padding: "0px 40px" }}
                        variant="outlined"
                        aria-label="outlined button group"
                    >
                        <Button>Day</Button>
                        <Button>Month</Button>
                        <Button>Week</Button>
                        <Button>Year</Button>
                    </ButtonGroup>

                    <div
                        className="week_year_inputfield"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "20px",
                            marginLeft: "30px",
                        }}
                    >
                        <Box
                            className="mt-2"
                            style={{ marginRight: "10px" }}
                            sx={{
                                width: "100%",
                                maxWidth: "100%",
                                fontSize: "20px",
                                height: "40px",
                            }}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">WEEK</InputLabel>
                                 <Select size="small"
                                    value={week}
                                    label="WEEK"
                                    onChange={(e) => setWeek(e.target.value)}
                                >
                                    <MenuItem value={10}>WEEK 1</MenuItem>
                                    <MenuItem value={20}>WEEK 2</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box
                            className="mt-2"
                            sx={{
                                width: "100%",
                                maxWidth: "100%",
                                fontSize: "20px",
                                height: "40px",
                            }}
                        >
                            <FormControl fullWidth>
                                <InputLabel>YEAR</InputLabel>
                                 <Select size="small"
                                    value={year}
                                    label="YEAR"
                                    onChange={(e) => setYear(e.target.value)}
                                >
                                    <MenuItem value={10}>2021</MenuItem>
                                    <MenuItem value={20}>2022</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div> */}

            </div>
        </div>
    )
}

export default SortFilter