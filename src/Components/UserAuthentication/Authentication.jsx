import React from "react";
import { Outlet } from "react-router-dom"; // Outlet will render the nested route components
// import '../App.css'

const Authentication = () => {
  
  return (
    <div className="root container-fluid">
      <div className="row flex-column flex-md-row">
        <div className="left col-md-6 grad-bgc d-flex flex-column">
          <div className="logo-cover ">
            <img
              src={"/images/logo.png"}
              alt="logo"
              className="w-60"
              width="70"
            />
          </div>
          <div className="welcome-text fade-in-down">
            <div className="one">Welcome.</div>
            <div className="two">
              Begin Your cinematic adventure now with our ticketing platform
            </div>
          </div>
        </div>
        <div className="right col-md-6">
          <div className="container col-12 col-md-7">
            <div className="heading">
              <Outlet /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;

