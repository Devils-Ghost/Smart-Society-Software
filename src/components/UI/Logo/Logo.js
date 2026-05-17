import React from "react";
import classes from "./Logo.module.css";
import ss_logo from "../../../assets/logos/logo.jpg";

const logo = (props) => (
  <div className={classes.Logo} onClick={props.clicked}>
    <img src={ss_logo} alt="Smart Society" />
  </div>
);

export default logo;
