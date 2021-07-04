import React from "react";
import logo from "../images/logo5.png";
import logo2 from "../images/logoNew_2.png";
import img from "../images/marriage8.jfif";
// import img4 from "../images/marriage10.jfif";
import gif1 from "../images/wedding_023.gif";
import gif2 from "../images/Wedding_024.gif";
import gif3 from "../images/Wedding_025.gif";
import gif4 from "../images/Wedding_026.gif";
import saveMoney from "../images/saveTime.jfif";
import nocard from "../images/nocard.jfif";
import nocharges from "../images/nocharges.png";
import Imageslider from './Imageslider';
import Carousel from './Carousel';
import Carousel_why from './Carousel_why';
import {Parallax} from 'react-parallax';
import Style from './Style'
import Categories from './Categories';
import Categories_content from './Categories_content';
import Cities from './Cities';
import Footer from './Footer';
import ChatBox from "./ChatBox";
import { useSelector } from "react-redux";



const Navbar = (props) =>{

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
 
    return (
        <> 


{/* front Image with Search bar */}
<Carousel />


{/* How It works */}

<Imageslider />


{/* Welcome section */}
<div className="container-fluid padding my-auto">
<div className="row welcome text-center">
<div className="col-12">
<a className="navbar-brand" href="#">
          <img src={logo2} alt="logo pic" style={{width:"60%"}} />
        </a>
<h1> OUR CATEGORIES</h1>
</div>
</div>
</div>
<div className="container mb-5">
<div className="row">
{/* <div className="col-4 col-sm-12"> */}

{
    Categories_content.map((val,i)=>{
         return  <Categories
            key={i}
            i={val.image}
            t={val.text}
/>
     })
 }

 {/* </div> */}

</div>

</div>
 
<br/>
<br/>
{/* Fixed Bg image */}

<Parallax className="parallex">
<div style={{height:"100%"}}>
<div className="container-fluid">
<div className="row padding">
<div className="col-12">
<h1 className="feature"><span style={{backgroundColor:"rgba(65, 62, 62, 0.514)"}}> EVENTHUB.pk FEATURES </span></h1>
</div>
</div>

<div className="row padding work2 text-center feat">
<div className="col-xs-12 col-sm-6 col-md-4">
<img className="features fthover" src={saveMoney} alt=" Save Time and Money" />
<h3>SAVE YOUR TIME & MONEY!</h3>
<p>EventHub.pk guarantee you exclusive deals and the most sought after packages at the best prices; what you do with all those savings is totally up to you.</p>
</div>
<div className="col-xs-12 col-sm-6 col-md-4">
<img className="features fthover" src={nocard} alt=" No online payment" />
<h3>NO ONLINE PAYMENT!</h3>
<p>No online payment required for booking the venue. You can pay the amount directly to Our Support team will guide you in complete booking procedure.</p>
</div>
<div className="col-xs-12 col-sm-12 col-md-4">
<img className="features fthover" src={nocharges} alt=" No Charges" />
<h3>No Charges on Booking, it's FREE !</h3>
<p>We bring for you venues complete packages for Wedding, Birthday or any other event. From Venues to Menus, be it viewing and booking? is completely FREE along with offered.</p>
</div>

</div>

</div>


</div>
</Parallax>
<br/>
<br/>




{/* Meet the team */}
<br />


{/* Card sections */}

<Cities />

<Style />

{/* <hr className="my-4" /> */}

<Carousel_why />


{/* <div className="container">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>All right reserved</div> this line is comment
        </div> */}


{/* Footer Section */}
<Footer />


        </>
    );
}




export default Navbar;