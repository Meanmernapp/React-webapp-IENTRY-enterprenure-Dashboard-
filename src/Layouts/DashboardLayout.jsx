// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { Outlet, useLocation } from "react-router-dom";
// import bg from "../assets/images/building_2.png";
// import securekey from "../config";
// import SideBar from "../pages/Dashboard/SideBar";
// import {
//   companyRestrictions,
//   getAllEmployees,
// } from "../reduxToolkit/EmployeeEvents/EmployeeEventsApi";
// import cryptoJs from 'crypto-js';
// const DashboardLayout = () => {
//   const companyId = "a6bd2887-0f4a-4e5f-b0b5-000d9817ab23";

//   const [profilebgImage, setProfilebgImage] = useState(false);

//   const dispatch = useDispatch();
//   const location = useLocation();


//   const token = sessionStorage.getItem('bearerToken');
//   const bytes = cryptoJs.AES.decrypt(token, securekey)
//   const isAuthenticated = bytes.toString(cryptoJs.enc.Utf8);
//   const [isMenuOpen , setIsMenuOpen]= useState(true)
//   // to setProfilebgimage for profile
//   useEffect(() => {
//     if (
//       location?.pathname == "/dashboard/supplier/profile" ||
//       location?.pathname == "/dashboard/employee/profile" ||
//       location?.pathname == "/dashboard/contractor/profile"
//     ) {
//       setProfilebgImage(true);
//     } else {
//       setProfilebgImage(false);
//     }
//   }, [location.pathname]);

//   // dispatch api
//   useEffect(() => {
//     // checkAutoLogin(navigate);
//     if (isAuthenticated) {
//       dispatch(companyRestrictions(companyId));
//       dispatch(getAllEmployees());
//     }
//   }, [isAuthenticated]);

//   return (
//     <div
//       className="container-fluid"

//       style={{
//         background:profilebgImage ? "black" : "",
//         position: profilebgImage ? "absolute" : "",
//         width: profilebgImage ? "100%" : "",
//         height: profilebgImage ? "100%" : "",
//       }}
//     >
//       <div >
//         {
//           profilebgImage &&
//           <img src={bg} alt="img"
//             style={{ position: "absolute", width: "100%", height: '100%', opacity: "0.3" }}
//           />
//         }
//       <div className="row">

//         <div
//           className={`${isMenuOpen ? "col-md-2" : ""} p-0`}
//           style={{
//             zIndex: "1",
//             width:isMenuOpen ? "100%":"3.15rem"
//           }}
//         >
//           <div 
//           className="position-fixed"
//           >
//             <SideBar 
//             isMenuOpen={isMenuOpen}
//             setIsMenuOpen={setIsMenuOpen}

//             />
//           </div>
//         </div>
//         <main className={`${isMenuOpen ? "col-md-10" :"col-md-11"}`}
//         style={{ margin:"0 auto" , zIndex:"0" }}
//         >
//           <Outlet />
//         </main>
//       </div>
//       </div>
//       </div>

//   );
// };

// export default DashboardLayout;


// testing purpose
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import bg from "../assets/images/building_2.png";
import securekey from "../config";
import SideBar from "../pages/Dashboard/SideBar";
import { Container, Grid, Paper } from '@material-ui/core';
import {
  companyRestrictions,
  getAllEmployees,
} from "../reduxToolkit/EmployeeEvents/EmployeeEventsApi";
import cryptoJs from 'crypto-js';
const DashboardLayout = () => {
  const companyId = "a6bd2887-0f4a-4e5f-b0b5-000d9817ab23";

  const [profilebgImage, setProfilebgImage] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();


  const token = sessionStorage.getItem('bearerToken');
  const bytes = cryptoJs.AES.decrypt(token, securekey)
  const isAuthenticated = bytes.toString(cryptoJs.enc.Utf8);
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  // to setProfilebgimage for profile
  useEffect(() => {
    if (
      location?.pathname == "/dashboard/supplier/profile" ||
      location?.pathname == "/dashboard/employee/profile" ||
      location?.pathname == "/dashboard/contractor/profile"
    ) {
      setProfilebgImage(true);
    } else {
      setProfilebgImage(false);
    }
  }, [location.pathname]);

  // dispatch api
  useEffect(() => {
    // checkAutoLogin(navigate);
    if (isAuthenticated) {
      dispatch(companyRestrictions(companyId));
      dispatch(getAllEmployees());
    }
  }, [isAuthenticated]);

  return (
    <div
      className=""

      style={{
        background:profilebgImage ? "black" : "",
        position: profilebgImage ? "absolute" : "",
        width: profilebgImage ? "100%" : "",
        height: profilebgImage ? "100%" : "",
      }}
    >
      <div >
        {
          profilebgImage &&
          <img src={bg} alt="img"
            style={{ position: "absolute", width: "100%", height: '100%', opacity: "0.3" }}
          />
        }
      <div className="d-flex ">

        <div
          className={`${isMenuOpen ? "" : ""} `}
          style={{
            zIndex: "1",
            // width:isMenuOpen ? "":"3.15rem"
          }}
        >
          <div 
          className="position-fixed"
          >
            <SideBar 
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}

            />
          </div>
        </div>
        <main className={`${isMenuOpen ? "" :""}`}
        style={{ 
          // margin:"0 auto" ,
          width:"100%",
          paddingLeft:isMenuOpen ? "13.5rem" :"3.15rem",
         zIndex:"0" }}
        >
          <div className="pl-3 pr-3">
          <Outlet />
          </div>
        </main>
      </div>
      </div>
      </div>

      // <Grid container>
      //   <Grid item  sx={{ position: 'sticky', top: 0, left: 0, width: '3.15rem', backgroundColor: 'primary.main', height: '100vh' }}>
      //     <SideBar
      //       isMenuOpen={isMenuOpen}
      //       setIsMenuOpen={setIsMenuOpen}
      //     />
      //   </Grid>
      //   <Grid item xs sx={{ flexGrow: 1, p: 2 }}>
      //     <Outlet />
      //   </Grid>
      // </Grid>
  
  );
};

export default DashboardLayout;






