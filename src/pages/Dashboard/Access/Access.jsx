import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { t } from "i18next";
import { useRef, useState } from "react";
import fingerIcon from '../../../assets/icon/ic-fingerprint.svg';
import tagIcon from '../../../assets/icon/tag-solid.svg';
import NotFoundDataWarning from "../../../components/NotFoundDataWarning";
import { permissionObj } from "../../../Helpers/permission";
import { useSelector } from "react-redux";
const Access = () => {
  const [toggleState, setToggleState] = useState(1);
  const elementRef = useRef(null);
  const { user, permission } = useSelector(state => state.authenticatioauthennSlice);


  return (
    <div>
      <div className='head'>
        <div className="headLeft">
          <h2>{t('access')}</h2>
        </div>
        <div className="container-top-right-btns">

          <button
            className="filter-btn-1"
            style={{ width: "48px", height: "48px" }}
          // onClick={() => setFilterDialogShow(true)}
          >
            <FilterAltIcon style={{ fontSize: "32px" }} />
          </button>

        </div>
      </div>
      <div className="row steps-row mb-3 mx-0" id="pills-tab" role="tablist">
        {
          permission?.includes(permissionObj?.WEB_ACCESS_USER_READ) &&
          <div className={`${permission?.includes(permissionObj?.WEB_ACCESS_VEHICLE_READ ) ? "col-6":"col-12"}  text-center p-0 tap_hover ${toggleState === 1 ? 'active_tap' : 'deactive_tap'}`}
            role="presentation">
            <a
              className={`steps-global btn ${toggleState === 1 ? 'btn-bordered-global' : ''
                }`}
              onClick={() => {
                if (toggleState !== 1) {
                  setToggleState(1);
                }
              }}
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              <span>{t("users")}</span>
            </a>
          </div>
        }
        {
          permission?.includes(permissionObj?.WEB_ACCESS_VEHICLE_READ) &&
        <div className={`${permission?.includes(permissionObj?.WEB_ACCESS_USER_READ) ? "col-6":"col-12"}  text-center p-0 tap_hover ${toggleState === 2 ? 'active_tap' : 'deactive_tap'}`}
          role="presentation">
          <a
            className={`steps-global btn ${toggleState === 2 ? 'btn-bordered-global' : ''
              }`}

            onClick={() => {
              if (toggleState !== 2) {
                setToggleState(2);
              }
            }}
            id="pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-home"
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            <span>{t("vehicles")}</span>
          </a>
        </div>
        }
      </div>
      <div className="tab-content" id="pills-tabContent">
        <div
          className={`${toggleState === 1 ? "tab-pane fade show active " : "tab-pane fade"
            }`}
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div className="panelTables animated-div px-1 mt-1"
            style={{ width: "100%", paddingTop: "0rem" }}
          >
            {
              [1, 2].length > 0 ?
                <table style={{ width: "100%" }}>
                  <thead>
                    <th className='first_head'>{t("name")}</th>
                    <th>{t("last_name")}</th>
                    <th>{t("second_last_name")}</th>
                    <th>{t("user_type")}</th>
                    <th>{t("date")}</th>
                    <th>{t("device")}</th>
                    <th>{t("zone")}</th>
                    <th className='last'>{t("access_method")}</th>
                  </thead>
                  <tbody>
                    {
                      [1, 2].map((item, index) => {
                        return (
                          <tr >
                            < td className='first align-middle' >1</td>
                            <td style={{ maxWidth: 250 }}>2</td>
                            <td >3</td>
                            <td>4</td>
                            <td style={{ maxWidth: 250 }}> 5 </td>
                            <td>6</td>
                            <td> 7</td>
                            <td className='last_tr'>
                              <img src={fingerIcon} alt="finger" />
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table> :
                <NotFoundDataWarning text={t("no_documents")} />
            }

          </div>
        </div>
        <div
          className={`${toggleState === 2 ? "tab-pane fade show active " : "tab-pane fade"}`}
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <div className="panelTables animated-div px-1 mt-1"
            style={{ width: "100%", paddingTop: "0rem" }}
          >
            {
              [1, 2].length > 0 ?
                <table style={{ width: "100%" }}>
                  <thead>
                    <th className='first_head'>{t("brand")}</th>
                    <th>{t("sub_brand")}</th>
                    <th>{t("color")}</th>
                    <th>{t("plates")}</th>
                    <th>{t("vin")}</th>
                    <th>{t("tag")}</th>
                    <th>{t("date")}</th>
                    <th>{t("device")}</th>
                    <th>{t("zone")}</th>
                    <th className='last'>{t("access_method")}</th>
                  </thead>
                  <tbody>
                    {
                      [1, 2].map((item, index) => {
                        return (
                          <tr >
                            < td className='first align-middle' >1</td>
                            <td style={{ maxWidth: 250 }}>2</td>
                            <td > 3</td>
                            <td>4</td>
                            <td style={{ maxWidth: 250 }}> 5</td>
                            <td>6</td>
                            <td> 7</td>
                            <td> 8</td>
                            <td> 9</td>
                            <td className='last_tr'>
                              <img src={tagIcon} alt="finger" />
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table> :
                <NotFoundDataWarning text={t("no_documents")} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Access