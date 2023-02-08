import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import { Box } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployeeProviderOrders, GetEmployeeProviderLists } from "../../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import Cookies from "js-cookie";
import { toast } from "react-toastify";



export const CreateOrder = () => {
  const lCode = Cookies.get("i18next") || "en";

  const dispatch = useDispatch()
  let navigate = useNavigate();

  // import slice 
  const { getEmployeeProviderLists } = useSelector(state => state.EmployeeProviderSlice)
  console.log(getEmployeeProviderLists)
  const [provider, setProvider] = useState();
  const [deliveryDate, setdeliveryDate] = useState();
  const [item, setItem] = useState();
  const [serviceType, setServiceType] = useState();
  const [description, setDescription] = useState();
  const [isDelivery, setIsDelivery] = useState(false);


  // const 

  const CreateOrderHandler = () => {
    const data = {
      isDelivery,
      provider: {
        id: provider
      },
      company: {
        id: localStorage.getItem("cId")
      },
      deliveryDate: deliveryDate?.getTime(),
      item,

      description
    }
    console.log(data)
    if (provider && item && deliveryDate?.getTime) {

      dispatch(CreateEmployeeProviderOrders({ data, navigate }))
    }
    else {
      toast.warn("Please Fill All The Fields")
    }
  }
  // useEffect

  useEffect(() => {
    dispatch(GetEmployeeProviderLists())
    localStorage.setItem("cId", "a6bd2887-0f4a-4e5f-b0b5-000d9817ab23")
  }, [])
  return (
    <>
      <div className='head'>
        <div className='headLeft'>
          <Link to="/dashboard/employee/providers">
            <i className="fa fa-arrow-left" aria-hidden="true" style={{
              transform: lCode === "ar" ? "scaleX(-1)" : "",
              // margin: "0 10px"
            }}></i>
          </Link>
          <h2>{t("order_details")}</h2>
        </div>
      </div>
      <div className="mt-5 row order_data_component">
        <p className="__header">{t("order_data")}</p>
        <div className="formCard">
          <div className="col-md-11 __body">
            <div className="fourInputs">
              <div className="mt-3 col-md-6">
                <Box className="inputField">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {t("choose_a_provider")}
                    </InputLabel>
                    <Select size="small"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={t("choose_a_provider")}
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                    >
                      {
                        getEmployeeProviderLists?.map((item, index) => {
                          return (
                            <MenuItem value={item.id}>{item.acronym}</MenuItem>
                          )
                        })

                      }
                      {/* <MenuItem value={10}>
                        IBL | Luis Enrique Cornejo Arreola
                      </MenuItem>
                      <MenuItem value={10}>IBL | Muhammad Umair</MenuItem>
                      <MenuItem value={10}>IBL | Muhammad Usama</MenuItem> */}
                    </Select>
                  </FormControl>
                </Box>

                <TextField size="small"
                  className="inputField"
                  fullWidth

                  label={t("item")}
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  id="Item"
                />
              </div>
              <div className="mt-3 col-md-6">
                <Box className="inputField">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DesktopDatePicker
                        disablePast
                        label={t("delivery_date")}
                        inputFormat="MM/dd/yyyy"
                        value={deliveryDate}
                        onChange={setdeliveryDate}
                        renderInput={(params) => <TextField size="small" {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Box>
                {/* <TextField size="small"
                  className="inputField"
                  fullWidth
         
                  label="Service Type"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  id="ServiceType"
                /> */}
                <div style={{ marginTop: '2rem' }}>

                  <input type="checkbox"
                    value={isDelivery}
                    onChange={(e) => setIsDelivery(e.target.checked)}
                  /> {t("is_delivery")}
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <TextField size="small"
                className="inputField"
                fullWidth
                id="outlined-multiline-static"
                label={t("description")}
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}

                style={{ color: "#707070" }}
              />
            </div>

            <div className="footer">
              <button className="cancel" >{t("cancel")}</button>
              <button onClick={() => { CreateOrderHandler() }}>{t("create")}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
