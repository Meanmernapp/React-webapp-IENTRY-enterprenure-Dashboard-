import { Box, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Accordion } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom'
import deleteIcon from '../../../../../assets/images/ic-delete-red.svg';
import warningIcon from '../../../../../assets/images/warning.svg'
import { toast } from 'react-toastify';
import {
    createRole,
    getRoleById,
    addRoleUserList,
} from '../../../../../Apis/roles';
import chevron_right_solid from '../../../../../assets/images/chevron-right-solid.svg'
import ic_cancel from '../../../../../assets/images/ic-cancel.svg'
import DeleteRoleModal from './DeleteRoleModal';
import ManageRoleModal from './ManageRoleModal';
import { useDispatch, useSelector } from 'react-redux';
import { EmployeesInCreate, HandleChoosedList, HandleTaskList } from '../../../../../reduxToolkit/EmployeeRoles/EmployeeRolesSlice';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { addPermissionTask, addUsersToRole, creatRole, GetSingleRole, roleAvailableTasks, UpdateRole, updateRoleRestriction } from '../../../../../reduxToolkit/EmployeeRoles/EmployeeRolesApi';
import { iconStyle } from '../../../../../Helpers/arabicStyle';

const CreateNewRole = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        selectedEmployeesList,
        mobileAvailableList,
        websiteAvailableList,
        mobileChooseList,
        websiteChooseList,
        mobileSelected,
        websiteSelected
    } = useSelector(state => state?.EmployeeRolesSlice);
    console.log(
        mobileAvailableList,
        websiteAvailableList)

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
    const [choosedCount, setChoosedCount] = useState(null);
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
    console.log(choosedCount)


    useEffect(() => {
        dispatch(HandleTaskList({
            check: 5
        }))
        dispatch(roleAvailableTasks());
        if (id) {
            dispatch(GetSingleRole(id)).unwrap().then(({ data: { data } }) => {
                setRoleDataById(data);
                setRoleName(data?.name);
                setSelectedRestrictions(data?.roleRestriction);
                let arr1 = [];
                let arr2 = [];
                data?.roleTasks?.map((item) => {
                    if (item?.task?.isMobileApp) {
                        arr1.push(item?.task);
                    } else {
                        arr2.push(item?.task);
                    }
                });
                dispatch(HandleChoosedList({ arr1, arr2 }))

                // data?.roleTasks.map((item) => {
                //     setSelectedTaskList(selectedTaskList => [...selectedTaskList.filter(value => value.id !== item.task.id), item.task])
                // })

                var arrObj = [
                    {
                        res: "biocrValidation",
                        check: data?.roleRestriction?.biocrValidation,
                        data: t('biocr_validation_for_externals'),
                        info: "Use the BIOCR validation to confirm your identity",
                    },
                    {
                        res: "eventValidation",
                        check: data?.roleRestriction?.eventValidation,
                        data: t('event_validation'),
                        info: "Validate the event who created in this role.",
                    },
                    {
                        res: "extraDataEmployee",
                        check: data?.roleRestriction?.extraDataEmployee,
                        data: t('extra_data_employee'),
                        info: "Add extra data to the employee.",
                    },
                    {
                        res: "keepSessionActiveWebApp",
                        check: data?.roleRestriction?.keepSessionActiveWebApp,
                        data: t('keep_session_active'),
                        info: "To keep the session al the time active in the web app",
                    },
                    {
                        res: "sharePdfInMobileApp",
                        check: data?.roleRestriction?.sharePdfInMobileApp,
                        data: "Share Pdf In MobileApp",
                        info: "To use the 6 digits code to log in on the web app",
                    },
                    {
                        res: "useTokenWebApp",
                        check: data?.roleRestriction?.useTokenWebApp,
                        data: t('use_token_webapp'),
                        info: "To use the 6 digits code to log in on the web app",
                    },
                ]
                setroleRestrictions(arrObj);
            })
        }
    }, [])

    const handleCheckBox = (e, item) => {
        const { checked, name } = e.target
        let checkboxList = roleRestrictions;
        checkboxList.forEach(chkItem => {
            if (chkItem === item) {
                chkItem.check = checked;
                setSelectedRestrictions({ ...selectedRestrictions, [name]: checked })
            }
        })
        setroleRestrictions(checkboxList);
    }


    const handleCreateRole = () => {
        if (roleName !== "") {
            if (id) {
                dispatch(UpdateRole({
                    id,
                    name: roleName,
                })).unwrap().then(({ data: { data } }) => {
                    const roleRestriction = {
                        biocrValidation: selectedRestrictions?.biocrValidation,
                        eventValidation: selectedRestrictions?.eventValidation,
                        extraDataEmployee: selectedRestrictions?.extraDataEmployee,
                        keepSessionActiveWebApp: selectedRestrictions?.keepSessionActiveWebApp,
                        sharePdfInMobileApp: selectedRestrictions?.sharePdfInMobileApp,
                        useTokenWebApp: selectedRestrictions?.useTokenWebApp,
                        id: data?.roleRestriction?.id,
                        role: {
                            id,
                        }
                    }
                    dispatch(updateRoleRestriction(roleRestriction)).then(() => {
                        toast.success("data updated successfully.")
                        dispatch(EmployeesInCreate([]));
                        navigate("/dashboard/employee/company/roles-panel")
                    })

                    let filteredIds = selectedEmployeesList.map(item => { return item.id; });
                    const employeeBody = {
                        roleId: id,
                        userIds: filteredIds
                    }
                    dispatch(addUsersToRole(employeeBody))
                })
            } else {
                dispatch(creatRole({
                    name: roleName,
                })).unwrap().then(({ data: { data } }) => {
                    const roleRestriction = {
                        biocrValidation: selectedRestrictions?.biocrValidation,
                        eventValidation: selectedRestrictions?.eventValidation,
                        extraDataEmployee: selectedRestrictions?.extraDataEmployee,
                        keepSessionActiveWebApp: selectedRestrictions?.keepSessionActiveWebApp,
                        sharePdfInMobileApp: selectedRestrictions?.sharePdfInMobileApp,
                        useTokenWebApp: selectedRestrictions?.useTokenWebApp,
                        id: data?.roleRestriction?.id,
                        role: {
                            id: data?.id,
                        }
                    }
                    const role = {
                        createdAt: data?.createdAt,
                        id: data?.id,
                        updatedAt: data?.updatedAt
                    }
                    let rollTask = []
                    mobileSelected.forEach((task) => {
                        rollTask.push({
                            "task": task,
                            "role": role,
                        })
                    })
                    websiteSelected.forEach((task) => {
                        rollTask.push({
                            "task": task,
                            "role": role,
                        })
                    })
                    dispatch(addPermissionTask(rollTask)).then(() => {
                        dispatch(updateRoleRestriction(roleRestriction)).then(() => {
                            toast.success("data updated successfully.")
                            dispatch(EmployeesInCreate([]));
                            navigate("/dashboard/employee/company/roles-panel")
                        })
                    })

                    let filteredIds = selectedEmployeesList.map(item => { return item.id; });
                    const employeeBody = {
                        roleId: data?.id,
                        userIds: filteredIds
                    }
                    dispatch(addUsersToRole(employeeBody))
                })
            }
        } else {
            toast.error("Must Provide the Role name..!")
        }
    }

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
                    <div className="col-4">
                        <div className="create_new_role_data">
                            <h3>{t('data')}</h3>
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
                                    <TextField size="small"

                                        fullWidth
                                        label={t('role_name')}
                                        name="roleName"
                                        id="outlined-size-normal"
                                        defaultValue=" "
                                        value={roleName}
                                        onChange={(e) => setRoleName(e.target.value)}
                                    />
                                </Box>
                            </div>
                            <h3 className='mt-3'>{t('restrictios')}</h3>
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
                    <div className="col-4 mt-4 new_role_available">
                        <p>{t('available')}</p>
                        <div className='new_role_available_container'>
                            <Accordion defaultActiveKey="0">
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
                                                                {mobileAvailableList.map(task2 => {
                                                                    return (
                                                                        task1?.module.id === task2?.module.id && task2?.name?.split("_")[1] !== "MENU" ?
                                                                            <Accordion.Body
                                                                                onClick={() => dispatch(HandleTaskList({
                                                                                    selected: task2,
                                                                                    check: 1
                                                                                }))}
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
                                                            {websiteAvailableList.map(task2 => (
                                                                task1?.module.id === task2?.module.id && task2?.name?.split("_")[2] !== "MENU" ?
                                                                    <Accordion.Body
                                                                        onClick={() => dispatch(HandleTaskList({
                                                                            selected: task2,
                                                                            check: 3
                                                                        }))}
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
                            </Accordion>
                        </div>
                    </div>

                    <div className="col-4 new_role_available">
                        <h3>{t('permissions')}</h3>
                        <p>{t('choosed')}</p>
                        <div className='new_role_available_container'>
                            <Accordion defaultActiveKey="0">
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
                                                                    if (selectedItem?.module.id === task1?.module.id && selectedItem?.name === task2?.name) {
                                                                        // setChoosedCount(task1?.module.id)
                                                                        return (
                                                                            <Accordion.Body key={selectedItem.id}>
                                                                                <span>{selectedItem?.name.replace(/_/g, ' ')}</span>
                                                                                <img
                                                                                    src={ic_cancel}
                                                                                    alt="ic_cancel"
                                                                                    // onClick={() => handleDeleteTask(selectedItem)}
                                                                                    onClick={() => dispatch(HandleTaskList({
                                                                                        selected: selectedItem,
                                                                                        check: 2
                                                                                    }))}
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
                                    <Accordion.Header>{t("web_app")} <sub>{`(${websiteChooseList?.length})`}</sub> </Accordion.Header>
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
                                                            {websiteChooseList.map(task2 => (
                                                                websiteSelected?.map(selectedItem => (
                                                                    selectedItem?.module.id === task1?.module.id && selectedItem?.name === task2?.name ?
                                                                        <Accordion.Body key={selectedItem.id}>
                                                                            <span>{selectedItem?.name.replace(/_/g, ' ')}</span>
                                                                            <img
                                                                                src={ic_cancel}
                                                                                alt="ic_cancel"
                                                                                onClick={() => dispatch(HandleTaskList({
                                                                                    selected: selectedItem,
                                                                                    check: 4
                                                                                }))}
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
                            </Accordion>
                        </div>
                    </div>
                </div>
                {/* employee */}
                <div className='role_card_detail mt-5'>
                    <div className='role_card_detail_head'>
                        <p>
                            {t('employees')}
                            <sub
                                onClick={() => {
                                    setDeleteId("")
                                    setManageShow(true)
                                }}
                            >{t('manage_users')}</sub>
                        </p>
                    </div>
                    {/* {console.log(selectedEmployeesList)} */}
                    <div className="row role_card_detail_body">
                        {selectedEmployeesList?.length !== 0 ?
                            selectedEmployeesList?.map(roleEmployee => (
                                <div className="col-md-3 role_card_detail_body_item">
                                    <img
                                        src={deleteIcon}
                                        alt="deleteimg"
                                        onClick={() => {
                                            let arr = selectedEmployeesList?.filter(item => item?.id !== roleEmployee?.id);
                                            dispatch(EmployeesInCreate(arr))
                                        }}
                                        style={{
                                            cursor: "pointer"
                                        }}
                                    />
                                    <p>{roleEmployee.name}</p>
                                </div>
                            ))
                            :
                            <div className="not_role_employee">
                                <span>{t('no_users')}</span>
                                <img src={warningIcon} alt="warning" />
                            </div>
                        }
                    </div>
                </div>

                <div className='mt-5 mb-5' style={{ float: 'right' }}>
                    <Link to="/dashboard/employee/company/roles-panel">
                        <button className='btn_role_cancel'>{t('cancel')}</button>
                    </Link>
                    <button className='btn_role_create' onClick={() => handleCreateRole()}>
                        {id ? t('update_role') : t('create_role')}
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