import React from "react";
import iccancel from "../../../../assets/images/ic-cancel.svg";

const AuthorizedEmployees = () => {
  const users = [
    "Luis Enrique Cornejo Arreola",
    "Diego Guerrero Estrad",
    "Pablo Villegas Ferruzca",
    "Iván Alejandro Sanchez",
    "Osiris Danae Villanueva",
  ];
  return (
    <div className="modal buildingadd_card" id="authorizedEmployee">
      <div className="modal-dialog modal-lg zonescard_m_center">
        <div className="modal-content ">
          {/* <!-- Modal Header --> */}
          <div>
            <img
              src={iccancel}
              className="close profile_ancel_img"
              data-dismiss="modal"
              alt=""
            />
          </div>
          {/* <!-- Modal body --> */}
          <div className="modal-body ">
            <div className="container-fluid ">
              <div className="row">
                <h1 style={{ textAlign: "center" }}>
                  <b>AUTHORIZED EMPLOYEE</b>
                </h1>
                <br />
                <h4 className="mt-3 mb-2" style={{ color: "#146f62" }}>
                  REMOVE USER
                </h4>
                <div>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search"
                    style={{
                      background: `url('https://cdn-icons-png.flaticon.com/512/149/149852.png')`,
                      backgroundPosition: "right",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "20px",
                    }}
                  />
                  <div className="mt-3">
                    <ul className="list-group">
                      <li className="list-group-item">
                        {users.map((user, index) => (
                          <div
                            className="row"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div className="col">{user}</div>
                            <div className="col">
                              <img
                                src={iccancel}
                                className="close profile_ancel_img"
                                data-dismiss="modal"
                                alt=""
                              />
                            </div>
                          </div>
                        ))}
                      </li>
                    </ul>
                  </div>
                </div>
                <h4 className="mt-3 mb-2" style={{ color: "#146f62" }}>
                  ADD USER
                </h4>
                <div>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search"
                    style={{
                      background: `url('https://cdn-icons-png.flaticon.com/512/149/149852.png')`,
                      backgroundPosition: "right",
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "20px",
                    }}
                  />
                  <div className="list-group">
                    <div
                      className="list-group-item"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        float: "left",
                      }}
                    >
                      {users.map((user, index) => (
                        <div
                          className="col-sm-3 mb-2"
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            border: "3px solid ",
                            borderRadius: "20px",
                            padding: "10px",
                          }}
                        >
                          Muhammad Umair
                          <span>
                            <i
                              className="fa fa-times-circle"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-3 col-md-12">
                  <button className="btn btn-lg  btn-block" style={{backgroundColor:"#146f62"}}>
                    APPLY CHANGES
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorizedEmployees;
