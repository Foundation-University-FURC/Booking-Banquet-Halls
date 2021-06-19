import React from 'react';
import Venues_gujrat from './Venues_gujrat'
import { NavLink } from 'react-router-dom';
import Rating from '../Rating'
import LocationOnIcon from '@material-ui/icons/LocationOn';



const Venues_card =(props)=> {
 
  return (
    <>
  <div className="col-md-4 col-10 mx-auto">
    <div className="card">
    <NavLink to ={`/MHall/${props._id}`}>
  <img src={props.image} className="card-img-top" alt="Marriage Hall image" className="img-thumbnail" style={{width:"500px",height:"200px"}} />
  </NavLink>
  <div className="card-body">
  {/* <NavLink to ={`/MHall/${props._id}`}> */}
    <h3 className="card-title-venue font-weight-bold">{props.name}</h3>
    <h6 className="card-title-venue font-weight-bold">RS. {props.price}=/</h6>
    <h6 className="card-title-venue font-weight-bold"> <LocationOnIcon/> {props.location}</h6>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  {/* </NavLink> */}
  <div>
  <Rating value={props.rating} text = {`${props.reviews} reviews`}/>
  </div>
    <NavLink to= {`/MHall/${props._id}`} className="btn btn-success" style={{width:"100%"}}>More Info</NavLink>
    {/* <NavLink to={`/MHall/${props._id}`} className="btn btn-warning" style={{float:"right"}}>Book Now</NavLink> */}

  </div>
</div>
 </div>

    </>
  );
}

export default Venues_card;


