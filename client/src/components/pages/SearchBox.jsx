import React from 'react'
import { useState } from 'react';

function SearchBox(props) {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const submitHandler = (e) => {
      e.preventDefault();
      if(name){
        props.history.push(`/search/name/${name}`);
      }
      else if(location){
        props.history.push(`/search/name/${name}/location/${location}`);
      }
      else{
        props.history.push(`/search/name/${name}/location/${location}`);
      }
    };

    return (
        <>



<div className=" filter container mt-5">
<form required= "true" onSubmit={submitHandler}>
<div className="row padding">
<div className="col-lg-5 col-md-4 col-sm-12">
<label style={{fontStyle:"italic",fontWeight:"bolder", fontFamily:'Roboto Condensed sans-serif'}} for="byname">Search By Name</label><br/>
<input className="filter-for-search" type="text" id="name" name="byname" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
</div>

<div className="col-lg-5 col-md-4 col-sm-12">

<label style={{fontStyle:"italic",fontWeight:"bolder",fontFamily:'Roboto Condensed sans-serif'}} for="Location">Search By City Or Location</label><br/>
    <input className="filter-for-search" type="text" id="Location" name="bylocation" placeholder="Enter City Name or Location" onChange={(e) => setLocation(e.target.value)} />

</div>

<div className="col-lg-2 col-md-3 col-sm-12 my-4">

{/* <input style={{fontStyle:"italic",fontWeight:"bolder"}} type="submit" value="Submit" className="for-filter-btn"/> */}
<button className="for-filter-btn" style={{fontStyle:"italic",fontWeight:"bolder"}} type="submit">
          <i className="fa fa-search"></i>
        </button>
</div>

</div>
</form>

</div>






{/* <div className=" filter-main container">
<div className="row padding">
<form className="search-box" onSubmit={submitHandler}>
<div className="col-10 col-md-4">
    <input type="text" name="q" id="q" onChange={(e) => setName(e.target.value)} />
</div>

  <div className="col-12 col-md-4">
  <button className="btn btn-warning" type="submit">
          <i className="fa fa-search"></i>
        </button>
  </div>  
    
    </form>


</div>

</div> */}



        </>
    )
}

export default SearchBox
