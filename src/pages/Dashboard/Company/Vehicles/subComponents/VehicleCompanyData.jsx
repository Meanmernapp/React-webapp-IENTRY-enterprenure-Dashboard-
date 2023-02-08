
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import vehicle from '../../../../../assets/images/ic-car.svg'
import company from '../../../../../assets/images/ic-building-outline.svg'
import { updateCreateVehicleObj } from "../../../../../reduxToolkit/CompanyVehicles/CompanyVehiclesSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next'


const smallBoxStyle = {
    width: "100%",
    maxWidth: "100%",
    fontSize: "20px",
    height: "40px",
}


const VehicleCompanyData = () => {
    const { t } = useTranslation();
    const lCode = Cookies.get("i18next") || "en";
    const dispatch = useDispatch();
    const createVehicleObj = useSelector(state => state?.CompanyVehiclesSlice?.createVehicleObj);
    // console.log(createVehicleObj)

    return (
        <>
            <div className="col-lg-8 col-md-12 col-12">
                <p className="mb-2 infoEmpl_text">
                    {t('vehicle_data')}
                    <img src={vehicle} alt="vehicle" />
                </p>
                <div className="empdetail_c">
                    <div className="row mb-3">
                        <Box
                            className="col-lg-6"
                            sx={smallBoxStyle}
                        >
                            <TextField size="small"
                                fullWidth
                                label={t('brand')}
                                name="brand"
                                value={createVehicleObj?.brand}
                                onChange={(e) => dispatch(updateCreateVehicleObj(e.target))}
                                id="BRAND"
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
                            />
                        </Box>
                        <Box
                            className="col-lg-6"
                            sx={smallBoxStyle}
                        >
                            <TextField size="small"
                                fullWidth
                                label={t('sub_brand')}
                                name="subBrand"
                                value={createVehicleObj?.subBrand}
                                onChange={(e) => dispatch(updateCreateVehicleObj(e.target))}
                                id="SUB-BRAND"
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
                            />
                        </Box>
                    </div>
                    <div className="row mb-3">
                        <Box
                            className="col-lg-6"
                            sx={smallBoxStyle}
                        >
                            <TextField size="small"
                                fullWidth
                                label={t('plates')}
                                name="plate"
                                value={createVehicleObj?.plate}
                                onChange={(e) => dispatch(updateCreateVehicleObj(e.target))}
                                id="PLATES"
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
                            />
                        </Box>
                        <Box
                            className="col-lg-6"
                            sx={smallBoxStyle}
                        >
                            <TextField size="small"
                                fullWidth
                                type="number"
                                label={t('model')}
                                name="model"
                                value={createVehicleObj?.model}
                                onChange={(e) => dispatch(updateCreateVehicleObj(e.target))}
                                id="MODEL"
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
                            />
                        </Box>
                    </div>
                    <div className="row mb-3">
                        <Box
                            className="col-lg-6"
                            sx={smallBoxStyle}
                        >
                            <TextField size="small"
                                fullWidth
                                label={t('color')}
                                name="color"
                                value={createVehicleObj?.color}
                                onChange={(e) => dispatch(updateCreateVehicleObj(e.target))}
                                id="COLOR"
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
                            />
                        </Box>
                        <Box
                            className="col-lg-6"
                            sx={smallBoxStyle}
                        >
                            <TextField size="small"
                                fullWidth
                                label={t('s_n')}
                                name="serialNumber"
                                value={createVehicleObj?.serialNumber}
                                onChange={(e) => dispatch(updateCreateVehicleObj(e.target))}
                                id="S/N"
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
                            />
                        </Box>
                    </div>
                    <div className="row mb-3">
                        <Box
                            className="col-lg-6"
                            sx={smallBoxStyle}
                        >
                            <TextField size="small"
                                fullWidth
                                label={t('vin')}
                                name="vin"
                                value={createVehicleObj?.vin}
                                onChange={(e) => dispatch(updateCreateVehicleObj(e.target))}
                                id="VIN"
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
                            />
                        </Box>
                    </div>
                </div>
            </div>

            <div className="col-lg-4 col-md-12 col-12">
                <p className="mb-2 infoEmpl_text">
                    {t('company_data')}
                    <img src={company} alt="vehicle" />
                </p>
                <div className="empdetail_c">
                    <Box className="mb-3">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                {t('tag')}
                            </InputLabel>
                             <Select size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                            // value={wasVacinated}
                            // onChange={(e) => setWasVacinated(e.target.value)}
                            >
                                <MenuItem value={true}>YES</MenuItem>
                                <MenuItem value={false}>NO</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                {t('driver')}
                            </InputLabel>
                             <Select size="small"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                            // value={wasVacinated}
                            // onChange={(e) => setWasVacinated(e.target.value)}
                            >
                                <MenuItem value={true}>YES</MenuItem>
                                <MenuItem value={false}>NO</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
            </div>
        </>
    )
}

export default VehicleCompanyData;