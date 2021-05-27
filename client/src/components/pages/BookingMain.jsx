import * as React from 'react';
import { useSelector } from 'react-redux';
import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/CartActions';
import Footer from './Footer'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { createOrder } from '../../actions/orderActions';
import { ORDER_CREATE_RESET } from '../../constants/orderConstants';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { CART_EMPTY } from '../../constants/cartConstant';



const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 200,
  }, 
});

const BookingMain =(props)=> {
  const cart = useSelector((state) => state.cart);
  // const cart2 = useSelector((state) => state.cart.cartItems);
  const cart1 = useSelector((state) => state.cart.cart1);
   // const {datainfo} = cart

   
    const Hallid = props.match.params.id;
  
const Alldata= props.location.search
const params = new URLSearchParams(props.location.search)
// params.key()
const urldata=Array.from(params.keys()).reduce((acc,key)=>({
  ...acc,[key]:params.get(key)
}),{});


const orderCreate = useSelector((state) => state.orderCreate);
const { loading, success, error, order } = orderCreate;      

//  services for total bill

const hall_price = (cart.cartItems.map((val)=>( 
  val.HallName.filter((val)=>val.name===urldata.hallName).map(val=>(
<p>{val.price}</p>
))
)))


const menu_price =  (cart.cartItems.map((val)=>(
val.Menu.filter((val)=>val.name===urldata.Menu1).map(val=>(
<p>{val.price * urldata.Guests}</p>
))

)))

const theme_price =  (cart.cartItems.map((val)=>(
val.Decoration.filter((val)=>val.name===urldata.Theme).map(val=>(
<p>{val.price}</p>
))

)))

const services_price =  (cart.cartItems.map((val)=>(
val.Other_Services.filter((val)=>val.name===urldata.Services).map(val=>(
<p>{val.price}</p>
))

)))



    const dispatch = useDispatch();
    const placeOrderHandler = () => {
      // TODO: dispatch place order action
      // if(urldata.date===orderDate){
      //   window.alert("Already booked on this date")
      // }
      dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };
    useEffect(() => {
      if (success) {
        props.history.push(`/orders/${order._id}`);
        // dispatch({ type: ORDER_CREATE_RESET });
      }
    }, [dispatch, order, props.history, success]);
    useEffect(() => {
      if (Hallid) {
        dispatch({type: CART_EMPTY})
        dispatch(addToCart(Hallid , urldata.date, urldata.Guests,urldata.Shift, urldata.hallName,urldata.Menu1,urldata.Theme,urldata.Services,urldata.Sitting,urldata.style,urldata.EventType,urldata.Comments));
      }
    }, [dispatch, Hallid, urldata.date, urldata.Guests,urldata.Shift, urldata.hallName,urldata.Menu1,urldata.Theme,urldata.Services,urldata.Sitting,urldata.style,urldata.EventType,urldata.Comments]);
    // console.log(cart.cart1.Hallname)

   const image = cart.cartItems.map(val=>(
          val.image
   ))
   const name = cart.cartItems.map(val=>(
     val.name
   ))
  
   const total = 287000;

    const classes = useStyles();
    
    return (
        <>
        
          <h1 style={{textAlign:"center"}} className="fonttt">Welcome to booking page</h1>
          <div className="container mt-5">
          <div style={{border:"1px solid", borderRight:"1px solid"}} className="row padding mb-5">
            <div style={{borderRight:"1px solid"}} className="col-6">
            <h2 className="bInfo">Billing Informaition</h2>
            
          
             
          
          <div className="container mt-3 mb-5">
          <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Hall Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">

              <div className="row padding">
                <div className="col-8">
                  <h3 style={{borderBottom:"1px solid"}}>Services</h3>
                  <p>Hall {urldata.hallName}</p>
                  <p>Menu {urldata.Menu1}</p>
                  <p>Theme {urldata.Theme}</p>
                  <p> {urldata.Services}</p>
                  <hr/>
                  <h5><b><strong>In Advance Bill</strong></b></h5>
                  <h5><b> <strong>Total Bill</strong></b></h5>
                <hr/>
                </div>
                <div className="col-4">
                  <h3 style={{borderBottom:"1px solid"}}>Cost</h3>
                  <p>{hall_price}</p>
                  <p>{menu_price}</p>
                  <p>{theme_price}</p>
                  <p>{services_price}</p>
                  <hr/>
                  <p>{total/2}</p>
                  <p>{total}</p>
                  <hr/>
                </div>
              </div>

          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="secondary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
          </div>
          </div>
          <div className="col-6">
          <h2 className="bInfo">Booking Summary</h2>
          <div className="row padding mt-3">
          <div  className ="col-lg-6 fonttt">
            <h4>Date:</h4>
            <h4>Guests:</h4>
            <h4>Shift:</h4>
            <h4>Hall Name:</h4>
            <h4>Menu Name:</h4>
            <h4>Theme Name:</h4>
            <h4>Services:</h4>
            <h4>Sitting:</h4>
            <h4>Style:</h4>
            <h4>Event Type:</h4>
            <h4>Any Suggestions:</h4>

          </div>

{/* Changes:  urldata -> cart1 */}
          <div className ="col-lg-6 fonttt" >
            <h4>{cart1.date}</h4>
            <h4>{cart1.Guests}</h4>
            <h4>{cart1.Shift}</h4>
            <h4>{cart1.hallName}</h4>
            <h4>{cart1.Menu1}</h4>
            <h4>{cart1.Theme}</h4>
            <h4>{cart1.Services}</h4>
            <h4>{cart1.Sitting}</h4>
            <h4>{cart1.style}</h4>
            <h4>{cart1.EventType}</h4>
            <h4>{cart1.Comments}</h4>

          </div>

          </div>
            </div>
          <button style={{height:"60px", width:"50%",marginLeft:"25%", borderRadius:"10px"}} className="btn btn-warning mt-5"><h3 style={{fontFamily:"'Courgette', cursive"}} onClick={placeOrderHandler}>Book Now</h3></button>
         <div className="container">
          {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              </div>

</div>
</div>


          <Footer />
        </>
    )
}

export default BookingMain
