import React, { useState } from 'react'

function ResetPassword() {

    const [password, setPassword] = useState('')
    const [password2, setConfirmPassword] = useState('')

    const reset_Password = (e) =>{
        e.preventDefault();
    } 

    return (
        <>
            <div className="container">
            <h1>Reset Password</h1>
            <div className="row padding">
            <div className = "col-lg-6 col-md-6 col-sm-12 col-xs-12">    
                    <form className="contact-form" onSubmit={reset_Password}>
                    <div class="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" required onChange= {(e)=>setPassword(e.target.value)} />
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" required onChange= {(e)=>setConfirmPassword(e.target.value)} />
  </div>
      <br/>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  
                    </div>
                   

            </div>

            </div>
        </>
    )
}

export default ResetPassword
