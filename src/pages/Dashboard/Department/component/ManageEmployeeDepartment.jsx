import { t } from 'i18next';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AddDepartmentById } from '../../../../reduxToolkit/Department/DepartmentApi';


const ManageEmployeeDepartment = (props) => {
    console.log(props)
    const dispatch = useDispatch();
    const [addUserquery, setAddUserQuery] = useState("")
    const [selectedUser, setSelectedUser] = useState([])

    const { getAllNonDepartmentUser, listOfUsersDepartment } = useSelector(state => state.DepartmentSectionSlice);

     // add selected user handler function
    const handleselectedUser = (user) => {
        const AddedUser = selectedUser?.find(item => item?.userId === user?.userId)
        const alreadyAdded = listOfUsersDepartment?.content?.find(item => item?.id === user?.userId)
        if (AddedUser || alreadyAdded) {
            toast.warn(`${AddedUser?.name || alreadyAdded?.name} is Already Selected`)
        } else {
            setSelectedUser((prev) => [...prev, user])
        }

    }
     // remove user handler function
    const handleUserRemove = (remove) => {
        const filterUser = selectedUser.filter(item => item?.userId !== remove?.userId)
        setSelectedUser(filterUser)
    }
    // add user handler function
    const handleAddUser = () => {
        if (selectedUser?.length > 0) {
            const ids = selectedUser?.map(item => {
                return item?.userId

            })
            const data = {
                id: props?.manageEmploye?.id,
                userids: ids
            }

            dispatch(AddDepartmentById(data))
            props.onHide()
            setAddUserQuery("")
            setSelectedUser([])
        } else {
            toast.warn("Select Atleast One user")
        }
    }

    useEffect(() => {

    }, [])
    return (
        <Modal
            className="manage_department_modal"
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t("employees")}
                </Modal.Title>
                <i className="fa fa-times cross" aria-hidden="true" onClick={() => {
                    props.onHide()
                    setAddUserQuery("")
                    setSelectedUser([])
                }}></i>
            </Modal.Header>
            <Modal.Body className="manage_role_modal_body">'

                <p className='desciptions'>Add all the employees you want to be part of the department, then click on the button ADD EMPLOYEES to apply the changes.</p>



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
                            getAllNonDepartmentUser?.filter(user => {
                                if (addUserquery === '') {
                                    return user;
                                } else if (user.name.toLowerCase().includes(addUserquery.toLowerCase())) {
                                    return user;
                                }
                            }).map(user => (
                                <div
                                    className='add_some_one_item'
                                    key={user?.userId}
                                    onClick={() => handleselectedUser(user)}
                                >
                                    <p>
                                        {user.name}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* add user fileter delete */}
                <div className='add_some_one'>
                    {


                        selectedUser?.map((item) => (
                            <span
                                key={item.userId}
                                className='add_some_one_item'
                            >
                                {item.name}

                                <i
                                    className="fa fa-times"
                                    aria-hidden="true"
                                    onClick={() => handleUserRemove(item)}
                                ></i>
                            </span>
                        ))
                    }

                    <div className='line_button'>
                        <span onClick={() => {
                            setSelectedUser([])
                            setAddUserQuery("")
                        }}>{t("clear_all_the_Selected")}</span>
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <button className="custom_btn_cancel_gray_hover"
                        style={{ width: "184px" }}
                        onClick={() => {
                            props.onHide();
                            setAddUserQuery("")
                            setSelectedUser([])
                        }}>{t("cancel")}</button>
                    <button
                        style={{ width: "184px" }}
                        className="custom_primary_btn_dark"
                        onClick={() => handleAddUser()}
                    >{t("add_employees")}
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ManageEmployeeDepartment