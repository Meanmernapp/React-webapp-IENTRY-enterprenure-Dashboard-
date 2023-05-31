import React, { useState } from 'react'
import remove from '../../../../assets/images/ic-delete-red.svg'
import NoEvent from '../NoEvent';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEmployees } from '../../../../reduxToolkit/EmployeeEvents/EmployeeEventsApi';
import OnuEmployeesModal from './OnuEmployeeModal';
import OnuOthersModal from './OnuOthersModal';
import { updateEmailPhoneSearchList, updateOunEmployeeData } from '../../../../reduxToolkit/EmployeeEvents/EmployeeEventsSlice';

const OnuVisitors = () => {
    const dispatch = useDispatch();
    const selectedEmployees = useSelector(state => state?.EmployeeEventsSlice?.onuEmployeeData);
    const emailPhoneSearchList = useSelector(state => state?.EmployeeEventsSlice?.emailPhoneSearchList);
    const [show, setShow] = useState(false);
    const [otherShow, setOtherShow] = useState(false);

    return (
        <>
            <div className="d-flex align-items-center mt-3  ">
                <h4 style={{

                    color: "#38857A",
                    fontWeight: "600"
                }}>Employees</h4>
                <span
                    style={{
                        fontSize: "12px",
                        textDecoration: "underline",

                        cursor: "pointer",

                    }}
                    className='hover_effect'
                    onClick={() => {
                        dispatch(getAllEmployees())
                        setShow(true);
                    }}
                >
                    add/remove employess
                </span>

            </div>
            <OnuEmployeesModal
                show={show}
                onHide={() => setShow(false)}
            />
            {
                selectedEmployees.length !== 0 ?
                    <div className="eventTables onuVistor animated-div" style={{ height: "13rem" }}>
                        <table style={{ width: "100%" }}>
                            <thead>
                                <th className='first-head'>name</th>
                                <th>phone number</th>
                                <th>role</th>
                                <th className='last'>reomve</th>
                            </thead>
                            <tbody>
                                {
                                    selectedEmployees?.map(item => (
                                        <tr key={item?.id}>
                                            <td className='first'>{item?.name}</td>
                                            <td>{item?.phoneNumber}</td>
                                            <td>{item?.userType?.name}</td>
                                            <td className='last'>
                                                <img
                                                    src={remove}
                                                    alt="remove"
                                                    onClick={() => {
                                                        dispatch(updateOunEmployeeData(selectedEmployees.filter(employee => employee?.id !== item?.id)))
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div> :
                    <NoEvent title="Employees" />
            }

            <div className="d-flex align-items-center mt-5">
                <h4
                    style={{
                        color: "#38857A",
                        fontWeight: "600",

                    }}
                >
                    others
                </h4>
                <span style={{
                    fontSize: "12px",
                    textDecoration: "underline",

                    cursor: "pointer",


                }}
                    onClick={() => {
                        dispatch(getAllEmployees())
                        setOtherShow(true);
                    }}
                    className='hover_effect'
                >
                    add others
                </span>
                <OnuOthersModal
                    show={otherShow}
                    onHide={() => setOtherShow(false)}
                />
            </div>
            {
                emailPhoneSearchList.length !== 0 ?
                    <div className="eventTables onuVistorOther" style={{ height: "13rem" }}>
                        <table style={{ width: "100%" }}>
                            <thead>
                                <th className='first-head'>name</th>
                                <th>phone number</th>
                                <th className='last'>reomve</th>
                            </thead>
                            <tbody>
                                {
                                    emailPhoneSearchList?.map(user => (
                                        <tr key={user?.id}>
                                            <td className='first'>{user?.name}</td>
                                            <td>{user?.phoneNumber}</td>
                                            <td className='last'>
                                                <img
                                                    src={remove}
                                                    alt="remove"
                                                    onClick={() => {
                                                        dispatch(updateEmailPhoneSearchList(emailPhoneSearchList.filter(item => item.id !== user?.id)))
                                                        // dispatch(updateEmailPhoneSearchList(user?.id))
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div> :
                    <NoEvent title="Others" />
            }
        </>
    )
}

export default OnuVisitors