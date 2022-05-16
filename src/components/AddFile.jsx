import React from 'react';
import { Link } from 'react-router-dom';
import ic_add from "../assets/images/ic-add.svg";

const AddFile = ({ add }) => {
    return (
        <Link to="/dashboard/company/addemployee">
            <div className="addFile">
                <img src={ic_add} className="addFileImg" alt="" />
                <p>{add}</p>
            </div>
        </Link>
    )
}

export default AddFile