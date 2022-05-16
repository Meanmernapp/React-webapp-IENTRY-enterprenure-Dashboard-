
import { useState } from "react";
import { Link } from "react-router-dom";
import search from '../../../assets/images/search.svg'


const RolesPanel = () => {
    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    }
    return (
        <div className="rolesPanel">
            <div className='head'>
                <div className='headLeft'>
                    <Link to="/dashboard/company">
                        <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </Link>
                    <h2>Roles Panel</h2>
                </div>
                <button>
                    <span>Add New Role</span>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
            </div>

            {/* portfolio-grid */}
            <div className="container mt-5">
                <div className="row steps-row justify-content-between mb-3" id="pills-tab" role="tablist">
                    <div className="col-6 text-center" role="presentation">
                        <a className={`steps btn ${toggleState === 1 ? 'btn-bordered' : ''}`} onClick={() => toggleTab(1)} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"><span>ROLE MANAGEMENT</span></a>

                    </div>
                    <div className="col-6 text-center" role="presentation">
                        <a className={`steps btn ${toggleState === 2 ? 'btn-bordered' : ''}`} onClick={() => toggleTab(2)} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"><span>ROLE MANAGEMENT</span></a>

                    </div>

                </div>
                <div className="tab-content" id="pills-tabContent">
                    <div className={`${toggleState === 1 ? 'tab-pane fade show active ' : 'tab-pane fade'}`} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                        <div className="roleManagement">
                            <div className="row employe-log-module">
                                <div className="col-6 employee-module">EMPLOYEE MODULE</div>
                                <div className="col-4 log-module">LOG MODULE</div>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr style={{boxShadow: "none"}}>
                                        <th className="first-child" scope="col">ROLE</th>
                                        <th scope="col">CREATE EMPLOYEE</th>
                                        <th scope="col">UPDATE EMPLOYEE</th>
                                        <th scope="col">DELETE EMPLOYEE</th>
                                        <th scope="col">SEE ACCESS LOGS</th>
                                        <th scope="col">SEE CRUD LOGS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="first-child">ROOT</td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="first-child">ADMINISTRATOR</td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="first-child">GUEST</td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={`${toggleState === 2 ? 'tab-pane fade show active ' : 'tab-pane fade'}`} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                        <div className="roleAssignment">
                            <div className="row employe-log-module">
                                <div className="col-12">
                                    <input type="text" className="form-control" name="x" placeholder="Type a name to filter" />
                                    <span className="input-group-btn">
                                        <button className="btn btn-default" type="button"><img src={search} alt="" /></button>
                                    </span>
                                </div>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="first-child" scope="col">EMPLOYEE</th>
                                        <th scope="col">ROOT</th>
                                        <th scope="col">ADMINISTRATOR</th>
                                        <th scope="col">GUEST</th>
                                        <th scope="col">CEO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="first-child">Luis Enrique Cornejo</td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="first-child">Pablo Villegas</td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="first-child">Diego Guerrero</td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="first-child">Jessica Cassani</td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <label className="radioLabel-container">
                                                <input type="checkbox" name="checkbox" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* contact-form */}
        </div>
    )
}
export default RolesPanel;
