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
<div className="container-fluid padding">
<div className="row text-center mx-4 mt-2">
<div className="col-lg-6">

<div className="row padding">
<div className="col-lg-12 col-md-12 col-sm-12 footerlogo">
<img className="footerlogo" src={logo} alt="LOGO"></img>
</div>
<hr className="light"/>
<div className="col-12">
<p className="Pfooter">
EventHub is first online event booking engine of Pakistan, facilitating customers to find Halls & Venue of their choice and place bookings.   
</p>
</div>
</div>




</div>
<div className="col-lg-6">
<div className="row padding my-5">
<div className=" col-lg-4">
<div>
   <u><h3>Main Menu</h3> </u>
   <ul>
      <a><li>Home</li> </a>
      <a><li>Search</li> </a>
      <a><li>Partners Program</li> </a>
      <a><li>Blog</li> </a>
   </ul>
</div>
</div>
<div className=" col-lg-4">
<div>
   <u><h3>Support</h3> </u>
   <ul>
      <NavLink to="/ContactUs"><li>About Us</li> </NavLink>
      <NavLink to="/ContactUs"><li>Contact Us</li> </NavLink>
      <a><li>Terms & Conditions</li> </a>
      <a><li>Privacy Policy</li> </a>
   </ul>
</div>
</div>
<div className=" col-lg-4">
<div>
   <u><h3>Get In Touch</h3> </u>
    <p><PhoneIcon  />+92-51-8466686</p>
   <p><EmailIcon />info@eventhub.com</p>
   <p><LocationOnIcon />F-11 Markaz Islamabad Pakistan</p>
</div>
</div>

</div>

</div>


<p className="col-12">
<hr className="light-100" />
<h5>&copy; eventhub.com </h5>
<a href="#"><span><FacebookIcon fontSize="large" /></span></a>
<a href="#"><span><InstagramIcon fontSize="large" style={{color:"#bc2a8d"}} /></span></a>
<a href="#"><span><LinkedInIcon fontSize="large" /></span></a>
<a href="#"><span><TwitterIcon fontSize="large" /></span></a>
<a href="#"><span><YouTubeIcon fontSize="large"  fontSize="large" style={{color:"red"}}/></span></a>
</p>

</div>

</div>

</footer>

    </>
    );
}


export default Footer;