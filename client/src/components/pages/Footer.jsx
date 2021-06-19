import react from "react";
// import img1 from "../src/images/explore.png";
import logo from "../images/Logo_F.PNG";
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { NavLink } from "react-router-dom";


const Footer =()=>{
    return(
        <>

<footer>
<div className="container">
<div className="row">
<div className="col-lg-6">

<div className="row padding">
<div className="col-lg-12 col-md-12 col-sm-12 mt-2 footerlogo">
{/* <img className="footerlogo" src={logo} alt="LOGO"></img> */}
<h1 className="fonttt2">Event<span style={{color:"#DC143C"}}>HUB</span></h1>
</div>
<hr className="light2"/>
<div className="col-12">
<p className="fonttt2">
EventHub is first online event booking engine of Pakistan, facilitating customers to find Halls & Venue of their choice and place bookings. 
<div className="mt-3">
<a href="#"><span><FacebookIcon fontSize="large" /></span></a>
<a href="#"><span><InstagramIcon fontSize="large" style={{color:"#bc2a8d"}} /></span></a>
<a href="#"><span><LinkedInIcon fontSize="large" /></span></a>
<a href="#"><span><TwitterIcon fontSize="large" /></span></a>
<a href="#"><span><YouTubeIcon fontSize="large"  fontSize="large" style={{color:"red"}}/></span></a>
</div>
</p>
</div>
</div>

</div>


<div className="col-lg-6">
<div className="row padding mt-2" style={{textAlign:"center"}}>
<div className=" col-lg-6">
<div>
   <h3>Support</h3> 
   <ul>
      <NavLink to ="/"><li>Home</li> </NavLink>
      <NavLink to ="/"><li>Search</li> </NavLink>
      {/* <NavLink to="/ContactUs"><li>About Us</li> </NavLink> */}
      <NavLink to="/ContactUs"><li>Contact Us</li> </NavLink>
   </ul>
</div>
</div>
<div className=" col-lg-6">
<div>
   <h3>Get In Touch</h3> 
    <p><PhoneIcon  />+923041840736</p>
   <p><EmailIcon />info@eventhub.com</p>
   <p><LocationOnIcon />Foundation University Islamabad Pakistan</p>
</div>
</div>

</div>

</div>


<p className="col-12">
<hr className="light-100" />
<h5 style={{textAlign:"center"}}>&copy; eventhub.com </h5>
{/* <a href="#"><span><FacebookIcon fontSize="large" /></span></a>
<a href="#"><span><InstagramIcon fontSize="large" style={{color:"#bc2a8d"}} /></span></a>
<a href="#"><span><LinkedInIcon fontSize="large" /></span></a>
<a href="#"><span><TwitterIcon fontSize="large" /></span></a>
<a href="#"><span><YouTubeIcon fontSize="large"  fontSize="large" style={{color:"red"}}/></span></a> */}
</p>

</div>

</div>

</footer>

    </>
    );
}


export default Footer;