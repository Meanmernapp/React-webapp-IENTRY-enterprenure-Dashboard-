import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Apis/Authentication";
import bglogout from "../../assets/images/bglogout.png";
import logouticon from "../../assets/images/logouticon.svg";
import { RoleCheck } from "../../reduxToolkit/authentication/AuthenticatonApi";
import { GetByUserId } from "../../reduxToolkit/Contractor/ContractorApi";
import { GetUserDocumentsEmployee } from "../../reduxToolkit/EmployeeProviders/EmployeeProvidersApi";
import { GetProvidersByUserId, GetUserDocuments } from "../../reduxToolkit/Providers/providersApi";

const LoginOption = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = [1, 2]

    const token = sessionStorage?.getItem("bearerToken") || ""
    const { user } = useSelector(state => state.authenticatioauthennSlice);
    console.log(user)
    console.log(user?.data?.userType?.name == "EMPLOYEE", user?.data?.status?.id != 3)

    const { getProvidersByUserId } = useSelector(state => state.providersSlice);
    localStorage.setItem("providerId", getProvidersByUserId?.id)
    console.log(getProvidersByUserId)

    useEffect(() => {
        if (token) {
            const tokeninfo = jwtDecode(token)
            console.log(tokeninfo)
            const data = {
                roleId: tokeninfo?.role_id
            }
            dispatch(RoleCheck(data))
        }
    }, [])

    useEffect(() => {

        const userType = user?.data?.userType?.name
        if (userType == "PROVIDER_IN_CHARGE") {
            const data = {
                userId: user?.data?.id
            }
            dispatch(GetProvidersByUserId(data))
            dispatch(GetUserDocuments(user?.data?.id))
            localStorage.setItem("providerId", getProvidersByUserId?.id || user?.data?.id)
        }
        if (userType == "CONTRACTOR_IN_CHARGE") {
            dispatch(GetByUserId(user?.data?.id))

        }
        if (userType == "EMPLOYEE") {
            dispatch(GetUserDocumentsEmployee(user?.data?.id))

        }


    }, [user?.data?.id])

    return (
        <>
            <div className="home_bg_m">
                <div className="p-3 logout_m d-flex">
                    <img src={logouticon} alt="logout_img" />
                    <span onClick={() => logoutUser(navigate, dispatch)}>LOG OUT</span>
                </div>
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <div className="card loginop_card ">
                            <h3>CHOOSE A COMPANY</h3>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-5">
                                        <div className="mb-4 card loginop_child_card ">
                                            <Link


                                                to={
                                                    // for employee
                                                    user?.data?.status?.id == 3 && user?.data?.userType?.name == "EMPLOYEE" && "/dashboard/employee/company/user-Documents" ||
                                                    user?.data?.status?.id != 3 && user?.data?.userType?.name == "EMPLOYEE" && "/dashboard/employee/company" ||
                                                    // for provider
                                                    user?.data?.status?.id == 3 && user?.data?.userType?.name == "PROVIDER_IN_CHARGE" && "/dashboard/supplier/user-Documents" ||
                                                    user?.data?.status?.id != 3 && user?.data?.userType?.name == "PROVIDER_IN_CHARGE" && "/dashboard/supplier/orders" ||
                                                    // for contractor
                                                    user?.data?.status?.id == 3 && user?.data?.userType?.name == "CONTRACTOR_IN_CHARGE" && "/dashboard/contractor/contracts/user-Documents" ||
                                                    user?.data?.status?.id != 3 && user?.data?.userType?.name == "CONTRACTOR_IN_CHARGE" && "/dashboard/contractor/contracts"

                                                }
                                            >
                                                <div className="p-2">
                                                    <img
                                                        src={bglogout}
                                                        className=" img-fluid w-100"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="text-center login_crad_body ">
                                                    <p>COMPANY</p>
                                                    <h6>
                                                        <span>IBL |</span> Intelligence Bureau
                                                        Laboratory
                                                    </h6>
                                                    <p className="pt-2">ROLE</p>
                                                    <h6>Contractor</h6>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="col-lg-5">
                                        <div className="mb-4 card loginop_child_card ">
                                            <Link
                                                to={
                                                    // for employee
                                                    user?.data?.status?.id == 3 && user?.data?.userType?.name == "EMPLOYEE" && "/dashboard/employee/company/user-Documents" ||
                                                    user?.data?.status?.id != 3 && user?.data?.userType?.name == "EMPLOYEE" && "/dashboard/employee/company" ||
                                                    // for provider
                                                    user?.data?.status?.id == 3 && user?.data?.userType?.name == "PROVIDER_IN_CHARGE" && "/dashboard/supplier/user-Documents" ||
                                                    user?.data?.status?.id != 3 && user?.data?.userType?.name == "PROVIDER_IN_CHARGE" && "/dashboard/supplier/orders" ||
                                                    // for contractor
                                                    user?.data?.status?.id == 3 && user?.data?.userType?.name == "CONTRACTOR_IN_CHARGE" && "/dashboard/contractor/contracts/user-Documents" ||
                                                    user?.data?.status?.id != 3 && user?.data?.userType?.name == "CONTRACTOR_IN_CHARGE" && "/dashboard/contractor/contracts"

                                                }
                                            >
                                                <div className="p-2">
                                                    <img
                                                        src={bglogout}
                                                        className=" img-fluid w-100"
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="text-center login_crad_body ">
                                                    <p>COMPANY</p>
                                                    <h6>
                                                        <span>IBL |</span> Intelligence Bureau
                                                        Laboratory
                                                    </h6>
                                                    <p className="pt-2">ROLE</p>
                                                    <h6>Contractor</h6>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* {
                                        users.map(item => (
                                            <div className="col-lg-5" key={item}>
                                                <div className="mb-4 card loginop_child_card ">
                                                    <a href="/dashboard/company">
                                                        <div className="p-2">
                                                            <img
                                                                src={bglogout}
                                                                className=" img-fluid w-100"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="text-center login_crad_body ">
                                                            <p>COMPANY</p>
                                                            <h6>
                                                                <span>IBL |</span> Intelligence Bureau
                                                                Laboratory
                                                            </h6>
                                                            <p className="pt-2">ROLE</p>
                                                            <h6>General Employee</h6>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        ))
                                    } */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginOption;
