import React, { Component, useState } from "react";
import Button from "@material-ui/core/Button";
import {link, NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signin } from "../../actions/userActions";
import { useEffect } from "react";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";
// import { Carousel } from 'react-responsive-carousel';
import Simg from '../images/forSignin.PNG';
import Simg2 from '../images/forsignin2.PNG';
import Simg3 from '../images/forsignin3.PNG';
import { Carousel } from "react-bootstrap";


const Signin = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const redirect = props.location.search ? props.location.search.split('=')[1]
  :'/';
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch()
  const submitHandler = (e)=>{
    e.preventDefault();
    //TODO: SignIn Action Here
    dispatch(signin(email,password))
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
              <form  onSubmit={submitHandler}>
  <div className="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  required onChange= {(e)=>setEmail(e.target.value)} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" required onChange= {(e)=>setPassword(e.target.value)} />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">LOGIN</button>
  <p id="h33">
             Create an account &nbsp;
              <span><NavLink to={`/signup?redirect=${redirect}`}>SIGNUP?</NavLink></span>
            </p>
</form>
        

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
