
/*
Author : Arman Ali
Module: Role
github: https://github.com/Arman-Arzoo
website: https://www.toplinegeeks.com,
modify every implementation
*/

import { Box, TextField } from '@mui/material';
import Cookies from "js-cookie";
import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { iconStyle } from '../../../../../Helpers/arabicStyle';
import chevron_right_solid from '../../../../../assets/images/chevron-right-solid.svg';
import ic_cancel from '../../../../../assets/images/ic-cancel.svg';
import ClearButton from '../../../../../components/ClearButton';
import { GetSingleRole, UpdateRole, creatRole, roleAvailableTasks } from '../../../../../reduxToolkit/EmployeeRoles/EmployeeRolesApi';
import DeleteRoleModal from './DeleteRoleModal';
import ManageRoleModal from './ManageRoleModal';
import AvailableRole from './AvailableRole';
import { companyMobile } from './RoleData'
import ChooseRole from './ChooseRole';
import ReusableTextField from '../../../../../components/ReusableTextField ';

const CreateNewRole = () => {
    // use hook
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams();
    // useSelector
    const { roleListData, singleRoleObj, updateRoleSuccess, creteRoleSuccess } = useSelector(state => state?.EmployeeRolesSlice);
    // useState
    const [mobileAvailableList, setMobileAvaliableList] = useState([])
    const [websiteAvailableList, setWebsiteAvailableList] = useState([])
    const [mobileChooseList, setMobileChooseList] = useState([])
    const [websiteChooseList, setWebsiteChooseList] = useState([])
    const [mobileSelected, setMobileSelected] = useState([])
    const [websiteSelected, setWebsiteSelected] = useState([])
    const [deleteTask, setDeleteTask] = useState([])
    const [roleRestrictions, setroleRestrictions] = useState([
        {
            name: "biocrValidation",
            res: t('biocr_validation'),
            check: false,
            info: "Use the BIOCR validation to confirm your identity",
        },
        {
            name: "eventValidation",
            res: t('event_validation'),
            check: false,
            info: "Validate the event who created in this role.",
        },
        {
            name: "extraDataEmployee",
            res: t('extra_data_employee'),
            check: false,
            info: "Add extra data to the employee.",
        },
        {
            name: "keepSessionActiveWebApp",
            res: t('keep_session_active'),
            check: false,
            info: "To keep the session al the time active in the web app",
        },
        // {
        //     name: "twoWayValidationFactor",
        //     res: "Two way validation factor",
        //     check: false,
        //     info: "To use the 6 digits code to log in on the web app",
        // },
        {
            name: "sharePdfInMobileApp",
            res: t('share_pdf_in_mobile_app'),
            check: false,
            info: "To use the 6 digits code to log in on the web app",
        },
        {
            name: "useTokenWebApp",
            res: t('use_token_webapp'),
            check: false,
            info: "To use the 6 digits code to log in on the web app",
        },
    ]);
    const [roleName, setRoleName] = useState("");
    const [deleteId, setDeleteId] = useState();
    const [deleteItemName, setdeleteItemName] = useState();
    const [roleDataById, setRoleDataById] = useState();
    const [show, setShow] = useState(false);
    const [manageShow, setManageShow] = useState(false);
    const [selectedRestrictions, setSelectedRestrictions] = useState({
        biocrValidation: false,
        eventValidation: false,
        extraDataEmployee: false,
        id: "",
        keepSessionActiveWebApp: false,
        // twoWayValidationFactor: false,
        sharePdfInMobileApp: false,
        useTokenWebApp: false
    });
    const [isInitialSetup, setIsInitialSetup] = useState(true);
    const [nameError, setNameError] = useState('');
    const [submitClicked, setSubmitClicked] = useState(false);

    // clear all field
    const clearField = () => {
        setRoleName("")
        setroleRestrictions(prevState => {
            const updatedCheckboxList = prevState.map(item => ({ ...item, check: false }));
            return updatedCheckboxList;
        });

        setSelectedRestrictions({
            biocrValidation: false,
            eventValidation: false,
            extraDataEmployee: false,
            id: "",
            keepSessionActiveWebApp: false,
            sharePdfInMobileApp: false,
            useTokenWebApp: false
        });

        const mr = roleListData?.filter(item => item?.isMobileApp);
        const wr = roleListData?.filter(item => !item?.isMobileApp);
        setMobileAvaliableList(mr)
        setWebsiteAvailableList(wr)
        setWebsiteChooseList([])
        setMobileChooseList([])

        let db = [...mr, ...wr];
        const deleteState = db.filter(item => singleRoleObj?.currentTasks?.some(selectedItem => selectedItem.id === item.id));
        setDeleteTask(deleteState)
    }
    // CheckBox restriction
    // const handleCheckBox = (e, item) => {
    //     const { checked, name } = e.target
    //     let checkboxList = roleRestrictions;
    //     checkboxList.forEach(chkItem => {
    //         if (chkItem === item) {
    //             chkItem.check = checked;
    //         }
    //     })
    //     setSelectedRestrictions(prevState => ({
    //         ...prevState,
    //         [name]: checked
    //     }));
    //     setroleRestrictions(checkboxList);
    // }
    const handleCheckBox = (e, item) => {
        const { checked, name } = e.target;
        let checkboxList = [...roleRestrictions]; // Create a copy of roleRestrictions

        checkboxList.forEach(chkItem => {
            if (chkItem.res === item.res) {
                chkItem.check = checked;
            }
        });

        setSelectedRestrictions(prevState => ({
            ...prevState,
            [name]: checked
        }));

        setroleRestrictions(checkboxList);
    };
    console.log(deleteTask)
    // //  handle add and delete task
    const handleTaskListClick = (payload) => {
        switch (payload.check) {
            case 1:
                if (payload.selected.option) {
                    setWebsiteChooseList(prevArray => [...prevArray, payload.selected]);
                    setWebsiteAvailableList(prevArray => prevArray.filter(obj => obj.id !== payload.selected?.id));
                } else {
                    toast.warn("Do'not need to add it already in database")
                    setDeleteTask(prevArray => prevArray.filter(obj => obj.id !== payload.selected?.id));
                    setWebsiteChooseList(prevArray => [...prevArray, payload.selected]);
                    setWebsiteAvailableList(prevArray => prevArray.filter(obj => obj.id !== payload.selected?.id));
                }
                break;
            case 2:
                if (payload.selected.option) {
                    setMobileChooseList(prevArray => [...prevArray, payload.selected]);
                    setMobileAvaliableList(prevArray => prevArray.filter(obj => obj.id !== payload.selected?.id));
                } else {
                    toast.warn("Do'not need to add it already in database")
                    setDeleteTask(prevArray => prevArray.filter(obj => obj.id !== payload.selected?.id));
                    setMobileChooseList(prevArray => [...prevArray, payload.selected]);
                    setMobileAvaliableList(prevArray => prevArray.filter(obj => obj.id !== payload.selected?.id));
                }
                break;
            case 3:
                if (payload.selected.option) {
                    setMobileAvaliableList(prevArray => [...prevArray, payload.selected]);
                    setMobileChooseList(prevArray => prevArray.filter(obj => obj.id !== payload.selected?.id));
                } else {
                    setDeleteTask(prev => [...prev, payload.selected])
                    setMobileAvaliableList(prevArray => [...prevArray, payload.selected]);
                    setMobileChooseList(prevArray => prevArray.filter(obj => obj.id !== payload.selected?.id));
                }
                break;
            case 4:
                if (payload.selected.option) {
                    setWebsiteAvailableList(prevArray => [...prevArray, payload.selected]);
                    setWebsiteChooseList(prevArray => prevArray.filter(obj => obj.id !== payload.selected?.id));
                }
                else {
                    setDeleteTask(prev => [...prev, payload.selected])
                    setWebsiteAvailableList(prevArray => [...prevArray, payload.selected]);
                    setWebsiteChooseList(prevArray => prevArray.filter(obj => obj.id !== payload.selected?.id));
                }

                break;
            case 5:
                const mr = roleListData?.filter(item => item?.isMobileApp);
                const wr = roleListData?.filter(item => !item?.isMobileApp);
                setMobileAvaliableList([])
                setWebsiteAvailableList([])
                setWebsiteChooseList(wr)
                setMobileChooseList(mr)
                break;
            case 6:
                const ma = roleListData?.filter(item => item?.isMobileApp);
                const wa = roleListData?.filter(item => !item?.isMobileApp);
                setMobileAvaliableList(ma)
                setWebsiteAvailableList(wa)
                setWebsiteChooseList([])
                setMobileChooseList([])
                let db = [...ma, ...wa];
                const deleteState = db.filter(item => singleRoleObj?.currentTasks?.some(selectedItem => selectedItem.id === item.id));
                setDeleteTask(deleteState)
                break;
            default:
                // Handle unknown payload.check values, if needed
                toast.warn("invalid check")
                break;
        }
    }
    const handleNameChange = (value) => {
        // Perform validation logic
        if (value === '' ) {
          setNameError('Role cannot be empty');
        } else {
          setNameError('');
        }
    
        setRoleName(value);
      };
    // handel create and update role
    const handleCreateRole = () => {
        if (roleName != "") {
            if (id) {
                const addTasks = [...mobileChooseList, ...websiteChooseList].map(item => ({ id: item.id }));
                const removeTasks = [...deleteTask].map(item => ({ id: item.id }));
                const updateData = {
                    id: singleRoleObj?.id,
                    addTasks,
                    removeTasks,
                    name: roleName,
                    roleRestriction: {
                        roleId: singleRoleObj?.roleRestriction?.roleId,
                        id: singleRoleObj?.roleRestriction?.id,
                        biocrValidation: roleRestrictions.find(obj => obj.res === "biocrValidation").check,
                        eventValidation: roleRestrictions.find(obj => obj.res === "eventValidation").check,
                        extraDataEmployee: roleRestrictions.find(obj => obj.res === "extraDataEmployee").check,
                        keepSessionActiveWebApp: roleRestrictions.find(obj => obj.res === "keepSessionActiveWebApp").check,
                        sharePdfInMobileApp: roleRestrictions.find(obj => obj.res === "sharePdfInMobileApp").check,
                        useTokenWebApp: roleRestrictions.find(obj => obj.res === "useTokenWebApp").check,
                    }
                }
                dispatch(UpdateRole(updateData)).then(res => {
                    if (res.payload?.status == 200) {
                        navigate(-1)
                    }
                })
            } else {
                const addTasks = [...mobileChooseList, ...websiteChooseList].map(item => ({ id: item.id }));
                const data = {
                    addTasks,
                    name: roleName,
                    removeTasks: null,
                    roleRestriction: {
                        biocrValidation: selectedRestrictions?.biocrValidation,
                        eventValidation: selectedRestrictions?.eventValidation,
                        extraDataEmployee: selectedRestrictions?.extraDataEmployee,
                        keepSessionActiveWebApp: selectedRestrictions?.keepSessionActiveWebApp,
                        sharePdfInMobileApp: selectedRestrictions?.sharePdfInMobileApp,
                        useTokenWebApp: selectedRestrictions?.useTokenWebApp,
                    }
                }
                dispatch(creatRole(data)).then(res => {
                    if (res.payload?.status == 201) {
                        navigate(-1)
                    }
                })
            }
        } else {
            // toast.warn("Role Name is Required")
            setSubmitClicked(true)
        }
    }
    // // makeSure some sate when initailize is empty
    useEffect(() => {
        setDeleteTask([])
        setMobileChooseList([])
        setWebsiteChooseList([])
    }, [])
    // // transforming data to available and choose for get display
    useEffect(() => {
        dispatch(roleAvailableTasks());
        const m = roleListData?.filter(item => item?.isMobileApp);
        const w = roleListData?.filter(item => !item?.isMobileApp);

        setMobileAvaliableList(m);
        setWebsiteAvailableList(w);


    }, []);
    // // before update data 
    useEffect(() => {
        if (id) {
            var arrObj = [
                {
                    res: "biocrValidation",
                    check: singleRoleObj?.roleRestriction?.biocrValidation,
                    data: t('biocr_validation_for_externals'),
                    info: "Use the BIOCR validation to confirm your identity",
                },
                {
                    res: "eventValidation",
                    check: singleRoleObj?.roleRestriction?.eventValidation,
                    data: t('event_validation'),
                    info: "Validate the event who created in this role.",
                },
                {
                    res: "extraDataEmployee",
                    check: singleRoleObj?.roleRestriction?.extraDataEmployee,
                    data: t('extra_data_employee'),
                    info: "Add extra data to the employee.",
                },
                {
                    res: "keepSessionActiveWebApp",
                    check: singleRoleObj?.roleRestriction?.keepSessionActiveWebApp,
                    data: t('keep_session_active'),
                    info: "To keep the session al the time active in the web app",
                },
                {
                    res: "sharePdfInMobileApp",
                    check: singleRoleObj?.roleRestriction?.sharePdfInMobileApp,
                    data: "Share Pdf In MobileApp",
                    info: "To use the 6 digits code to log in on the web app",
                },
                {
                    res: "useTokenWebApp",
                    check: singleRoleObj?.roleRestriction?.useTokenWebApp,
                    data: t('use_token_webapp'),
                    info: "To use the 6 digits code to log in on the web app",
                },
            ]
            setroleRestrictions(arrObj);

            // get detail with id
            dispatch(GetSingleRole(id))
            // set all the state
            setRoleName(singleRoleObj?.name)
            setRoleDataById(singleRoleObj);
            setRoleName(singleRoleObj?.name);
            setSelectedRestrictions(singleRoleObj?.roleRestriction);
            // checking choose and selected list
            let arr1 = [];
            let arr2 = [];
            singleRoleObj?.currentTasks?.forEach(item => {
                if (item?.isMobileApp) {

                    const transformedItem = {
                        ...item,
                        option: false // Set the option attribute to false
                    };
                    arr1.push(transformedItem);
                } else {

                    const transformedItem = {
                        ...item,
                        option: false // Set the option attribute to false
                    };

                    arr2.push(transformedItem);
                }
            });
            // set after get from current list
            setMobileChooseList(arr1);
            setWebsiteChooseList(arr2);




        }
    }, [singleRoleObj?.id, creteRoleSuccess, updateRoleSuccess])
    // // filter out to avoid confilt and smooth filter base on currentTasks 
    useEffect(() => {
        if (isInitialSetup) {
            setIsInitialSetup(false);
            return;
        }
        // Code for subsequent updates
        // Check if all the required data is available before filtering
        if (
            singleRoleObj &&
            mobileAvailableList &&
            websiteAvailableList
        ) {
            // filter out from mobile available
            const removeAvailableMobile = mobileAvailableList.filter(
                (item) => !mobileChooseList.some((selectedItem) => selectedItem.id === item.id)
            );
            setMobileAvaliableList(removeAvailableMobile);

            // filter out from web available
            const removeAvailableWeb = websiteAvailableList.filter(
                (item) => !websiteChooseList.some((selectedItem) => selectedItem.id === item.id)
            );
            setWebsiteAvailableList(removeAvailableWeb);
        }
    }, [isInitialSetup, singleRoleObj, mobileChooseList, creteRoleSuccess, updateRoleSuccess]);

    return (
        <>
            <div className='head'>
                <div className='headLeft'>
                    <Link to="/dashboard/employee/company/roles-panel">
                        <i className="fa fa-arrow-left" aria-hidden="true" style={iconStyle}></i>
                    </Link>
                    <h2>{id ? t('update_role') : t('create_role')}</h2>
                </div>
            </div>
            <div className='create_new_role'>
                <div className="row">
                    {/* role restriction */}
                    <div className="col-4">
                        <div className="create_new_role_data">
                            <div className='header_clear'>
                                <h3>{t('data')}</h3>
                                <ClearButton
                                    flagTooltip={true}
                                    handleClear={() => clearField()}
                                    textTooltip={t('clear_all_inputs')?.toUpperCase()} />

                            </div>
                            <div className="create_new_role_data_item">
                                <Box
                                    component="form"
                                    sx={{
                                        width: "100%",
                                        maxWidth: "100%",
                                        fontSize: "20px",
                                        height: "40px",
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    {/* <TextField size="small"

                                        fullWidth
                                        label={t('role_name')}
                                        name="roleName"
                                        id="outlined-size-normal"
                                        defaultValue=" "
                                        value={roleName}
                                        onChange={(e) => setRoleName(e.target.value)}
                                    /> */}
                                    <ReusableTextField
                                        label={t("role_name")}
                                        onChange={handleNameChange}
                                        value={roleName}
                                        helperText={nameError}
                                        isRequired={true}
                                        submitClicked={submitClicked}
                                        validate={(value) => value === ''}
                                    />
                                </Box>
                            </div>
                            <h3 className='mt-4'>{t('restrictios')}</h3>
                            {
                                roleRestrictions?.map((item, index) => (
                                    <div className="create_new_role_data_restrictions" key={index}>
                                        <div className="data_restrictions_item">
                                            <p className='roleName'>{item.res}</p>
                                            <label className="checkboxLabel">
                                                <input
                                                    type="checkbox"
                                                    name={item.name}
                                                    checked={item.check}
                                                    onChange={(e) => handleCheckBox(e, item)}
                                                />
                                                <span className="checkmark" style={{
                                                    right: lCode === "ar" ? "" : "10px",
                                                    left: lCode === "ar" ? "10px" : ""
                                                }}></span>
                                            </label>
                                        </div>
                                        <p className='roleInfo'><span>{t('info')}: </span>{item.info}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* available */}
                    <div className="col-4 mt-4 new_role_available">
                        <p>{t('available')}</p>
                        <div className='new_role_available_container'>
                            {/* <Accordion defaultActiveKey="0">
                                <Accordion.Item
                                    eventKey="0"
                                    className="outerAccordionItem"
                                >
                                    <Accordion.Header>{t("app")} <sub>{`(${mobileAvailableList?.length})`}</sub> </Accordion.Header>
                                    <Accordion.Body className='mainAccordionBody'>
                                        <Accordion defaultActiveKey="0">
                                            {
                                                mobileAvailableList?.map(task1 => {
                                                    return (
                                                        task1?.name?.split("_")[1] == "MENU" ?
                                                            <Accordion.Item
                                                                eventKey={task1?.id}
                                                                key={task1?.id}
                                                                className="innerAccordionItem"
                                                            >
                                                                <Accordion.Header>{task1?.name?.split("_")[0]}</Accordion.Header>
                                                                {mobileAvailableList?.map(task2 => {
                                                                    return (
                                                                        task1?.moduleId === task2?.moduleId && task2?.name?.split("_")[1] !== "MENU" ?
                                                                            <Accordion.Body
                                                                                onClick={() => handleTaskListClick({
                                                                                    selected: task2,
                                                                                    check: 1
                                                                                })}
                                                                            >
                                                                                <span>{task2?.name.replace(/_/g, ' ')}</span>
                                                                                <img
                                                                                    src={chevron_right_solid}
                                                                                    alt="chevron_right_solid"
                                                                                />
                                                                            </Accordion.Body> : null
                                                                    )
                                                                })}
                                                            </Accordion.Item> : null
                                                    )
                                                })
                                            }
                                        </Accordion>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item
                                    eventKey="1"
                                    className="outerAccordionItem"
                                >
                                    <Accordion.Header>{t("web_app")} <sub>{`(${websiteAvailableList?.length})`}</sub> </Accordion.Header>
                                    <Accordion.Body className='mainAccordionBody'>
                                        <Accordion defaultActiveKey="0">
                                            {
                                                websiteAvailableList?.map(task1 => (
                                                    task1?.name?.split("_")[2] === "MENU" ?
                                                        <Accordion.Item
                                                            eventKey={task1?.id}
                                                            key={task1?.id}
                                                            className="innerAccordionItem"
                                                        >
                                                            <Accordion.Header>{task1?.name?.split("_")[1]}</Accordion.Header>
                                                            {websiteAvailableList?.map(task2 => (
                                                                task1?.moduleId === task2?.moduleId && task2?.name?.split("_")[2] !== "MENU" ?
                                                                    <Accordion.Body
                                                                        onClick={() => handleTaskListClick({
                                                                            selected: task2,
                                                                            check: 3
                                                                        })}
                                                                    >
                                                                        <span>{task2?.name.replace(/_/g, ' ')}</span>
                                                                        <img
                                                                            src={chevron_right_solid}
                                                                            alt="chevron_right_solid"
                                                                        />
                                                                    </Accordion.Body> : null
                                                            ))}
                                                        </Accordion.Item> : null
                                                ))
                                            }
                                        </Accordion>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion> */}
                            <AvailableRole
                                onHandler={handleTaskListClick}
                                data={roleListData}
                                mobileAvailableList={mobileAvailableList}
                                setMobileAvailableList={setMobileAvaliableList}
                                websiteAvailableList={websiteAvailableList}
                                setWebsiteAvailableList={setWebsiteAvailableList}
                                mobileChooseList={mobileChooseList}
                                setMobileChooseList={setMobileChooseList}
                                websiteChooseList={websiteChooseList}
                                setWebsiteChooseList={setWebsiteChooseList}
                                mobileSelected={mobileSelected}
                                setMobileSelected={setMobileSelected}
                                websiteSelected={websiteSelected}
                                setWebsiteSelected={setWebsiteSelected}
                            />

                        </div>
                        <div className='accodion_footer_role'
                            onClick={() => handleTaskListClick({
                                check: 5
                            })}>
                            <span>{t("add_all")}</span>
                        </div>

                    </div>
                    {/* chooce */}
                    <div className="col-4 new_role_available">
                        <h3>{t('permissions')}</h3>
                        <p>{t('choosed')}</p>
                        <div className='new_role_available_container'>
                            {/* <Accordion defaultActiveKey="0">
                                <Accordion.Item
                                    eventKey="0"
                                    className="outerAccordionItem"
                                >
                                    <Accordion.Header>{t("app")} <sub>{`(${Number(mobileChooseList?.length) - Number(mobileAvailableList?.length)})`}</sub> </Accordion.Header>
                                    <Accordion.Body className='mainAccordionBody'>
                                        <Accordion defaultActiveKey="0">
                                            {
                                                mobileChooseList?.map(task1 => (
                                                    task1?.name?.split("_")[1] == "MENU" ?
                                                        <Accordion.Item
                                                            eventKey={task1?.id}
                                                            key={task1?.id}
                                                            className="innerAccordionItem"
                                                        >
                                                            <Accordion.Header>{task1?.name?.split("_")[0]}</Accordion.Header>
                                                            {mobileChooseList.map(task2 => (
                                                                mobileSelected?.map(selectedItem => {
                                                                    if (selectedItem?.moduleId === task1?.moduleId && selectedItem?.name === task2?.name) {
                                                                        // setChoosedCount(task1?.module.id)
                                                                        return (
                                                                            <Accordion.Body key={selectedItem.id}>
                                                                                <span>{selectedItem?.name.replace(/_/g, ' ')}</span>
                                                                                <img
                                                                                    src={ic_cancel}
                                                                                    alt="ic_cancel"
                                                                                    // onClick={() => handleDeleteTask(selectedItem)}
                                                                                    onClick={() => handleTaskListClick({
                                                                                        selected: selectedItem,
                                                                                        check: 2
                                                                                    })}
                                                                                />
                                                                            </Accordion.Body>
                                                                        )
                                                                    }
                                                                })
                                                            ))}
                                                        </Accordion.Item> : null
                                                ))
                                            }
                                        </Accordion>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item
                                    eventKey="1"
                                    className="outerAccordionItem"
                                >
                                    <Accordion.Header>{t("web_app")} <sub>{`(${Number(websiteChooseList?.length) - Number(websiteAvailableList?.length)})`}</sub> </Accordion.Header>
                                    <Accordion.Body className='mainAccordionBody'>
                                        <Accordion defaultActiveKey="0">
                                            {
                                                websiteChooseList?.map(task1 => (
                                                    task1?.name?.split("_")[2] == "MENU" ?
                                                        <Accordion.Item
                                                            eventKey={task1?.id}
                                                            key={task1?.id}
                                                            className="innerAccordionItem"
                                                        >
                                                            <Accordion.Header>{task1?.name?.split("_")[1]}</Accordion.Header>
                                                            {websiteChooseList?.map(task2 => (
                                                                websiteSelected?.map(selectedItem => (
                                                                    selectedItem?.moduleId === task1?.moduleId && selectedItem?.name === task2?.name ?
                                                                        <Accordion.Body key={selectedItem.id}>
                                                                            <span>{selectedItem?.name.replace(/_/g, ' ')}</span>
                                                                            <img
                                                                                src={ic_cancel}
                                                                                alt="ic_cancel"
                                                                                onClick={() => handleTaskListClick({
                                                                                    selected: selectedItem,
                                                                                    check: 4
                                                                                })}
                                                                            />
                                                                        </Accordion.Body> : null
                                                                ))
                                                            ))}
                                                        </Accordion.Item> : null
                                                ))
                                            }
                                        </Accordion>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion> */}
                            <ChooseRole
                                onHandler={handleTaskListClick}
                                data={roleListData}
                                mobileAvailableList={mobileAvailableList}
                                setMobileAvailableList={setMobileAvaliableList}
                                websiteAvailableList={websiteAvailableList}
                                setWebsiteAvailableList={setWebsiteAvailableList}
                                mobileChooseList={mobileChooseList}
                                setMobileChooseList={setMobileChooseList}
                                websiteChooseList={websiteChooseList}
                                setWebsiteChooseList={setWebsiteChooseList}
                                mobileSelected={mobileSelected}
                                setMobileSelected={setMobileSelected}
                                websiteSelected={websiteSelected}
                                setWebsiteSelected={setWebsiteSelected}
                            />


                        </div>
                        <div className='accodion_footer_role' onClick={() => handleTaskListClick({ check: 6 })}>
                            <span>{t('remove_all')}</span>
                        </div>
                    </div>
                </div>


                <div className='d-flex justify-content-end mt-4 mb-4' >
                    <Link to="/dashboard/employee/company/roles-panel">
                        <button className='btn_cancel_background_gray_hover'
                            style={{ minWidth: "304px" }} >
                            {t('cancel')}
                        </button>
                    </Link>
                    <button className='custom_primary_btn_dark' onClick={() => handleCreateRole()}
                        style={{ minWidth: "304px" }}
                    >
                        {id ? t('update')?.toUpperCase() : t('create')?.toUpperCase()}
                    </button>
                </div>
                <DeleteRoleModal
                    show={show}
                    onHide={() => setShow(false)}
                    deleteid={deleteId}
                    deleteitemname={deleteItemName}
                />

                <ManageRoleModal
                    show={manageShow}
                    onHide={() => setManageShow(false)}
                    deleteid={id}
                // roleid={roleId}
                />
            </div>
        </>
    )
}

export default CreateNewRole