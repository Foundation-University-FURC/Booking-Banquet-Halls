import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser, signout } from '../../actions/userActions';
import { USER_DETAILS_RESET } from '../../constants/userConstants';
import Footer from './Footer';
import Footer2 from './Footer2';
import LoadingBox from './LoadingBox';
import MessageBox from './MessageBox';

export default function UsersList(props) {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
        type: USER_DETAILS_RESET,
      });
  }, [dispatch,successDelete]);

  const deleteHandler = (user) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteUser(user._id));
    }
  };

  const signoutHandler = ()=>{
    dispatch(signout())
  console.log("users email: ",users)
  }

  return (
    <div>


<div id="mySidenav_dashboard" className="sidenav_dashboard">
  {/* <NavLink className="Dashboard_a" to="/" id="Dashboard"><i className="fas fa-clipboard-list"></i> Dasher</NavLink> */}
  <NavLink className="Dashboard_a" to="/Myprofile" id="My_Profile"><i className="fas fa-user-alt"></i> Profile</NavLink>
  <NavLink className="Dashboard_a" to="/HallsList" id="Halls_List"><i className="fas fa-th-list"></i> Halls</NavLink>
  <NavLink className="Dashboard_a" to="/orderlist" id="Orders_List"><i className="fas fa-tasks"></i> Orders</NavLink>
  <NavLink className="Dashboard_a" to="/userlist" id="Users_List"><i className="fas fa-users"></i> Users</NavLink>
  <NavLink className="Dashboard_a" to="/signin" id="SignOut_Dashboard" onClick={signoutHandler} ><i className="fas fa-sign-out-alt"></i> Logout</NavLink>
</div>

      <h1 className="fonttt" style={{textAlign:"center"}}>All Users</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox varient="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox varient="success">User Deleted Successfully</MessageBox>
      )}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox varient="danger">{error}</MessageBox>
      ) : (
        <div style={{overflowX:"auto"}}>
        <table className="table container mb-5">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>IS OWNER</th>
              <th>IS ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isOwner ? 'YES' : ' NO'}</td>
                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                <td>
                <i className="fas fa-edit" style={{color:"green", width:"40px", fontSize:"30px",textShadow:"2px 2px 2px black"}}  onClick={() => props.history.push(`/users/${user._id}/edit`)}/> 

                <i className="fas fa-trash-alt" style={{color:"red", fontSize:"30px",textShadow:"2px 2px 2px gray"}}  onClick={() => deleteHandler(user)} />
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