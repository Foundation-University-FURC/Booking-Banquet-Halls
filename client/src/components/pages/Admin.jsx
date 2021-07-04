import React, { Component, useEffect, useState } from "react";
import Footer from "./Footer"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, signout } from "../../actions/userActions";
import { USER_DETAILS_RESET } from "../../constants/userConstants";
import axios from "axios";
import Carousel_why from "./Carousel_why";
import Footer2 from './Footer2';


const Admin = () => {

  const dispatch = useDispatch()
  const signoutHandler = ()=>{
          dispatch(signout())
  }

  const [users, setUsers] = useState(0)
  const [orders, setOrders] = useState(0)
  const [halls, setHalls] = useState(0)
  const [earnings, setEarnings] = useState(0)
  // const [pendings, setPendings] = useState(0)
 
  useEffect(() => {

    const fetchusers = async ()=>{
      try {
        const {data} = await axios.get('/api/user-count')
        setUsers(data);
        console.log("data is: " + data)
        console.log("data issss: " + users)
      } catch (error) {
        console.log(error);
      }
     
  }
    const fetchorders = async ()=>{
      try {
        const {data} = await axios.get('/api/order-count')
        setOrders(data);
        console.log("data is: " + data)
        console.log("data issss: " + users)
      } catch (error) {
        console.log(error);
      }
     
  }
    const fetchhalls = async ()=>{
      try {
        const {data} = await axios.get('/api/hall-count')
        setHalls(data);
        console.log("data is: " + data)
        console.log("data issss: " + users)
      } catch (error) {
        console.log(error);
      }
     
  }

    const fetchearning = async ()=>{
      try {
        const {data} = await axios.get('/api/earning-count')
        setEarnings(data);
        console.log("data is: " + data)
        console.log("data issss: " + users)
      } catch (error) {
        console.log(error);
      }
     
  }

  //   const fetchpending = async ()=>{
  //     try {
  //       const {data} = await axios.get('/api/pending-count')
  //       setPendings(data);
  //       console.log("data is: " + data)
  //       console.log("data issss: " + users)
  //     } catch (error) {
  //       console.log(error);
  //     }
     
  // }
  
  fetchusers()
  fetchorders()
  fetchhalls()
  fetchearning()
  // fetchpending()
  
  }, []);


  return (
    <>

<div id="mySidenav_dashboard" className="sidenav_dashboard">
  {/* <NavLink className="Dashboard_a" to="/" id="Dashboard"><i className="fas fa-clipboard-list"></i> Dasher</NavLink> */}
   <a className="Dashboard_a" href="/Myprofile" id="My_Profile"><i className="fas fa-user-alt"></i> Profile</a>
  <NavLink className="Dashboard_a" to="/HallsList" id="Halls_List"><i className="fas fa-th-list"></i> Halls</NavLink>
  <NavLink className="Dashboard_a" to="/orderlist" id="Orders_List"><i className="fas fa-tasks"></i> Orders</NavLink>
  <NavLink className="Dashboard_a" to="/userlist" id="Users_List"><i className="fas fa-users"></i> Users</NavLink>
  <NavLink className="Dashboard_a" to="/signin" id="SignOut_Dashboard" onClick={signoutHandler} ><i className="fas fa-sign-out-alt"></i> Logout</NavLink>
</div>



      <div className ="container dasher fonttt" style={{marginLeft:"9%"}}>
        <div className="row padding">
           <h1>Dashboard</h1>
           <div className="row padding">
            <div className="col-lg-3 col-md-6 col-sm-12">
  <div className="card dashboard_admin" style={{width: "14rem", textAlign:"center", backgroundColor:"rgb(247, 183, 7)", color:"white"}}>
  <div className="card-body fonttt">
    <h5 className="card-title"><i className="fas fa-users"></i> Total Users</h5>
    <h3 className="card-subtitle mb-2">{users}</h3>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
</div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-12">
  <div className="card dashboard_admin" style={{width: "14rem", textAlign:"center", backgroundColor:"#555", color:"white"}}>
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
  <div className="card dashboard_admin" style={{width: "14rem", textAlign:"center", backgroundColor:"#f44336", color:"white"}}>
  <div className="card-body fonttt">
    <h5 className="card-title"><i className="fas fa-th-list"></i> Marriage Halls</h5>
    <h3 className="card-subtitle mb-2">{halls}</h3>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
</div>
            </div>


            <div className="col-lg-3 col-md-6 col-sm-12">
  <div className="card dashboard_admin" style={{width: "14rem", textAlign:"center", backgroundColor:"green", color:"white"}}>
  <div className="card-body fonttt">
    <h5 className="card-title"><i class="far fa-money-bill-alt"></i> Total Earning</h5>
    <h3 className="card-subtitle mb-2">Rs. {earnings}</h3>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
  </div>
</div>
            </div>


           </div>


           <div style={{overflowX:"auto"}} className="container fonttt">
  <h1>Admin Info</h1>            
  <table className="table table-hover">
    <thead>
      <tr>
        <th>FIRSTNAME</th>
        <th>LASTNAME</th>
        <th>ROLL NO#</th>
        <th>EMAIL</th>
        <th>CLASS</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Abdul</td>
        <td>Wahab</td>
        <td>FUI/FURC/F17-BSCS 001</td>
        <td>ab89.wahab@gmail.com</td>
        <td>BSCS-8</td>
      </tr>
      <tr>
      <td>Alamdar</td>
        <td>Ali</td>
        <td>FUI/FURC/F17-BSCS 003</td>
        <td>alamdar.ali@gmail.com</td>
        <td>BSCS-8</td>
      </tr>
      <tr>
      <td>Mian Daniyal</td>
        <td>Shiraz</td>
        <td>FUI/FURC/F17-BSCS 014</td>
        <td>daniyal1283@gmail.com</td>
        <td>BSCS-8</td>
      </tr>
      <tr>
      <td>Ali</td>
        <td>Hassan</td>
        <td>FUI/FURC/F17-BSCS 037</td>
        <td>ali.hassan91170@gmail.com</td>
        <td>BSCS-8</td>
      </tr>
    </tbody>
  </table>
</div>


    <Carousel_why />
      </div>
      
      </div>

      <Footer2 />
    </>
  );
};
export default Admin;
