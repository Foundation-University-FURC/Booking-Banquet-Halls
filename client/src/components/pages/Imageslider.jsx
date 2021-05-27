import react from "react";
import img1 from "../images/explore.png";
import img2 from "../images/enquiry.png";
import img3 from "../images/visit.png";
import img4 from "../images/booking.png";
import logo from "../images/logo2.png";

const Imageslider =()=>{
    return(
        <>

<div className="container-fluid padding my-auto">
<div className="row welcome text-center">
{/* <div className="col-12">
<a className="navbar-brand" href="#">
          <img src={logo} alt="logo pic" style={{width:"60%"}} />
        </a>
<h5 className="work" style={{color:"green"}}>EventHub.pk</h5>
</div> */}

<div className="col-12">
<a className="navbar-brand" href="#">
          <img src={logo} alt="logo pic" style={{width:"60%"}} />
        </a>
<h1> How It Works</h1>
</div>
</div>
</div>

<div className="container-fluid mt-3 mx-auto">
<div className="row padding text-center work2">
<div className="col-md-6 col-sm-12 col-lg-3 work1">
<img className="work_img" style={{width:"65px"}} src={img1} alt = "Explore" />
<h4 className="work"> Explore </h4> 
<p className="work"> Explore and Compare from hundreds of venue options.</p>
</div>
<div className="col-md-6 col-sm-12 col-lg-3 work1">
<img className="work_img" style={{width:"77px"}} src={img2} alt = "Enquiry" />
<h4 className="work"> Enquiry </h4> 
<p className="work"> Enquire about their availablity</p>
</div>
<div className="col-md-6 col-sm-12 col-lg-3 work1">
<img className="work_img" style={{width:"65px"}} src={img3} alt = "Visit" />
<h4 className="work">  VISIT VENUES  </h4> 
<p className="work">  Visit venues and taste their food</p>
</div>
<div className="col-md-6 col-sm-12 col-lg-3 work1">
<img className="work_img" style={{width:"65px"}} src={img4} alt = "Booking" />
<h4 className="work">  BOOKING  </h4> 
<p className="work"> Make first payment to EventHub.pk to confirm your booking </p>
</div>
</div>

</div>

    </>
    );
}


export default Imageslider;