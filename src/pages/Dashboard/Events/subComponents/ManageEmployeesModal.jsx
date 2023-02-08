import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import deleteIcon from '../../../../assets/images/ic-delete-red.svg';
import { updateAllEmployees, updateSelectedEmployees } from '../../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice';



const ManageEmployeesModal = (props) => {
    const dispatch = useDispatch();
    const allEmployeesData = useSelector(state => state?.EmployeeEventsSlice?.allEmployees);
    const selectedEmployees = useSelector(state => state?.EmployeeEventsSlice?.selectedEmployees);
    const [query, setQuery] = useState("")
    const [addUserquery, setAddUserQuery] = useState("")
    const [employeesWithRole, setEmployeesWithRole] = useState([]);
    const [totalEmployees, setTotalEmployees] = useState([]);

    const handleDelete = (userSelectedId) => {

    }

    useEffect(() => {
        if (props.show === false) {
            setAddUserQuery('');
        }
    }, [props.show])

    const handleAddUser = () => {
        dispatch(updateSelectedEmployees(totalEmployees));
        props.onHide();
        setAddUserQuery('');
    }

    const handleRemoveSelected = (user) => {
        setTotalEmployees(totalEmployees.filter(item => item.id !== user.id));
        dispatch(updateAllEmployees([...allEmployeesData, user]));
    }

    const handleselected = (user) => {
        const checkUser = selectedEmployees?.find(item => item?.id === user?.id)
        if (checkUser) {
            toast.warn(`${checkUser?.name} is already Added`)
        } else {
            dispatch(updateAllEmployees(allEmployeesData.filter(data => data.id !== user.id)));
            setTotalEmployees([...totalEmployees, user]);
        }

    }

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
                    EMPLOYEES
                </Modal.Title>
                <i className="fa fa-times cross" aria-hidden="true" onClick={() => props.onHide()}></i>
            </Modal.Header>
            <Modal.Body className="manage_role_modal_body">
                <p>REMOVE USER</p>

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
                        employeesWithRole?.filter(user => {
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

                <p className='mt-3'>ADD USER</p>

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
                        totalEmployees?.map((item) => (
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
                        ))
                    }

                </div>
                <div className="buttonArea mt-4 d-flex">
                    <button
                        style={{ width: "180px" }}
                        className="custom_btn_cancel_gray_hover"
                        onClick={() => props.onHide()}
                    >
                        CANCEL
                    </button>
                    <button
                        style={{ width: "180px" }}
                        className="custom_primary_btn_dark"
                        onClick={handleAddUser}
                    >APPLY CHANGES
                        {/* {
                            loading ? "Deleting...!" : "Delete"
                        } */}
                    </button>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default ManageEmployeesModal;