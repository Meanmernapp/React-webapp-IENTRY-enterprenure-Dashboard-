import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next'

const DetailInfo = () => {
  const { t } = useTranslation();
  const employeeDetail = useSelector(state => state?.CompanyEmployeesSlice?.singleEmployeeDetail);
  console.log(employeeDetail)

  return (
    <>
      <div className="infoEmpl_text mb-2">{t('information')}</div>
      <div
        className="main_content empdetail_c"
        style={{
          height: "90%",
          // width: "495px",
        }}
      >
        <div className="row">
          <Table
            style={{
              border: "hidden",
              marginRight: "15px",
              marginLeft: "15px",
            }}
          >
            <tbody style={{ border: "hidden" }}>
              <tr>
                <td style={{ border: "hidden" }}>
                  <p>{t('name')}</p>
                  <h2>{employeeDetail?.name || "-"}</h2>
                </td>
              </tr>
              <tr>
                <td style={{ border: "hidden" }}>
                  <p>{t('gender')}</p>
                  <h2>{employeeDetail?.gender?.name || "-"}</h2>
                </td>
                <td style={{ border: "hidden" }}>
                  <p>{t('celular')}</p>
                  <h2>{employeeDetail?.phoneNumber || "-"}</h2>
                </td>
              </tr>
              <tr>
                <td style={{ border: "hidden" }}>
                  <p>{t('status')}</p>
                  <h2>{employeeDetail?.status?.name || "-"}</h2>
                </td>
                <td style={{ border: "hidden" }}>
                  <p>{t('email')}</p>
                  <h2>{employeeDetail?.email || "-"}</h2>
                </td>
              </tr>
              <tr>
                <td style={{ border: "hidden" }}>
                  <p>{t('date_of_birth')}</p>
                  <h2>{employeeDetail?.dob || "-"}</h2>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default DetailInfo;
