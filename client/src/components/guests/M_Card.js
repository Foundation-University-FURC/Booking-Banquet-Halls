import React from 'react'

const M_Card = ({guest}) => {
  const {name, price, location} = guest
  return (
        <>
         <div className="container">
             {/* Card design here and data */}
             <div className="card" style={{width: "18rem"}}>
  <img src="..." className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
    <p className="card-text">{price}</p>
    <p className="card-text">{location}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
         </div>   
        </>
    )
}

export default M_Card