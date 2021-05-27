import React from 'react';
// import { NavLink } from 'react-router-dom';
// import web from '../src/wp6351138.jpg';


const Card =(props)=> {
  return (
    <>
  
<div className="col-md-3 col-lg-3">
<div className="card">
<img className="cardimage" className="card-img-top" src={props.imgsrc} className="card-img-top" alt="..." className="img-thumbnail" />
  <div className="card-body">
    <h5 className="card-title font-weight-bold">{props.title}</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="btn btn-primary">Go to About</a>
  </div>
</div>
</div>
 


    </>
  );
}

export default Card;