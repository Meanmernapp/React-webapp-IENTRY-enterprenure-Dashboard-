import { t } from 'i18next';
import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import deleteIcon from '../../../../assets/images/ic-delete-red.svg';



const ManageEmployeeDepartment = (props) => {
    const dispatch = useDispatch();
    const { employeesWithRoleList } = useSelector(state => state?.EmployeeRolesSlice);

    const [query, setQuery] = useState("")
    const [addUserquery, setAddUserQuery] = useState("")
    const [totalEmployees, setTotalEmployees] = useState([]);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    // useEffect(() => {
    //     dispatch(getAllEmployees()).then(({ payload: { data: { data } } }) => {
    //         let filteredIds = employeesWithRoleList.map(item => { return item.id; });
    //         const newArr = data.filter(item => !filteredIds.includes(item.id));
    //         setTotalEmployees(newArr)
    //     })
    // }, [])

    // const handleDelete = (userSelectedId) => {
    //     dispatch(removeRoleToUserById(userSelectedId)).then(() => {
    //         dispatch(getEmployesWithRole(props?.roleid));
    //     })
    // }


    // const handleUserList = (user) => {
    //     setTotalEmployees([...totalEmployees, user]);
    //     const filterArray = selectedEmployees.filter(item => item.id !== user.id);
    //     setSelectedEmployees(filterArray);
    // }

    // const handleselected = (user) => {
    //     setSelectedEmployees([...selectedEmployees, user]);
    //     const filterArray = totalEmployees.filter(item => item.id !== user.id)
    //     setTotalEmployees(filterArray);
    // }

    // const handleAddUser = () => {
    //     dispatch(EmployeesInCreate(selectedEmployees));
    //     setAddUserQuery("");
    //     let filteredIds = totalEmployees.map(item => { return item.id; });

    //     const body = {
    //         roleId: props.roleid,
    //         userIds: filteredIds
    //     }

    //     if (props.roleid) {
    //         dispatch(addUsersToRole(body))
    //         const employeeBody = {
    //             id: props.roleid,
    //             pagination: {
    //                 order: true,
    //                 page: 0,
    //                 size: 10,
    //                 sortBy: "id"
    //             }
    //         }
    //         dispatch(getAllroleEmployeesPageable(employeeBody))
    //     }
    //     props.onHide();
    // }

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
                <i className="fa fa-times cross" aria-hidden="true" onClick={() => props.onHide()}></i>
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
                            // totalEmployees?.filter(user => {
                            //     if (addUserquery === '') {
                            //         return user;
                            //     } else if (user.name.toLowerCase().includes(addUserquery.toLowerCase())) {
                            //         return user;
                            //     }
                            // })
                            [1, 2, 3].map(user => (
                                <div
                                    className='add_some_one_item'
                                // key={user.id}
                                // onClick={() => handleselected(user)}
                                >
                                    <p>
                                        {/* {user.name} */}
                                        user name
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* add user fileter delete */}
                <div className='add_some_one'>
                    {

                        // selectedEmployees?.map((item) => (
                        [1, 2].map((item) => (
                            <span
                                // key={item.id}
                                className='add_some_one_item'
                            >
                                {/* {item.name} */}
                                dskjflkdjfkld
                                <i
                                    className="fa fa-times"
                                    aria-hidden="true"
                                // onClick={() => handleUserList(item)}
                                ></i>
                            </span>
                        ))
                    }

                    <div className='line_button'>
                        <span>{t("clear_all_the_Selected")}</span>
                    </div>
                </div>
                <div className="d-flex mt-4">
                    <button className="custom_btn_cancel_gray_hover"
                        style={{ width: "184px" }}
                        onClick={() => props.onHide()}>{t("cancel")}</button>
                    <button
                        style={{ width: "184px" }}
                        className="custom_primary_btn_dark"
                    // onClick={handleAddUser}
                    >{t("add_employees")}
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ManageEmployeeDepartment