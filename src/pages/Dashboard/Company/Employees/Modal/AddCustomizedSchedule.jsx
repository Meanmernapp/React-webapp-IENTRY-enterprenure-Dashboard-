import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Card, CardActions, CardContent, Checkbox, Button, Typography, DialogTitle, DialogContent, IconButton, DialogActions, TextField, Box, FormControl, InputLabel, Select, MenuItem, Switch, Divider, Grid, FormHelperText, InputAdornment, List, ListItem, ListItemText } from '@mui/material';
import { DatePicker, DateRangePicker, LocalizationProvider, DesktopDatePicker, TimePicker } from '@mui/lab';
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
import { GetZoneTree } from '../../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsApi';
import { getZonetree } from '../../../../../reduxToolkit/EmployeeContractors/EmployeeContractorsSlice';
import WorkShiftTreeView from '../../WorkShift/WorkShiftTreeView';
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import { CreateWorkShiftAccess } from '../../../../../reduxToolkit/CompanyWorkShift/CompanyWorkShiftApi';
import { toast } from "react-toastify";
import DeleteIcon from "../../../../../assets/images/redTrash.svg";

const AddCustomizedSchedule = ({ open, onClose, customizedList, setCustomizedList}) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    // use hook importer
    const dispatch = useDispatch();

    const workShiftAccessTime = useSelector(getWorkTimeAccess);
    const workShiftSchdule = useSelector(getAllWorkSchdule);
    const zoneData = useSelector(getZonetree);

    // use state hook  for local state managment

    const [fromValue, setfromValue] = useState(new Date("2014-08-18T00:00:00"));
    const [toValue, setToValue] = useState(new Date("2014-08-18T00:00:00"));
    const [allDays, setAllDays] = useState(false);
    const [allTime, setAllTime] = useState(false);
    const [checked, setChecked] = useState([]);
    const [isAllChecked, setIsAllChecked] = useState(false)
    const [dayArray, setDayArray] = useState([])
    // const [accessArray, setAccessArray] = useState([]);
    // const [accessArray, setAccessArray] = useState(customizedList);
    const [workshift, setWorkshift] = useState('');
    const [accessCustomized, setAccessCustomized] = useState([])

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
    let contractPagination = {
        order: true,
        page: page,
        size: rowsPerPage,
        sortBy: orderby,
    };
    // End Pagination

    // this function control select all id or unSelect all
    const handelZoneCheckAll = (e) => {
        setIsAllChecked(e.target.checked)
        if (e.target.checked) {
            const selectAllIds = getAllItemIds(zoneData);
            setChecked(selectAllIds)
            console.log(checked)
        } else {
            setChecked([])
        }

    }

    function deepEqual(obj1, obj2) {
        if (obj1 === obj2) {
            return true;
        }

        if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
            return false;
        }

        const keys1 = Object.keys(obj1).slice(0, 4);
        const keys2 = Object.keys(obj2).slice(0, 4);

        if (keys1?.length !== keys2?.length) {
            return false;
        }

        for (let key of keys1) {
            if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
                return false;
            }
        }

        return true;
    }

    // this funtion to look into all child and sub child and get return ids
    function getAllItemIds(data) {
        let ids = [];
        for (let i = 0; i < data?.length; i++) {
            const item = data[i];
            ids.push(`${item?.id},${item?.name}`);
            if (item?.children && item?.children?.length > 0) {
                const childIds = getAllItemIds(item.children);
                ids = ids?.concat(childIds);
            }
        }
        return ids;
    }

    //handle selected and unselected days list
    const handleCheck = (event) => {
        var updatedList = [...checked];
        console.log(checked)
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList?.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    useEffect(() => {
        if (workshift) {

            dispatch(GetWorkTimeAccess({ id: workshift, contractPagination }));
        } else {
            return null
        }

    }, [page, rowsPerPage])



    useEffect(() => {
        dispatch(GetZoneTree());
    }, []);



    //list of create access
    const handleCLick = async () => {
        console.log('adding')
        // let updateArray = [...accessArray];
        let updateArray = [...customizedList];
        for (let i = 0; i < checked?.length; i++) {
            for (let j = 0; j < dayArray?.length; j++) {
                let x = {
                    zone: { id: checked[i] },
                    day: { id: dayArray[j] },
                    from: moment(fromValue).format("HH:mm:ss"),
                    to: moment(toValue).format("HH:mm:ss"),
                    added: false,
                };

                if (!updateArray?.some((item) => deepEqual(item, x))) {
                    updateArray.push(x);
                }
            }
        }

        setCustomizedList(updateArray);




        setChecked([])
        updateArray = []
        setDayArray([])
        setAllTime(false)
        setAllDays(false)
        setfromValue(new Date("2014-08-18T00:00:00"));
        setToValue(new Date("2014-08-18T00:00:00"));

    };

    //select all days logic
    const selectAllDays = (e) => {
        setAllDays(e.target.checked)
        if (e.target.checked) {
            setDayArray([1, 2, 3, 4, 5, 6, 0])
        } else {
            setDayArray([])
        }

    };



    //select all time logic
    const handleAllTime = (event) => {
        if (event.target.checked) {
            setfromValue(new Date("2014-08-18T00:00:00"));
            setToValue(new Date("2014-08-18T23:59:59"));
        } else {
            setfromValue(new Date("2014-08-18T00:00:00"));
            setToValue(new Date("2014-08-18T00:00:00"));
        }
        setAllTime(!allTime);
    }

    // to handle days
    const handleDay = (event, dayValue) => {
        const value = parseInt(dayValue);
        const index = dayArray.indexOf(value);

        if (event.target.checked && index === -1) {
            setDayArray(prevArray => [...prevArray, value]);
        } else if (!event.target.checked && index !== -1) {
            setDayArray(prevArray => prevArray.filter(item => item !== value));
        }

    };

    //remove access
    const handleRemoveAccess = (index) => {
        // setAccessArray(prevArray => prevArray.filter((item, i) => i !== index));
        setCustomizedList(prevArray => prevArray.filter((item, i) => i !== index));

    };

    //function to handle confirm
    const handleConfirm = () => {
        setCustomizedList(prevArray => prevArray.map(item => ({ ...item, added: true })));
    }


    return (
        <Dialog className='add-workshift-enrollment-dialog' open={open} onClose={onClose} fullWidth maxWidth='md'>
            <DialogTitle>
                <p className='search-title'>{t("add_customized")}</p>
                <img onClick={() => onClose()} className="modal-close" src={cancel} alt="" />
            </DialogTitle>

            <DialogContent className='dialog-content mt-0 pt-0'>

                <div className="pt-3 row pr-5">
                    <div className="col-lg-6 work_shift_tree_view">
                        <div className="d-flex align-items-center gap-2 mb-2 mt-1">

                            <p className="heading_tree text-decoration-underline">{t("zones")}</p>

                        </div>

                        <WorkShiftTreeView key={'WorkShiftTreeView'} data={zoneData} onInputchange={handleCheck} isChecked={checked} />
                    </div>
                    <div className="col-lg-6">
                        <div className="d-flex justify-content-between">
                            <div>

                                <span className="schedule-heading">{t('schedule')}</span>
                                <span className="schedule-heading-sub-heading">{t('to_open_the_doors')}</span>
                            </div>
                            <div className="all-checkbox">
                                <Checkbox
                                    className='grid-checkall checkbox'
                                    indeterminate={dayArray?.length > 0 && (dayArray?.length !== 7)}
                                    checked={allDays || (dayArray?.length > 0 && (dayArray?.length === 7))}
                                    onChange={selectAllDays}
                                    size='small'
                                />{" "}
                                {t("all_days")}
                            </div>

                        </div>
                        <div
                            className="main_content days_card"
                            style={{
                                background: "#e1e1e1",
                                paddingRight: "15px",
                                paddingLeft: "15px",
                            }}
                        >
                            <div className="d-flex justify-content-between contract-custom-checkbox" style={{ paddingTop: "2px" }}>
                                <article>
                                    <input
                                        type="checkbox"
                                        value={1}
                                        onChange={(e) => handleDay(e, "1")}
                                        checked={dayArray?.includes(1)}

                                    />

                                    <span className="days-text-style" >
                                        M
                                        <br />
                                    </span>

                                </article>
                                <article>
                                    <input
                                        type="checkbox"
                                        value={2}
                                        onChange={(e) => handleDay(e, "2")}
                                        checked={dayArray?.includes(2)}
                                    />

                                    <span className="days-text-style">
                                        T
                                        <br />
                                    </span>

                                </article>
                                <article>
                                    <input
                                        type="checkbox"
                                        value={3}
                                        onChange={(e) => handleDay(e, "3")}

                                        checked={dayArray?.includes(3)}
                                    />

                                    <span className="days-text-style">
                                        W
                                        <br />
                                    </span>

                                </article>
                                <article>
                                    <input
                                        type="checkbox"
                                        value={4}
                                        onChange={(e) => handleDay(e, "4")}
                                        checked={dayArray?.includes(4)}
                                    />

                                    <span className="days-text-style">
                                        T
                                        <br />
                                    </span>

                                </article>
                                <article>
                                    <input
                                        type="checkbox"
                                        value={5}
                                        onChange={(e) => handleDay(e, "5")}
                                        checked={dayArray?.includes(5)}
                                    />

                                    <span className="days-text-style">
                                        F
                                        <br />
                                    </span>

                                </article>
                                <article>
                                    <input
                                        type="checkbox"
                                        value={6}
                                        onChange={(e) => handleDay(e, "6")}
                                        checked={dayArray?.includes(6)}
                                    />

                                    <span className="days-text-style">
                                        S
                                        <br />
                                    </span>

                                </article>
                                <article>
                                    <input
                                        type="checkbox"
                                        value={0}
                                        onChange={(e) => handleDay(e, "0")}
                                        checked={dayArray?.includes(0)}
                                    />
                                    <span className="days-text-style">
                                        S
                                        <br />
                                    </span>

                                </article>
                            </div>
                        </div>
                        <div className="col-md-12 p-0">
                            <div className="mt-2 access_text">
                                {/* <p>hours</p> */}
                                <div className="all-checkbox">
                                    <Checkbox className='grid-checkall checkbox'
                                        checked={allTime}
                                        onChange={handleAllTime}
                                        size='small'
                                    />{" "}
                                    {t("all_time")}
                                </div>
                                <div className="mt-3">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <TimePicker
                                            renderInput={(props) => (
                                                <TextField size="small" style={{ width: "100%" }} {...props} />
                                            )}
                                            ampm={false}
                                            disabled={allTime}
                                            openTo="hours"
                                            views={["hours", "minutes", "seconds"]}
                                            inputFormat="HH:mm:ss"
                                            mask="__:__:__"
                                            label="FROM"
                                            value={fromValue}
                                            onChange={(newValue) => {
                                                setfromValue(newValue);
                                                // console.log({ newValue });
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div className="mt-3">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <TimePicker
                                            renderInput={(props) => (
                                                <TextField size="small" style={{ width: "100%" }} {...props} />
                                            )}
                                            ampm={false}
                                            disabled={allTime}
                                            openTo="hours"
                                            views={["hours", "minutes", "seconds"]}
                                            inputFormat="HH:mm:ss"
                                            mask="__:__:__"
                                            label="TO"
                                            value={toValue}
                                            onChange={(newValue) => {
                                                setToValue(newValue);
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>

                            </div>
                            <div className="btnDiv d-flex justify-content-end">
                                <button
                                    className="custom_primary_btn_dark mt-3"
                                    style={{
                                        width: "100%",
                                        justifyContent: 'space-between',
                                        padding: "0rem 1rem"
                                    }}
                                    onClick={(e) => {
                                        handleCLick(e);
                                    }}
                                >
                                    {t("add")}
                                    <AddIcon style={{ marginLeft: "10px" }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    {
                        (customizedList?.length !== 0 && customizedList?.some(item => item?.added === false)) ? (

                            // accessArray.some(item => item.added === false) && (

                            <>
                                <div className="position-relative">

                                    <div className="access-sec mt-3">
                                        <span className="contractor-access-heading pl-3">{t("access")}</span>
                                        <Grid container sx={{ mt: 1 }} columns={20} className='pl-3'>
                                            <Grid
                                                item
                                                xs={12}
                                                className="contractor-access-table-heading"
                                                sx={{ textAlign: "left", display: "flex", alignItems: "center", gap: "0.4rem" }}
                                            >
            
                                                {t("zones")?.toUpperCase()}
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                className="contractor-access-table-heading"
                                            >
                                                {t("day")?.toUpperCase()}
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                className="contractor-access-table-heading"
                                            >
                                                {t("from")?.toUpperCase()}
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                className="contractor-access-table-heading"
                                            >
                                                {t("to")?.toUpperCase()}
                                            </Grid>
                                            <Grid
                                                item
                                                xs={2}
                                                className="contractor-access-table-heading"
                                            >
                                                {t("remove")?.toUpperCase()}
                                            </Grid>

                                        </Grid>
                                    </div>
                                    {customizedList?.length > 0 &&
                                        customizedList?.map((item, index) => {
                                            return (
                                                !item?.added && (
                                                <Grid container sx={{ mt: 1 }} columns={20} className='pl-3'>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        sx={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                                                        className="contractor-access-table-first"
                                                    >
                                     
                                                        {item?.zone?.id.split(',')[1] || "-"}
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={2}
                                                        className="contractor-access-table-data"
                                                    >
                                                        {dayId(item?.day?.id)}
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={2}
                                                        className="contractor-access-table-data"
                                                    >
                                                        {item?.from || "-"}
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={2}
                                                        className="contractor-access-table-data"
                                                    >
                                                        {item?.to || "-"}
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={2}
                                                        className='contractor-access-table-data'
                                                    >
                                                        <img className='assign-icon'
                                                            // id={element?.id}
                                                            onClick={() => handleRemoveAccess(index)}
                                                            src={DeleteIcon}
                                                            alt="chevron_right_solid"
                                                            style={{ cursor: 'pointer' }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                )
                                            );
                                        })}
                                </div>
                            
                                <div className="create-enrollment-footer mt-3 row pr-2" >
                                    <button className='btn_cancel_background_gray_hover col-6'
                                        onClick={() => {
                                            onClose()
                                        }}
                                        style={{ color: "#BC0000" }}>
                                        {t("cancel")}
                                    </button>
                                    <button
                                        className='custom_primary_btn_dark col-6'
                                        onClick={() => {
                                            handleConfirm()
                                            onClose()
                                        }}
                                    >
                                        {t('confirm').toUpperCase()}
                                    </button>
                                </div>
                            </>
                            // )
                        ) : (
                            <div className="no_content">
                                <span className="contractor-access-heading">{t("access")}</span>
                                <NotFoundAnything text={"NO Access"} mt={"0rem"} />

                            </div>
                        )}
                </div>


            </DialogContent>

        </Dialog >
    )


}

export default AddCustomizedSchedule;

const inputBox = {
    width: "100%",
    maxWidth: "100%",
    fontSize: "20px",
    height: "50px",
}
