import { t } from 'i18next';
import React from 'react'
import { Modal } from "react-bootstrap";

const FilterModalProviders = (props) => {
    console.log(props)
    return (
        <div>
            {/* model for filter */}
            <Modal
                className="filter_Event_model"
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >

                <Modal.Header className='fiter_event_model_head'>
                    <Modal.Title >


                        <h4>{t("filters")}</h4>

                    </Modal.Title>
                    <hr />
                    <i class="fa fa-times" aria-hidden="true" onClick={() => { props.onHide() }} ></i>
                    {/* <img onClick={() => { props.onHide() }} className="modalClose" src={""} alt="" /> */}
                </Modal.Header>

                <Modal.Body className="filter_event_model_body">
                    <p>{t("attributes")}</p>
                    <div className='filter_event_model_form'>

                        <select name="orderby" id="" >
                            <option value="">{t("order_by")}</option>
                            <option value="name">{t("name")}</option>
                            <option value="zone">{t("zone")}</option>
                            <option value="host">{t("host")}</option>
                        </select>

                        <select name="Sort" id="" >
                            <option value="">{t("sort")}</option>
                            <option value="name">{t("name")}</option>
                            <option value="zone">{t("zone")}</option>
                            <option value="host">{t("host")}</option>
                        </select>
                    </div>


                </Modal.Body>

            </Modal>
        </div>
    )
}

export default FilterModalProviders