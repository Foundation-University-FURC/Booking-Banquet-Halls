import * as React from 'react';
import { useSelector } from 'react-redux';
import  { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from './Footer'
import { detailsOrder, acceptOrder } from '../../actions/orderActions';
import { useState } from 'react';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { ORDER_ACCEPT_RESET } from '../../constants/orderConstants';




const OrderDetail =(props)=> {

    const orderId = props.match.params.id;
   // const {datainfo} = cart
   const orderDetails = useSelector((state) => state.orderDetails);
   const { order, loading, error } = orderDetails;
    
   const userSignin = useSelector((state) => state.userSignin);
   const { userInfo } = userSignin;

   const orderAccept = useSelector((state) => state.orderAccept);
   const {
     loading: loadingAccept,
     error: errorAccept,
     success: successAccept,
   } = orderAccept;

    const dispatch = useDispatch();
    useEffect(() => {

      if (!order || successAccept || (order && order._id !== orderId)){
        dispatch({ type: ORDER_ACCEPT_RESET });
        dispatch(detailsOrder(orderId));
      }

       
    }, [dispatch, orderId, successAccept]);
  

    const acceptHandler = () => {
      dispatch(acceptOrder(order._id));
    };
    
    return loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
        
          <h1 style={{textAlign:"center"}} className="fonttt">Booking Details</h1>
          <div className="container mt-5">
          <div style={{border:"1px solid", borderRight:"1px solid"}} className="row padding mb-5">
            <div style={{borderRight:"1px solid"}} className="col-lg-6 col-md-6 col-sm-12">
            <h2 className="bInfo">Order Information</h2>

           
        {order.orderItems.map(val=>(
            <img style={{width:"100%"}} src= {val.image} /> 
         ))}
                
        {order.orderItems.map((val)=>(
             <h2 className="fonttt">{val.name}</h2>
            ))}
                
        
       <div>
        <h3 className="fonttt2">Status: </h3>
       {order.isAccepted ? (
        <MessageBox varient="success">
            Accepted at {order.acceptedAt}
            </MessageBox>
            ) : (
          <MessageBox varient="danger">Not Accepted Yet</MessageBox>
            )}
       </div>
           
          </div>


          <div className="col-lg-6 col-md-6 col-sm-12">
          <h2 className="bInfo">Order Summary</h2>
          <div className="row padding mt-3">
          <div  className ="col-lg-6 col-md-6 col-sm-12 fonttt">
          <h4 className="BS-h4">Date:</h4>
            <h4 className="BS-h4">Guests:</h4>
            <h4 className="BS-h4">Shift:</h4>
            <h4 className="BS-h4">Hall Name:</h4>
            <h4 className="BS-h4">Menu Name:</h4>
            <h4 className="BS-h4">Theme Name:</h4>
            <h4 className="BS-h4">Services:</h4>
            <h4 className="BS-h4">Sitting:</h4>
            <h4 className="BS-h4">Style:</h4>
            <h4 className="BS-h4">Event Type:</h4>
            <h4 className="BS-h4">Any Suggestions:</h4>

          </div>

          <div className ="col-lg-6 col-md-6 col-sm-12 fonttt" > 
            <h4 className="BS-4-center">{order.orderItems.map((val)=>(
              <p>  {val.date.substring(0,10)}</p>
            ))}</h4>
            <h4 className="BS-4-center">{order.orderItems.map((val)=>(
              <p>{val.Guests}</p>
            ))}</h4>
            <h4 className="BS-4-center">{order.orderItems.map((val)=>(
              <p>{val.Shift}</p>
            ))}</h4>
            <h4 className="BS-4-center">{order.orderItems.map((val)=>(
              <p>{val.hallName}</p>
            ))}</h4>
            <h4 className="BS-4-center">{order.orderItems.map((val)=>(
              <p>{val.Menu1}</p>
            ))}</h4>
            <h4 className="BS-4-center">{order.orderItems.map((val)=>(
              <p>{val.Theme}</p>
            ))}</h4>
            <h4 className="BS-4-center">{order.orderItems.map((val)=>(
              <p>{val.Services}</p>
            ))}</h4>
            <h4 className="BS-4-center">{order.orderItems.map((val)=>(
              <p>{val.Sitting}</p>
            ))}</h4>
            <h4 className="BS-4-center">{order.orderItems.map((val)=>(
              <p>{val.style}</p>
            ))}</h4>
            <h4 className="BS-4-center">{order.orderItems.map((val)=>(
              <p>{val.EventType}</p>
            ))}</h4>
            <h4 className="BS-4-center">{order.orderItems.map((val)=>(
              <p>{val.Comments}</p>
            ))}</h4>
          </div>

          </div>
            </div>
          {/* <button style={{height:"60px", width:"50%",marginLeft:"25%", borderRadius:"10px"}} className="btn btn-warning mt-5"><h3 style={{fontFamily:"'Courgette', cursive"}} onClick={placeOrderHandler}>Book Now</h3></button>
         <div className="container">
          {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
              </div> */}

              { userInfo.isOwner && !order.isAccepted && (
                <div className="container my-4" style={{marginLeft:"27%",width:"50%"}}>
                  {loadingAccept && <LoadingBox></LoadingBox>}
                  {errorAccept && (
                    <MessageBox varient="danger">{errorAccept}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="btn btn-info block"
                    onClick={acceptHandler}
                  >
                    Accept Booking Order
                  </button>
                </div>
              )}



</div>

</div>

          <Footer />
        </>
   );
   
}

export default OrderDetail
