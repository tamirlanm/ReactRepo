import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";
import { Provider } from "react-redux";
import App from "./App";
import AuthProvider from "./context/AuthProvider";
import { store } from "./store/store";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);