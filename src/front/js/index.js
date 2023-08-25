//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
//include primereact library into the bundle
import "../styles/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import '/workspaces/gaha20-the-last-project/src/front/styles/index.css';
//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
