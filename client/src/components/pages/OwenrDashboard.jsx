import React, { Component, useEffect, useState } from "react";
import Footer from "./Footer"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, signout } from "../../actions/userActions";
import { USER_DETAILS_RESET } from "../../constants/userConstants";
import axios from "axios";
import Carousel_why from "./Carousel_why";
import Footer2 from './Footer2';
import PhoneIcon from '@material-ui/icons/Phone';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar} from 'recharts';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


const OwnerDashboard = () => {

  const dispatch = useDispatch()
  const signoutHandler = ()=>{
          dispatch(signout())
  }

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  var ownerId= userInfo._id;


  const [users, setUsers] = useState(0)
  const [orders, setOrders] = useState(0)
  const [halls, setHalls] = useState(0)
  const [earnings, setEarnings] = useState(0)
  const [pendings, setPendings] = useState(0)
 
  const data = [
    
    { 
        heading: "Pendings",
        value: pendings,
      },
    {
        heading: "Booking Halls",
      value: orders,
    },{
        heading: "MHalls",
      value: halls,
    }, 
    { 
        heading: "Total Earnings",
        value: earnings,
      },
  ]
  


  const data01 = [
    { name: 'Pendings', value: pendings },
    { name: 'Booking Halls', value: orders }
  ];
  const data02 = [
    { name: 'Marriage Halls', value: halls },
    { name: 'Eranings', value: earnings },
  ];
  


  useEffect(() => {


    
  //   const fetchusers = async ()=>{
  //     try {
  //       const {data} = await axios.get('/api/user-count')
  //       setUsers(data);
  //       console.log("data is: " + data)
  //       console.log("data issss: " + users)
  //     } catch (error) {
  //       console.log(error);
  //     }
     
  // }
    const fetchorders = async ()=>{
      try {
       
        const {data} = await axios.get('/api/order-count-owner',{params: {ownerId}});
        setOrders(data);
        console.log("data is: " + data)
        console.log("data issss: " + users)
      } catch (error) {
        console.log(error);
      }
     
  }
    const fetchhalls = async ()=>{
      try {
        
        const {data} = await axios.get('/api/hall-count-owner',{params:{ownerId}})
        setHalls(data);
        console.log("data is: " + data)
        console.log("data issss: " + users)
      } catch (error) {
        console.log(error);
      }
     
  }

    const fetchearning = async ()=>{
      try {
        const {data} = await axios.get('/api/earning-count-owner',{params:{ownerId}})
        setEarnings(data);
        console.log("data is: " + data)
        console.log("data issss: " + users)
      } catch (error) {
        console.log(error);
      }
     
  }

    const fetchpending = async ()=>{
      try {
        const {data} = await axios.get('/api/pending-count-owner',{params:{ownerId}})
        setPendings(data);
        console.log("data is: " + data)
        console.log("data issss: " + users)
      } catch (error) {
        console.log(error);
      }
     
  }
  
  // fetchusers()
  fetchorders()
  fetchhalls()
  fetchearning()
  fetchpending()

  
  }, []);


  return (
    <>

<div id="mySidenav_dashboard" className="sidenav_dashboard">
  
   <NavLink className="Dashboard_a" to="/Myprofile" id="My_Profile_owner"><i className="fas fa-user-alt"></i> Profile</NavLink>
  <NavLink className="Dashboard_a" to="/HallsList/owner" id="Halls_List_owner"><i className="fas fa-th-list"></i>My Halls</NavLink>
  <NavLink className="Dashboard_a" to="/orderlist/owner" id="Orders_List_owner"><i className="fas fa-tasks"></i> Orders</NavLink>
  <NavLink className="Dashboard_a" to="/ContactUS" id="Contactus_owner"><PhoneIcon />Contact</NavLink>
  <NavLink className="Dashboard_a" to="/signin" id="SignOut_Dashboard_owner" onClick={signoutHandler} ><i className="fas fa-sign-out-alt"></i> Logout</NavLink>

</div>



      <div className ="container dasher fonttt" style={{marginLeft:"9%"}}>
        <div className="row padding">
           <h1>Dashboard</h1>
           <div className="row padding">
            <div className="col-lg-3 col-md-6 col-sm-12">
  <div className="card" style={{width: "14rem", textAlign:"center", backgroundColor:"#2196F3", color:"white"}}>
  <div className="card-body fonttt">
     <h5 className="card-title"><i class="fas fa-eye"></i> Pendings</h5>
    <h3 className="card-subtitle mb-2">{pendings}</h3>
  </div>
</div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
  <div className="card" style={{width: "14rem", textAlign:"center", backgroundColor:"#555", color:"white"}}>
  <div className="card-body fonttt">
    <h5 className="card-title"><i className="fas fa-tasks"></i> Total Bookings</h5>
    <h3 className="card-subtitle mb-2">{orders}</h3>
    {/* <h6 className="card-subtitle mb-2">Pendings</h6>
    <h6 className="card-subtitle">{pendings}</h6> */}
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
</div>
            </div>


            <div className="col-lg-3 col-md-6 col-sm-12">
  <div className="card" style={{width: "14rem", textAlign:"center", backgroundColor:"#f44336", color:"white"}}>
  <div className="card-body fonttt">
    <h5 className="card-title"><i className="fas fa-th-list"></i> Marriage Halls</h5>
    <h3 className="card-subtitle mb-2">{halls}</h3>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
</div>
            </div>


            <div className="col-lg-3 col-md-6 col-sm-12">
  <div className="card" style={{width: "14rem", textAlign:"center", backgroundColor:"green", color:"white"}}>
  <div className="card-body fonttt">
    <h5 className="card-title"><i class="far fa-money-bill-alt"></i> Total Earning</h5>
    <h3 className="card-subtitle mb-2">Rs. {earnings}</h3>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
</div>
            </div>


           </div>

{/* <Charts/> */}
<div className="container mt-5">
<div className="row padding">
<div className="col-lg-8 col-md-6 col-sm-12">
<div style={{width: '50vw', height: 'auto'}}>
    <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="heading" />
      <YAxis />
      <Bar label={true} dataKey="value" fill="#8884d8" />
    </BarChart>
  </div>
</div>

<div className="col-lg-4 col-md-6 col-sm-12 ">
<ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
          <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
        </PieChart>
      </ResponsiveContainer>
</div>
</div>

</div>

     


    <Carousel_why />
      </div>
      
      </div>

      <Footer2 />
    </>
  );
};
export default OwnerDashboard;
