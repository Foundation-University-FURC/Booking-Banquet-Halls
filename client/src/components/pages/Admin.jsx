import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import img from "../images/marriage11.jfif";
import Footer from "./Footer"
const Admin = () => {
  return (
    <>

      <div className="display my-5">
        <div className="information">
          <h2 className="fonttt">Admin Dashboard </h2>
          <p>
            A good venue will serve as the best decision in making<br></br> the
            whole ceremony more comfortable and enjoyable. And, when <br></br>it
            comes to offering great spaces for wonderful occasions,<br></br>
            Shree Ram Marriage Hall and Convention is a popular choice.
          </p>
          <h6>
            Cell : <span>+92338978787</span>
          </h6>
          <h6>
            Timing : <span>12 to 10 PM </span>
          </h6>
        </div>
        <div className="imag">
          <img src={img} width="500px"></img>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Admin;
