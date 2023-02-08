import React, { useEffect, useState } from 'react';
import Dropdown from "react-bootstrap/Dropdown";

import i18next from 'i18next'
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

import languageIcon from '../assets/images/ic-language-black.svg'
import ic_check from '../assets/images/ic-check.svg';
import uaeFlag from '../assets/images/uaeFlag.png';
import englishFlag from '../assets/images/english.png'
import spanishFlag from '../assets/images/spanish.png'
import franceFlag from '../assets/images/france.png'

const languages = [
    {
        id: 1,
        name: "English",
        code: "en",
        flag: englishFlag,
    },
    {
        id: 2,
        name: "Spanish",
        code: "sp",
        flag: spanishFlag,
    },
    {
        id: 3,
        name: "French",
        code: "fr",
        flag: franceFlag,
    },
    {
        id: 4,
        name: "Arabic",
        dir: "rtl",
        code: "ar",
        flag: uaeFlag,
    },
];

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
    return (
        <div
            ref={ref}
            onClick={e => onClick(e)}
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "3px 5px",
                width: '195px'
            }}
        >
            {children}
            <span>Language</span>
            <img src={languageIcon} style={{
                width: "1em",
                height: "1em",
                fontSize: "1.3rem",
            }} alt="languageIcon" />
        </div>
    )
});


const LanguageSelector = () => {
    const currentLanguageCode = Cookies.get("i18next") || "en";
    const [currentLanguage, setCurrentLanguage] = useState({});
    const [open, setOpen] = useState(false)
    const { t } = useTranslation();

    useEffect(() => {
        setCurrentLanguage(languages.find((l) => l.code === currentLanguageCode))
        document.body.dir = currentLanguage?.dir || "ltr";
        document.body.style.textAlign = currentLanguageCode === "ar" ? "right" : "left";
        document.title = t("app_title");

        // const root = document.documentElement;
        // root?.style.setProperty(
        //     "--text-align",
        //     currentLanguageCode === "ar" ? "right" : "left",
        // );
        // root?.style.setProperty(
        //     "--right",
        //     currentLanguageCode === "ar" ? "1.75rem !important" : "0",
        // );
        // root?.style.setProperty(
        //     "--left",
        //     currentLanguageCode === "ar" ? "inherit" : "0",
        // );
        // root?.style.setProperty(
        //     "--transform-origin",
        //     currentLanguageCode === "ar" ? "right !important" : "left",
        // );
    }, [currentLanguage, t]);

    return (
        <div className="languageSelector">
            <Dropdown drop='end'>
                <Dropdown.Toggle as={CustomToggle} />
                <Dropdown.Menu
                    size="sm"
                    title="Change Languages"
                >
                    {
                        languages?.map(value => (
                            <div
                                className='dropdownDiv'
                                key={value.id}
                                onClick={() => {
                                    i18next.changeLanguage(value.code)

                                }}
                                style={{
                                    padding: "0 10px",
                                }}
                            >
                                <div>
                                    <img src={value.flag} className="mx-2" alt="images" />
                                    <span>{value.name}</span>
                                </div>
                                {
                                    currentLanguage.code === value.code ?
                                        <img
                                            src={ic_check}
                                            style={{
                                                width: "20px",
                                                height: "10px"
                                            }}
                                            alt="images"
                                        /> : null
                                }
                            </div>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default LanguageSelector