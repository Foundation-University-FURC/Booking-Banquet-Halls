import  react, {useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
// import pic from '../images';
import axios from 'axios'
import Venues from './Venues_card'
import Footer from './Footer'

import { withWidth } from "@material-ui/core";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import {useDispatch, useSelector } from "react-redux";
import {hallList} from '../../actions/HallsActions'

const Search = () =>{

  const { name = 'all', location = 'all' } = useParams();

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

        dispatch(hallList({ name: name !== 'all' ? name : '', location: location !== 'all' ? location : '' }))

    },[dispatch, name,location]);
    // console.log("Data is:" + MHalls)
    return(
        <>
        <header className="venue">
  <div className="venue_title">
    <h1 className = "cheese">Venues</h1>
    <p className="scroll">Scroll for more!</p>
  </div>
</header>



      <div className="container my-5">

      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{data.length} Results</div>
        )}
      </div>
        
      {loading? (<LoadingBox></LoadingBox>)      
      : error
      ?(<MessageBox varient ="danger">{error}</MessageBox>)
      :(
     
     
        <div className="row">
        
        <div className="col-12 mx-auto">
        <div className="row gy-4 my-5">
        {data.length === 0 && (
                <MessageBox>Oops! Soryy No Marriage Hall Found</MessageBox>
        )}

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

export default Search