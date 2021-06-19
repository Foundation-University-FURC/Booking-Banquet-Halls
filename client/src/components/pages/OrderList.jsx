import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {deleteOrder, listOrders } from '../../actions/orderActions';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';
import { ORDER_DELETE_RESET } from '../../constants/orderConstants';
import Footer from './Footer';
import Footer2 from './Footer2';
import { signout } from '../../actions/userActions';
import { NavLink } from 'react-router-dom';

export default function OrderList(props) {

  const ownerMode = props.match.path.indexOf('/owner') >= 0;

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders({ owner: ownerMode ? userInfo._id : '' }));
  }, [dispatch, ownerMode , successDelete, userInfo._id]);
  const deleteHandler = (order) => {
    // TODO: delete handler
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order._id));
    }
  };

  const signoutHandler = ()=>{
    dispatch(signout())
}

  return (
    <div>

{
  userInfo && userInfo.isAdmin &&(

<div id="mySidenav_dashboard" className="sidenav_dashboard">
  {/* <NavLink className="Dashboard_a" to="/" id="Dashboard"><i className="fas fa-clipboard-list"></i> Dasher</NavLink> */}
  <NavLink className="Dashboard_a" to="/Myprofile" id="My_Profile"><i className="fas fa-user-alt"></i> Profile</NavLink>
  <NavLink className="Dashboard_a" to="/HallsList" id="Halls_List"><i className="fas fa-th-list"></i> Halls</NavLink>
  <NavLink className="Dashboard_a" to="/orderlist" id="Orders_List"><i className="fas fa-tasks"></i> Orders</NavLink>
  <NavLink className="Dashboard_a" to="/userlist" id="Users_List"><i className="fas fa-users"></i> Users</NavLink>
  <NavLink className="Dashboard_a" to="/signin" id="SignOut_Dashboard" onClick={signoutHandler} ><i className="fas fa-sign-out-alt"></i> Logout</NavLink>
</div>
  )
  }


      <h1 className="fonttt" style={{textAlign:"center"}}>All Orders</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox varient="danger">{errorDelete}</MessageBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox varient="danger">{error}</MessageBox>
      ) : (
        <div style={{overflowX:"auto"}}>
        <table className="table container mb-5">
          <thead>
            <tr>
            <th>NAME</th>
            <th>USER</th>
              <th>EVENT DATE</th>
              <th>EVENT TYPE</th>
              <th>CREATED AT</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.orderItems.map((val)=>(
                  <img className="circularimage" src= {val.image} alt="Marriage Hall Image" />
                ))}&nbsp; <b> {order.orderItems.map(value=>(
                  value.name
                ))}</b></td>
                <td>{order.user.name}</td>
                <td>{order.orderItems.map((value)=>(
                  value.date.substring(0,10)
                ))}</td>
                <td>{order.orderItems.map((value)=>(
                  value.EventType
                ))}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  {order.isAccepted
                    ? order.acceptedAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <i className="fas fa-eye" style={{color:"green", width:"40px", fontSize:"30px",textShadow:"2px 2px 2px black"}}
                    onClick={() => {
                      props.history.push(`/orders/${order._id}`);
                    }}></i>
                  <i className="fas fa-trash-alt" style={{color:"red", fontSize:"30px",textShadow:"2px 2px 2px gray"}} onClick={() => deleteHandler(order)}></i> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      <Footer2/>
    </div>
  );
}