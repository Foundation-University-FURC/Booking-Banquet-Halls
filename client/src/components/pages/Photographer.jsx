import  react, {useState, useEffect } from "react";
// import pic from '../images';
import axios from 'axios'
import Photographer_card from './Photographer_card'
import Footer from './Footer'
import { withWidth } from "@material-ui/core";

const Photographer = () =>{

    const [pgrapher, setGrapher] = useState([])
    
    useEffect(()=>{
        const fetch_graphers = async ()=>{
            const {data} = await axios.get('/api/plists')
            setGrapher(data)
            console.log(data)
        };
        fetch_graphers()
    },[]);
   
    return(
        <>
        <header className="venue">
  <div className="venue_title">
    <h1 className = "cheese">Photographer Services</h1>
    <p className="scroll">Scroll for more!</p>
  </div>
</header>





      <div className="container my-5">
<div className="row">
<div className="col-12 mx-auto">
<div className="row gy-4 my-5">

{
    pgrapher.map((list)=>{
           return <Photographer_card key={list._id} 
            _id = {list._id}
            image={list.image}
            name= {list.name}
            price = {list.price}
            // location = {list.location}
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

export default Photographer