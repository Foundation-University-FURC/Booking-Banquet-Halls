import React from "react";
import img2 from "../images/marriage11.jfif";
import img3 from "../images/marriage5.jfif";
import img1 from "../images/marriage3.jfif";
import img4 from "../images/header_image1.jfif";
import img5 from "../images/header_image2.jfif";
import img6 from "../images/header_image3.jfif";
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel'
import SearchBox from "./SearchBox";

const Carousel1=()=>{
    return(
        <>


<div className="venue-main">
<div className="container-main">
<div className="row">
<div className="col-sm-12">
<h1 className="cheese-main text-center">EventHub Booking</h1>
<p className="scroll-main" > Booking Memories</p>
</div>
</div>

{/* search Filter below */}
<div>
<Switch>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
</Switch>
          </div>

</div>
</div>

        </>
    );
}

export default Carousel1