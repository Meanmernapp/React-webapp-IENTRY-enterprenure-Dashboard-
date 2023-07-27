import React, { useEffect, useState, Fragment } from 'react';
import { Dialog, Card, CardActions, CardContent, Button, Typography, DialogTitle, DialogContent, IconButton, DialogActions, TextField, Box, FormControl, InputLabel, Select, MenuItem, Switch, Divider, Grid, FormHelperText, InputAdornment, List, ListItem, ListItemText } from '@mui/material';
import { DatePicker, DateRangePicker, LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useDispatch, useSelector } from "react-redux";
import cancel from '../../assets/images/ic-cancel.svg'
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import ClearButton from '../../components/ClearButton';
import chevron_right_solid from '../../assets/images/chevron-right-solid.svg'
import ic_delete_red from '../../assets/images/ic-delete-red.svg'
import { GetAttributesFilter, GetConditionFilter, GetValuesByOptionAndField } from "../../reduxToolkit/Search/SearchApi";
import fieldId from "../../hooks/fieldId";
import conditionId from '../../hooks/conditionId';
import { MODELS } from '../../Apis/Models';
import { fieldNameEnum } from '../../enums/fieldNameEnum';
import { format } from 'date-fns';


const SearchFor = ({ open, onClose, onFiltered, moduleId, option, finalArray }) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    // use hook importer
    const dispatch = useDispatch();

    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    const [requestSignatureAlways, setRequestSignatureAlways] = useState('')
    const [checked, setChecked] = useState(true);
    const [field, setField] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [sort, setSort] = useState('');
    const [typeAttribute, setTypeAttribute] = useState('');
    const [condition, setCondition] = useState('');
    const [operationKey, setOperationKey] = useState('')
    const [valueAttribute, setValueAttribute] = useState('')
    const [finalRules, setFinalRules] = useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateRange, setDateRange] = useState([null, null]);
    const [inputString, setInputString] = useState(true)
    const [inputNumber, setInputNumber] = useState(false)
    const [inputTwoNumbers, setInputTwoNumbers] = useState(false)
    const [inputDropdown, setInputDropdown] = useState(false)
    const [inputDate, setInputDate] = useState(false)
    const [inputTwoDates, setInputTwoDates] = useState(false)
    const [inputTransferableList, setInputTransferableList] = useState(false)
    const [originalArray, setOriginalArray] = useState([]);
    const [longName, setLongName] = useState('')
    const [modelName, setModelName] = useState('')
    const [fromValue, setFromValue] = useState('')
    const [toValue, setToValue] = useState('')

    const handleRangeChange = (newValue) => {
        setDateRange(newValue);
    };

    const handleDateChange = (date) => {
        setValueAttribute(date);
    };

    const handleFromDateChange = (date) => {
        setFromValue(date);
    };

    const handleToDateChange = (date) => {
        setToValue(date);
    };

    let conector = ''

    let valueName = ''

    let idList = [];

    let uuidName = ''

    const [selected, setSelected] = useState('');

    // useSelector 
    const { getAttributesFilter, getConditionFilter, getValuesByOptionAndField, searchByFilters } = useSelector(state => state.SearchSlice);

    const selectionChangeHandler = (event) => {
        setSelected(event.target.value);
    };

    const [availablesList, setAvailablesList] = useState([]);
    const [assignedList, setAssignedList] = useState([]);

    const handleAssign = (element) => {
        setAvailablesList(availablesList.filter((item) => item !== element));
        setAssignedList([...assignedList, element]);
    };

    const handleDeallocate = (element) => {
        setAssignedList(assignedList.filter((item) => item !== element));
        setAvailablesList([...availablesList, element]);
    };

    const transferAllToAssigned = () => {
        // Copy all the elements from availablesList to assignedList
        const updatedAssignedList = [...assignedList, ...availablesList];

        // Update the value of assignedList to availablesList
        setAssignedList(updatedAssignedList);
        // setValueAttribute(updatedAssignedList);
        setAvailablesList([]);
    };

    const transferAllToAvailables = () => {
        // Copy all the elements from assignedList to availablesList
        const updatedAvailablesList = [...availablesList, ...assignedList];

        // Update the value of availablesList to assignedList
        setAvailablesList(updatedAvailablesList);
        setAssignedList([]);

    };

    const [listRules, setListRules] = useState([]);

    const handleAddRule = () => {
        if (field === '' || sort === '' || ((condition !== '' && (!['NU', 'NN', 'BT', 'NB'].includes(operationKey))) && valueAttribute === '') || (condition !== '' && (['BT', 'NB'].includes(operationKey)) && (fromValue === '' || toValue === ''))) {
            setShowHelperText(true);
        } else {
            let newRule = ''
            listRules.length < 1 ? conector = '' : checked ? conector = t('or') : conector = t('and')
            if (fieldName === 'deviceType' || fieldName === 'gender' || fieldName === 'status' || fieldName === 'userType' || fieldName === 'contractorStatus') {
                if (valueAttribute !== undefined) {
                    valueName = t(fieldNameEnum[fieldName][+valueAttribute]).toUpperCase()
                } else {
                    valueName = '';
                }
            } else { valueName = valueAttribute }
            if (condition === '') {
                newRule = conector + ' ' + fieldId(field) + ' ' + t('order') + ' ' + sort
                const newElement = {
                    dataOption: checked ? 'or' : 'and',
                    fieldType: typeAttribute,
                    filterKey: fieldName,
                    sort: sort,
                    table: modelName
                };
                setOriginalArray((prevArray) => [...prevArray, newElement]);
            } else if ((['NU', 'NN'].includes(operationKey)) === true) {
                newRule = conector + ' ' + fieldId(field) + ' ' + conditionId(condition) + ' ' + t('order') + ' ' + sort
                const newElement = {
                    dataOption: checked ? 'or' : 'and',
                    fieldType: typeAttribute,
                    filterKey: fieldName,
                    operation: operationKey,
                    sort: sort,
                    table: modelName
                };
                setOriginalArray((prevArray) => [...prevArray, newElement]);
            } else if (inputTransferableList === true) {
                {
                    typeAttribute === 'UUID' &&
                        console.log('assignedList')
                    assignedList.reduce((result, name) => {
                        const item = getValuesByOptionAndField.find(obj => obj.name === name);
                        if (item) {
                            result.push(item.id);
                        }
                        idList = result; // Set the value of result to idList
                        return result;
                    }, []);
                }
                {
                    if (fieldName === 'deviceType' || fieldName === 'gender' || fieldName === 'status' || fieldName === 'userType' || fieldName === 'contractorStatus') {
                        const assignedListId = assignedList.map(item => {
                            const index = Object.keys(fieldNameEnum[fieldName]).find(key => t(fieldNameEnum[fieldName][key]).toUpperCase() === item);
                            return index ? parseInt(index) : null;
                        });
                        idList = assignedListId.filter(index => index !== null);
                    }
                }
                newRule = conector + ' ' + fieldId(field) + ' ' + conditionId(condition) + ' ' + assignedList.join(', ') + ' ' + t('order') + ' ' + sort
                const newElement = {
                    dataOption: checked ? 'or' : 'and',
                    fieldType: typeAttribute,
                    filterKey: fieldName,
                    operation: operationKey,
                    sort: sort,
                    table: modelName,
                    values: (typeAttribute === 'UUID' || fieldName === 'deviceType' || fieldName === 'gender' || fieldName === 'status' || fieldName === 'userType' || fieldName === 'contractorStatus') ? idList : assignedList
                };
                setOriginalArray((prevArray) => [...prevArray, newElement]);
            } else if (inputDate === true) {
                valueAttribute.setHours(0, 0, 0, 0)
                newRule = conector + ' ' + fieldId(field) + ' ' + conditionId(condition) + ' ' + format(valueAttribute, 'MMM dd yyyy') + ' ' + t('order') + ' ' + sort
                const newElement = {
                    dataOption: checked ? 'or' : 'and',
                    fieldType: typeAttribute,
                    filterKey: fieldName,
                    operation: operationKey,
                    sort: sort,
                    table: modelName,
                    values: [valueAttribute.getTime()]
                };
                setOriginalArray((prevArray) => [...prevArray, newElement]);
            } else if (inputTwoDates === true) {
                fromValue.setHours(0, 0, 0, 0)
                toValue.setHours(0, 0, 0, 0)
                newRule = conector + ' ' + fieldId(field) + ' ' + conditionId(condition) + ' ' + t('from') + ' ' + format(fromValue, 'MMM dd yyyy') + ' ' + t('to') + ' ' + format(toValue, 'MMM dd yyyy') + ' ' + t('order') + ' ' + sort
                const newElement = {
                    dataOption: checked ? 'or' : 'and',
                    fieldType: typeAttribute,
                    filterKey: fieldName,
                    operation: operationKey,
                    sort: sort,
                    table: modelName,
                    from: fromValue.getTime(),
                    to: toValue.getTime()
                };
                setOriginalArray((prevArray) => [...prevArray, newElement]);
            } else {
                {
                    if (typeAttribute === 'UUID') {
                        const foundItem = getValuesByOptionAndField.find(obj => obj.id === valueAttribute);
                        if (foundItem) {
                            uuidName = foundItem.name; // Asignar el nombre si se encuentra un objeto coincidente
                        }
                    }
                }
                typeAttribute === 'UUID' ? valueName = uuidName : valueName = valueName
                newRule = conector + ' ' + fieldId(field) + ' ' + conditionId(condition) + ' ' + valueName + ' ' + t('order') + ' ' + sort
                const newElement = {
                    dataOption: checked ? 'or' : 'and',
                    fieldType: typeAttribute,
                    filterKey: fieldName,
                    operation: operationKey,
                    sort: sort,
                    table: modelName,
                    values: [valueAttribute]
                };
                setOriginalArray((prevArray) => [...prevArray, newElement]);
            }

            setListRules([...listRules, newRule])
            handleClear()
        }
    };

    const handleDeleteRule = (index) => {
        const updatedListRules = listRules.filter((_, i) => i !== index);
        setListRules(updatedListRules);
        const updateOriginalArray = originalArray.filter((_, i) => i !== index)
        setOriginalArray(updateOriginalArray)
    };

    const handleDeleteAllRules = () => {
        setListRules([]);
        setOriginalArray([])
    };

    const handleSearch = () => {
        setFinalRules(listRules)


        onFiltered(originalArray)
    };



    useEffect(() => {
        setCondition('')
        setSort('')
        if (field !== '') {
            dispatch(GetConditionFilter(typeAttribute))
            dispatch(GetValuesByOptionAndField({ option: option, field: fieldName }))
            if ((field >= 117 && field <= 125) || (field >= 91 && field <= 100) || (field >= 104 && field <= 113)){
                setModelName(Object.keys(MODELS).find(key => MODELS[key] === 25).toLowerCase())
            } 

        } else {
            setInputTransferableList(false)
            setInputDropdown(false);
            setInputNumber(false)
            setInputTwoNumbers(false)
            setInputDate(false)
            setInputTwoDates(false)
            setInputString(true);
        }
    }, [field])

    useEffect(() => {
        setValueAttribute('')
        setFromValue('')
        setToValue('')
        setShowHelperText(false)
        setInputTransferableList(false)
        setInputDropdown(false);
        setInputNumber(false)
        setInputTwoNumbers(false)
        setInputDate(false)
        setInputTwoDates(false)
        setInputString(true);
        if (typeAttribute === 'STRING') {
            if (['EQ', 'NE'].includes(operationKey)) {
                setInputString(false);
                setInputDropdown(true);
            } else if (['IN', 'NI'].includes(operationKey)) {
                setInputString(false)
                setInputTransferableList(true)
                setAvailablesList(Object.values(getValuesByOptionAndField));
                setAssignedList([])
                setValueAttribute([])
            } else {
                setInputString(true);
            }
        } else if (typeAttribute === 'LONG') {
            if (['EQ', 'NE'].includes(operationKey)) {
                setInputString(false);
                setInputDropdown(true);
            } else {
                setInputString(false)
                setInputTransferableList(true)
                if (fieldName === 'deviceType' || fieldName === 'gender' || fieldName === 'status' || fieldName === 'userType' || fieldName === 'contractorStatus') {
                    // setAvailablesList(Object.values(getValuesByOptionAndField).map(item => deviceTypeId(+item)));
                    setAvailablesList(Object.values(getValuesByOptionAndField).map(item => t(fieldNameEnum[fieldName][+item]).toUpperCase()));
                    setAssignedList([])
                    setValueAttribute([])
                } else {
                    setAvailablesList(Object.values(getValuesByOptionAndField));
                    setAssignedList([])
                    setValueAttribute([])
                }
            }
        } else if (typeAttribute === 'INTEGER') {
            if (['IN', 'NI'].includes(operationKey)) {
                setInputString(false)
                setInputTransferableList(true)
                setAvailablesList(Object.values(getValuesByOptionAndField));
                setAssignedList([])
                setValueAttribute([])
            } else if (['BT', 'NB'].includes(operationKey)) {
                setInputString(false)
                setInputTwoNumbers(true)
            } else {
                setInputString(true);
                setInputNumber(true);
            }
        } else if (typeAttribute === 'DATE') {
            if (['BT', 'NB'].includes(operationKey)) {
                setInputString(false);
                setInputTwoDates(true)
            } else {
                setInputString(false)
                setInputDate(true)
            }
        } else if (typeAttribute === 'BOOLEAN') {
            setInputString(false)
            setInputDropdown(true)
        } else if (typeAttribute === 'UUID') {
            if (['EQ', 'NE'].includes(operationKey)) {
                setInputString(false)
                setInputDropdown(true)
            } else if (['IN', 'NI'].includes(operationKey)) {
                setInputString(false)
                setInputTransferableList(true)
                // setAvailablesList(Object.values(getValuesByOptionAndField));  //Acá hay que cambiar esto más adelante
                setAvailablesList(getValuesByOptionAndField.map(item => item.name));
                setAssignedList([])
                setValueAttribute([])
            } else {
                setInputString(true);
            }
        }
    }, [condition])

    const [showHelperText, setShowHelperText] = useState(false);

    const handleValue1Change = (event) => {
        setValue1(event.target.value);
    };

    const handleValue2Change = (event) => {
        setValue2(event.target.value);
    };

    const handleValue3Change = (event) => {
        setValue3(event.target.value);
    };

    const handleValue4Change = (event) => {
        setValue4(event.target.value);
    };

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

    //This section indicates what to do when we click clean button
    const handleClear = () => {
        setField("");
        setSort("");
        setCondition("");
        setValueAttribute("");
        setFromValue('')
        setToValue('')
        setShowHelperText(false)
        setInputNumber(false)
        setInputTwoNumbers(false)
        setInputDropdown(false)
        setInputDate(false)
        setInputTwoDates(false)
        setInputTransferableList(false)
        setInputString(true)
    }

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    useEffect(() => {
        handleClear();
        setOriginalArray(finalArray)
        if (finalArray.length === 0) {
            setFinalRules([]);
            setListRules([])
        } else {
            setListRules(finalRules)
        }
        if (open) {
            dispatch(GetAttributesFilter(moduleId))
            setModelName(Object.keys(MODELS).find(key => MODELS[key] === +moduleId))
        }
    }, [open]);

    return (
        <Dialog className='search-dialog' open={open} onClose={onClose} fullWidth maxWidth='md'>
            <DialogTitle>
                <p className='search-title'>{t("search_for").toUpperCase()}</p>
                <img onClick={() => onClose()} className="modal-close" src={cancel} alt="" />
            </DialogTitle>
            <Divider variant='middle' />

            <DialogContent className='dialog-content mt-0 pt-0'>
                <ClearButton className='mt-0 pt-0' handleClear={handleClear} flagTooltip={true} textTooltip={t('clean_all_fields').toUpperCase()} />
                <div className='create_device_data'>
                    <div className='form_field mt-2'>
                        <Box className='requiredData' sx={inputBox}>
                            <FormControl
                                fullWidth
                                required
                                sx={textField}
                            >
                                <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                    {t("field")}
                                </InputLabel>
                                <Select size='small' label={t("field")} value={field}
                                    onChange={(e) => {
                                        setTypeAttribute(getAttributesFilter.find(item => item.id === e.target.value).fieldType)
                                        setFieldName(getAttributesFilter.find(item => item.id === e.target.value).field)
                                        setField(e.target.value)
                                    }}
                                >
                                    {
                                        getAttributesFilter?.map((item, index) => {
                                            return (
                                                <MenuItem value={item.id}>{fieldId(item?.id) || "-"}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                {showHelperText && field === '' && (
                                    <FormHelperText className='select_helper_text'>{t('selectOptionText')}</FormHelperText>
                                )
                                }
                            </FormControl>
                        </Box>
                        <Box className='requiredData' sx={inputBox}>
                            <FormControl
                                fullWidth
                                required
                                sx={textField}
                            >
                                <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                    {t("sort_by")}
                                </InputLabel>
                                <Select size="small"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label={t("sort_by")}
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}>
                                    <MenuItem value="ASC">ASC</MenuItem>
                                    <MenuItem value="DESC">DESC</MenuItem>
                                </Select>
                                {showHelperText && sort === '' && (
                                    <FormHelperText className='select_helper_text'>{t('selectOptionText')}</FormHelperText>
                                )
                                }
                            </FormControl>
                        </Box>
                    </div>
                    <div className='form_field mt-4'>
                        <Box sx={inputBox}>
                            <FormControl
                                fullWidth
                                sx={textField}
                            >
                                <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                    {t("condition")}
                                </InputLabel>
                                <Select size="small"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    readOnly={field === ''}
                                    label={t("condition")}
                                    value={condition}
                                    onChange={(e) => {
                                        setOperationKey(getConditionFilter.find(item => item.id === e.target.value).operationKey)
                                        setCondition(e.target.value)
                                    }}
                                >
                                    {
                                        getConditionFilter?.map((item, index) => {
                                            return (
                                                <MenuItem value={item.id}>{conditionId(item?.id) || "-"}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Box className='requiredData' sx={inputBox}>
                            {(inputDropdown && condition !== '') &&

                                <FormControl
                                    fullWidth
                                    sx={textField}
                                >
                                    <InputLabel id="demo-simple-select-label" className='select_input_field'>
                                        {t("value")}
                                    </InputLabel>
                                    <Select size="small"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label={t("value")}
                                        value={valueAttribute}
                                        onChange={(e) => {
                                            setValueAttribute(e.target.value)
                                        }}>
                                        {
                                            typeAttribute === 'BOOLEAN' ?
                                                <>
                                                    <MenuItem value='0'>FALSE</MenuItem>
                                                    <MenuItem value='1'>TRUE</MenuItem>
                                                </>
                                                : typeAttribute === 'UUID' ?
                                                    getValuesByOptionAndField?.map((item, index) => {
                                                        return (
                                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                                        )
                                                    })
                                                    :
                                                    getValuesByOptionAndField?.map((item, index) => {
                                                        return (
                                                            <MenuItem value={item}>{(fieldName === 'deviceType' || fieldName === 'gender' ||
                                                                fieldName === 'status' || fieldName === 'userType' || fieldName === 'contractorStatus') ? t(fieldNameEnum[fieldName][+item]).toUpperCase() :
                                                                item}</MenuItem>
                                                        )
                                                    })
                                        }
                                    </Select>
                                    {showHelperText && valueAttribute === '' && (
                                        <FormHelperText className='select_helper_text'>{t('selectOptionText')}</FormHelperText>
                                    )
                                    }
                                </FormControl>}
                            {(inputTwoNumbers && condition !== '') &&
                                <div className='form_field mt-0'>
                                    <TextField className='textfield-value' size="small" style={{
                                        pointerEvents: condition === '' && 'none',
                                        backgroundColor: condition === '' && '#e1e1e1'
                                    }}
                                        fullWidth
                                        type='number'
                                        required={condition !== ''}
                                        label={t("value")}
                                        InputProps={{
                                            readOnly: condition === '' && true,
                                        }}
                                        id="ID"
                                        helperText={
                                            showHelperText && condition !== '' && valueAttribute === '' ? t('requiredField') : ''
                                        }
                                        value={valueAttribute}
                                        onChange={(e) => setValueAttribute(e.target.value)}
                                        sx={textField}
                                    />
                                    <TextField className='textfield-value' size="small" style={{
                                        pointerEvents: condition === '' && 'none',
                                        backgroundColor: condition === '' && '#e1e1e1'
                                    }}
                                        fullWidth
                                        type='number'
                                        required={condition !== ''}
                                        label={t("value")}
                                        InputProps={{
                                            readOnly: condition === '' && true,
                                        }}
                                        id="ID"
                                        helperText={
                                            showHelperText && condition !== '' && valueAttribute === '' ? t('requiredField') : ''
                                        }
                                        value={valueAttribute}
                                        onChange={(e) => setValueAttribute(e.target.value)}
                                        sx={textField}
                                    />
                                </div>}
                            {(inputDate && condition !== '') &&

                                <div className="dateTimeInput">
                                    <div className="dateTimeInput-container">
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                allowSameDateSelection
                                                label={t("date")}
                                                inputFormat="dd/MM/yyyy"
                                                value={valueAttribute}
                                                onChange={handleDateChange}
                                                renderInput={(params) => <TextField className='textfield-value' size="small" sx={textField} fullWidth required {...params} helperText={showHelperText && condition !== '' && valueAttribute === '' ? t('requiredField') : ''} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>}
                            {(inputTwoDates && condition !== '') &&

                                <div className='form_field mt-0'>
                                    <div className="dateTimeInput-container">
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                allowSameDateSelection
                                                label={t("from")}
                                                inputFormat="dd/MM/yyyy"
                                                value={fromValue}
                                                onChange={handleFromDateChange}
                                                renderInput={(params) => <TextField className='textfield-value' size="small" sx={textField} fullWidth required {...params} helperText={showHelperText && condition !== '' && fromValue === '' ? t('requiredField') : ''} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    <div className="dateTimeInput-container">
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                allowSameDateSelection
                                                label={t("to")}
                                                inputFormat="dd/MM/yyyy"
                                                value={toValue}
                                                onChange={handleToDateChange}
                                                renderInput={(params) => <TextField className='textfield-value' size="small" sx={textField} fullWidth required {...params} helperText={showHelperText && condition !== '' && toValue === '' ? t('requiredField') : ''} />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>


                            }
                            {(inputString || condition === '') &&
                                <TextField className='textfield-value' size="small" style={{
                                    pointerEvents: (condition === '' || (['NU', 'NN'].includes(operationKey))) && 'none',
                                    backgroundColor: (condition === '' || (['NU', 'NN'].includes(operationKey))) && '#e1e1e1'
                                }}
                                    fullWidth
                                    type={inputNumber ? 'number' : 'text'}
                                    required={condition !== '' && (!['NU', 'NN'].includes(operationKey))}
                                    label={t("value")}
                                    InputProps={{
                                        readOnly: (condition === '' || (['NU', 'NN'].includes(operationKey))) && true,
                                    }}
                                    id="ID"
                                    helperText={
                                        showHelperText && condition !== '' && valueAttribute === '' ? t('requiredField') : ''
                                    }
                                    value={valueAttribute}
                                    onChange={(e) => setValueAttribute(e.target.value)}
                                    sx={textField}
                                />
                            }

                        </Box>
                    </div>
                </div>
                <div>
                    <div className='div-options mt-3'>
                        <span className="span-options">{t("search_criteria").toUpperCase()}</span>

                        <div className='options-swith'>
                            <label className={checked ? null : "criteria-option-label"}>
                                {t("and").toUpperCase()}
                            </label>
                            <Switch
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ "aria-label": "controlled" }}
                                color="primary"
                            />
                            <label className={checked ? "criteria-option-label" : null}>
                                {t("or").toUpperCase()}
                            </label>
                        </div>
                    </div>
                </div>

                <div className='div-criterias'>
                    {(inputTransferableList && condition !== '') &&
                        <Grid container spacing={2.2}>
                            <Grid item xs={6} alignItems={'center'}>
                                <span className='title-card'>{t("availables")}</span>
                                <Card variant='outlined'>
                                    <CardContent className='card-content-criteria pt-0'>
                                        <List dense >
                                            {availablesList.map((element) => (
                                                <ListItem className='list-item-criteria' key={element} onClick={() => handleAssign(element)} style={{ cursor: 'pointer' }}>
                                                    <ListItemText primary={`${element}`} style={{ cursor: 'pointer' }} />
                                                    <img className='assign-icon'
                                                        src={chevron_right_solid}
                                                        alt="chevron_right_solid"
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                    <CardActions className='card-actions'>
                                        <Button variant="text" onClick={transferAllToAssigned}>
                                            {t("add_all").toUpperCase()}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={6}>
                                <span className='title-card'>{t("assigned")}</span>
                                <Card variant='outlined'>
                                    <CardContent className='card-content-criteria pt-0'>
                                        <List dense>
                                            {assignedList.map((element) => (
                                                <ListItem className='list-item-criteria' key={element} onClick={() => handleDeallocate(element)}>
                                                    <ListItemText primary={`${element}`} />
                                                    <img className='deallocate-icon'
                                                        src={cancel} alt=""
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </CardContent>
                                    <CardActions className='card-actions'>
                                        <Button variant="text" onClick={transferAllToAvailables}>
                                            {t("remove_all").toUpperCase()}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    }
                    <Button className='add-rule-btn' variant="contained" onClick={handleAddRule}>
                        {t("add_rule_to_search").toUpperCase()}
                    </Button>
                    <div className='div-rules mt-1 mb-2'>
                        <span className="span-rules mt-2 ml-5">{t("rules")}</span>
                        <ClearButton className='mt-0 pt-0' handleClear={handleDeleteAllRules} flagTooltip={true} textTooltip={t('clean_all_rules').toUpperCase()} />
                    </div>
                    <Card variant='outlined'>
                        <CardContent className='card-rules pt-0'>
                            <List>
                                {listRules.map((item, index) => (
                                    <ListItem className='list-item-rules' key={index}>
                                        <div className="circle" />
                                        <ListItemText primary={item} className='w-100' />
                                        <img className='delete-icon' onClick={() => handleDeleteRule(index)}
                                            src={ic_delete_red} alt=""
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                    <Button className='search-btn' variant="contained" onClick={handleSearch}>
                        {t("search").toUpperCase()}
                    </Button>
                </div>
            </DialogContent>
        </Dialog >
    )


}

export default SearchFor;

const inputBox = {
    width: "100%",
    maxWidth: "100%",
    fontSize: "20px",
    height: "50px",
}