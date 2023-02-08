
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteIcon from '../../../../assets/images/ic-delete-red.svg';
import warningIcon from '../../../../assets/images/warning.svg'
import TablePagination from '@mui/material/TablePagination';
import { Accordion } from 'react-bootstrap';
import DeleteRoleModal from "./components/DeleteRoleModal";
import ManageRoleModal from "./components/ManageRoleModal";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import {
    getAllroleEmployeesPageable,
    getEmployeeRoles,
    getEmployesWithRole
} from "../../../../reduxToolkit/EmployeeRoles/EmployeeRolesApi";
import { permissionObj } from "../../../../Helpers/permission";
import { EmployeesInCreate, HandleEmployeesWithRole } from "../../../../reduxToolkit/EmployeeRoles/EmployeeRolesSlice";

const RolesPanel = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { permission } = useSelector(state => state.authenticatioauthennSlice);
    const { roleList, pageableEmployeesList } = useSelector(state => state?.EmployeeRolesSlice);
    // console.log(pageableEmployeesList)

    const [show, setShow] = useState(false);
    const [manageShow, setManageShow] = useState(false);
    const [roleId, setroleId] = useState()
    const [deleteId, setDeleteId] = useState();
    const [deleteItemName, setdeleteItemName] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);
    const [empPage, setEmpPage] = useState(0);
    const [empRowsPerPage, setEmpRowsPerPage] = useState(4);
    const [selectedRole, setSelectedRole] = useState();

    useEffect(() => {
        const body = {
            order: true,
            page: page,
            size: rowsPerPage,
            sortBy: "id"
        }
        dispatch(getEmployeeRoles(body));
    }, [page, rowsPerPage])

    useEffect(() => {
        if (selectedRole) {
            const employeeBody = {
                id: selectedRole?.id,
                pagination: {
                    order: true,
                    page: empPage,
                    size: empRowsPerPage,
                    sortBy: "id"
                }
            }
            dispatch(getAllroleEmployeesPageable(employeeBody))
        }
    }, [empPage, empRowsPerPage, selectedRole])


    const handleManageUsers = (selectedItem) => {
        dispatch(getEmployesWithRole(selectedItem?.id));
        setroleId(selectedItem?.id)
        setManageShow(true);
    }

    return (
        <>
            <div className='head'>
                <div className='headLeft'>
                    <Link to="/dashboard/employee/company">
                        <i className="fa fa-arrow-left" aria-hidden="true" style={{
                            transform: lCode === "ar" ? "scaleX(-1)" : "",
                            margin: "0 10px"
                        }}></i>
                    </Link>
                    <h2>{t('roles_panel')}</h2>
                </div>
                {
                    permission?.includes(permissionObj?.WEB_ROLE_CREATE) &&
                    <button onClick={() => {
                        dispatch(EmployeesInCreate([]));
                        dispatch(HandleEmployeesWithRole([]));
                        navigate("/dashboard/employee/company/add-new-role")
                    }}>
                        <span>{t('add_new_role')}</span>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                }
            </div>

            <div className="rolesPanel">
                <Accordion defaultActiveKey="0">
                    {
                        roleList.length !== 0 && roleList?.content.map((item, index) => (
                            <Accordion.Item
                                eventKey={index}
                                key={index}
                            >
                                <Accordion.Header onClick={() => setSelectedRole(item)}>
                                    <div className="rolesHeader">
                                        <div className="leftText">
                                            <p>{item.name}</p>
                                            {
                                                permission?.includes(permissionObj?.WEB_ROLE_UPDATE) &&
                                                <span style={{
                                                    margin: "0 5px"
                                                }}
                                                    onClick={() => {
                                                        dispatch(getEmployesWithRole(item?.id));
                                                        navigate(`/dashboard/employee/company/add-update-role/${item?.id}`)
                                                    }}
                                                >{t('manage_role')}</span>
                                            }
                                        </div>
                                        {
                                            permission?.includes(permissionObj?.WEB_ROLE_DELETE) && item?.name !== "ROOT" && item?.name !== "NONE" ?
                                                <div
                                                    className="rightText"
                                                    onClick={() => {
                                                        setDeleteId(item)
                                                        setdeleteItemName("role")
                                                        setShow(true)
                                                    }}
                                                >
                                                    <span>{t('delete_role')}</span><img src={deleteIcon} style={{
                                                        margin: "0 5px"
                                                    }} alt="deleteimg" />
                                                </div> : null
                                        }
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    {
                                        pageableEmployeesList?.totalElements !== 0 ?
                                            <div className="roleBody">
                                                <div className="upper">
                                                    <p style={{ textTransform: "uppercase" }}>{t('users_in_the_role')}</p>
                                                    <p
                                                        style={{
                                                            textDecoration: "underline",
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={() => handleManageUsers(item)}
                                                    >
                                                        {t('manage_users')}
                                                    </p>
                                                </div>
                                                <p style={{ textTransform: "uppercase", fontSize: "12px" }}>{t('name')}</p>
                                                <div className="nameList row">
                                                    {
                                                        pageableEmployeesList?.content?.map(item => (
                                                            <div className="col-3 my-1" key={item.id}>
                                                                <img
                                                                    src={deleteIcon}
                                                                    alt="deleteimg"
                                                                    onClick={() => {
                                                                        setDeleteId(item)
                                                                        setdeleteItemName("user")
                                                                        setShow(true)
                                                                    }}
                                                                />
                                                                <span>{item.name}</span>
                                                            </div>
                                                        ))
                                                    }
                                                    <div className="d-flex justify-content-center">
                                                        <TablePagination
                                                            component="div"
                                                            rowsPerPageOptions={[2, 4, 6, 8]}
                                                            count={pageableEmployeesList?.totalElements}
                                                            page={empPage}
                                                            onPageChange={(_, newPage) => setEmpPage(newPage)}
                                                            labelRowsPerPage={t("users_per_page")}
                                                            rowsPerPage={empRowsPerPage}
                                                            onRowsPerPageChange={event => {
                                                                setEmpRowsPerPage(parseInt(event.target.value));
                                                                setEmpPage(0);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div> :
                                            <div className="not_role_employee">
                                                <span>{t('no_users')}</span>
                                                <img src={warningIcon} alt="warning" />
                                            </div>
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        ))
                    }

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            position: "fixed",
                            left: "45%",
                            bottom: "0",
                        }}
                    >
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[2, 4, 6, 8]}
                            count={roleList?.totalElements}
                            page={page}
                            onPageChange={(_, newPage) => {
                                setPage(newPage);
                            }}
                            labelRowsPerPage={t("roles_per_page")}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={event => {
                                setRowsPerPage(parseInt(event.target.value));
                                setPage(0);
                            }}
                        />
                    </div>
                </Accordion>
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
                roleid={roleId}
            />
        </>
    )
}
export default RolesPanel;
