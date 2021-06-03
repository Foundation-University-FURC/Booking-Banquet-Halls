import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/userActions';
import LoadingBox from '../../components/pages/LoadingBox';
import MessageBox from '../../components/pages/MessageBox';
import Simg from '../images/forSignin.PNG';
import Simg2 from '../images/forsignin2.PNG';
import Simg3 from '../images/forsignin3.PNG';
import { Carousel } from "react-bootstrap";

const Signup = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match');
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);


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
     <h3>SIGNUP DETAILS</h3>
   </span>
   {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox varient="danger">{error}</MessageBox>}
              <form  onSubmit={submitHandler}>
  <div className="mb-3">
    <label for="exampleInputName" class="form-label">Enter Full Name</label>
    <input type="text" className="form-control" id="exampleInputName1" aria-describedby="nameHelp"   placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
    </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email Address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  placeholder="Valid Email" required onChange= {(e)=>setEmail(e.target.value)} />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" required placeholder="Correct Password" onChange= {(e)=>setPassword(e.target.value)} />
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" required placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">SIGNUP</button>
  <p id="h33">
             Already Have an Account &nbsp;
              <span> <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link></span>
            </p>
</form>
        

</div>

</div>

</div>
</div>






      {/* <div className="background">
        <div className="Mainn">
          <div className="signup">
          <form  onSubmit={submitHandler}>
            <h2>New member Registration</h2>
            {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
       
            <div className="formm">
           
              <input type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div className="emps">
              <input type="email" placeholder="Enter Email"  onChange={(e) => setEmail(e.target.value)}></input>

              <input type="password" id="pass" placeholder="Enter Password"  onChange={(e) => setPassword(e.target.value)}></input>
              <br/>
              <br/>
              <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)}></input>
            </div>

            <p id="h33">
              By creating an account ,you agree to our
              <span>Terms and Conditions</span>
            </p>
            <Button type="submit" id="account">Create an Account</Button>
            <p id="h33">
             Already Have an Account &nbsp;
              <span> <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link></span>
            </p>
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
};
export default Signup;
