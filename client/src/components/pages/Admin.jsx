import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import img from "../images/marriage11.jfif";
import Footer from "./Footer"
const Admin = () => {
  return (
    <>

      <div className ="container">
        <div className="row padding">
            <div className ="col-lg-6 col-md-6 col-sm-12">
            <div className="display my-5">
        <div className="information">
          <h2 className="fonttt">Admin Dashboard </h2>
          <div>
          <p className="container-fluid ml-2">
            A good venue will serve as the best decision in making the
            whole ceremony more comfortable and enjoyable. And, when it
            comes to offering great spaces for wonderful occasions,
            Shree Ram Marriage Hall and Convention is a popular choice.
          </p>
          </div>
          <p>
            Cell : <span>+92338978787</span>
          </p>
          <p>
            Timing : <span>12 to 10 PM </span>
          </p>
        </div>
            </div>
        </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="image-dash">
          <img src={img} alt ="Dashboard image"></img>
        </div>
          </div> 

      </div>
      
      </div>

      <Footer />
    </>
  );
};
export default Admin;
