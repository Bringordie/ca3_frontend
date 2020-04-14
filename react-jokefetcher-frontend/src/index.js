import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import jokeFacade from "./jokeFacade";
import scrapeFacade from "./scrapeFacade";
import authFacade from "./authFacade";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App
        authFacade={authFacade}
        jokeFacade={jokeFacade}
        scrapeFacade={scrapeFacade}
      />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
