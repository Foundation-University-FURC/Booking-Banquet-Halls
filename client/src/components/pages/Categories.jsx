import React from "react";
import { NavLink } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import Venues_Gujrat from './Venues_gujrat';

const Categories=(props)=>{
    
    return(
        <>

{/* <div className="container categories">
   <div className="catcards">
        <div className="cattest">
        <img className="catimg imagd" src={props.i}  alt="imag" />
          <NavLink to={props.t}><span className="catspan">{props.t}</span> </NavLink>
          <div className='catvl' ></div>
            <div className='catv1' ></div>
            <div className="cathl"></div>
            <div className="cath1"></div>
            </div>
            </div>    
            </div> */}

    {/* <div className="container categories"> */}
    {/* <div className=""> */}
        <div className="col-lg-4 col-md-4 col-sm-12 ">
            <div className="content"> <NavLink to={props.t}>
                    <div className="content-overlay"></div>
                     <img className="content-image" src={props.i}/>
                    <div className="content-details fadeIn-bottom">
                        <h3 className="content-title">{props.t}</h3>
                        <p className="content-text"><i class="fa fa-map-marker"></i> Pakistan</p>
                    </div>
                </NavLink> </div>
        </div>

    {/* </div> */}
{/*  </div> */}


        </>
    );
}



export default Categories
