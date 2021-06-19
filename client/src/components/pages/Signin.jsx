import React, { Component, useState } from "react";
import Button from "@material-ui/core/Button";
import {link, NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { forget, signin } from "../../actions/userActions";
import { useEffect } from "react";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
// import { Carousel } from 'react-responsive-carousel';
import Simg from '../images/forSignin.PNG';
import Simg2 from '../images/forsignin2.PNG';
import Simg3 from '../images/forsignin3.PNG';
import { Carousel } from "react-bootstrap";
import axios from "axios";


const Signin = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [email2, setEmail2] = useState('')
  // const [response, setResponse] = useState('')
  const redirect = props.location.search ? props.location.search.split('=')[1]
  :'/';
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const userForget = useSelector((state) => state)
  const {loading:loadingforget, user: userforget, error:errorforget} = userForget;


  const dispatch = useDispatch()
  const submitHandler = (e)=>{
    e.preventDefault();
    //TODO: SignIn Action Here
    dispatch(signin(email,password))
  }
  
  const submitHandler2 = async (e)=>{
    e.preventDefault();
    //TODO: Forget Action Here
      // dispatch(forget(email2))
      try {
        const sendemail = await axios.post('/api/forget-password',{email2});
        console.log("Response: ",sendemail);
        window.alert(sendemail.data)
      } catch (error) {
        console.log(error)
      }
      
  }
  
  useEffect(() => {
    if(userInfo){
      props.history.push(redirect)
    }
  }, [props.history,redirect,userInfo])

  return (
    <> 

<div className="card container" style={{width: "100%", borderRadius:"1rem"}}>
<div className="container-full" style={{marginLeft:"-15px"}}>
<div className="row">
<div className="col-lg-6 col-md-6 col-sm-12">
<Carousel>
  <Carousel.Item claasName="c-item">
    <img
      className="d-block w-100"
      src={Simg}
      alt="First slide"
    />
    {/* <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption> */}
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={Simg2}
      alt="Second slide"
    />

    {/* <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption> */}
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={Simg3}
      alt="Third slide"
    />

    {/* <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption> */}
  </Carousel.Item>
</Carousel>
</div>

<div className="col-lg-6 col-md-6 col-sm-12">
   <span className="fonttt mt-5" style={{textAlign:"center"}}>
     <h3>LOGIN DETAILS</h3>
   </span>
   {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox varient="danger">{error}</MessageBox>}
  <form onSubmit={submitHandler}>
  <div className="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required onChange= {(e)=>setEmail(e.target.value)} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" required onChange= {(e)=>setPassword(e.target.value)} />
  </div>
  <div className="col-lg-12 col-md-6 col-sm-4">
  <button type="submit" className="btn btn-primary mt-3">LOGIN</button>
  </div>
  <p id="h33">
             Create an account &nbsp;
              <span><NavLink to={`/signup?redirect=${redirect}`}>SIGNUP?</NavLink></span>
            </p>
</form>


<div className="mb-3 form-check">
    <button className="btn btn-default" data-toggle="modal" data-target="#myModal">Forget Password?</button>

    {/* <!-- Modal --> */}
  <div className="modal fade" id="myModal" role="dialog">
    <div className="modal-dialog">
    
      {/* <!-- Modal content--> */}
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Forget Password?</h4>
        </div>
{/* {loadingforget && <LoadingBox></LoadingBox>}
{errorforget && <MessageBox varient="danger">{errorforget}</MessageBox>} */}
        <form onSubmit={submitHandler2}>
        <div class="modal-body">
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your Email Here..." required onChange= {(e)=>setEmail2(e.target.value)} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="modal-footer">
          <button type="submit" style={{width:"20%"}} className="btn btn-info">Send</button>
          <button type="button" style={{width:"20%"}} className="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
        </form>
      </div>
      
    </div>
  </div>
  
  </div>


</div>

</div>

</div>
</div>




    
      {/* <div className="background">
        <div className="Mainn">
          <div className="sign">
            <h3>Sign In</h3>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox varient="danger">{error}</MessageBox>}
            <form className="form" onSubmit={submitHandler}>
            <input type="text" id="un" placeholder="username" required onChange= {(e)=>setEmail(e.target.value)} ></input>
            <br></br>
            <input type="password" id="pas" placeholder="password" required onChange= {(e)=>setPassword(e.target.value)} ></input>
            <br></br>
            <Button className="mt-5" type="submit" id="lgg">Log in</Button>
            <p id="h33">
             Create an account &nbsp;
              <span><NavLink to={`/signup?redirect=${redirect}`}>Signup</NavLink></span>
            </p>
          </form>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default Signin;
