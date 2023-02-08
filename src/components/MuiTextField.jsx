import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import Cookies from "js-cookie";


const MuiTextField = ({ label, name, value, row, multiline, handleChange, disable }) => {
    const lCode = Cookies.get("i18next") || "en";
    return (
        <TextField size="small"


            fullWidth
            multiline={multiline}
            row={row}
            name={name}
            value={value}
            label={label}
            disabled={disable}
            variant="outlined"
            onChange={(e) => handleChange(e)}
            sx={{
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
            }}
        // inputProps={{
        //     style: {
        //         fontSize: 14,
        //         textAlign: lCode === "ar" ? "right" : "left",
        //         fontFamily: 'Montserrat, sans-serif'
        //     }
        // }}
        // InputLabelProps={{
        //     style: {
        //         fontSize: 12,
        //         left: lCode === "ar" ? "inherit" : "0",
        //         right: lCode === "ar" ? "1.75rem" : "0",
        //         transformOrigin: lCode === "ar" ? "right" : "left"

        //     }
        // }}
        />
    )
}


MuiTextField.propTypes = {
    styleClass: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    multiline: PropTypes.bool,
    row: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
};

MuiTextField.defaultProps = {
    styleClass: "btn-primary",
};

export default MuiTextField;