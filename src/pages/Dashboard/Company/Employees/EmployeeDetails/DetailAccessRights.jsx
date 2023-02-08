import React from "react";
import { useSelector } from "react-redux";
import remove from '../../../../../assets/images/ic-delete-red.svg'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'

const DetailAccessRights = () => {
  const { t } = useTranslation();
  const lCode = Cookies.get("i18next") || "en";
  const employeeDetail = useSelector(state => state?.CompanyEmployeesSlice?.singleEmployeeDetail);

  console.log("checking", employeeDetail)
  return (
    <div className="access_right_m mt-5">
      <p className="access_right_text">{t('access_rights')}</p>
      <div className="mb-5 card access_right_card ">
        <div className="separator my-3">
          {t('custom')}
        </div>
        <p className="accessText">{t('access')}</p>
        <table className="my-3" style={{ width: "100%" }}>
          <thead>
            <th className='first'>{t("zone")}</th>
            <th>{t("day")}</th>
            <th>{t("from")}</th>
            <th>{t("to")}</th>
            <th className='last'>{t("remove")}</th>
          </thead>
          <tbody>
            {
              [1, 2, 3, 4, 5]?.map(item => (
                <tr key={item}>
                  <td className='first'>Access Unitad</td>
                  <td>Monday</td>
                  <td>00:00</td>
                  <td>16:30</td>
                  <td className='last'>
                    <img
                      src={remove}
                      alt="remove"
                    />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailAccessRights;
