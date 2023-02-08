import React, { useState } from 'react'
import { Accordion } from 'react-bootstrap';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';
import deleteIcon from '../../../assets/images/ic-delete-red.svg';
import warningIcon from '../../../assets/images/warning.svg'
import { TablePagination } from '@mui/material';
import ManageDeleteDepartment from './component/ManageDeleteDepartment';
import ManageEmployeeDepartment from './component/ManageEmployeeDepartment';
import AddNewDepartmentModal from './component/AddNewDepartmentModal';

const Department = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const [show, setShow] = useState(false);
    const [modalName, setModalName] = useState("null")
    const [manageShow, setManageShow] = useState(false);
    const [addShow, setAddShow] = useState(false)
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
                        [1, 2, 3, 4, 5]?.map((item, index) => (
                            <Accordion.Item
                                eventKey={index}
                                key={index}
                            >
                                <Accordion.Header >
                                    <div className="rolesHeader">
                                        <div className="leftText">
                                            <p>{"HR"}</p>

                                        </div>
                                        {
                                            // permission?.includes(permissionObj?.WEB_ROLE_DELETE) && item?.name !== "ROOT" && item?.name !== "NONE" ?
                                            <div
                                                className="rightText"
                                                onClick={() => {
                                                    setShow(true)
                                                    setModalName("department")
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
                                    {
                                        [1, 2, 3] !== 0 ?
                                            <div className="roleBody">
                                                <div className="upper">
                                                    <p className='left'>{t('users_in_the_department')}</p>
                                                    <p className='right'
                                                        onClick={() => {
                                                            setManageShow(true)
                                                        }}
                                                    >
                                                        {t('add_users') + " +"}
                                                    </p>
                                                </div>
                                                <p className='inner_head'>{t('name')}</p>
                                                <div className="nameList row">
                                                    {
                                                        [1, 2, 3, 4, 5, 6, 7, 8 < 9, 10, 11, 12, 13].map((item, index) => (
                                                            <div className="col-3 my-1" key={index}>
                                                                <img
                                                                    src={deleteIcon}
                                                                    alt="deleteimg"
                                                                    onClick={() => {
                                                                        setShow(true)
                                                                        setModalName("user")
                                                                    }}

                                                                />
                                                                <span>{"Luis Enrique Cornejo"}</span>
                                                            </div>
                                                        ))
                                                    }
                                                    <div className="footer_department">
                                                        <TablePagination
                                                            component="div"
                                                            rowsPerPageOptions={[2, 4, 6, 8]}
                                                            count={"12"}
                                                            page={"2"}
                                                            // onPageChange={(_, newPage) => setEmpPage(newPage)}
                                                            labelRowsPerPage={t("employees_per_page")}
                                                        // rowsPerPage={empRowsPerPage}
                                                        // onRowsPerPageChange={event => {
                                                        //     setEmpRowsPerPage(parseInt(event.target.value));
                                                        //     setEmpPage(0);
                                                        // }}
                                                        />
                                                        <div className='delete_user'
                                                            onClick={() => {
                                                                setShow(true)
                                                                setModalName("users")
                                                            }}
                                                        >
                                                            <p>{t("delete_all_users")}</p>
                                                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                        </div>

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

                </Accordion>
            </div>

            <AddNewDepartmentModal
                show={addShow}
                onHide={() => setAddShow(false)}
            />

            <ManageDeleteDepartment
                show={show}
                onHide={() => setShow(false)}
                modalis={modalName}
            />


            <ManageEmployeeDepartment
                show={manageShow}
                onHide={() => setManageShow(false)}
            />
        </>

    )
}

export default Department