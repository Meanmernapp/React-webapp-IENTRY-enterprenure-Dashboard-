// const production = "https://examplePage.com";
// const development = "http://localhost:3000";
// export const URL =
//     process.env.NODE_ENV === "development" ? development : production;
export const URL = "http://182.176.161.38:8080/corporate-user-pre-prod-v1/";
export const COMPANY_DATA_URL = `${URL}company-service/`;
export const COMPANY_RESTUCTION_URL = `${URL}company-service/company-restriction/`;

export const endpoints = {
    /* AUTH */
    TOKEN: "token",
    LOGIN: "authentication-service/log-in-web-app",
    // EMPLOYEE
    CREATEEMPLOYEE: "create",
    // COMPANY DATA
    CREATECOMPANYDATA: "create",
    UPDATECOMPANYDATA: "update",
    GETCOMPANYDATA: "get-by-id/",
    GETALLCOMPANIESDATA: "get-all/",
    GETCOMPANYRESTRUCTIONS: "get-by-company-id/",
    UPDATECOMPANYRESTRUCTIONS: "update",
    UPDATECOMPANYIMG: "image-service/upload",
    GETCOMPANYIMG: "image-service/upload"


};
