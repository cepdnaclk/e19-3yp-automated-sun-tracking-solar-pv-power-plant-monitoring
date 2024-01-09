import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";

axios.defaults.baseURL = "http://localhost:8081/api";
// set default fallback methode when unauthorized
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      // send refresh token to server
      const refreshToken = localStorage.getItem("refreshToken");
      axios
        .post("/api/login/token", { refreshToken })
        .then((res) => {
          // set token, refresh token and username in local storage
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          localStorage.setItem("username", res.data.username);

          // set token in axios header
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.accessToken;

          // retry request
          return axios(err.config);
        })
        .catch((err) => {
          // redirect to login page
          window.location.href = "/login?error=Login%20expired";
        });
    }
    return Promise.reject(err);
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
