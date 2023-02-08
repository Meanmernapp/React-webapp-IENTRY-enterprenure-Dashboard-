
import { useState } from 'react';
import backgroundimg from './../../assets/images/building_2.png';
// import ientry from './../../assets/images/ientry.png';
import whiteLogo from './../../assets/images/whiteLogo.png';
import userSolid from './../../assets/images/user-solid.png';
import tokenIcon from '../../assets/images/ic-key.png'
import eyeSlashClose from './../../assets/images/eye-slash-solid.png';
import eyeSlashopen from './../../assets/images/eye-solid-open.svg';
// import Header from './Header';
import OtpInput from 'react-otp-input';
import { loginMiddleware, tokenApi } from '../../reduxToolkit/authentication/AuthenticatonApi';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { BounceLoader } from 'react-spinners';
import { override } from '../../Helpers/spinnercss';
import { toast } from 'react-toastify';
import { InputAdornment, TextField } from '@mui/material';
import cryptoJs from 'crypto-js';
import securekey from '../../config';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = new URLSearchParams()

    const [loading, setLoading] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");


    const handleLogin = () => {
        params.append('email', email)
        params.append('password', password)
        params.append('code', otp)
        if (email !== "" && password !== "" && otp !== "") {
            dispatch(tokenApi(params)).then(({ payload: { data } }) => {
                setLoading(false);
                const accessToken = cryptoJs.AES.encrypt(data.access_token, securekey)
                sessionStorage.setItem("bearerToken", accessToken);
                // sessionStorage.setItem("bearerToken", data.access_token);
                dispatch(loginMiddleware({
                    values: {
                        "email": email,
                        "password": password,
                        "code": otp,
                    }, navigate
                }));
            })
        } else {
            toast.warn("Please Fill All Fields..!")
        }
    }


    return (
        <>
            <div className="header" >
                <div className="card_overly">
                    <img src={backgroundimg} className="bgimg" alt="img" />
                    <div className='loginContainer'>
                        <img src={whiteLogo} className="logoImage" alt="logoImage" />
                        <div className='row justify-content-between'>
                            <div className="col-sm-12 col-md-6">
                                <div className="welcomMessage">
                                    <h3>Wellcome</h3>
                                    <p>
                                        iEntry is a technological platform for administration <br />
                                        and security in offices, industries and business parks.
                                    </p>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-4">
                                <div className="loginBoard">
                                    <h3>Login</h3>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        label="User Name"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <img
                                                        src={userSolid}
                                                        width="20px"
                                                        height="23px"
                                                        style={{
                                                            zIndex: "1"
                                                        }}
                                                        alt="userSolid"
                                                    />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            backgroundColor: "white",
                                            borderRadius: "7px"
                                        }}
                                    />
                                    <TextField
                                        size="small"
                                        fullWidth
                                        label="Password"
                                        type={passwordShown ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    {
                                                        passwordShown ?
                                                            <img
                                                                src={eyeSlashopen}
                                                                alt="keyimg"
                                                                style={{
                                                                    cursor: "pointer"
                                                                }}
                                                                onClick={() => setPasswordShown(false)}
                                                            /> : <img
                                                                src={eyeSlashClose}
                                                                alt="keyimg"
                                                                style={{
                                                                    cursor: "pointer"
                                                                }}
                                                                onClick={() => setPasswordShown(true)}
                                                            />
                                                    }
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            backgroundColor: "white",
                                            borderRadius: "7px",
                                            marginTop: "1rem"
                                        }}
                                    />
                                    <div className='tokenWrapper'>
                                        <p>TOKEN</p>
                                        <img
                                            src={tokenIcon}
                                            alt="keyimg"
                                            width="22px"
                                            height="22px"
                                        />
                                    </div>
                                    <OtpInput
                                        value={otp}
                                        containerStyle={{
                                            justifyContent: "space-between"
                                        }}
                                        isInputNum={true}
                                        inputStyle={{
                                            width: "60px",
                                            height: "48px",
                                            fontWeight: "bold",
                                            borderRadius: "8px",
                                            background: "#fff",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            border: "2px solid #707070",
                                            outline: "none",
                                            textAlign: "center",
                                        }}
                                        onChange={(newValue) => setOtp(newValue)}
                                        numInputs={6}
                                    />
                                    <button onClick={() => handleLogin()}>
                                        {
                                            loading ? "checking..." : "sign in"
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;

{/* <div className='inputMain'>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <img
                                            src={userSolid}
                                            width="20px"
                                            height="23px"
                                            alt="userSolid"
                                        />
                                    </div> */}

{/* <div className='inputMain'>
                                        <input
                                            type={passwordShown ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        {
                                            passwordShown ?
                                                <img
                                                    src={eyeSlashopen}
                                                    alt="keyimg"
                                                    width="22px"
                                                    height="22px"
                                                    onClick={() => setPasswordShown(false)}
                                                /> : <img
                                                    src={eyeSlashClose}
                                                    alt="keyimg"
                                                    width="22px"
                                                    height="22px"
                                                    onClick={() => setPasswordShown(true)}
                                                />
                                        }
                                    </div> */}