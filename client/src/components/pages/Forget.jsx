import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from './Footer';

const Forget = (props) => {
// const id= props.params.id;
// const token= props.params.token;
const id = props.match.params.id;
const token = props.match.params.token;
console.log("Params Data id: ",id);
console.log("Params Data token: ",token);

const [password, setPassword] = useState('')
const [password2, setConfirmPassword] = useState('')
const [email, setEmail] = useState('')



useEffect(() => {
  const link = async () =>{
    try {
      const {data} =  await axios.get(`/api/reset-password/${id}/${token}`)
      setEmail(data)
    } catch (error) {
      console.log(error)
    }  
   
  }    
  link()
  }, []);

  const reset_Password = async (e) =>{
    e.preventDefault();
    if(password===password2){
    try {
    const reset = await axios.post(`/api/reset-password/${id}/${token}`,{password})
      window.alert("Your Password Reset Successfully!!!");
      props.history.push('/signin');
   
  } catch (error) {
      // console.log("Error is: ",error)
    }
  }else{
    window.alert("Password Not match!!");
  }

} 

    return (
        <>
<div className="container">
            <h1 className="fonttt" style={{textAlign:"center"}}>Reset Password for {email}</h1>
            <div className="row padding fonttt my-2" style={{marginLeft:"30%"}}>
            <div className = "col-lg-6 col-md-6 col-sm-12 card">    
                    <form className="contact-form" onSubmit={reset_Password}>
                    <div class="mb-3">
    <label for="exampleInputPassword1" className="form-label"><strong>Password</strong></label>
    <input type="password" className="form-control" id="exampleInputPassword1" required onChange= {(e)=>setPassword(e.target.value)} />
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" className="form-label"><strong>Confirm Password</strong></label>
    <input type="password" className="form-control" id="exampleInputPassword1" required onChange= {(e)=>setConfirmPassword(e.target.value)} />
  </div>
      <br/>
      <button type="submit" className="btn btn-danger mb-2">Reset Password</button>
    </form>
  
                    </div>
                   

            </div>

            </div>

<Footer/>

        </>
    )
}

export default Forget
