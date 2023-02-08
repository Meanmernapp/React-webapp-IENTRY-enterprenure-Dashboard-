import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FormControl } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { ProviderVehicleSortList } from "../../../reduxToolkit/Providers/providersApi";



const FilterModal = ({ setShowFilter, handlFilters }) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    const [orderby, setOrderby] = useState();
    const [sort, setSort] = useState();

    const { providerVehicleSortList } = useSelector(state => state?.providersSlice)
    console.log(providerVehicleSortList)

    useEffect(() => {
        handlFilters(orderby, sort);
        // orderByApi();
        dispatch(ProviderVehicleSortList())
    }, [orderby, sort])

    return (
        <div
            className="col-md-3 filter_parent_providers">
            <p className="filter_header">
                {t("filters")}
                <CloseIcon
                    style={{ marginTop: "10px", color: "red", cursor: "pointer" }}
                    onClick={() => setShowFilter(false)}
                />
            </p>
            <div className="filter_body d-flex justify-content-between py-3">
                <div className="col-md-12 filter_body">
                    <p > {t("attributes")}</p>
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
                        <FormControl fullWidth sx={{
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
                        }}>
                            <InputLabel> {t("order_by")}</InputLabel>
                            <Select size="small"

                                value={orderby}
                                label={t("order_by")}
                                onChange={(e) => setOrderby(e.target.value)}
                            >
                                {
                                    providerVehicleSortList?.map(value => (
                                        <MenuItem value={value}>{value}</MenuItem>
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
                        <FormControl fullWidth sx={{
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
                        }}>
                            <InputLabel id="demo-simple-select-label">{t("sort")}</InputLabel>
                            <Select size="small"
                                value={sort}
                                label={t("sort")}
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <MenuItem value={10}>ASC</MenuItem>
                                <MenuItem value={20}>DES</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>
        </div>
    );
};

export default FilterModal;