import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/Context";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback="Loading...">
          <App />
        </Suspense>
      </I18nextProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
