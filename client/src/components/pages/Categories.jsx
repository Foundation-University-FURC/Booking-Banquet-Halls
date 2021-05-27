import React from "react";
import { NavLink } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import Venues_Gujrat from './Venues_gujrat';

const Categories=(props)=>{
    
    return(
        <>

   <div className="catcards">
        <div className="cattest">
        <img className="catimg"  src={props.i} height="100%" width=" 300px" alt="imag" className="imagd" />
          <NavLink to={props.t}><span className="catspan">{props.t}</span> </NavLink>
          <div className='catvl' ></div>
            <div className='catv1' ></div>
            <div className="cathl"></div>
            <div className="cath1"></div>
            </div>
            </div>    
          

        </>
    );
}



export default Categories
