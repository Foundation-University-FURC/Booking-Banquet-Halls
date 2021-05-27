import React, { Component, useState } from "react";
import Button from "@material-ui/core/Button";
import {link, NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signin } from "../../actions/userActions";
import { useEffect } from "react";
import LoadingBox from "./LoadingBox";
import MessageBox from "./MessageBox";


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
      <div className="background">
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
            {/* <h2 className="PP">OR </h2>
            <div className="formms">
              <Button id="ee" className="fb">
               
                <i
                  className="tool1"
                  className="fa fa-2x fa-facebook-square"
                ></i>
                <span>Sign in with Facebook</span>
              </Button>
              <Button id="ee" className="email">
               
                <i class="fa fa-2x fa-envelope-square"></i>
                Sign In with Email
              </Button>

            </div> */}
            <p id="h33">
             Create an account &nbsp;
              <span><NavLink to={`/signup?redirect=${redirect}`}>Signup</NavLink></span>
            </p>
          </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signin;
