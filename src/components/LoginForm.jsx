
import { useEffect, useState } from 'react';
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tokenIcon from '../assets/images/ic-key.svg'
import BounceLoader from "react-spinners/BounceLoader";
import { getToken } from '../Apis/Authentication';
import { toast } from 'react-toastify';
import { loginMiddleware } from '../reduxToolkit/authentication/authenticationSlice';
import { override } from '../Helpers/spinnercss';

const LoginForm = () => {
    const [loading, setLoading] = useState(false)
    const params = new URLSearchParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    const { user } = useSelector((state) => state.userData);


    useEffect(() => {

    }, [])

    const validate = values => {
        const errors = {}
        // if (!values.email) {
        //     errors.email = 'Required'
        // } else if (values.email.length < 4) {
        //     errors.email = 'Must be 5 characters or more'
        // }

        // if (!values.password) {
        //     errors.password = 'Required'
        // } else if (values.password.length < 8) {
        //     errors.password = 'Must be 8 characters or more'
        // } else if (values.password === '12345678') {
        //     errors.password = 'Must not be 12345678 !!!'
        // }

        // if (!values.repassword) {
        //     errors.repassword = 'Required'
        // } else if (values.repassword !== values.password) {
        //     errors.repassword = 'Second password doesn\'t match'
        // }

        return errors
    }
    const formik = useFormik({

        initialValues: {
            email: '',
            password: '',
            code: ''
        },
        validate,
        onSubmit: (values) => {
            setLoading(true);
            params.append('email', values.email)
            params.append('password', values.password)
            params.append('code', values.code)
            getToken(params).then(({ data: data }) => {
                sessionStorage.setItem("bearerToken", data.access_token);
                dispatch(loginMiddleware(values));
                // if (user.data) {
                setLoading(false);
                navigate('/login-option');
                // }
            }).catch(error => {
                toast.error("something went wrong.")
            })
        }

    })

    return (
        <div className='loginForm'>
            {
                <form onSubmit={formik.handleSubmit}>
                    <div className='inputMain'>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder='email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email} />
                        <i className="fa fa-envelope-o fa-fw" aria-hidden="true"></i>
                    </div>
                    {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
                    <div className='inputMain'>
                        <input
                            id="password"
                            name="password"
                            type={passwordShown ? "text" : "password"}
                            placeholder='password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password} />
                        <i
                            className={passwordShown ? "bi bi-eye" : "bi bi-eye-slash"}
                            aria-hidden="true"
                            onClick={() => setPasswordShown(!passwordShown)}
                        ></i>
                    </div>
                    {formik.touched.password && formik.errors.password ? <div className='error'>{formik.errors.password}</div> : null}
                    <div className='inputMain'>
                        <input
                            id="code"
                            name="code"
                            type="text"
                            placeholder='code'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.code} />
                        <img src={tokenIcon} alt="keyimg" />
                    </div>
                    {formik.touched.code && formik.errors.code ? <div className='error'>{formik.errors.code}</div> : null}
                    <button type="submit" className='signinBtn'>
                        {
                            loading ? <BounceLoader loading="true" css={override} size={15} /> : "sign in"
                        }
                    </button>
                </form>
            }
        </div>
    )
}

export default LoginForm;