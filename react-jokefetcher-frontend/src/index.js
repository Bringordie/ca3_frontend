import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import apiFetchFacade from "./apiFetchFacade";
import authFacade from "./authFacade";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App authFacade={authFacade} apiFetchFacade={apiFetchFacade} />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
