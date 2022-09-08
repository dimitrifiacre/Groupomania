import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./app/store";

// Axios config
axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);