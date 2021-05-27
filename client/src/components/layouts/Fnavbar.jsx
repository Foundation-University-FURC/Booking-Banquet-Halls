import react from "react";
import logo from '../images/logo5.png';
import {NavLink, Route, Switch} from 'react-router-dom'
// import img from "../images/marriage.jfif";
import { useDispatch, useSelector } from 'react-redux';
import {signout} from '../../actions/userActions'
import SearchBox from "../pages/SearchBox";

const Fnavbar = () =>{
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch()
    const signoutHandler = ()=>{
            dispatch(signout())
    }
    return (
        <> 

<nav className="navbar navbar-expand-md navbar-light bg-dark sticky-top">
<div className="container-fluid">
<a className="navbar-brand" href="/"><img className="logo" src={logo}></img></a>
<button className="navbar-toggler bg-light" type="button" data-toggle="collapse" data-target="#navbarResponsive">
<span className="navbar-toggler-icon"></span>
</button>


<div className="collapse navbar-collapse" id="navbarResponsive">
<ul className="navbar-nav ml-auto">
<li className="nav-item active">
{
    userInfo && !userInfo.isAdmin && !userInfo.isOwner ?(
       <div className="dropdown1">
       <NavLink to="#">{userInfo.name} <i className ="fa fa-caret-down" /> </NavLink>
            <ul className="dropdown1-content">
            <li>
            <NavLink to="/Myprofile">My Profile</NavLink>
            </li>
            <li>
            <NavLink to="/orderhistory">Order History</NavLink>
            </li>
                <li><NavLink to ="/signin" onClick={signoutHandler}>Sign Out</NavLink></li>
            </ul>
       </div>

        
    ) 
    : 
     !userInfo &&(
        <NavLink exact className="nav-link" to="/signin">Login</NavLink>
    )
 }


 {userInfo && userInfo.isOwner && (
              <div className="dropdown1">
                <NavLink to="#Owner">
                  Owner <i className="fa fa-caret-down"></i>
                </NavLink>
                <ul className="dropdown1-content">
                <li>
            <NavLink to="/Myprofile">My Profile</NavLink>
            </li>
                  <li>
                    <NavLink to="/HallsList/owner">Marriage Halls</NavLink>
                  </li>
                  <li>
                    <NavLink to="/orderlist/owner">Orders</NavLink>
                  </li>
                  <li><NavLink to ="/signin" onClick={signoutHandler}>Sign Out</NavLink></li>
                </ul>
              </div>
            )}


 {userInfo && userInfo.isAdmin && (
              <div className="dropdown1">
                <NavLink to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </NavLink>
                <ul className="dropdown1-content">
                  <li>
                    <NavLink to="/AdminDashboard">Dashboard</NavLink>
                  </li>
                  <li>
            <NavLink to="/Myprofile">My Profile</NavLink>
            </li>
                  <li>
                    <NavLink to="/HallsList">Halls List</NavLink>
                  </li>
                  <li>
                    <NavLink to="/orderlist">Orders</NavLink>
                  </li>
                  <li>
                    <NavLink to="/userlist">Users</NavLink>
                  </li>
                  <li>
                    <NavLink to="/support">Support</NavLink>
                  </li>
                  <li><NavLink to ="/signin" onClick={signoutHandler}>Sign Out</NavLink></li>
                </ul>
              </div>
            )}

{/* <span className="sm-hide">|</span> */}
 </li>
 {/* <li className="nav-item ">
 <NavLink className="nav-link" to="/signup">Signup</NavLink>
 </li> */}
 </ul>
</div>
</div>

</nav>
        </>
    );
}

export default Fnavbar;