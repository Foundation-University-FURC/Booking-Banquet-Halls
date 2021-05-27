import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../actions/userActions';
import LoadingBox from '../../components/pages/LoadingBox';
import MessageBox from '../../components/pages/MessageBox';


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
      <div className="background">
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
            {/* <h2 className="PP">OR </h2> */}
            {/* <div className="formms">
              <Button className="fb">
               
                <i
                  className="tool1"
                  className="fa fa-2x fa-facebook-square"
                ></i>
                <span> Connect with Facebook</span>
              </Button>
              <Button className="email">
                <i class="fa fa-2x fa-envelope-square"></i>
                Sign up with Email
              </Button>
            </div> */}
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
      </div>
    </>
  );
};
export default Signup;
