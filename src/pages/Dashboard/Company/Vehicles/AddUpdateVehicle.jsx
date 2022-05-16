import React, { useEffect, useRef, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import car_icon from "../../../../assets/images/car_icon.svg";
import { Box } from "@mui/system";
import { InputAdornment, InputLabel, Select, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import carImage from "../../../../assets/images/Capture3.PNG";
import carImage1 from "../../../../assets/images/Capture4.PNG";
import CloseIcon from "@mui/icons-material/Close";
// import cloudsvg from "../../../../assets/images/cloud.svg";
import cloudsvg from "../../../../assets/images/cloud.svg";
import { Link } from "react-router-dom";
import { Overlay, Tooltip } from "react-bootstrap";
import { createVehicle, getVehicleByVehicleId, updateVehicle } from "../../../../Apis/companyVehicle";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";


const override = css`
  position: fixed;
  top: 50%;
  left: 50%;
  right: 0;
  bottom: 0; 
  z-index: 6; 
`;

const AddUpdateVehicle = () => {
  const { data } = JSON.parse(sessionStorage.getItem("userdata"));
  const updateVehicleId = location.pathname.split("addupdatevehicle/")[1]
  const companyId = localStorage.getItem("companyId");
  const vehicleImages = [1, 2, 3];
  const checkobj = {};
  const target = useRef(null);

  const [marca, setMarca] = useState();
  const [subbrand, setSubbrand] = useState();
  const [plates, setPlates] = useState();
  const [modelo, setModelo] = useState();
  const [color, setColor] = useState();
  const [model, setModel] = useState();
  const [status, setStatus] = useState();
  const [driver, setDriver] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [show, setShow] = useState(false);
  const [closeIconBtn, setCloseIconBtn] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [updateVehicleData, setUpdateVehicleData] = useState();


  useEffect(() => {
    vehicleImages.map((number) => {
      checkobj[`closeBtn${number}`] = false;
    });
    // console.log("useeffect", checkobj);
  }, []);
  // useEffect(() => {}, [imageSrc]);

  const handleFileInput = (e) => {
    e.preventDefault();
    // console.log(e.target.files[0]);
    // console.log(URL.createObjectURL(e.target.files[0]));
    const reader = new FileReader();
    var url = reader.readAsDataURL(e.target.files[0]);
    // console.log(url);
    // console.log(reader);
    setImageSrc(reader.result);
  };


  useEffect(() => {
    if (updateVehicleId !== undefined) {
      setIsLoading(true);
      getVehicleByVehicleId(updateVehicleId).then(({ data: { data } }) => {
        if (data) {
          setUpdateVehicleData(data);
          setMarca(data?.brand);
          setSubbrand(data?.subBrand);
          setPlates(data?.plate);
          setModelo(data?.serialNumber);
          setColor(data?.color);
          setModel(data?.model);
          setStatus(data?.status.name);
          setDriver(data?.vin);
          setIsLoading(false);
        }
      }).catch(error => {
        // toast.error("something went wrong in geting update user data")
      })
    }
  }, [])

  const handleAddUpdate = () => {
    setIsLoading(true);
    if (updateVehicleData) {
      const updatedVehicleObj = {
        companyId: companyId,
        email: data.email,
        userId: data.id,
        vehicle: {
          brand: marca,
          color: color,
          createdAt: 0,
          id: updateVehicleData.id,
          model: Number(model),
          plate: plates,
          serialNumber: modelo,
          status: {
            id: 2,
            name: status
          },
          subBrand: subbrand,
          updatedAt: 0,
          vin: driver
        }
      }

      updateVehicle(updatedVehicleObj).then(({ data: { data } }) => {
        if (data) {
          setIsLoading(false);
          toast.success("vehicle data updated successfully..!")
          // console.log(data)
        }
      }).catch(error => {
        console.log(error)
      })

    } else {
      const body = {
        companyId: companyId,
        email: data.email,
        userId: data.id,
        vehicle: {
          brand: marca,
          color: color,
          createdAt: 0,
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa3",
          model: Number(model),
          plate: plates,
          serialNumber: modelo,
          status: {
            id: 2,
            name: status
          },
          subBrand: subbrand,
          updatedAt: 0,
          vin: driver
        }
      }
      createVehicle(body).then(({ data: { data } }) => {
        if (data) {
          setIsLoading(false);
          toast.success("vehicle created successfully.")
          // console.log(data)
        }
      }).catch(error => {
        toast.error("something went wrong.")
      })
    }
  }

  return (
    <>
      <div className="head">
        <Link to='/dashboard/company'>
          <h2>
            <ArrowBackIcon style={{ fontSize: "30px", marginRight: "30px" }} />
            Create/Update Vehicle
          </h2>
        </Link>
        {
          isLoading ?
            <div className="overlay">
              <HashLoader loading="true" css={override} size={50} color="#fff" />
            </div> :
            <button className="btn" onClick={handleAddUpdate}>Create/Update Vehicle</button>
        }
      </div>
      <div className="col-md-11 m-auto vehice_data_card ">
        <div className="vehicle_header">
          <p className="text-center">Data</p>
          <img src={car_icon} />
        </div>
        <div
          className="vehice_data_card_body"
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem",
          }}
        >
          <div className="col-md-6">
            <Box
              component="form"
              className="mt-2"
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                placeholder="KIA"
                label="MARCA"
                id="outlined-size-normal"
                defaultValue="Normal"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
              />
            </Box>
            <Box
              component="form"
              className="mt-2"
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                placeholder="UKP-575-C75"
                label="PLATES"
                id="outlined-size-normal"
                defaultValue="Normal"
                value={plates}
                onChange={(e) => setPlates(e.target.value)}
              />
            </Box>
            <Box
              component="form"
              className="mt-2"
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                placeholder="Electric Blue"
                label="COLOR"
                id="outlined-size-normal"
                defaultValue="Normal"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </Box>
            <Box
              component="form"
              className="mt-2"
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">STATUS</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  defaultValue={status}
                  label="ACTIVE"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                  <MenuItem value="VACATIONS">VACATIONS</MenuItem>
                  <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                  <MenuItem value="IN REPAIR">IN REPAIR</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="col-md-6">
            <Box
              component="form"
              className="mt-2"
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                placeholder="Rio Ex"
                label="SUB-BRAND"
                id="outlined-size-normal"
                defaultValue="Normal"
                value={subbrand}
                onChange={(e) => setSubbrand(e.target.value)}
              />
            </Box>
            <Box
              component="form"
              className="mt-2"
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                placeholder="Rio Ex"
                label="Modelo"
                id="outlined-size-normal"
                defaultValue="Normal"
                value={modelo}
                onChange={(e) => setModelo(e.target.value)}
              />
            </Box>
            <Box
              component="form"
              className="mt-2"
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                placeholder="Rio Ex"
                label="Model"
                id="outlined-size-normal"
                defaultValue="Normal"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </Box>
            <Box
              component="form"
              className="mt-2"
              sx={{
                width: "100%",
                maxWidth: "100%",
                fontSize: "20px",
                height: "40px",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                fullWidth
                placeholder="Rio Ex"
                label="Driver"
                id="outlined-size-normal"
                defaultValue="Normal"
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
              />
            </Box>
          </div>
        </div>
      </div>
      <div className="row" style={{ justifyContent: "space-around" }}>
        <div
          className="col-md-5 vehicle_images_card mb-5"
        >
          <p className="vehicle_images_card_title">Images</p>
          <div className="vehicle_images">
            {vehicleImages?.map((number) => {
              // btnObj={
              //   ...btnObj,
              //   `btn${number}`: false
              // }
              // setCloseIconBtn((prevState) => [
              //   ...prevState,
              //   `btn${number}`: false;
              // ]);
              // console.log("I am CheckObj", checkobj);
              return (
                <div
                  style={{ display: "flex", justifyContent: "end" }}
                  key={number}
                >
                  <img src={carImage} />
                  <Link
                    to=""
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <CloseIcon
                      ref={target}
                      onClick={() =>
                        (checkobj[`btn${number}`] = !checkobj[`btn${number}`])
                      }
                      style={{
                        color: "red",
                        position: "absolute",
                        marginTop: "10px",
                      }}
                    />
                  </Link>
                  <Overlay
                    target={target.current}
                    show={show}
                    placement="left"
                    key={number}
                  >
                    {({
                      placement,
                      arrowProps,
                      show: _show,
                      popper,
                      ...props
                    }) => (
                      <div
                        {...props}
                        style={{
                          position: "absolute",
                          backgroundColor: "#FFFFFF",
                          padding: "2px 10px",
                          color: "black",
                          borderRadius: "8px",
                          boxShadow: "0px 0px 4px #000000B3",
                          ...props.style,
                        }}
                      >
                        Would you like to drop this image?
                      </div>
                    )}
                  </Overlay>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-md-4 vehicle_images_card mb-5">
          <p className="vehicle_images_card_title">SUBIR IMAGEN</p>
          <div className="updata_img_m">
            <label htmlFor="file-input" className="dottedborderbox">
              <img src={cloudsvg} alt="submitupload" className="submitupload" />
              <input
                type="file"
                id="file-input"
                onChange={handleFileInput}
                accept="image/*, video/*"
              />
              <p>
                drag {"&"} drop <br /> your image <br /> size 20 mb max
              </p>
            </label>
          </div>
          <img className="uploadBox" src={imageSrc ? imageSrc : carImage1} />
        </div>
      </div>
    </>
  );
};

export default AddUpdateVehicle;
