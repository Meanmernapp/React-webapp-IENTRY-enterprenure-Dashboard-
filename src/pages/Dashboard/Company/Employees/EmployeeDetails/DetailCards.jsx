import React from 'react';
import { GoPrimitiveDot } from 'react-icons/go'
import ic_edit_outline from '../../../../../assets/images/ic-edit-outline.svg'
import ic_card from '../../../../../assets/images/ic-card.png'
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'

const DetailCards = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    return (
        <div className='detailCards mt-4'>

            <div className='detailTitleText'>
                <p>
                    <span>{t('cards')}</span>
                    <img src={ic_card} alt="ic_card" style={{
                        margin: "0 5px"
                    }} />
                </p>
            </div>
            <table style={{ width: "100%" }}>
                <thead>
                    <th className='first'>{t('type')}</th>
                    <th>{t('template')}</th>
                    <th>{t('last_use')}</th>
                    <th>{t('expire_at')}</th>
                    <th>{t('status')}</th>
                    <th className='last'>{t('option')}</th>
                </thead>
                <tbody>
                    {
                        [1, 2, 3, 4]?.map(item => (
                            <tr key={item.id}>
                                <td className='first'>Access</td>
                                <td>Fire Arms</td>
                                <td>04-05-2023</td>
                                <td>04-05-2023</td>
                                <td>
                                    INACTIVE
                                    <GoPrimitiveDot />
                                </td>
                                <td className='last'>
                                    <img
                                        src={ic_edit_outline}
                                        alt="ic_edit_outline"
                                    />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default DetailCards