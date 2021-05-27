import React from 'react';
import Venues_gujrat from './Venues_gujrat'
import { NavLink } from 'react-router-dom';
import Rating from '../Rating'
import LocationOnIcon from '@material-ui/icons/LocationOn';



const Rental_card =(props)=> {
 
  return (
    <>
  <div className="col-md-4 col-10 mx-auto">
    <div className="card">
    <NavLink to ={`/rental_car/${props._id}`}>
  <img src={props.image} className="card-img-top" alt="Rent a car image" className="img-thumbnail" style={{width:"500px",height:"200px"}} />
  </NavLink>
  <div className="card-body">
  {/* <NavLink to ={`/rental_car/${props._id}`}> */}
    <h3 className="card-title-venue font-weight-bold">{props.name}</h3>
    <h6 className="card-title-venue font-weight-bold"><i> Starting from RS. {props.price} Per Day </i> </h6>
    <h6 className="card-title-venue font-weight-bold"> <LocationOnIcon/> <i> {props.location} </i> </h6>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  {/* </NavLink> */}
    <NavLink to= {`/rental_car/${props._id}`} className="btn btn-success" style={{display:"grid"}}>More Info</NavLink>

  </div>
</div>
 </div>

    </>
  );
}

export default Rental_card;


