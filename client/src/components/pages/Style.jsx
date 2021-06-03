import React from 'react'
import img7 from "../images/marriage14.jfif";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EventIcon from '@material-ui/icons/Event';
import {Parallax} from 'react-parallax';
import img5 from "../images/marriage7.jfif";
import img6 from "../images/marriage6.jfif";

const Style = () => {
    const inlineStyle1={
        background: '#fff',
        left:'50%',
        top: '50%',
        position: 'absolute',
        padding: '20px',
        transform: 'translate(-50%,-50%)',
    }
    
    return (
        <>
         
<hr /> 
<br/>
{/* Two column section */}

<Parallax className="parallex1" bgImage={img7} strength={500}>
<div style={{height:"800"}}>
<div style={{inlineStyle1}}>
    {/* Html inside Parallax */}

<div className="container-fluid">
<div className="row padding">
<div className="col-lg-6 col-md-6 col-sm-12">
<img className="Tcsimg" src={img5} alt="Style Image" ></img>
</div>

<div className="col-lg-6 col-md-6 col-sm-12 mt-5">
<div className="tcs1">
<h2> Wedding Dinner</h2>
<p>
Duis aute irure dolor reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem Duis aute irure dolor reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
<h4> <span><EventIcon fontSize="small" style={{color:"white"}}></EventIcon></span> March 20 2017</h4>
<h4> <span><AccessTimeIcon fontSize="small" style={{color:"white"}}></AccessTimeIcon></span> 12.00pm to 2.00pm</h4>

</div>
</div>


</div>

<div className="row padding">
<div className="col-lg-6 col-md-6 col-sm-12">

<div className="tcs">

<h2 >Wedding Ceremony</h2>
<p>
Duis aute irure dolor reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem Duis aute irure dolor reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</p>
<h4> <span><EventIcon fontSize="small" style={{color:"white"}}></EventIcon></span> March 20 2017</h4>
<h4>  <span><AccessTimeIcon fontSize="small" style={{color:"white"}}></AccessTimeIcon></span> 10.00am to 12.00pm</h4>
</div>

</div>

<div className="col-lg-6 col-md-6 col-sm-12">
<img className="Tcsimg1" src={img6} alt="Style Image" ></img>
</div>

</div>

</div>




{/* <div className="container-fluid padding mx-auto">
<div className="row padding">
<div className="col-lg-6 col-md-6">
<div className="row">
<div className="col-md-12 col-sm-12 col-12">
<img className="Tcsimg" src={img5} alt="" ></img>
</div>
<div className="col-md-12 col-sm-12 col-12 ">
<div className="tcs1">
<h2> Wedding Dinner</h2>
<p>
Duis aute irure dolor reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem Duis aute irure dolor reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
<h4> <span><EventIcon fontSize="small" style={{color:"white"}}></EventIcon></span> March 20 2017</h4>
<h4> <span><AccessTimeIcon fontSize="small" style={{color:"white"}}></AccessTimeIcon></span> 12.00pm to 2.00pm</h4>

</div>
</div>

</div>
</div>
<div className="col-lg-6 col-md-6">
<div className="row">
<div className="col-md-12 col-sm-12 col-12">
<div className="tcs">

<h2 >Wedding Ceremony</h2>
<p>
Duis aute irure dolor reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem Duis aute irure dolor reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
</p>
<h4> <span><EventIcon fontSize="small" style={{color:"white"}}></EventIcon></span> March 20 2017</h4>
<h4>  <span><AccessTimeIcon fontSize="small" style={{color:"white"}}></AccessTimeIcon></span> 10.00am to 12.00pm</h4>
</div>
</div>
<div className="col-md-12 col-sm-12 col-12 my-3">
<img className="Tcsimg1" src={img6} alt="" ></img>
</div>

</div>
</div>
</div>

</div> */}

</div>
</div>
</Parallax>   
        </>
    )
}

export default Style