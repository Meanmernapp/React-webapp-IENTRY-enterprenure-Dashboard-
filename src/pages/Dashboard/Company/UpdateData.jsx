import React, { useEffect, useState } from 'react'
import { Box, TextField } from '@mui/material';
import submitupload from '../../../assets/images/upload.PNG'
import LefletMap from '../../../components/LefletMap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCompanyAction } from '../../../redux/actions/companydata.action';
import { getAllCompaniesData, getComopanyRestructions, getCompanyData, updateComopanyImg, updateComopanyRestructions, updateCompanyData } from '../../../Apis/companydata';
import { toast } from 'react-toastify';


const UpdateData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companyId = "bc9789f1-3f16-4759-851d-5501cc37ec97";
  // const [restructionId, setRestructionId] = useState("");
  const [getCompany, setGetCompany] = useState();
  const [showMap, setShowMap] = useState(false);
  const [companyImg, setCompanyImg] = useState();
  const [arrData, setarrData] = useState()
  const [updateCompanyImg, setUpdateCompanyImg] = useState({
    file: null,
    id: getCompany?.id,
    option: "company"
  });
  // console.log(getCompany)
  const [companyRestructions, setCompanyRestructions] = useState();
  // console.log(location.slice("(", ","));
  const [companyData, setCompanyData] = useState({
    id: getCompany?.id,
    status: {
      id: getCompany?.status.id
    },
    acronym: getCompany?.acronym,
    name: getCompany?.name,
    address: getCompany?.address,
    latitud: getCompany?.latitud,
    longitud: getCompany?.longitud,
    ip: getCompany?.ip
  });

  const [updateres, setUpdateres] = useState()
  // console.log(updateres)

  const onImageChange = (e) => {
    console.log(e.target.files[0]);
    setUpdateCompanyImg({ ...updateCompanyImg, ["file"]: e.target.files[0] })
    const [file] = e.target.files;
    setCompanyImg(URL.createObjectURL(file));

    
    let formData = new FormData();
    formData.append('id', companyId);
    formData.append('option', "company");
    formData.append('file', e.target.files[0]);

    const imgObj = {
      companyId: companyId,
      email: "",
      userId: "de7d05f1-1e6f-4ef1-a2e4-7bf73cf64bb8",
      id: companyId,
      option: "company",
      file: e.target.files[0] 
    }

    updateComopanyImg(formData).then((data) => {
      console.log(data);
    }).catch(error => {
      toast.error("something went wrong.")
    })
  };

  useEffect(() => {

    getCompanyData(companyId).then(({ data: { data } }) => {
      // console.log(data);
      setGetCompany(data);
      setCompanyData({
        id: data?.id,
        status: {
          id: data?.status.id
        },
        acronym: data?.acronym,
        name: data?.name,
        address: data?.address,
        latitud: data?.latitud,
        longitud: data?.longitud,
        ip: data?.ip
      })


      getComopanyRestructions(data?.id).then(({ data: { data } }) => {
        // setRestructionId(data.data.id)
        // console.log(data)
        const resObj = {
          id: data?.id,
          emailService: data?.emailService,
          smsService: data?.smsService,
          driveService: data?.driveService,
          isOnuEvent: data?.isOnuEvent,
          alertTimeIncomingEvent: data?.alertTimeIncomingEvent,
          alertTimeIncomingInvitation: data?.alertTimeIncomingInvitation,
          fireArmsModule: data?.fireArmsModule,
        }
        setUpdateres(resObj)
        // setCompanyRestructions(data.data);
        const arrObj = [
          {
            res: "emailService",
            check: data?.emailService,
            data: "Email Service",
            info: "Send updates to User update through email.",
          },
          {
            res: "isOnuEvent",
            check: data?.isOnuEvent,
            data: "is ONU Event Type",
            info: "Change the design and add more data.",
          },
          {
            res: "alertTimeIncomingEvent",
            check: data?.alertTimeIncomingEvent,
            data: "Alert time incoming event",
            info: "Show an alert 1 hour before the event start.",
          },
          {
            res: "alertTimeIncomingInvitation",
            check: data?.alertTimeIncomingInvitation,
            data: "Alert time incoming invitation",
            info: "Show an alert 1 hour before the event start.",
          },
          {
            res: "smsService",
            check: data?.smsService,
            data: "SMS Service",
            info: " Send sms to actions, reset password, confirm account, etc.",
          },
          {
            res: "fireArmsModule",
            check: data?.fireArmsModule,
            data: "Fire Arms Module",
            info: "The Employees will have permissiion to has fire arms.",
          },
          {
            res: "driveService",
            check: data?.driveService,
            data: "Drive Service",
            info: "Storage image on the cloud.",
          },
        ]
        setarrData(arrObj);
      }).catch(error => {
        // toast.error("something went wrong.")
      })

    }).catch(error => {
      // toast.error("something went wrong.")
    })



  }, [])

  // console.log(arrData);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value })

  }

  const handleSubmit = () => {
    console.log(updateres)
    updateComopanyRestructions(updateres).then(({ data: data }) => {
      console.log(data.data)
      updateCompanyData(companyData).then(data => {
        // dispatch(getCompanyAction());
        navigate('/dashboard/company');
      }).catch(error => {
        // toast.error("something went wrong.")
      })

    }).catch(error => {
      // toast.error("something went wrong.")
    });

    // console.log(updateCompanyImg)



    // dispatch(updateCompanyAction(companyData, navigate));

  }

  const handleCheckBox = (e, index) => {
    let checkboxList = arrData;
    checkboxList.forEach(chkItem => {
      if (chkItem === index) {
        chkItem.check = e.target.checked;
        setUpdateres({ ...updateres, [index.res]: e.target.checked })
      }
    })
    // console.log(checkboxList)
    setarrData(checkboxList);

  }

  return (
    <div>
      <div className='head'>
        <div className='headLeft'>
          <Link to="/dashboard/company">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </Link>
          <h2>Corporate data</h2>
        </div>
        <button onClick={handleSubmit}>
          <span>Update data</span>
          <i className="fa fa-file" aria-hidden="true"></i>
        </button>
      </div>
      <div className='mt-5 row dragdrop_row'>
        <div className="col-lg-6 col-md-6">
          <h4>data</h4>
          <div className="mt-1 gy-4 row">
            <div className="col-lg-6">
              <Box
                component="form"
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
                  placeholder="Inteligence Bereau Laboratory"
                  label="COMPANY NAME"
                  name="name"
                  id="outlined-size-normal"
                  defaultValue="Normal"
                  value={companyData.name}
                  onChange={handleChange}
                />
              </Box>
            </div>
            <div className="col-lg-6">
              <Box
                component="form"
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
                  placeholder="IBL"
                  label="ACRONYM"
                  name="acronym"
                  id="outlined-size-normal"
                  defaultValue="Normal"
                  value={companyData.acronym}
                  onChange={handleChange}
                />
              </Box>
            </div>
            <div className="col-lg-12">
              <Box
                component="form"
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
                  placeholder="Paseos de san miguel"
                  label="ADDRESS"
                  name="address"
                  id="outlined-size-normal"
                  defaultValue="Normal"
                  value={companyData.address}
                  onChange={handleChange}
                />
              </Box>
            </div>
          </div>
          <h4
            className="pull-right"
            onClick={() => setShowMap(!showMap)}
          >
            OR CLICK TO SHOW IN THE MAP
          </h4>
          {
            showMap ? <div className='my-5'>
              <LefletMap />
            </div> : null
          }
        </div>
        <div className="col-lg-6 col-md-6">
          <div className="updata_img_m">
            <h5>images</h5>
            <label htmlFor="file-input" className="dottedborderbox">
              <img
                src={submitupload}
                alt="submitupload"
                className="submitupload"
              />
              <input
                type="file"
                id="file-input"
                accept="image/*, video/*"
                onChange={onImageChange}
              />
              <p>
                drag {"&"} drop <br /> your image <br /> size 20 mb max
              </p>
            </label>
            {
              companyImg ?
                <img
                  src={companyImg}
                  className="uploadedPath"
                /> : null
            }
          </div>
        </div>
        <div className="row restrictions_text">
          <h4>RESTRICTIONS</h4>
          {
            arrData && arrData?.map((value, index) => (
              <div className="col-md-6" key={index}>
                <div className="my-3 updateDataDiv">
                  <div className="checkBoxWithText">
                    <h6 id="updatedata">{value.data} </h6>
                    <label className="container">
                      <input
                        type="checkbox"
                        name="check"
                        checked={value.check}
                        onChange={(e) => handleCheckBox(e, value)}
                      />
                      <span className="checkmark"></span>
                    </label>

                    {/* <input
                      type="checkbox"
                      name="check"
                      checked={value.check}
                      onChange={(e) => handleCheckBox(e, value)}
                    /> */}
                  </div>
                  <p><span>INFO: </span>{value.info}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default UpdateData