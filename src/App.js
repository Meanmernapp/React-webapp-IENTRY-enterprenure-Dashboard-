import React, { useEffect } from "react";
import { ToastContainer, Slide, toast } from "react-toastify";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MainRoutes from "./Routes/MainRoutes";
import jwt from 'jwt-decode'
import { useNavigate, useLocation } from "react-router-dom";
import { logOut } from "./reduxToolkit/authentication/authenticationSlice";
import { useDispatch, useSelector } from "react-redux";
import { RoleCheck } from "./reduxToolkit/authentication/AuthenticatonApi";
import cryptoJs from 'crypto-js';
import securekey from "./config";

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation();



  const Etoken = sessionStorage.getItem('bearerToken') || "";
  const bytes = cryptoJs.AES.decrypt(Etoken, securekey)
  const token = bytes.toString(cryptoJs.enc.Utf8);


  // const user = JSON.parse(sessionStorage.getItem("userdata"))?.data?.data;

  const userdata = sessionStorage.getItem('userdata');

  const bytess = cryptoJs.AES.decrypt(userdata || "", securekey)
  const userstring = bytess.toString(cryptoJs.enc.Utf8);
  const user = userstring ? JSON.parse(userstring)?.data?.data : ""

  console.log(location)




  //this useEffect will always monitor the token validation
  useEffect(() => {
    if (token) {
      const tokeninfo = jwt(token)
      const expireDate = tokeninfo?.exp * 1000
      const currentDate = new Date()
      // const currentDate = new Date("11/21/2035 16:00:00")

      if (expireDate < currentDate.getTime()) {
        toast.error("Token is Expired")
        dispatch(logOut())
        navigate('/')
      }
    }
  })
  // this useEffect to redirect auth user to page
  useEffect(() => {
    if (token && location.pathname == "/" && user) {
      navigate('/login-option')
    }

  }, [])

  // it will check the token and call api to fetch 
  // the premmission at entry point

  useEffect(() => {
    if (token) {
      const tokeninfo = jwt(token)
      const data = {
        roleId: tokeninfo?.role_id
      }
      dispatch(RoleCheck(data))
    }
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <MainRoutes />
      <ToastContainer position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        transition={Slide}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </DndProvider>
  );
};

export default App;
