import React, { useEffect, useState } from 'react'
import DetailNoData from './DetailNoData';
import ic_gun_solid from '../../../../../assets/images/ic-gun-solid.svg';
import { useDispatch, useSelector } from 'react-redux';
import CreateFireArmsModal from '../Modal/CreateFireArmsModal';
import UpdateFireArmsModal from '../Modal/UpdateFireArmsModal';
import { getFireArm } from '../../../../../reduxToolkit/CompanyEmployees/CompanyEmployeesApi';
import { useParams } from 'react-router-dom';
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'

const DetailFireArms = ({ option }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const fireArmStatus = useSelector(state => state?.CompanyEmployeesSlice?.fireArmStatus);
    const singleFireArm = useSelector(state => state?.CompanyEmployeesSlice?.singleFireArm);
    // console.log(singleFireArm)

    const [showModal, setShowModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    return (
        <>
            <div className='detailTitleText'>
                <p>
                    <span>{t('fire_arms')}</span>
                    <img src={ic_gun_solid} alt="ic_gun_solid" style={{
                        margin: "0 5px"
                    }} />
                </p>
                {
                    option === "update" ?
                        <button
                            className='updateSectionBtn'
                            onClick={() => {
                                if (fireArmStatus === true) {
                                    dispatch(getFireArm(id));
                                }
                                setShowModal(true);
                            }}
                        >
                            {
                                fireArmStatus === false ? "Create Fire Arms" : "Update Fire Arms"
                            }
                        </button> : null
                }
            </div>
            <CreateFireArmsModal
                show={showModal}
                onHide={() => setShowModal(false)}
            />
            <UpdateFireArmsModal
                show={updateModal}
                onHide={() => setUpdateModal(false)}
            />
            {
                singleFireArm ?
                    <table className="detailFireArmsTable my-3" style={{ width: "100%" }}>
                        <thead>
                            <th className='first'>{t('key')}</th>
                            <th>{t('code')}</th>
                            <th>{t('description')}</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td
                                    className='first'
                                    style={{
                                        color: "#146F62",
                                        fontWeight: "bold",
                                        fontSize: "16px"
                                    }}
                                >
                                    {t('p')}
                                </td>
                                <td>{singleFireArm?.codeP} </td>
                                <td>{singleFireArm?.descP}</td>
                            </tr>
                            <tr>
                                <td
                                    className='first'
                                    style={{
                                        color: "#146F62",
                                        fontWeight: "bold",
                                        fontSize: "16px"
                                    }}
                                >
                                    {t('m')}
                                </td>
                                <td>{singleFireArm?.codeM} </td>
                                <td>{singleFireArm?.descM}</td>
                            </tr>
                            <tr>
                                <td
                                    className='first'
                                    style={{
                                        color: "#146F62",
                                        fontWeight: "bold",
                                        fontSize: "16px"
                                    }}
                                >
                                    {t('s')}
                                </td>
                                <td>{singleFireArm?.codeS}</td>
                                <td>{singleFireArm?.descS}</td>
                            </tr>
                            <tr>
                                <td
                                    className='first'
                                    style={{
                                        color: "#146F62",
                                        fontWeight: "bold",
                                        fontSize: "16px"
                                    }}
                                >
                                    {t('r')}
                                </td>
                                <td>{singleFireArm?.codeR} </td>
                                <td>{singleFireArm?.descR}</td>
                            </tr>
                        </tbody>
                    </table> :
                    <DetailNoData title="NO FIREARMS" />
            }
        </>
    )
}

export default DetailFireArms