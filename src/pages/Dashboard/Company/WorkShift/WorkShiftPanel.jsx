import React, { useState } from "react";
import AddWorkShift from "./Modals/AddWorkShift";
import RemoveUser from "./Modals/RemoveUser";
import WorkShiftPanelCard from "./WorkShiftPanelCard";

const WorkShiftPanel = () => {
  const [workShiftModalShow, setWorkShiftModalShow] = useState(false);
  const [removeUserModal, setRemoveUserModal] = useState();

  return (
    <>
      <div className="head">
        <h2>Work shift panel</h2>
        <button
          className="btn btn-lg"
          onClick={() => setWorkShiftModalShow(true)}
        >
          ADD New Work Shift
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>
      <div className="subhead">
        <h5 style={{ color: "#BC0000", fontSize: "16px" }}>Types of User</h5>
      </div>
      <WorkShiftPanelCard setRemoveUserModal={setRemoveUserModal}/>
      <AddWorkShift
        title="Add Work Shift"
        check="false"
        show={workShiftModalShow}
        onHide={() => setWorkShiftModalShow(false)}
      />
       <RemoveUser
        title="Remove User"
        show={removeUserModal}
        onHide={() => setRemoveUserModal(false)}
      />
      
    </>
  );
};

export default WorkShiftPanel;
