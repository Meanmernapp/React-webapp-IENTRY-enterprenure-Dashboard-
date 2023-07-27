import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Card, CardActions, CardContent, Button, Typography, DialogTitle, DialogContent, IconButton, DialogActions, TextField, Box, FormControl, InputLabel, Select, MenuItem, Switch, Divider, Grid, FormHelperText, InputAdornment, List, ListItem, ListItemText } from '@mui/material';
import { DatePicker, DateRangePicker, LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useDispatch, useSelector } from "react-redux";
import cancel from '../../../../../assets/images/ic-cancel.svg'
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { GetWorkTimeAccess, GetAllWorkSchdule } from '../../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi';
import { getWorkTimeAccess, getAllWorkSchdule } from "../../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice";
import TablePagination from "@mui/material/TablePagination";
import NotFoundDataWarning from '../../../../../components/NotFoundDataWarning';
import dayId from '../../../../../hooks/dayId';
import NotFoundAnything from '../../../../../components/NotFoundAnything';

const AddWorkShiftsEnrollment = ({ open, onClose, workshiftsList, setWorkshiftsList, onFiltered, moduleId, option, finalArray }) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    // use hook importer
    const dispatch = useDispatch();

    const workShiftAccessTime = useSelector(getWorkTimeAccess);
    const workShiftSchdule = useSelector(getAllWorkSchdule);

    const [workshift, setWorkshift] = useState('');
    const [element, setElement] = useState([]);

    const textField = {
        textAlign: lCode === "ar" ? "right" : "left",
        "& 	.MuiOutlinedInput-notchedOutline": {
            textAlign: lCode === "ar" ? "right" : "left",
        },
        "& 	.MuiInputLabel-root": {
            fontSize: 12,
            marginTop: '2px',
            alignItems: 'center',
            display: 'flex',
            left: lCode === "ar" ? "inherit" : "0",
            right: lCode === "ar" ? "1.75rem" : "0",
            transformOrigin: lCode === "ar" ? "right" : "left",
            zIndex: 0,
        },
        "& 	.MuiFormLabel-filled": {
            marginTop: '-5px',
        }
    }

    // Pagination
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderby, setOrderby] = useState("id");
    let workshiftPagination = {
        order: true,
        page: page,
        size: rowsPerPage,
        sortBy: orderby,
    };
    // End Pagination

    useEffect(() => {
        if (workshift) {

            dispatch(GetWorkTimeAccess({ id: workshift, contractPagination: workshiftPagination }));
        } else {
            return null
        }

    }, [page, rowsPerPage])

    useEffect(() => {
        setPage(0)
        setRowsPerPage(10)
    }, [workshift])

    const handleAddWorkshift = (element) => {
        setWorkshiftsList([...workshiftsList, element]);
    };


    return (
        <Dialog className='add-workshift-enrollment-dialog' open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle>
                <p className='search-title'>{t("add_work_shift")}</p>
                <img onClick={() => {
                                    onClose()
                                    setWorkshift('')
                                }}
                className="modal-close" src={cancel} alt="" />
            </DialogTitle>

            <DialogContent className='dialog-content mt-0 pt-0'>

                <div className='create-enrollment-data'>
                    <div className='form-field position-relative start-50 translate-middle w-50 mt-5'>
                        <Box className='requiredData' sx={inputBox}>
                            <FormControl
                                fullWidth
                                sx={textField}
                            >
                                <InputLabel id="demo-simple-select-label" className='select-input-field'>
                                    {t("schedule_access")}
                                </InputLabel>
                                <Select size='small' label={t("schedule_access")}
                                    value={workshift}
                                    onChange={(e) => {
                                        setWorkshift(e.target.value);
                                        let id = e.target.value;
                                        dispatch(GetWorkTimeAccess({ id, contractPagination: workshiftPagination }));
                                        setElement({ id: e.target.value, name: workShiftSchdule.find(item => item?.id === e.target.value).name })
                                    }}
                                >
                                    {workShiftSchdule &&
                                        workShiftSchdule
                                        .filter((item) => !workshiftsList?.some((selected) => selected?.id === item?.id))
                                        .map((item) => (
                                          <MenuItem value={item?.id}>{item?.name}</MenuItem>
                                        ))
                                        }
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </div>



                {workshift && (

                    <div>

                        {
                            workShiftAccessTime?.totalElements !== 0 ? (

                                <>
                                    <div className="position-relative">
                                        
                                        <div className="access-sec mt-3">
                                            <span className="contractor-access-heading">{t("access_in_the_work_shift")}</span>
                                            <Grid container sx={{ mt: 1 }}>
                                                <Grid
                                                    item
                                                    xs={3}
                                                    className="contractor-access-table-heading"
                                                    sx={{ textAlign: "left", display: "flex", alignItems: "center", gap: "0.4rem" }}
                                                >
                                                    {/* <input type="checkbox" className="checkbox"
                                                checked={isAllChecked}
                                                onChange={handelDeleteAll}
                                            /> */}
                                                    {t("zones")?.toUpperCase()}
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={3}
                                                    className="contractor-access-table-heading"
                                                >
                                                    {t("day")?.toUpperCase()}
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={3}
                                                    className="contractor-access-table-heading"
                                                >
                                                    {t("from")?.toUpperCase()}
                                                </Grid>
                                                <Grid
                                                    item
                                                    xs={3}
                                                    className="contractor-access-table-heading"
                                                >
                                                    {t("to")?.toUpperCase()}
                                                </Grid>

                                            </Grid>
                                        </div>
                                        {workShiftAccessTime &&
                                            workShiftAccessTime?.content?.map((item) => {
                                                return (
                                                    <Grid container sx={{ mt: 1 }}>
                                                        <Grid
                                                            item
                                                            xs={3}
                                                            sx={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                                                            className="contractor-access-table-first"
                                                        >
                                                            {/* <input type="checkbox" className="checkbox"
                                                        checked={selectZoneWorkShift?.includes(item?.id)}
                                                        id={item?.id}
                                                        onChange={handleCheckboxChange}
                                                    /> */}
                                                            {item?.zoneName || "-"}
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={3}
                                                            className="contractor-access-table-data"
                                                        >
                                                            {dayId(item?.dayId)}
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={3}
                                                            className="contractor-access-table-data"
                                                        >
                                                            {item?.from || "-"}
                                                        </Grid>
                                                        <Grid
                                                            item
                                                            xs={3}
                                                            className="contractor-access-table-data"
                                                        >
                                                            {item?.to || "-"}
                                                        </Grid>
                                                    </Grid>
                                                );
                                            })}
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <TablePagination
                                            component="div"
                                            rowsPerPageOptions={[5, 10, 15]}
                                            labelRowsPerPage="Accces per page"
                                            count={workShiftAccessTime?.totalElements}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            rowsPerPage={rowsPerPage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="no_content">
                                    {/* <span className="contractor-access-heading">{t("access")}</span> */}
                                    <NotFoundAnything text={"NO Access"} mt={"0rem"} />

                                </div>
                            )}
                        <div className="create-enrollment-footer mt-3 row pr-2" >
                            <button className='btn_cancel_background_gray_hover col-6'
                                onClick={() => {
                                    onClose()
                                    setWorkshift('')
                                }}
                                style={{ color: "#BC0000" }}>
                                {t("cancel")}
                            </button>
                            <button
                                className='custom_primary_btn_dark col-6'
                                onClick={() => {
                                    handleAddWorkshift(element)
                                    onClose()
                                    setWorkshift('')
                                }}
                            >
                                {t('confirm').toUpperCase()}
                            </button>
                        </div>
                    </div>
                )}

       
            </DialogContent>

        </Dialog >
    )


}

export default AddWorkShiftsEnrollment;

const inputBox = {
    width: "100%",
    maxWidth: "100%",
    fontSize: "20px",
    height: "50px",
}
