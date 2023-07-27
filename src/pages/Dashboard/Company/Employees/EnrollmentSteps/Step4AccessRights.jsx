import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Card, CardActions, CardContent, Button, Typography, DialogTitle, DialogContent, IconButton, DialogActions, TextField, Box, FormControl, InputLabel, Select, MenuItem, Switch, Divider, Grid, FormHelperText, InputAdornment, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Stack from "@mui/material/Stack";
import { DatePicker, DateRangePicker, LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import userregular from "../../../../../assets/images/user-regular.svg";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import ClearButton from '../../../../../components/ClearButton';
import { status } from '../../../../../enums/statusEnum';
import { Checkbox, Tooltip } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddWorkShiftsEnrollment from '../Modal/AddWorkShiftsEnrollment';
import AddCustomizedSchedule from '../Modal/AddCustomizedSchedule';
import DeleteIcon from "../../../../../assets/images/redTrash.svg";
import dayId from '../../../../../hooks/dayId';
import { remove } from 'lodash';



const Step4AccessRights = ({ employeeData, onChange, setEmployeeData, workShiftsList, setWorkShiftsList, customizedList, setCustomizedList }) => {

    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";

    // const [workShiftsList, setWorkShiftsList] = useState([]);
    // const [customizedList, setCustomizedList] = useState([]);
    const [deleteModalShow, setDeleteModalShow] = useState(false)
    const [addWorkShiftsDialogShow, setAddWorkShiftsDialogShow] = useState(false)
    const [addCustomizedDialogShow, setAddCustomizedDialogShow] = useState(false)
    const [checkedWorkshift, setCheckedWorkshift] = useState(false);
    const [selectWorkshiftForDelete, setSelectWorkshiftForDelete] = useState([])
    const [isAllCheckedWorkshift, setIsAllCheckedWorkshift] = useState(false)


    // const [selectWorkshiftsForDelete, setSelectWorkshiftsForDelete] = useState([]);
    const [selectCustomizedForDelete, setSelectCustomizedForDelete] = useState([]);

    // const [isAllCheckedWorkShifts, setIsAllCheckedWorkShifts] = useState(false)
    const [isAllCheckedCustomized, setIsAllCheckedCustomized] = useState(false)

    // this function control select all id or unSelect all
    const handleRemoveAllWorkshifts = (e) => {
        setIsAllCheckedWorkshift(e.target.checked)
        if (e.target.checked) {
            const selectAllIds = workShiftsList?.map(item => {
                return item?.id
            })
            setSelectWorkshiftForDelete(selectAllIds)


        } else {
            setSelectWorkshiftForDelete([])
        }

    }

    // this function control select all index or unSelect all
    const handleRemoveAllCustomized = (e) => {
        setIsAllCheckedCustomized(e.target.checked)
        if (e.target.checked) {
            const selectAllIndex = customizedList?.map((item, index) => {
                return index
            })
            setSelectCustomizedForDelete(selectAllIndex)
        } else {
            setSelectCustomizedForDelete([])
        }
    }

    // this function handle only specific id base on selection
    const handleCheckboxChangeWorkshift = (e) => {

        if (e.target.checked) {
            console.log(e.target.id)
            setSelectWorkshiftForDelete([...selectWorkshiftForDelete, e.target.id]);
        } else {
            setSelectWorkshiftForDelete(selectWorkshiftForDelete.filter((removeid) => removeid !== e.target.id));
        }
        console.log('ForDelete')
        console.log(selectWorkshiftForDelete)
    };

    // this function handle only specific index base on selection
    const handleCheckboxChangeCustomized = (e) => {
        if (e.target.checked) {
            console.log(e.target.id)
            setSelectCustomizedForDelete([...selectCustomizedForDelete, parseInt(e.target.id)]);
        } else {
            setSelectCustomizedForDelete(selectCustomizedForDelete.filter((removeid) => removeid !== parseInt(e.target.id)));
        }
        console.log('ForDelete')
        console.log(selectCustomizedForDelete)
    }

    // this function handle only specific id base on selection
    const removeWorkshift = (element) => {

        // setAssignedList(assignedList.filter((item) => item !== element));
        setWorkShiftsList(workShiftsList.filter((item) => item.id !== element.id));

    };

    //this function remove customized access according to the index
    const removeCustomized = (index) => {
        setCustomizedList(prevArray => prevArray.filter((item, i) => i !== index));
    }

    // this function handle only specific id base on selection
    const removeWorkshiftsSelected = () => {

        const selectedIds = selectWorkshiftForDelete; // Get the selected IDs

        // Filters items that do NOT have the selected IDs
        const updatedList = workShiftsList.filter((item) => !selectedIds.includes(item.id));

        // Updates the work shift roster with the updated roster
        setWorkShiftsList(updatedList);
        setSelectWorkshiftForDelete([])
        setIsAllCheckedWorkshift(false)

    };


    const removeCustomizedSelected = () => {
        const selectedIndex = selectCustomizedForDelete; // Get selected indices

        const updatedList = customizedList.filter((item, index) => {
            return !selectedIndex.includes(index); // Filter out items that are NOT in the selected indices
        });

        setCustomizedList(updatedList); // Update the list with the filtered items
        setSelectCustomizedForDelete([]); // Reset selected indices
        setIsAllCheckedCustomized(false); // Reset the "all selected" state
    };

    useEffect(() => {
        if (isAllCheckedWorkshift) {
            setIsAllCheckedWorkshift(false)
        }
    }, [workShiftsList])


    return (

        <>
            <div className='access-rights-enrollment'>
                <Grid container spacing={2.2}>
                    <Grid item xs={6} alignItems={'center'}>
                        <Stack direction='row' justifyContent="space-between" alignItems="center">

                            <div className="d-flex  ">

                                <FormControlLabel className="grid-checkall mb-0 " control={<Checkbox
                                    className='mb-0'
                                    label="Label"
                                    checked={isAllCheckedWorkshift || (selectWorkshiftForDelete?.length > 0 && (workShiftsList?.length === selectWorkshiftForDelete?.length))}
                                    indeterminate={selectWorkshiftForDelete?.length > 0 && (workShiftsList?.length !== selectWorkshiftForDelete?.length)}
                                    onChange={handleRemoveAllWorkshifts}
                                    size="small" />} label={t("de_/_select_all")} />

                            </div>

                            <span className='title-card'>{t("work_shifts")}</span>
                            <div className="container-top-right-btns mb-1">
                                <button className="delete-btn-1 mr-0"
                                    disabled={selectWorkshiftForDelete?.length === 0}
                                    onClick={removeWorkshiftsSelected}
                                >
                                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                                    {t('remove')}
                                </button>
                            </div>


                        </Stack>
                        <Card variant='outlined'>
                            <CardContent className='card-content-criteria pt-0'>

                                <List dense >
                                    {workShiftsList?.map((element, index) => (
                                        <ListItem className='list-item-criteria' key={index}
                                        // onClick={() => handleAssign(element)}
                                        >
                                            <ListItemIcon>
                                                <Checkbox
                                                    className="grid-checkall checkbox"
                                                    checked={selectWorkshiftForDelete?.includes(element?.id)}
                                                    id={element?.id}
                                                    onChange={handleCheckboxChangeWorkshift}
                                                    size="small"
                                                />

                                            </ListItemIcon>
                                            <ListItemText primary={`${element?.name}`} />
                                            <img className='assign-icon'
                                                onClick={() => removeWorkshift(element)}
                                                src={DeleteIcon}
                                                alt="chevron_right_solid"
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                            <CardActions className='card-actions'>
                                <Button variant="text"
                                    onClick={() => setAddWorkShiftsDialogShow(true)}
                                >
                                    {t("add_more").toUpperCase()}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Stack direction='row' justifyContent="space-between" alignItems="center">
                            <div className="d-flex ">

                                <FormControlLabel className="grid-checkall mb-0 " control={<Checkbox
                                    className='mb-0'
                                    label="Label"
                                    checked={isAllCheckedCustomized || (selectCustomizedForDelete?.length > 0 && (customizedList?.length === selectCustomizedForDelete.length))}
                                    indeterminate={selectCustomizedForDelete?.length > 0 && (customizedList?.length !== selectCustomizedForDelete?.length)}
                                    onChange={handleRemoveAllCustomized}
                                    size="small" />} label={t("de_/_select_all")} />
                            </div>

                            <span className='title-card'>{t("customized")}</span>
                            <div className="container-top-right-btns mb-1">
                                <button className="delete-btn-1 mr-0"
                                    disabled={selectCustomizedForDelete?.length === 0}
                                    onClick={removeCustomizedSelected}
                                >
                                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                                    {t('delete')}
                                </button>
                            </div>

                        </Stack>
                        <Card variant='outlined'>
                            <CardContent className='card-content-criteria pt-0'>

                                <List dense>
                                    {customizedList?.map((element, index) => (
                                        element.added && (
                                            <ListItem className='list-item-criteria' key={index}
                                            >
                                                <ListItemIcon>
                                                    <Checkbox
                                                        className="grid-checkall checkbox"
                                                        checked={selectCustomizedForDelete?.includes(index)}
                                                        id={parseInt(index)}
                                                        onChange={handleCheckboxChangeCustomized}
                                                        size="small"
                                                    />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={`${dayId(parseInt(element?.day.id))}, ${element?.from} - ${element?.to}, ${element?.zone.id.split(',')[1]}`}
                                                />
                                                <img className='assign-icon'
                                                    onClick={() => removeCustomized(index)}
                                                    src={DeleteIcon}
                                                    alt="chevron_right_solid"
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </ListItem>
                                        )
                                    ))}
                                </List>
                            </CardContent>
                            <CardActions className='card-actions'>
                                <Button variant="text"
                                    onClick={() => setAddCustomizedDialogShow(true)}
                                >
                                    {t("add_more").toUpperCase()}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <AddWorkShiftsEnrollment
                open={addWorkShiftsDialogShow}
                onClose={() => {
                    setAddWorkShiftsDialogShow(false);
                }}
                workshiftsList={workShiftsList}
                setWorkshiftsList={setWorkShiftsList}

            />
            <AddCustomizedSchedule
                open={addCustomizedDialogShow}
                onClose={() => {
                    setAddCustomizedDialogShow(false);
                }}
                customizedList={customizedList}
                setCustomizedList={setCustomizedList}

            />
        </>

    );
};

export default Step4AccessRights;