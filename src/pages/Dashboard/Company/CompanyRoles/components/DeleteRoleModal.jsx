import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { removeUserRole, deleteRole } from "../../../../../Apis/roles";
import cancel from '../../../../../assets/images/ic-cancel.svg'
import { getEmployeeRoles } from "../../../../../reduxToolkit/EmployeeRoles/EmployeeRolesApi";

const DeleteRoleModal = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleDeleteUser = () => {
        // console.log(props.deleteitemname, props.deleteid?.id)
        if (props.deleteitemname === "role") {
            setLoading(true)
            deleteRole(props.deleteid?.id).then(({ data: { data } }) => {
                toast.success("Role is deleted successfully..!")
                const body = {
                    order: true,
                    page: 0,
                    size: 4,
                    sortBy: "id"
                }
                dispatch(getEmployeeRoles(body));

                props.onHide();
                setLoading(false)
            }).catch(error => {
                toast.error("error in deleting role..!")
                setLoading(false)
            })
        } else if (props.deleteitemname === "user") {
            removeUserRole(props.deleteid?.id).then(({ data: { data } }) => {
                const body = {
                    order: true,
                    page: 0,
                    size: 4,
                    sortBy: "id"
                }
                dispatch(getEmployeeRoles(body))
                toast.success("user removed from this role")
                props.onHide();
                setLoading(false)
            }).catch(error => {
                toast.error("something went wrong in removeroletouser")
                setLoading(false)
            })
        }
    }

    return (
        <Modal
            className="documents-panel-modal"
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete {props.deleteitemname}
                </Modal.Title>
                <img onClick={() => props.onHide()} className="modalClose" src={cancel} alt="" />
            </Modal.Header>
            <Modal.Body className="docsModalBody">
                <div style={{
                    fontSize: "14px",
                    marginBottom: "1rem",
                    textAlign: "center",
                    color: "#707070",
                }}
                >
                    Please. confirm the action the delete the role
                    <span style={{ fontWeight: "bold" }}>
                        {` ${props?.deleteid?.name}. `}
                    </span>
                    All the employees with this role must have a role so we
                    will assign NONE meanwhile you assign their new role.
                </div>
                <div className="buttonArea">
                    <button className="btns btn btn-light" onClick={() => props.onHide()}>Cancel</button>
                    <button className="btn btn-success" onClick={handleDeleteUser}>
                        {
                            loading ? "Deleting...!" : "Delete"
                        }
                    </button>
                </div>
            </Modal.Body>

        </Modal>
    )
}

export default DeleteRoleModal