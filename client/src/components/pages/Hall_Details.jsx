import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Step3_Decoration from './Step3_Decoration';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import EmailIcon from '@material-ui/icons/Email';
import LanguageIcon from '@material-ui/icons/Language';
import Footer from './Footer'
import Style from './Style'
import Carousel_why from './Carousel_why'
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import {createReview, detailsHall} from '../../actions/HallsActions'
import {SRLWrapper} from 'simple-react-lightbox'
import { NavLink } from 'react-router-dom'
import Slider from "react-slick";
import {CartActions} from '../../actions/CartActions'

import TextField from '@material-ui/core/TextField';


import 'date-fns';
// import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';

import { HALL_REVIEW_CREATE_RESET } from '../../constants/HallsConstant';


import Rating from '../Rating';
import { compare } from 'bcryptjs';
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
import { CART_EMPTY } from '../../constants/cartConstant';


const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};


const Hall_Details = (props) => {

  const hallId=props.match.params.id
 const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // const cart = useSelector((state) => state.cart);
  // const { cart1 } = cart;
  // console.log({Cart.name})
  if (!userInfo) {
    props.history.push('/signin');
  }


  const [date, setDate] = useState('');
  // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const [Guests, setGuests] = useState('');
  const [Shift, setShift] = useState('');
  const [hallName, setHallName] = useState('');
  const [Menu1, setMenu] = useState('');
  const [Theme, setTheme] = useState('');
  const [Services, setServices] = useState('');
  const [Sitting, setSitting] = useState('');
  const [style, setStyle] = useState('');
  const [EventType, setEventType] = useState('');
  const [Comments, setComments] = useState('');


  const hallReviewCreate = useSelector((state) => state.hallReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = hallReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');  
 



    const [show,setShow]= useState(false)
    const [show1,setShow1]= useState(false)
    // const dispatch = useDispatch()
    const hallDetails = useSelector((state) => state.hallDetails)
    const {loading,error,data1} = hallDetails

  
    
    
    // const [Hall_Details, setDetails] = useState([])
    useEffect(()=>{
        // const fetchdetails = async ()=>{
        //     const {data} = await axios.get(`/api/lists/${match.params.id}`)
        //     setDetails(data)
        //     console.log("data is: " + data)
        // }
        // fetchdetails()
        if (successReviewCreate) {
          window.alert('Review Submitted Successfully');
          setRating('');
          setComment('');
          dispatch({ type: HALL_REVIEW_CREATE_RESET });
        }



        dispatch(detailsHall(props.match.params.id))

    },[dispatch, hallId, successReviewCreate])

   

    const submitHandler = async (e) => {
      // setDate(e)
      e.preventDefault();
      
      // const Mname = await axios.get(`/api/lists/${hallId}`);
      // const M_name = Mname.data.name;
      try{
        const checkDate = await axios.get('/api/check-date',{params: {date,hallName,hallId}});
        console.log(checkDate.data.Message)
        if(checkDate.data.Message=="Great!!!"){
          dispatch({type: CART_EMPTY})
          dispatch(
            CartActions({ date, Guests, Shift, hallName, Menu1,Theme,Services,Sitting,style,EventType,Comments })
          );  
        dispatch({type: ORDER_CREATE_RESET})
         props.history.push(`/BookingMain/${hallId}?date=${date}&Guests=${Guests}&Shift=${Shift}&hallName=${hallName}&Menu1=${Menu1}&Theme=${Theme}&Services=${Services}&Sitting=${Sitting}&style=${style}&EventType=${EventType}&Comments=${Comments}`);
          }
      }catch(error){
        // console.log()
          window.alert(error.response.data.Message);
        
      }
   
    };

    const submitHandler1 = (e) => {
      // setDate(e)
      e.preventDefault();

      if (comment && rating) {
        dispatch(
          createReview(hallId, { rating, comment, name: userInfo.name })
        );
      } else {
        alert('Please enter comment and rating');
      }

         };


    return (
        <>
     
        <div>
        {loading? (<LoadingBox></LoadingBox>)      
      : error
      ?(<MessageBox varient ="danger">{error}</MessageBox>)
      :(

        <div>
        <header className="venue-details">
  <div className="venue_title-details">
    <h1 className = "cheese-details">{data1.name}</h1>
    <p className="scroll-details"><LocationOnIcon/>{data1.location}</p>
  </div>
</header>

        
<div className="container my-5">
<div className="row padding">
<div className="col-lg-9 col-md-12 col-sm-12 detB" >
<img className="MBE-image" style={{width:"100%", height:"45%"}} src={data1.image} alt="Marriage Hall image"></img>
<br/>
<h1 style={{fontStyle:"italic",fontWeight:"bolder",textAlign:"center"}}>{data1.name}</h1>
<p  style={{fontStyle:"italic",fontWeight:"normal"}}><HomeIcon />  {data1.location}</p>
<p  style={{fontStyle:"italic",fontWeight:"normal"}}><ContactPhoneIcon/> {data1.Contact_No}</p>
<p  style={{fontStyle:"italic",fontWeight:"normal"}}><EmailIcon/>  {data1.Email}</p>
<p  style={{fontStyle:"italic",fontWeight:"normal"}}><LanguageIcon/> {data1.website}</p>

{/* <h4><Rating value={data1.rating} text = {`${data1.review} reviews`}/></h4> */}
<h1 style={{fontStyle:"italic",fontWeight:"bolder",textAlign:"center"}}>Description</h1>
<p style={{fontStyle:"italic",fontWeight:"normal"}}> {data1.About}</p>

<h1 className="MBE" style={{fontStyle:"italic",fontWeight:"bolder",textAlign:"center"}}>More About EventHub.PK</h1>
<p className="MBE" style={{fontStyle:"italic",fontWeight:"normal"}}> {data1.description}</p>
{/* <hr/> */}
</div>

{/* start */}

<div className="col-lg-3 col-md-12 col-sm-12 mt-5">
<div className="container mx-3 detail-form">
<div className="row padding">

<h3 className="pt-4">Price Per Head</h3>
<h2>{data1.price} Rs</h2>
</div>
</div>

<div className ="container my-3 detail-form2">
<ul style={{listStyle: "none"}}>
<h3>Why Choose Us?</h3>
<div className="row">
<li> <i className="fa fa-check-square" style={{color:"green"}} /> Gurante Best Price </li>
<li> <i className="fa fa-check-square"  style={{color:"green"}}/> Free Planning Consultant </li>
<li> <i className="fa fa-check-square"  style={{color:"green"}} /> Backup vendor Options </li>
<li> <i className="fa fa-check-square"  style={{color:"green"}} /> Service Assurance </li>

</div>
</ul>
</div>


<div className ="container detail-form2">
<h3>Services</h3>
<div className="row">
<div className="col-12">
<ul style={{listStyle:"none"}} >
{
 
      data1.services.map((value, index) => {
        return <li key={index}> <i className="fa fa-check-square"  style={{color:"green"}} /> {value}</li>
      })
    

}
</ul>
</div>
</div>
</div>

<div className ="container detail-form2">
<h3>Venue Restriction</h3>
<div className="row">
<div className="col-12">
<ul style={{listStyle:"none"}}>
{
 
      data1.Venue_Restrictions.map((value, index) => {
        return <li key={index}> <i className="fa fa-times"  style={{color:"red"}} /> {value}</li>
      })
    

}
</ul>
</div>
</div>
</div>

<div className ="container detail-form2">
<h3>Food Restriction</h3>
<div className="row">
<div className="col-lg-12">
<ul style={{listStyle:"none"}}>
{
 
      data1.Food_Restrictions.map((value, index) => {
        return <li key={index}> <i className="fa fa-times" style={{color:"red"}} /> {value}</li>
      })
    

}
</ul>
</div>
</div>
</div>

</div>

</div>
</div>

<div className="container my-4">
<div className="row padding">
<hr className= "MBE-hr" />
<h1 style={{textAlign:"center",fontFamily:"cursive"}}>Booking Proceess</h1>
<h5 style={{textAlign:"center",fontFamily:"cursive"}}>Please Fill the Form For Booking...</h5>
<hr className= "MBE-hr"/>
</div>
</div>

{/* Booking area */}

<div className="container">
<div className="row padding">
<div className="col-lg-8 col-md-6 col-sm-12">
<h1>Step 1</h1>
{/* step 1 */}
<div className="container" style={{border:"1px solid"}}>
  <div className="row" style={{backgroundColor:"orange", color:"balck",fontFamily:"initial",textAlign:"center"}}>
    <div className="col-lg-4" >
      <h3>Hall Title</h3>
    </div>
    <div className="col-lg-4">
      <h3>Capacity</h3>
    </div>
    <div className="col-lg-4">
      <h3>Price</h3>
    </div>
  </div>
  
  {/* <div className="row padding"> */}
    {
      data1.HallName.map((val,key)=>(
        <div key={key}  className="row" style={{textAlign:"center"}}>
        <div className="col-lg-4" style={{borderRight:"1px solid black"}}>
            <h4>Hall {val.name}</h4>
        </div>
        <div className="col-lg-4" style={{borderRight:"1px solid"}}>
            <h6>{val.capacity}</h6>
        </div>
        <div className="col-lg-4">
            <h6 style={{color:"green"}}>RS. {val.price}</h6>
        </div>
        </div>
      ))
    }

</div>
{/* step 1 end */}

<h1>Step 2</h1>
{/* step 2 Start */}

<div className="container menu-card">
    {
        data1.Menu.map((val,key)=>(
  <div className="row">
  <div key={key} className="col-lg-4 col-md-12 col-sm-12">
  <div className="card MBE-card" style={{width: "12rem"}}>
  <div className="card-body">
    <ul>
    <h5 className="card-title"  style={{backgroundColor:"orange"}}>Menu {val.name}</h5>
    {
      val.Dish.map((val1,i)=>( 
        <li key={i}><i>{val1}</i></li>
      ))
    }
    </ul>
    <hr/>
       <sapn><h5>PKR {val.price}./Head</h5></sapn>
       <hr/>
  </div>
  </div>
</div>

</div>
        ))
      }
    

</div>

{/* step 2 End */}

<h2>Step 3</h2>
{/* step 3 start */}


<div className="container" style={{border:"1px solid black"}}>
     <Slider {...settings}> 
     {
    data1.Decoration.map((val,i)=>{
         return  <Step3_Decoration
            key={i}
            image={val.image}
            name={val.name}
            price={val.price}
/>
     })
 }

      </Slider>
    

</div>



{/* step 3 end */}
<br/>
<br/>
<button className="btn btn-primary" onClick={()=>setShow(!show)} style={{width:"100%"}}>Other Services</button>
<br />
<br />
{
  show?
  <div className="container" style={{border:"1px solid"}}>
    <div className="row padding">
      <h1><i>Available Services</i></h1>
      {
        data1.Other_Services.map((val,i)=>(
          <div key={i} className="col-lg-4 mt-4" style={{textAlign:"center"}}>
          <h4>{val.name}</h4>
          <hr/>
           <p><b>Price:</b> PKR {val.price} / event</p> 
      </div>
        ))
      }
     
    </div>
  </div>
  
  :null
}

</div>

{/* Booking Form */}

<div className="col-lg-4 col-12 col-md-12 col-sm-12">
<div className="container mx-5 detail-form1">
<div className="row padding">
<div className= "MBE-form col-12 col-md-6 mx-auto">
<h3 style={{color:"Yellow"}}>Booking Details</h3>
<form onSubmit={submitHandler}>
{/* <div>
<MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      
      </Grid>
    </MuiPickersUtilsProvider>
</div> */}
<div className="mb-2">
  <label  style={{fontStyle:"italic",fontWeight:"bolder"}} for="exampleFormControlInput1" className="form-label">Date</label>
  <input type="Date" className="form-control" id="exampleFormControlInput1" placeholder="Select Date" onChange={(e) => setDate(e.target.value)} required/>
</div>

<div className="mb-2">
  <label  style={{fontStyle:"italic",fontWeight:"bolder"}} for="exampleFormControlInput1" className="form-label" name="guest">No. of Guests</label>
  <input type="Number" className="form-control" id="exampleFormControlInput1" placeholder="No of Guests" onChange={(e) => setGuests(e.target.value)} required/>
</div>

<div className="mb-2">
      <label  style={{fontStyle:"italic",fontWeight:"bolder"}}  for="Select" className="form-label">Shift</label>
      <select onChange={(e) => setShift(e.target.value)} id="Select" className="form-select">
        <option>Select Shift</option>
        <option>Lunch</option>
        <option>Dinner</option>
      </select>
    </div>

<div className="mb-2">
      <label  style={{fontStyle:"italic",fontWeight:"bolder"}}  for="Select" className="form-label">Select Hall</label>
      <select onChange={(e) => setHallName(e.target.value)} id="Select" className="form-select">
        <option>Select Hall</option>
        {
          data1.HallName.map((val,i)=>(
            
            <option key={i}>{val.name}</option>
          ))
        }
      </select>
    </div>


<div className="mb-2">
      <label  style={{fontStyle:"italic",fontWeight:"bolder"}}  for="Select" className="form-label">Select Menu</label>
      <select onChange={(e) => setMenu(e.target.value)}  id="Select" className="form-select">
        <option>Select Menu</option>
        {
          data1.Menu.map((val,i)=>(
            
            <option key={i}>{val.name}</option>
          ))
        }
      </select>
    </div>


<div className="mb-2">
      <label  style={{fontStyle:"italic",fontWeight:"bolder"}}  for="Select" className="form-label">Select Theme Code</label>
      <select onChange={(e) => setTheme(e.target.value)} id="Select" className="form-select">
        <option>Select Theme Code</option>
        {
          data1.Decoration.map((val,i)=>(
            
            <option key={i}>{val.name}</option>
          ))
        }
      </select>
    </div>


<div className="mb-2">
  <label  style={{fontStyle:"italic",fontWeight:"bolder"}} for="exampleFormControlInput1" className="form-label">Services:</label><br/>
  <input type="checkbox" id="cooling" name="Cooling" value="Cooling" onChange={(e) => setServices(e.target.value)} />
  <label for="services"> Cooling</label> &nbsp;
  <input type="checkbox" id="music" name="Music System" value="Music System" onChange={(e) => setServices(e.target.value)} />
  <label for="services"> Music System</label>&nbsp;
  <input type="checkbox" id="heating" name="Heating" value="Heating" onChange={(e) => setServices(e.target.value)}/>
  <label for="services"> Heating</label>
</div>

<div className="mb-2">
      <label  style={{fontStyle:"italic",fontWeight:"bolder"}}  for="Select" className="form-label">Sitting Arrangements</label>
      <select onChange={(e) => setSitting(e.target.value)} id="Select" className="form-select">
        <option>Select Sitting</option>
        <option>Round Table</option>
        <option>Square Table</option>
        <option>Straight Rows</option>
      </select>
    </div>

<div className="mb-2">
      <label  style={{fontStyle:"italic",fontWeight:"bolder"}}  for="Select" className="form-label">Sitting Style</label>
      <select onChange={(e) => setStyle(e.target.value)} id="Select" className="form-select">
        <option>Sitting Style</option>
        <option>Segregated</option>
        <option>Mixed</option>
      </select>
    </div>

<div className="mb-2">
      <label  style={{fontStyle:"italic",fontWeight:"bolder"}}  for="Select" className="form-label">Event Type</label>
      <select onChange={(e) => setEventType(e.target.value)} id="Select" className="form-select">
        <option>Event Type</option>
        <option>Mehndi</option>
        <option>Baraat</option>
        <option>Walimaa</option>
        <option>BirthDay Party</option>
      </select>
    </div>

<div className="mb-2">
  <label  style={{fontStyle:"italic",fontWeight:"bolder"}} for="exampleFormControlTextarea1" className="form-label">Write Note</label>
  <textarea onChange={(e) => setComments(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
<div className="col-12">
    <button className="btn btn-success" type="submit">Book Now →</button>
  </div>
</form>
</div>

</div>

</div>
</div>

</div>

</div>

<div className="container padding">
<h2 className="fonttt2" id="reviews">Reviews</h2>
            {data1.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {data1.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} caption=""></Rating>
                  <p><strong>Date:</strong> {review.createdAt.substring(0, 10)}</p>
                  <p><strong>Comment:</strong> {review.comment}</p>
                  <hr/>
                </li>
              ))}
             
</ul>

</div>

  {/* Rating Portion Below */}

<br/>
<button className="btn btn-info" onClick={()=>setShow1(!show1)} style={{width:"20%",marginLeft:"75%"}}>See Ratings and Reviews</button>

{
  show1?

  <div className="container my-2 fonttt">
           <ul>
              <li>
                {userInfo ? (
                  <form className="form" onSubmit={submitHandler1}>
                    <div className="mt-5">
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <h4 style={{marginLeft:"20%"}} htmlFor="rating">Rating:</h4>
                      <select style={{width:"30%",marginLeft:"20%"}} className="form-select" aria-label="Default select example"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select Rating</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <br/>

                    <div>
                    <h4 style={{marginLeft:"20%"}} htmlFor="comment">Your Review:</h4>
                    <textarea style={{width:"30%",marginLeft:"20%"}} value={comment} placeholder="Write Comments here..." onChange={(e) => setComment(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
                    </div>
                    <br/>

                    <div>
                      <button style={{width:"30%",marginLeft:"20%"}} className="btn btn-warning" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox varient="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <NavLink to="/signin">Sign In</NavLink> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
:null
        }


<div className="container my-5">
<h1 style={{textAlign:"center"}}>Our Gallary</h1>
</div>
<SRLWrapper>
<div className="container Gallary my-5">

{
  data1.Gallary.map(img=>
<div key={img.id} className="Gimage-card">
<NavLink to = {img.imgname}>
<img className="gallary-image" src={img.imgname} alt="Marriage Hall image" />
</NavLink>
</div>
  )
}

</div>
 </SRLWrapper>
</div>



      )}
        </div>
      

 <Style />
<br/>
<hr />
<Carousel_why/>
<br/>
<Footer />



        </>
    );
}

export default Hall_Details