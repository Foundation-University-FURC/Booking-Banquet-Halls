import  react, {useState, useEffect } from "react";
// import pic from '../images';
import axios from 'axios'
import Venues from './Venues_card'
import Footer from './Footer'

import { withWidth } from "@material-ui/core";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import {useDispatch, useSelector } from "react-redux";
import {hallList} from '../../actions/HallsActions'
import SearchBox from "./SearchBox";

const Venues_gujrat = (props) =>{
    const dispatch = useDispatch()
    const HallsList= useSelector((state) => state.HallsList)
    const {loading,error, data} = HallsList
    // const [MHalls, setHalls] = useState([])
    // const [loading, setLoading] = useState(false)
    // const [error, setError]= useState(false)
    useEffect(()=>{
        // const fetch_MHalls = async ()=>{

        //   try{
        //     setLoading(true)
        //     const {data} = await axios.get('/api/lists')
        //     setLoading(false)
        //     setHalls(data)
        //   }catch (err){
        //       setError(err.message)
        //       setLoading(false)
        //   }
        //     // console.log("Data is:" + data)
        // };
        // fetch_MHalls()

        dispatch(hallList({}))

    },[dispatch]);
    // console.log("Data is:" + MHalls)

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

    return(
        <>
        <header className="venue">
  <div className="venue_title">
    <h1 className = "cheese">Venues</h1>
    <p className="scroll">Scroll for more!</p>
  </div>
</header>

{/* <SearchBox /> */}

<div className=" filter container my-5">
<form onSubmit={submitHandler}>
<div className="row padding">
<div className="col-5 ">
<label style={{fontStyle:"italic",fontWeight:"bolder"}} for="byname">Search By Name</label><br/>
<input className="filter-for-search" type="text" id="name" name="byname" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
</div>

<div className="col-5">

<label style={{fontStyle:"italic",fontWeight:"bolder"}} for="Location">Search By City Or Location</label><br/>
    <input className="filter-for-search" type="text" id="Location" name="bylocation" placeholder="Enter City Name Or Location" onChange={(e) => setLocation(e.target.value)} />

</div>

<div className="col-2 my-4">

{/* <input style={{fontStyle:"italic",fontWeight:"bolder"}} type="submit" value="Submit" className="for-filter-btn"/> */}
<button className="for-filter-btn" style={{fontStyle:"italic",fontWeight:"bolder"}} type="submit">
          <i className="fa fa-search"></i>
        </button>
</div>

</div>
</form>

</div>

  
      <div className="container my-5">
      {loading? (<LoadingBox></LoadingBox>)      
      : error
      ?(<MessageBox varient ="danger">{error}</MessageBox>)
      :(
        <div className="row">
<div className="col-12 mx-auto">
<div className="row gy-4 my-5">

{
        data.map((list)=>{
           return <Venues key={list._id} 
            _id = {list._id}
            image={list.image}
           name= {list.name}
           price = {list.price}
           location = {list.location}
           rating = {list.rating}
           reviews = {list.review}
            />
        }
    
        )
    }


</div>
</div>
     
</div>

)
}
    

</div>



<Footer />


   
        </>
    );
}

export default Venues_gujrat