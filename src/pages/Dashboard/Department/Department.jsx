import React, { useState } from 'react'
import { Accordion } from 'react-bootstrap';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';
import deleteIcon from '../../../assets/images/ic-delete-red.svg';
import warningIcon from '../../../assets/images/warning.svg'
import ManageDeleteDepartment from './component/ManageDeleteDepartment';
import ManageEmployeeDepartment from './component/ManageEmployeeDepartment';
import AddNewDepartmentModal from './component/AddNewDepartmentModal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { GetAllDepartments, GetAllNonDepartmentUser, ListOfUsersDepartment } from '../../../reduxToolkit/Department/DepartmentApi';

const Department = () => {
    // use hook
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    // use State hook
    const [show, setShow] = useState(false);
    const [modalName, setModalName] = useState("null")
    const [manageShow, setManageShow] = useState(false);
    const [addShow, setAddShow] = useState(false)
    const [data, setData] = useState("")
    const [manageEmploye, setManageEmployee] = useState("")
    const [departmentId, setDepartmentId] = useState("")
    const [departmentName, setDepartmentName] = useState("")
    const [pageDepartment, setPageDepartment] = useState(0);
    const [rowsPerPageDepartment, setRowsPerPageDepartment] = useState(10);
    const [pageDepartmentUser, setPageDepartmentUser] = useState(0);
    const [rowsPerPageDepartmentUser, setRowsPerPageDepartmentUser] = useState(10);
    const [orderBy, setOrderBy] = useState();
    const [sortBy, setSortBy] = useState();
    // use Selector from redux store
    const { getAllDepartments, deleteDepartment, createDepartment,
        listOfUsersDepartment, addDepartmentById, removeUserFromDepartment, removeAlluserFromDepartment } = useSelector(state => state.DepartmentSectionSlice);
    // custom Funtion
    // a funtion to control zone page
    const handleChangePageDepartment = (event, newPage) => {
        setPageDepartment(newPage);
    };
    // a funtion to control row per page 
    const handleChangeRowsPerPageDepartment = event => {
        setRowsPerPageDepartment(parseInt(event.target.value));
        setPageDepartment(0);
    };

    const handleChangePageDepartmentUser = (event, newPage) => {
        setPageDepartmentUser(newPage);
    };
    // a funtion to control row per page 
    const handleChangeRowsPerPageDepartmentUser = event => {
        setRowsPerPageDepartmentUser(parseInt(event.target.value));
        setPageDepartmentUser(0);
    };
    const userList = (id) => {

        const data = {
            id,
            pagination: {
                "order": sortBy === 'asc' ? true : false,
                "page": pageDepartmentUser,
                "size": rowsPerPageDepartmentUser,
                "sortBy": orderBy ? orderBy : "id"
            }
        }
        dispatch(ListOfUsersDepartment(data))
        dispatch(GetAllNonDepartmentUser(id))
    }
    // useEffect cycle cycle for departments
    useEffect(() => {
        const body = {
            pagination: {
                "order": sortBy === 'asc' ? true : false,
                "page": pageDepartment,
                "size": rowsPerPageDepartment,
                "sortBy": orderBy ? orderBy : "id"
            }
        }
        dispatch(GetAllDepartments(body));
    }, [pageDepartment, rowsPerPageDepartment, orderBy, sortBy, deleteDepartment, createDepartment])
    // useEffect cycle for department users
    useEffect(() => {
        if (departmentId) {
            const data = {
                id: departmentId,
                pagination: {
                    "order": sortBy === 'asc' ? true : false,
                    "page": pageDepartmentUser,
                    "size": rowsPerPageDepartmentUser,
                    "sortBy": orderBy ? orderBy : "id"
                }
            }
            dispatch(ListOfUsersDepartment(data))
        }

    }, [pageDepartmentUser, rowsPerPageDepartmentUser,
        orderBy, sortBy, addDepartmentById, removeUserFromDepartment, removeAlluserFromDepartment])

    return (
        <>
            <div className='head'>
                <div className='headLeft'>
                    <h2>{t('departments')}</h2>
                </div>
                {

                    <button className='custom_primary_btn_dark'
                        onClick={() => {
                            setAddShow(true)
                        }}
                    >
                        {t('add_department')}
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                }
            </div>
            <div className='departments'>
                <Accordion defaultActiveKey="0">
                    {
                        getAllDepartments?.content?.map((item) => (
                            <Accordion.Item
                                eventKey={item?.id}
                                key={item?.id}

                            >
                                <Accordion.Header onClick={() => {
                                    setDepartmentId(item?.id)
                                    setDepartmentName(item?.name)
                                    userList(item?.id)
                                }}>
                                    <div className="rolesHeader">
                                        <div className="leftText">
                                            <p>{item?.name}</p>

                                        </div>
                                        {
                                            // permission?.includes(permissionObj?.WEB_ROLE_DELETE) && item?.name !== "ROOT" && item?.name !== "NONE" ?
                                            <div
                                                className="rightText"
                                                onClick={() => {
                                                    setShow(true)
                                                    setModalName("department")

                                                    const data = {
                                                        name: item?.name,
                                                        id: item?.id
                                                    }
                                                    setData(data)
                                                }}

                                            >
                                                <span>{t('delete_department')}</span><img src={deleteIcon} style={{
                                                    margin: "0 5px"
                                                }} alt="deleteimg" />
                                            </div>
                                            //  : null
                                        }
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="roleBody">
                                        <div className="upper">
                                            <p className='left'>{t('users_in_the_department')}</p>
                                            <p className='right'
                                                onClick={() => {
                                                    setManageShow(true)
                                                    const data = {
                                                        id: item?.id
                                                    }
                                                    setManageEmployee(data)
                                                }}
                                            >
                                                {t('add_users') + " +"}
                                            </p>
                                        </div>
                                        <p className='inner_head'>{t('name')}</p>
                                        {
                                            listOfUsersDepartment?.content?.length > 0 ?

                                                <div className="nameList row">
                                                    {
                                                        listOfUsersDepartment?.content?.map((item, index) => (
                                                            <div className="col-3 my-1" key={index}>
                                                                <img
                                                                    src={deleteIcon}
                                                                    alt="deleteimg"
                                                                    onClick={() => {
                                                                        setShow(true)
                                                                        setModalName("user")
                                                                        const data = {
                                                                            id: item?.id,
                                                                            Ename: item?.name,
                                                                            Dname: departmentName
                                                                        }
                                                                        setData(data)
                                                                    }}

                                                                />
                                                                <span>{item?.name}</span>
                                                            </div>
                                                        ))
                                                    }
                                                    <div className="footer_department">
                                                        <TablePagination
                                                            component="div"
                                                            rowsPerPageOptions={[10, 15, 20, 30]}
                                                            count={listOfUsersDepartment?.totalElements}
                                                            page={pageDepartmentUser}
                                                            onPageChange={handleChangePageDepartmentUser}
                                                            labelRowsPerPage={t("employees_per_page")}
                                                            rowsPerPage={rowsPerPageDepartmentUser}
                                                            onRowsPerPageChange={handleChangeRowsPerPageDepartmentUser}
                                                        />
                                                        <div className='delete_user'
                                                            onClick={() => {
                                                                setShow(true)
                                                                setModalName("users")
                                                                const data = {
                                                                    id: item?.id,
                                                                    Tuser: listOfUsersDepartment?.totalElements,
                                                                    Dname: departmentName
                                                                }
                                                                setData(data)
                                                            }}
                                                        >
                                                            <p>{t("delete_all_users")}</p>
                                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                        </div>

                                                    </div>
                                                </div> :
                                                <div className="not_role_employee">
                                                    <span>{t('no_users')}</span>
                                                    <img src={warningIcon} alt="warning" />
                                                </div>
                                        }
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))

                    }

                </Accordion>
            </div>
            <div className="d-flex justify-content-center">
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[10, 15, 20, 30]}
                    count={getAllDepartments?.totalElements}
                    page={pageDepartment}
                    onPageChange={handleChangePageDepartment}
                    labelRowsPerPage={t("department_per_page")}
                    rowsPerPage={rowsPerPageDepartment}
                    onRowsPerPageChange={handleChangeRowsPerPageDepartment}
                />
            </div>

            <AddNewDepartmentModal
                show={addShow}
                onHide={() => setAddShow(false)}
            />

            <ManageDeleteDepartment
                show={show}
                onHide={() => setShow(false)}
                modalis={modalName}
                data={data}
            />

            <ManageEmployeeDepartment
                show={manageShow}
                onHide={() => setManageShow(false)}
                manageEmploye={manageEmploye}

            />
        </>

    )
}

export default Department