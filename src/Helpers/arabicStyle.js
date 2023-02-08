import Cookies from "js-cookie";

const lCode = Cookies.get("i18next") || "en";

export const iconStyle = {
  transform: lCode === "ar" ? "scaleX(-1)" : "",
  margin: "0 10px",
};

export const textFieldStyle = {
  textAlign: lCode === "ar" ? "right" : "left",
  textTransform: "uppercase",
  "& 	.MuiOutlinedInput-notchedOutline": {
    textAlign: lCode === "ar" ? "right" : "left",
  },
  "& 	.MuiInputLabel-root": {
    fontSize: 12,
    left: lCode === "ar" ? "inherit" : "0",
    right: lCode === "ar" ? "1.75rem" : "0",
    transformOrigin: lCode === "ar" ? "right" : "left",
  },
};
