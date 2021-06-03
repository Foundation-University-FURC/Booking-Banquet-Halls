import react from "react";
import logo from '../images/Logo_SS.PNG';
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

{/* <nav classNameNameName="navbar navbar-expand-lg navbar-light bg-dark sticky-top">
<div classNameNameName="container-fluid">
<a classNameNameName="navbar-brand" href="/"><img classNameNameName="logo" src={logo}></img></a>
<button classNameNameName="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" >
<span classNameNameName="navbar-toggler-icon"></span>
</button>


<div classNameNameName="collapse navbar-collapse" id = "navbarNavDropdown">
<ul classNameNameName="navbar-nav ml-auto">
<li classNameNameName="nav-item dropdown active">

 </li>
 </ul>
</div>
</div>

</nav> */}



<nav className="navbar navbar-expand-lg navbar-light bg-dark sticky-top">
  <div className="container">
    <NavLink className="navbar-brand" to="/"><span><img style={{width:"150px",height:"70px"}} src={logo} alt="Logo image" /> </span> </NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item dropdown">
          {/* <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false"> */}
           {
            userInfo && !userInfo.isAdmin && !userInfo.isOwner &&(
              <div className="dropdown">
              <NavLink className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="#">{userInfo.name} </NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li><NavLink className="dropdown-item"  to="/Myprofile">My Profile</NavLink></li>
            <li><NavLink className="dropdown-item" to="/orderhistory">Order History</NavLink></li>
            <li><NavLink className="dropdown-item" to ="/signin" onClick={signoutHandler}>Signout</NavLink></li>
          </ul>

          </div>
            )}

           {
            userInfo && userInfo.isOwner &&(
              <div className="dropdown">
              <NavLink className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="#owner">Owner</NavLink>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
            <NavLink className="dropdown-item" to="/Myprofile">My Profile</NavLink>
            </li>
                  <li>
                    <NavLink className="dropdown-item" to="/HallsList/owner">Marriage Halls</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/orderlist/owner">Orders</NavLink>
                  </li>
                  <li><NavLink className="dropdown-item" to ="/signin" onClick={signoutHandler}>Sign Out</NavLink></li>
          </ul>
          </div>
            )
           }


{
  userInfo && userInfo.isAdmin ? (
    <div className="dropdown">
    <NavLink className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="#admin">Admin </NavLink>
    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li>
                    <NavLink className="dropdown-item" to="/AdminDashboard">Dashboard</NavLink>
                  </li>
                  <li>
            <NavLink className="dropdown-item" to="/Myprofile">My Profile</NavLink>
            </li>
                  <li>
                    <NavLink className="dropdown-item" to="/HallsList">Halls List</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/orderlist">Orders</NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/userlist">Users</NavLink>
                  </li>
                  {/* <li>
                    <NavLink className="dropdown-item" to="/support">Support</NavLink>
                  </li> */}
                  <li><NavLink className="dropdown-item" to ="/signin" onClick={signoutHandler}>Sign Out</NavLink></li>
</ul>
    </div>          
  ):!userInfo &&(
        <NavLink exact className="nav-link" to="/signin">Login</NavLink>
    )
}

          {/* </NavLink> */}
         
        </li>
      </ul>
    </div>
  </div>
</nav>








{/*
 {
    userInfo && !userInfo.isAdmin && !userInfo.isOwner ?(
       <div classNameNameName="dropdown1">
       <NavLink classNameNameName="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="#">{userInfo.name} <i classNameNameName ="fa fa-caret-down" /> </NavLink>
            <ul classNameNameName="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" >
            <li>
            <NavLink classNameNameName="dropdown-item" to="/Myprofile">My Profile</NavLink>
            </li>
            <li>
            <NavLink classNameNameName="dropdown-item" to="/orderhistory">Order History</NavLink>
            </li>
                <li><NavLink classNameNameName="dropdown-item" to ="/signin" onClick={signoutHandler}>Sign Out</NavLink></li>
            </ul>
       </div>

        
    ) 
    : 
     !userInfo &&(
        <NavLink exact classNameNameName="nav-link" to="/signin">Login</NavLink>
    )
 }


 {userInfo && userInfo.isOwner && (
              <div classNameNameName="dropdown1">
                <NavLink to="#Owner">
                  Owner <i classNameNameName="fa fa-caret-down"></i>
                </NavLink>
                <ul classNameNameName="dropdown1-content">
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
              <div classNameNameName="dropdown1">
                <NavLink to="#admin">
                  Admin <i classNameNameName="fa fa-caret-down"></i>
                </NavLink>
                <ul classNameNameName="dropdown1-content">
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
            */}


        </>
    );
}

export default Fnavbar;