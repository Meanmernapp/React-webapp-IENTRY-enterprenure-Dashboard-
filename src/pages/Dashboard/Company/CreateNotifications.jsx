import { FormControl, Grid, InputLabel, MenuItem, Select, TablePagination, TextField } from '@mui/material'
import { DesktopDatePicker, LocalizationProvider, TimePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import Compressor from 'compressorjs';
import Stack from "@mui/material/Stack";
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import profile from '../../../assets/images/person.png';
import ic_camera from '../../../assets/images/ic-camera.svg';
import ic_cancel from '../../../assets/images/ic-cancel.svg';
import ic_file from '../../../assets/images/ic-file.svg';
import excel_image from '../../../assets/images/excel-image.png';
import pdf_image from '../../../assets/images/pdf-image.png';
import word_image from '../../../assets/images/word-image.png';
import { t } from "i18next";

import { useState } from 'react';
import { CreateNotification, GetEmployeesPageable, NotificationTypes, SendByTopicScope, SendToAllScope, SendToSomeEmployees, UploadImgToServer } from '../../../reduxToolkit/Notifications/NotificationsApi';
import { toast } from 'react-toastify';

const inputLableProps = {
    style: {
        fontSize: "10px",
        fontWeight: 600,
        background: "#ffffff",
        padding: "0px 0px 0px 4px",
    },
}

const textinputProps = {
    sx: {
        border: "none",
        outline: "none",
        fontSize: "10px",
        letterSpacing: "0px",
        color: "#707070",
        "&::placeholder": {
            color: "#707070",
            fontSize: "12px",
        },
    },
}

const CreateNotifications = () => {
    let scope = ['ALL ( EMPLOYEES, SUPPLIERS , CONTRACTORS)', 'ONLY EMPLOYEES', 'ONLY CONTRACTORS', 'ONLY SUPPLIERS', 'CHOOSE SOME EMPLOYEES']
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data } = useSelector(state => state?.authenticatioauthennSlice?.user);
    const notificationTypes = useSelector(state => state?.NotificationsSlice?.notifyTypes);
    const employeesData = useSelector(state => state?.NotificationsSlice?.employeesData);
    // console.log(employeesData)

    const [title, setTitle] = useState();
    const [message, setMessage] = useState();
    const [time, setTime] = useState();
    const [date, setDate] = useState();
    const [type, setType] = useState();
    const [selectedScope, setSelectedScope] = useState();
    const [selectedType, setSelectedType] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [updateCompanyImg, setUpdateCompanyImg] = useState();
    const [companyImg, setCompanyImg] = useState();
    const [pdfFile, setPdfFile] = useState();
    const [previewSize, setPreviewSize] = useState();
    // console.log(selectedEmployees)


    useEffect(() => {
        dispatch(NotificationTypes());
        const body = {
            order: true,
            page: page,
            size: rowsPerPage,
            sortBy: "id"
        }
        dispatch(GetEmployeesPageable(body))
    }, [])

    const handleCheckBox = (e, item) => {
        const { checked } = e.target;
        if (checked) {
            setSelectedEmployees([...selectedEmployees, item.id]);
        } else {
            setSelectedEmployees(selectedEmployees => selectedEmployees.filter(selectedId => selectedId !== item.id))
        }

    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        const body = {
            order: true,
            page: newPage,
            size: rowsPerPage,
            sortBy: "id"
        }
        dispatch(GetEmployeesPageable(body))
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
        const body = {
            order: true,
            page: page,
            size: parseInt(event.target.value),
            sortBy: "id"
        }
        dispatch(GetEmployeesPageable(body))
    };

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const onImageChange = async (e) => {
        console.log(e.target.files[0])
        const originalFile = e.target.files[0];
        setUpdateCompanyImg(originalFile);

        let formatedValue = formatBytes(originalFile?.size);
        // console.log(formatedValue);
        setPreviewSize(formatedValue);

        const [file] = e.target.files;
        setCompanyImg(URL.createObjectURL(file));
    };

    const onFileChange = async (e) => {
        console.log(e.target.files[0])
        const originalFile = e.target.files[0];
        setPdfFile(originalFile);

        let formatedValue = formatBytes(originalFile?.size);
        console.log(formatedValue, originalFile?.size);
        setPreviewSize(formatedValue);
    }


    const uploadImageOrFileToServer = (notificationId) => {
        if (updateCompanyImg) {
            let formData = new FormData();
            formData.append('id', notificationId);
            formData.append('option', "notification_image");
            formData.append('file', updateCompanyImg);
            dispatch(UploadImgToServer(formData)).then(() => {
                navigate('/dashboard/employee/announcement-panel');
            })
        }
        if (pdfFile) {
            let formData = new FormData();
            formData.append('id', notificationId);
            formData.append('option', "notification_file");
            formData.append('file', pdfFile);
            dispatch(UploadImgToServer(formData)).then(() => {
                navigate('/dashboard/employee/announcement-panel');
            })
        }
    }

    const handleCreate = () => {
        const body = selectedType?.name === 'AD' ? {
            "message": message,
            "notificationType": {
                "id": selectedType?.id
            },
            "user": {
                "id": data?.id
            },
            "title": title
        } : selectedType?.name === 'MEETING' ? {
            "message": message,
            "dateMeeting": date.getTime(),
            "notificationType": {
                "id": selectedType?.id
            },
            "user": {
                "id": data?.id
            },
            "title": title
        } : selectedType?.name === 'OTHER' ? {
            "message": "Prueba",
            "notificationType": {
                "id": selectedType?.id
            },
            "type": type,
            "user": {
                "id": data?.id
            },
            "title": title
        } : null
        console.log(pdfFile?.size)

        if ((pdfFile?.size <= 500000 && pdfFile !== undefined) || (updateCompanyImg?.size <= 50000 && updateCompanyImg !== undefined) || (pdfFile === undefined && updateCompanyImg === undefined)) {
            dispatch(CreateNotification(body)).then(({ payload: { data: { data } } }) => {
                console.log(data)
                if (selectedScope === scope[0]) {
                    dispatch(SendToAllScope(data?.id)).then(() => {
                        if (pdfFile === undefined && updateCompanyImg === undefined) {
                            navigate('/dashboard/employee/announcement-panel');
                        } else {
                            uploadImageOrFileToServer(data?.id)

                        }
                    })
                } else if (selectedScope === scope[1] || selectedScope === scope[2] || selectedScope === scope[3]) {
                    const body = {
                        notificationId: data?.id,
                        topic: selectedScope === scope[1] ? "EMPLOYEE" : selectedScope === scope[2] ? "PROVIDER" : selectedScope === scope[3] ? "CONTRACTOR" : ""
                    }
                    dispatch(SendByTopicScope(body)).then(() => {
                        if (pdfFile === undefined && updateCompanyImg === undefined) {
                            navigate('/dashboard/employee/announcement-panel');
                        } else {
                            uploadImageOrFileToServer(data?.id)

                        }
                    })
                } else if (selectedScope === scope[4]) {
                    const body = {
                        employeesIds: selectedEmployees,
                        notificationId: data?.id
                    }
                    dispatch(SendToSomeEmployees(body)).then(() => {
                        if (pdfFile === undefined && updateCompanyImg === undefined) {
                            navigate('/dashboard/employee/announcement-panel');
                        } else {
                            uploadImageOrFileToServer(data?.id)

                        }
                    })
                }
            })
        } else {
            pdfFile ?
                toast.error("file size should not more than 5MB") :
                toast.error("file size should not more than 500kb")
        }
    }

    return (
        <div className='row createNotification'>
            <div className="head">
                <div className='headLeft'>
                    <Link to="/dashboard/employee/announcement-panel">
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </Link>
                    <h2>{t("create_announcement")}</h2>
                </div>
            </div>
            <div className="col-8 mx-auto mt-5">
                <div className="subTitle">
                    <p>Data</p>
                    <hr style={{ width: "90%" }} />
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField size="small"
                            fullWidth

                            label="TITLE"
                            defaultValue=" "
                            id="TITLE"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            InputLabelProps={inputLableProps}
                            inputProps={textinputProps}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                NOTIFICATION TYPE
                            </InputLabel>
                            <Select size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue="NOTIFICATION TYPE"
                                label="NOTIFICATION TYPE"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                sx={{
                                    fontSize: "14px",
                                }}
                            >
                                {
                                    notificationTypes.map(item => (
                                        <MenuItem
                                            key={item?.id}
                                            value={item}
                                            sx={{
                                                fontSize: "14px",
                                            }}
                                        >
                                            {item.name}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField size="small"
                            fullWidth


                            label="MESSAGE"
                            defaultValue=" "
                            id="MESSAGE"
                            multiline={true}
                            rows="3"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            InputLabelProps={inputLableProps}
                            inputProps={textinputProps}
                        />
                    </Grid>
                    {
                        selectedType?.name === 'MEETING' ?
                            <Grid item xs={12} md={6} className="notificationDate">
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <TimePicker
                                        renderInput={(props) => <TextField size="small" {...props} />}
                                        ampm={false}
                                        openTo="hours"
                                        views={["hours", "minutes", "seconds"]}
                                        inputFormat="HH:mm:ss"
                                        mask="__:__:__"
                                        className="timeInput"
                                        label="TIME"
                                        value={time}
                                        onChange={(e) => setTime(e)}
                                        sx={{ width: '100%' }}
                                    />
                                </LocalizationProvider>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack>
                                        <DesktopDatePicker
                                            renderInput={(params) => <TextField size="small" {...params} />}
                                            label="DATE"
                                            inputFormat="dd/MM/yyyy"
                                            textFieldStyle={{ width: '100%' }}
                                            disablePast
                                            value={date}
                                            onChange={(e) => setDate(e)}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid> : null
                    }
                    {
                        selectedType?.name === 'OTHER' ?
                            <Grid item xs={12} md={6}>
                                <TextField size="small"
                                    fullWidth

                                    label="TYPE"
                                    defaultValue=" "
                                    id="NAME"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    InputLabelProps={inputLableProps}
                                    inputProps={textinputProps}
                                />
                            </Grid> : null
                    }
                </Grid>

                <div className="subTitle mt-3">
                    <p>Scope</p>
                    <hr style={{ width: "88%" }} />
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                PEOPLE
                            </InputLabel>
                            <Select size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                defaultValue="PEOPLE"
                                label="PEOPLE"
                                value={selectedScope}
                                onChange={(e) => setSelectedScope(e.target.value)}
                                sx={{
                                    fontSize: "14px",
                                }}
                            >
                                {
                                    scope?.map(item => (
                                        <MenuItem
                                            value={item}
                                            sx={{
                                                fontSize: "14px",
                                            }}
                                        >
                                            {item}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {
                    selectedScope === 'CHOOSE SOME EMPLOYEES' ?
                        <>
                            <p className='empTitle'>employees</p>
                            <p className='chooseEmp'>CHOOSE EMPLOYEES TO SEND IT</p>
                            <div className="row">
                                {
                                    employeesData?.content?.map(item => (
                                        <div className="col-6">
                                            <div className="empBox">
                                                <div className="leftSide">
                                                    <img src={profile} className="empImg" alt="img" />
                                                    <div className='textFields'>
                                                        <p>
                                                            <span>Name: </span>{item?.name}
                                                        </p>
                                                        <p>
                                                            <span>Phone Number: </span>{item?.phoneNumber}
                                                        </p>
                                                        <p>
                                                            <span>Role: </span>{item?.userType.name}
                                                        </p>
                                                    </div>
                                                </div>
                                                <label className="container1">
                                                    <input
                                                        type="checkbox"
                                                        name="check"
                                                        // checked={check}
                                                        onChange={(e) => handleCheckBox(e, item)}
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div>
                                <TablePagination
                                    component="div"
                                    rowsPerPageOptions={[10, 16, 22]}
                                    count={employeesData?.totalElements}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    labelRowsPerPage="Employees per page"
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </div>
                        </> : null
                }
                <div className="subTitle mt-3">
                    <p>MULTIMEDIA</p>
                    <hr style={{ width: "80%" }} />
                </div>
                <div className='row'>
                    <div className="col-6">
                        {
                            pdfFile ? null :
                                <>
                                    <label htmlFor="img-input" className="labelBox">
                                        <p>
                                            ADD IMAGE / VIDEO
                                        </p>
                                        <img
                                            src={ic_camera}
                                            alt="ic_camera"
                                            className="ic_camera"
                                        />
                                        <input
                                            type="file"
                                            id="img-input"
                                            accept="image/png,image/jpg,image/jpeg, video/*"
                                            style={{ display: "none" }}
                                            // value={updateCompanyImg?.size}
                                            onChange={onImageChange}
                                        />
                                    </label>
                                    <p className='previewTitle'>IMAGE / VIDEO</p>
                                    {
                                        companyImg ?
                                            <img
                                                src={companyImg}
                                                className="previewImg"
                                                alt="imgs"
                                            /> : null
                                    }
                                </>
                        }
                    </div>
                    <div className="col-6">
                        {
                            companyImg ? null :
                                <>
                                    <label htmlFor="file-input" className="labelBox">
                                        <p>
                                            ADD FILE
                                        </p>
                                        <img
                                            src={ic_file}
                                            alt="ic_file"
                                            className="ic_camera"
                                        />
                                        <input
                                            type="file"
                                            id="file-input"
                                            accept="application/pdf,application/xlsx,application/docx,application/pptx"
                                            // accept="application/*"
                                            style={{ display: "none" }}
                                            // value={pdfFile?.size}
                                            onChange={onFileChange}
                                        />
                                    </label>
                                    <p className='previewTitle'>FILE</p>
                                    {
                                        pdfFile ?
                                            <div className='previewFile'>
                                                <img
                                                    src={
                                                        pdfFile?.name?.split('.').pop() === "pdf" ? pdf_image :
                                                            pdfFile?.name?.split('.').pop() === "xlsx" ? excel_image :
                                                                pdfFile?.name?.split('.').pop() === "docx" || pdfFile?.name?.split('.').pop() === "pptx" ? word_image : pdf_image
                                                    }
                                                    className="mr-3"
                                                    style={{ width: "30px" }}
                                                    alt="imgs"
                                                />
                                                <div>
                                                    <p>{pdfFile?.name}</p>
                                                    <p><span>size: </span>{previewSize}</p>
                                                </div>
                                                <img
                                                    src={ic_cancel}
                                                    className="cancelIcon"
                                                    alt="ic_cancel"
                                                    onClick={() => setPdfFile('')}
                                                />
                                            </div> : null
                                    }
                                </>
                        }
                    </div>
                </div>
                <div className="createBtns">
                    <Link to="/dashboard/employee/announcement-panel" className="previousBtn">
                        Cancel
                    </Link>
                    <button
                        className="nextBtn"
                        onClick={handleCreate}
                    >
                        {t("create_announcement")}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateNotifications