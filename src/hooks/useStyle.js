/*
Author : Arman Ali
Module: create Vehicle
github: https://github.com/Arman-Arzoo
*/

import { useTranslation } from 'react-i18next'
import Cookies from "js-cookie";

function useStyle() {

    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    // this is to revert form textfield when RTL
    const textField = {
        textAlign: lCode === "ar" ? "right" : "left",
        "& 	.MuiOutlinedInput-notchedOutline": {
            textAlign: lCode === "ar" ? "right" : "left",
        },
        "& 	.MuiInputLabel-root": {
            fontSize: 12,
            left: lCode === "ar" ? "inherit" : "0",
            right: lCode === "ar" ? "1.75rem" : "0",
            transformOrigin: lCode === "ar" ? "right" : "left"
        }
    }

    // this object is use small box
    const smallBoxStyle = {
        width: "100%",
        maxWidth: "100%",
        fontSize: "20px",
        height: "40px",
    }

    return { textField,smallBoxStyle }
}

export default useStyle