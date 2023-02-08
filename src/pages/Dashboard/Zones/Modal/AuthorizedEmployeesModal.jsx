import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import deleteIcon from '../../../../assets/images/ic-delete-red.svg';
import { updateAllEmployees, updateSelectedEmployees } from '../../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice';
import { CreateUserZoneList, DeleteZoneUser } from '../../../../reduxToolkit/EmployeeZones/EmployeeZonesApi';
// import { updateAllEmployees, updateSelectedEmployees } from '../../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';



const AuthorizedEmployeesModal = (props) => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    const allEmployeesData = useSelector(state => state?.EmployeeEventsSlice?.allEmployees);
    // console.log(allEmployeesData)
    const { zoneDetailAuthorizedEmployee } = useSelector(state => state.EmployeeZonesSlice)
    // console.log(zoneDetailAuthorizedEmployee)



    const [query, setQuery] = useState("")
    const [addUserquery, setAddUserQuery] = useState("")
    const [employeesWithRole, setEmployeesWithRole] = useState([]);
    const [totalEmployees, setTotalEmployees] = useState([]);

    const handleDelete = (userSelectedId) => {
        const data = {
            userId: userSelectedId,
            zoneId: localStorage.getItem("singlezoneId")
        }
        dispatch(DeleteZoneUser(data))
        props.onHide();

    }

    useEffect(() => {
        if (props.show === false) {
            setAddUserQuery('');
        }
    }, [props.show])

    const handleAddUser = () => {
        // dispatch(updateSelectedEmployees(totalEmployees));
        const listId = totalEmployees.map(item => item.id)
        const data = {
            list: listId,
            zoneId: localStorage.getItem("singlezoneId")
        }

        dispatch(CreateUserZoneList(data))
        props.onHide();
        setTotalEmployees([]);
        setAddUserQuery('');
    }

    const handleRemoveSelected = (user) => {
        setTotalEmployees(totalEmployees.filter(item => item.id !== user.id));
        dispatch(updateAllEmployees([...allEmployeesData, user]));
    }

    const handleselected = (user) => {
        // console.log(user?.id)
        dispatch(updateAllEmployees(allEmployeesData.filter(data => data.id !== user.id)));
        // if (zoneDetailAuthorizedEmployee?.content?.map((check) => check?.id == user?.id)) {
        //     toast.error("already added")
        // } else {
        setTotalEmployees([...totalEmployees, user]);
        // }
    }



    return (
        <Modal
            className="manage-role-panel-modal"
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter" style={{ fontSize: '16px', letterSpacing: '4px' }}>
                    {t("manage_access")}
                </Modal.Title>

                <i className="fa fa-times cross" aria-hidden="true" onClick={() => props.onHide()}></i>
            </Modal.Header>
            <Modal.Body className="manage_role_modal_body">
                <p>{t("remove_user")}</p>

                {/* search bar role panel */}
                <div className="row">
                    <div className="col-12">
                        <input
                            type="text"
                            class="form-control"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}

                        />
                        <span class="search_btn">
                            <button class="btn btn-default" type="button">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </span>
                    </div>
                </div>
                {/* serach option */}
                <div className='delete_some_one'>
                    {
                        zoneDetailAuthorizedEmployee?.content?.filter(user => {

                            if (query === '') {
                                return user;
                            } else if (user.name.toLowerCase().includes(query.toLowerCase())) {
                                return user;
                            }
                        }).map(user => (
                            <div className='delte_some_one_item' key={user.id}>
                                <p>{user.name}</p>
                                <img
                                    src={deleteIcon}
                                    alt="deleteimg"
                                    onClick={() => handleDelete(user.id)}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                />
                            </div>
                        ))
                    }
                </div>

                <p className='mt-3'>{t("add_user")}</p>

                {/* search bar role panel */}
                <div className="row">
                    <div className="col-12">
                        <input
                            type="text"
                            class="form-control"
                            value={addUserquery}
                            onChange={(e) => setAddUserQuery(e.target.value)}

                        />
                        <span class="search_btn">
                            <button class="btn btn-default" type="button">
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </button>
                        </span>
                    </div>
                    <div className="col-12 searchItem" style={{ display: addUserquery !== '' ? "block" : "none" }}>
                        {
                            allEmployeesData?.filter(user => {
                                if (addUserquery === '') {
                                    return user;
                                } else if (user.name.toLowerCase().includes(addUserquery.toLowerCase())) {
                                    return user;
                                }
                            }).map(user => (
                                <div
                                    className='add_some_one_item'
                                    key={user.id}
                                    onClick={() => handleselected(user)}
                                >
                                    <p>{user.name}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* add user fileter delete */}
                <div className='add_some_one'>
                    {
                        totalEmployees?.map((item) => {
                            // console.log("item for sele", item)
                            return (
                                <span
                                    key={item.id}
                                    className='add_some_one_item'
                                >
                                    {item.name}
                                    <i
                                        className="fa fa-times"
                                        aria-hidden="true"
                                        onClick={() => handleRemoveSelected(item)}
                                    ></i>
                                </span>
                            )
                        })
                    }

                </div>
                <div className="buttonArea mt-4">
                    <button
                        className="btns btn btn-light"
                        onClick={() => props.onHide()}
                    >
                        {t("cancel")}
                    </button>
                    <button
                        className="btn btn-success"
                        onClick={handleAddUser}
                    >
                        {t("apply_changes")}
                        {/* {
                            loading ? "Deleting...!" : "Delete"
                        } */}
                    </button>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default AuthorizedEmployeesModal;