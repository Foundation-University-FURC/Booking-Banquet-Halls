import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
import {useDispatch, useSelector } from "react-redux";
import {hallList,createHall,deleteHall} from '../../actions/HallsActions'
import { HALL_CREATE_RESET,HALL_DELETE_RESET, } from '../../constants/HallsConstant';
import Footer from "./Footer"
import Footer2 from './Footer2';
import { signout } from '../../actions/userActions';

export default function HallsList(props) {
  const ownerMode = props.match.path.indexOf('/owner') >= 0;

    const HallsList= useSelector((state) => state.HallsList)
    const {loading,error, data} = HallsList

    const HallCreate = useSelector((state) => state.HallCreate);
    // For Creating Hall
    const {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
      Hall: createdHall,
    } = HallCreate;
// for Deleting Hall
const hallDelete = useSelector((state) => state.hallDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = hallDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

    const dispatch = useDispatch()
    useEffect(()=>{
      if (successCreate) {
        dispatch({type: HALL_CREATE_RESET });
        props.history.push(`/HallsList/${createdHall._id}/edit`);
      }
      if (successDelete) {
        dispatch({ type: HALL_DELETE_RESET });
      }
      dispatch(hallList({ owner: ownerMode ? userInfo._id : '' }))

    },[dispatch, successCreate, ownerMode, createdHall,props.history, successDelete,userInfo._id,]);
  const deleteHandler = (Hall) => {
    /// TODO: dispatch delete action
    if (window.confirm('Are you sure to Delete?')) {
      dispatch(deleteHall(Hall._id));
    }

  };

  const createHandler = () => {
    dispatch(createHall());
  };


  const signoutHandler = ()=>{
    dispatch(signout())
}
  return (
      <>

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

    <div className=" container my-5">
      <h1 className="fonttt" style={{textAlign:"center"}}>Marriage Halls Lists</h1>
      <div className="row mb-3 HL-button">
        <button style={{width:"150px",marginLeft:"85.5%"}} type="button" className="btn btn-info" onClick={createHandler}>
          <b>+ </b>Marriage Hall
        </button>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox varient="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox varient="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox varient="danger">{error}</MessageBox>
      ) : (
        <div style={{overflowX:"auto"}} className="fonttt">
        <table className="table">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>NAME</th>
              <th>PRICE</th>
              <th>Location</th>
              <th>Rating</th>
              <th>Contact No</th>
              <th>Email</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data) => (
              <tr key={data._id}>
                <td><img className="circularimage" src={data.image} alt="image" /><b><span>{data.name}</span></b></td>
                {/* <td>{data.name}</td> */}
                <td>{data.price}</td>
                <td>{data.location}</td>
                <td>{data.rating}</td>
                <td>{data.Contact_No}</td>
                <td>{data.Email}</td>
                <td>
                 {/* <button
                    // type="button"
                    // className="btn btn-warning"
                    
                    onClick={() =>
                      props.history.push(`/HallsList/${data._id}/edit`)
                    }
                  >
                    Edit
                  </button> */}
                  <i className="fas fa-edit mt-3" style={{color:"green", width:"40px", fontSize:"30px",textShadow:"2px 2px 2px black"}}  
                  onClick={() =>props.history.push(`/HallsList/${data._id}/edit`) }/> 

                  <i className="fas fa-trash-alt mt-3" style={{color:"red", fontSize:"30px",textShadow:"2px 2px 2px gray"}}  onClick={() => deleteHandler(data)}></i>  
                  {/* <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => deleteHandler(data)}
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
    <Footer2 /> 
   </>
  );
}