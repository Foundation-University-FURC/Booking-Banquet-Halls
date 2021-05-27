import  react, {useState, useEffect } from "react";
// import pic from '../images';
import axios from 'axios'
import Rental_card from './Rental_card'
import Footer from './Footer'
import { withWidth } from "@material-ui/core";

const Car_Rental = () =>{

    const [Car, setCar] = useState([])
    
    useEffect(()=>{
        const fetch_cars = async ()=>{
            const {data} = await axios.get('/api/clists')
            setCar(data)
            console.log(data)
        };
        fetch_cars()
    },[]);
   
    return(
        <>
        <header className="venue">
  <div className="venue_title">
    <h1 className = "cheese">Cars Services</h1>
    <p className="scroll">Scroll for more!</p>
  </div>
</header>


<div className=" filter container my-5">
<div className="row padding">
<div className="col-sm-12 col-md-5">
<form>
<label style={{fontStyle:"italic",fontWeight:"bolder"}} for="byname">Search By Name</label><br/>
<input className="filter-for-search" type="text" id="name" name="byname" placeholder="Enter Name" />
</form>
</div>

<div className="col-sm-12 col-md-5">
<form>
<label style={{fontStyle:"italic",fontWeight:"bolder"}} for="Price">Search By Price</label><br/>
    <input className="filter-for-search" type="text" id="price" name="byprice" placeholder="Enter Price" />
</form>
</div>

<div className="col-2 my-4">
<form>
<input style={{fontStyle:"italic",fontWeight:"bolder"}} type="submit" value="Submit" className="for-filter-btn"/>
</form>

</div>

</div>

</div>


{/* <div className="filter my-5">
  <form>
   
    <br/>
  
    <br/>
   
  
   
  </form>
</div> */}

      <div className="container my-5">
<div className="row">
<div className="col-12 mx-auto">
<div className="row gy-4 my-5">

{
        Car.map((list)=>{
           return <Rental_card key={list._id} 
            _id = {list._id}
            image={list.image}
            name= {list.name}
            price = {list.price}
            location = {list.location}
            />
        }
    
        )
    }


</div>
</div>
</div>

</div>

<Footer />


   
        </>
    );
}

export default Car_Rental