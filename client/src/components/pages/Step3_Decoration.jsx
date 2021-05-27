import React from 'react'

const Step3_Decoration =(props) => {
    return (
        <>

           <div className="card" style={{width: "14rem"}}>
  <img style={{width:"100%"}} src={props.image} className="card-img-top" alt="Decoration Image" />
  <div className="card-body">
    <p className="card-title"><b>Theme Code: </b>{props.name}</p>
    <i className="card-text"><b>Price:</b> PKR {props.price}</i>
    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
  </div>
</div>




        </>
    )
}

export default Step3_Decoration
