import  react, {useState, useEffect } from "react";
// import pic from '../images';
import axios from 'axios'
import Card_card from './Card_card'
import Footer from './Footer'
import { withWidth } from "@material-ui/core";

const Card_design = () =>{

    const [Card, setCard] = useState([])
    
    useEffect(()=>{
        const fetch_cards = async ()=>{
            const {data} = await axios.get('/api/cardlists')
            setCard(data)
            console.log(data)

        };
        fetch_cards()
    },[]);
   
    return(
        <>
        <header className="venue">
  <div className="venue_title">
    <h1 className = "cheese">Cards Services</h1>
    <p className="scroll">Scroll for more!</p>
  </div>
</header>



      <div className="container my-5">
<div className="row">
<div className="col-12 mx-auto">
<div className="row gy-4 my-5">

{
        Card.map((list)=>{
           return <Card_card key={list._id} 
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

export default Card_design