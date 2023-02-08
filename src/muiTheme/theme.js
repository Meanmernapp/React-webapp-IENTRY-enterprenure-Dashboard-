import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#178A7B",
      dark: "#146F62",
      light: "#A2CBF4",
    },
    gray: {
      main: "#707070",
      dark: "#146F62",
      light: "#A2CBF4",
    },
  },
  fontFamily: "Montserrat",
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          h1: {
            fontSize: "32px",
          },
        }),
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          // background: theme.palette.primary.main,
          boxShadow: "0px 0px 4px #00000080",
          borderRadius: "4px",
          textAlign: "center",
          fontWeight: 600,
          fontSize: "16px",
          letterSpacing: "0px",
          color: "#FFFFFF",
          opacity: "1",
          "&:hover": {
            background: theme.palette.primary.main,
          },
        }),
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& label": {
            color: `${theme.palette.gray.main} !important`,
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "Montserrat",
            fontSize: "14px",
            // transform: "translate(14px, 10px) scale(1)"
          },
          ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
            border: "2px solid #707070 !important",
          },
          ".css-bo2ymy-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
            color: `${theme.palette.gray.main} !important`,
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: "Montserrat",
            fontSize: "14px",
          }

        }),
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          // fontSize: "10px",
          // marginBottom: "1rem !important",
          color: `${theme.palette.gray.main} !important`,
          "& fieldset": {
            borderColor: `${theme.palette.gray.main} !important`,
            // fontSize: ".75rem",
          },
          boxShadow: "4px 4px 4px #0000001A",
          "& .Mui-disabled": {
            backgroundColor: "#e6e6e6",
          },
        }),
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: ({ theme }) => ({
          "& .MuiTablePagination-selectLabel": {
            textTransform: "capitalize",
          },
          "& .MuiTablePagination-displayedRows": {
            textTransform: "lowercase",
          },
        }),
      },
    },
  },
});

export default theme;
