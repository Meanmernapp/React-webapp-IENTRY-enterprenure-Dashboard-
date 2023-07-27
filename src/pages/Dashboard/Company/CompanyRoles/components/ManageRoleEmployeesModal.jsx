import { t } from 'i18next';
import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import deleteIcon from '../../../../../assets/images/ic-delete-red.svg';


const ManageRoleEmployeesModal = (props) => {
    const dispatch = useDispatch();
    const { employeesWithRoleList } = useSelector(state => state?.EmployeeRolesSlice);

    const [query, setQuery] = useState("")
    const [addUserquery, setAddUserQuery] = useState("")
    const [totalEmployees, setTotalEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    // console.log(props.roleid)

    return (
        <Modal
            className="manage-role-panel-modal"
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t("employees")}
                </Modal.Title>
                <i className="fa fa-times cross" aria-hidden="true" onClick={() => props.onHide()}></i>
            </Modal.Header>
            <Modal.Body className="manage_role_modal_body">'


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
                            totalEmployees?.filter(user => {
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
                {/* .filter(item1 => employeesWithRoleList?.some(item2 => item2.id !== item1.id))? */}
                <div className='add_some_one'>
                    {
                        selectedEmployees?.map((item) => (
                            <span
                                key={item.id}
                                className='add_some_one_item'
                            >
                                {item.name}
                                <i
                                    className="fa fa-times"
                                    aria-hidden="true"
                                // onClick={() => handleUserList(item)}
                                ></i>
                            </span>
                        ))
                    }

                </div>
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
                                <i class="fa fa-search mx-2" aria-hidden="true"></i>
                            </button>
                        </span>
                    </div>
                </div>
                {/* serach option */}
                <div className='delete_some_one'>
                    {
                        employeesWithRoleList && employeesWithRoleList?.filter(user => {
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

               
                <div className="buttonArea mt-4">
                    <button className="btns btn btn-light" onClick={() => props.onHide()}>{t("cancel")}</button>
                    <button
                        className="btn btn-success"
                        onClick={handleAddUser}
                    >{t("apply_changes")}
                        {/* {
                            loading ? "Deleting...!" : "Delete"
                        } */}
                    </button>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default ManageRoleEmployeesModal