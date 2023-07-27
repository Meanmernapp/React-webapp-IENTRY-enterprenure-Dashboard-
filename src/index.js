import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./reduxToolkit/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import theme from "./muiTheme/theme";
import { ThemeProvider } from "@mui/material";
let persistor = persistStore(store);

store.subscribe(() => console.log(store.getState()));

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "sp", "fr", "ar"],
    fallbackLng: "en",
    debug: false,
    // Options for language detector
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

const loadingMarkup = (
  // <div className="py-4 text-center">
  //   <h3>Loading..</h3>
  // </div>
  <>

  </>
);

ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <BrowserRouter>
        <Provider {...{ store }}>
          <ThemeProvider theme={theme}>
            <PersistGate loading={null} persistor={persistor}>
              <App />
            </PersistGate>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  </Suspense>,
  document.getElementById("root")
);
reportWebVitals();
