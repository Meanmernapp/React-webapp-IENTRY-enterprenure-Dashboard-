import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";

import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/react";

import DashboardRoutes from "./DashboardRoutes";

const override = css`
  display: flex;
  justify-content: center;
  margin: 10% auto;
  border-color: #26786c;
`;

const App = () => {
  return (
    <>
      <Suspense fallback={<BounceLoader loading="true" css={override} size={50} />}>
        <DashboardRoutes />
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
