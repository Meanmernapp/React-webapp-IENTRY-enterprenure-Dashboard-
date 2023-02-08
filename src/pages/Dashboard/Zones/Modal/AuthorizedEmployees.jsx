import React from "react";
import iccancel from "../../../../assets/images/ic-cancel.svg";
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const AuthorizedEmployees = () => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const users = [
    "Luis Enrique Cornejo Arreola",
    "Diego Guerrero Estrad",
    "Pablo Villegas Ferruzca",
    "Iván Alejandro Sanchez",
    "Osiris Danae Villanueva",
  ];
  return (
    <div class="modal buildingadd_card" id="authorizedEmployee">
      <div class="modal-dialog modal-lg zonescard_m_center">
        <div class="modal-content ">
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
          <div class="modal-body ">
            <div className="container-fluid ">
              <div className="row">
                <h1 style={{ textAlign: "center" }}>
                  <b>{t("authorized_employees")}</b>
                </h1>
                <br />
                <h4 className="mt-3 mb-2" style={{ color: "#146f62" }}>
                  {t("remove_user")}
                </h4>
                <div>
                  <input
                    type="text"
                    className="form-control form-control-lg"

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
                  {t("add_user")}
                </h4>
                <div>
                  <input
                    type="text"
                    className="form-control form-control-lg"

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
                              class="fa fa-times-circle"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-3 col-md-12">
                  <button className="btn btn-lg  btn-block" style={{ backgroundColor: "#146f62" }}>
                    {t("apply_changes")}
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
