
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
    getAllEmployees,
    getAllroleEmployeesPageable,
    getEmployeeRoles,
    getEmployesWithRole,
    removeRoleToUserByIds,
    roleAvailableTasks
} from "../../../../reduxToolkit/EmployeeRoles/EmployeeRolesApi";
import { permissionObj } from "../../../../Helpers/permission";
import { EmployeesInCreate, HandleEmployeesWithRole } from "../../../../reduxToolkit/EmployeeRoles/EmployeeRolesSlice";
import { Checkbox, FormControlLabel } from "@mui/material";
import { DeleteItemsApi } from "../../../../reduxToolkit/Commons/CommonsApi";
import DeleteModal from "../../../Modals/DeleteModal";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import NotFoundDataWarning from "../../../../components/NotFoundDataWarning";
import NotFoundAnything from "../../../../components/NotFoundAnything";

const RolesPanel = () => {
    // use hook
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // use selector
    const { deleteItemsApi } = useSelector(state => state.CommonsSlice);
    const { permission } = useSelector(state => state.authenticatioauthennSlice);
    const { roleList, pageableEmployeesList, addUsersToRoleSuccess,
        removeRoleToUser, updateRoleSuccess, creteRoleSucce

    } = useSelector(state => state?.EmployeeRolesSlice);
    // useState
    const [show, setShow] = useState(false);
    const [manageShow, setManageShow] = useState(false);
    const [roleId, setroleId] = useState()
    const [deleteId, setDeleteId] = useState();
    const [deleteItemName, setdeleteItemName] = useState();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [empPage, setEmpPage] = useState(0);
    const [empRowsPerPage, setEmpRowsPerPage] = useState(10);
    const [selectedRole, setSelectedRole] = useState();
    const [isAllChecked, setIsAllChecked] = useState(false);
    const [selectRoleForDelete, setSelectRoleForDelete] = useState([])
    const [roleShow, setRoleShow] = useState(false)
    const [isAllCheckedUser, setIsAllCheckedUser] = useState(false);
    const [selectUserForDelete, setSelectUserForDelete] = useState([])
    const [userShow, setUserShow] = useState(false)

    // funtions
    // this function control select all id or unSelect all
    const handelDeleteAll = (e) => {
        setIsAllChecked(e.target.checked)
        if (e.target.checked) {
            // logic to filter the root and none
            const selectAllIds = roleList?.content?.filter(item => {
                return item?.name !== "ROOT" && item?.name !== "NONE"
            }).map(item => item?.id)

            setSelectRoleForDelete(selectAllIds)
        } else {
            setSelectRoleForDelete([])
        }
    }
    // this function handle only specific id base on selection
    const handleCheckboxChange = (e) => {

        if (e.target.checked) {
            setSelectRoleForDelete([...selectRoleForDelete, e.target.id]);
        } else {
            setSelectRoleForDelete(selectRoleForDelete.filter((removeid) => removeid !== e.target.id));
        }
    };
    // this function control select all id or unSelect all
    const handelDeleteAllUser = (e) => {
        setIsAllCheckedUser(e.target.checked)
        if (e.target.checked) {
            const selectAllIds = pageableEmployeesList?.content?.map(item => {
                return item?.userId
            })
            setSelectUserForDelete(selectAllIds)
        } else {
            setSelectUserForDelete([])
        }
    }
    // this function handle only specific id base on selection
    const handleCheckboxChangeUser = (e) => {

        if (e.target.checked) {
            setSelectUserForDelete([...selectUserForDelete, e.target.id]);
        } else {
            setSelectUserForDelete(selectUserForDelete.filter((removeid) => removeid !== e.target.id));
        }
    };
    // api function
    const deleteRoles = (deleteItem) => {
        const tableName = "role"
        const body = deleteItem
        dispatch(DeleteItemsApi({ tableName, body }))
        setSelectRoleForDelete([])
        setIsAllChecked(false)

    }
    // api function
    const deleteUsers = (deleteItem) => {

        const data = {
            userIds: deleteItem,
            roleId: roleId
        }
        dispatch(removeRoleToUserByIds(data))
        setSelectUserForDelete([])
        setIsAllCheckedUser(false)
    }
    // lifecycle
    useEffect(() => {
        const body = {
            order: true,
            page: page,
            size: rowsPerPage,
            sortBy: "id"
        }
        dispatch(getEmployeeRoles(body));
    }, [page, rowsPerPage, updateRoleSuccess, creteRoleSucce, deleteItemsApi])


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
    }, [empPage, empRowsPerPage, selectedRole,
        , addUsersToRoleSuccess, removeRoleToUser])
    const handleManageUsers = (selectedItem) => {
        dispatch(getEmployesWithRole(selectedItem?.id));
        dispatch(getAllEmployees())
        setroleId(selectedItem?.id)
        setManageShow(true);
    }
    useEffect(() => {
        dispatch(roleAvailableTasks());
    }, [])
    return (
        <>
            <div className='head'>
                <div className='headLeft'>
                    <h2>{t('privilage_settings')}</h2>
                </div>
                <div className="d-flex gap-1">


                    {
                        permission?.includes(permissionObj?.WEB_PRIVILEGE_CREATE) &&
                        <button
                            className="add-btn-1"
                            onClick={() => {
                                dispatch(EmployeesInCreate([]));
                                dispatch(HandleEmployeesWithRole([]));
                                navigate("/dashboard/employee/company/add-new-role")
                            }}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                            <span>{t('add')}</span>
                        </button>
                    }
                    <button className="delete-btn-1"

                        disabled={selectRoleForDelete?.length === 0}
                        onClick={() => {
                            setRoleShow(true)
                        }}

                    >
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                        {t('delete')}
                    </button>
                </div>
            </div>

            <div className="rolesPanel">

                <FormControlLabel className="grid-checkall"
                    sx={{ marginLeft: "0rem" }}
                    control={<Checkbox
                        label="Label"
                        checked={isAllChecked}
                        onChange={handelDeleteAll}
                        size="small" />} label={t("de_/_select_all")} />

                <Accordion defaultActiveKey="0">
                    {
                        roleList.length !== 0 && roleList?.content.map((item, index) => (
                            <Accordion.Item
                                eventKey={index}
                                key={index}
                            >
                                <Accordion.Header onClick={() => {setSelectedRole(item);
                                    setroleId(item?.id)
                                    setSelectUserForDelete([])
                                    setIsAllCheckedUser(false)
                                }}>
                                    <div className="rolesHeader">
                                        <div className="leftText">
                                            {
                                                item?.name !== "ROOT" && item?.name !== "NONE" ?

                                                    <Checkbox
                                                        onClick={(event) => event.stopPropagation()}
                                                        className="grid-checkall checkbox"
                                                        checked={selectRoleForDelete?.includes(item?.id)}
                                                        id={item?.id}
                                                        onChange={handleCheckboxChange}
                                                        size="small"
                                                    /> :
                                                    <p></p>
                                            }
                                            <p>{item.name}</p>
                                            {/* {
                                                permission?.includes(permissionObj?.WEB_PRIVILEGE_UPDATE) &&
                                                <span style={{
                                                    margin: "0 5px"
                                                }}
                                                    onClick={() => {
                                                        dispatch(getEmployesWithRole(item?.id));
                                                        navigate(`/dashboard/employee/company/add-update-role/${item?.id}`)
                                                    }}
                                                >{t('manage_role')}</span>
                                            } */}
                                        </div>

                                        {
                                            item?.name !== "ROOT" && item?.name !== "NONE" ?
                                                <div className="edit">
                                                    <EditOutlinedIcon onClick={() => {
                                                        dispatch(getEmployesWithRole(item?.id));
                                                        dispatch(getAllEmployees())

                                                        navigate(`/dashboard/employee/company/add-update-role/${item?.id}`)
                                                    }} />
                                                </div>
                                                : ""
                                        }
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="roleBody">
                                        <div className="upper">
                                            <p className="heading" >{t('Assigned_employee')?.toUpperCase()}</p>
                                            <p
                                                className="manage"
                                                onClick={() => handleManageUsers(item)}
                                            >
                                                {t('manage_users')}
                                            </p>
                                        </div>
                                        {
                                            pageableEmployeesList?.totalElements !== 0 ?
                                                <>
                                                    <div className="d-flex gap-1" >
                                                        <FormControlLabel className="grid-checkall" control={<Checkbox
                                                            label="Label"
                                                            checked={isAllCheckedUser}
                                                            onChange={handelDeleteAllUser}
                                                            size="small" />} label={t("de_/_select_all")} />
                                                    </div>
                                                    <div className="nameList row">
                                                        {
                                                            pageableEmployeesList?.content?.map(item => (
                                                                <div className="col-3 my-1" key={item.id}>
                                                                    {/* <img
                                                                    src={deleteIcon}
                                                                    alt="deleteimg"
                                                                    onClick={() => {
                                                                        setDeleteId(item)
                                                                        setdeleteItemName("user")
                                                                        setShow(true)
                                                                    }}
                                                                /> */}
                                                                    <Checkbox
                                                                        className="grid-checkall checkbox"
                                                                        checked={selectUserForDelete?.includes(item?.userId)}
                                                                        id={item?.userId}
                                                                        onChange={handleCheckboxChangeUser}
                                                                        size="small"
                                                                    />

                                                                    <span>
                                                                        {
                                                                            item && item.name
                                                                                ? `${item.name} ${item.firstLastName} ${item.secondLastName !== null ? item.secondLastName : ""}`
                                                                                : "-"
                                                                        }

                                                                    </span>
                                                                </div>
                                                            ))
                                                        }
                                                        <div className="d-flex justify-content-center ">
                                                            <TablePagination
                                                                component="div"
                                                                rowsPerPageOptions={[10, 15, 20, 30]}
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

                                                    {
                                                        selectUserForDelete?.length > 0 &&
                                                        <div
                                                            className="remove_selected_role"
                                                            onClick={() => setUserShow(true)}
                                                        >
                                                            <p>{t("remove_selected")?.toUpperCase()}</p>
                                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                        </div>
                                                    }
                                                </>
                                                :


                                                <NotFoundAnything text={t("no_users")} />


                                        }
                                    </div>
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
                            rowsPerPageOptions={[10, 15, 20, 30]}
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

            <DeleteModal
                show={roleShow}
                onHide={() => setRoleShow(false)}
                onClickFn={() => deleteRoles(selectRoleForDelete)}
                data={selectRoleForDelete}
                title_modal={"Previlege"}
                element_modal={"role"}
                isReset={setSelectRoleForDelete}
                isAllReset={setIsAllChecked}
            />
            <DeleteModal
                show={userShow}
                onHide={() => setUserShow(false)}
                onClickFn={() => deleteUsers(selectUserForDelete)}
                data={selectUserForDelete}
                title_modal={"Previlege"}
                element_modal={"assigned_employee"}
                isReset={setSelectUserForDelete}
                isAllReset={setIsAllCheckedUser}
            />
        </>
    )
}
export default RolesPanel;
