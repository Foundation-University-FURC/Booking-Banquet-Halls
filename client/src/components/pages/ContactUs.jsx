import React from 'react'
import emailjs from 'emailjs-com';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import wahab from '../images/Wahab.PNG';
import alamdar from '../images/Alamdar.PNG';
import dani from '../images/Dani.PNG';
import ali from '../images/Ali.PNG';
import Carousel_why from './Carousel_why';
import Footer from './Footer';
import Footer2 from './Footer2';

const ContactUs = () => {

const sendEmail = (e) =>{
    e.preventDefault();

    emailjs.sendForm('service_h8zqq5e','template_t8xe4qt', e.target, 'user_S6wgb7NLa7VgZR75qElsb')  
    .then((result) => {
        window.alert("Your Information has been Submitted Successfully!!!");
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    
      e.target.reset();
}

    return (
        <>

            <div className="container">
              <b><strong><h1 className="fonttt mt-3" style={{textAlign:"center"}}>Please get in touch and our expert support team will answer all your questions.</h1></strong></b>
                <div className = "row padding">
                    <div className = "col-lg-6 col-md-6 col-sm-12 col-xs-12">    
                    <form className="contact-form" onSubmit={sendEmail}>
      {/* <input type="hidden" name="contact_number" /> */}
      <b><label for="exampleInputName1" class="form-label">Name</label></b>
      <input type="text" className="form-control" id="exampleInputName1" aria-describedby="userName" name="name" required placeholder="Enter Full Name" />
      <br/>
     <b><label for="exampleInputSubject1" class="form-label">Subject</label></b> 
      <input type="text" className="form-control" id="exampleInputSubject1" aria-describedby="subject" name="subject" required placeholder="Enter Subject" />
      <br/>
     <b> <label for="exampleInputEmail1" class="form-label">Email</label></b> 
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" required placeholder="Enter Email" />
      <br/>
     <b> <label for="exampleInputMsg1" class="form-label">Message:</label></b> 
      <textarea className="form-control" style={{width:"100%",height:'8rem'}} name="message" required placeholder="Write Message..." />
      <br/>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  
                    </div>
                    
                    <div className = "col-lg-6 col-md-6 col-sm-12 col-xs-12">    
                        <div className="contactUs123">
                            <div className="contactUS-text">
                            <p><PhoneIcon  />+923041840736</p>
                            <br/>
                            <p><EmailIcon />info@eventhub.com</p>
                            <br/>
                            <p><LocationOnIcon />Foundation University Islamabad Pakistan</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



    <div className="container my-5">
        <div className="card contact-card shadow p-3 mb-5 bg-body rounded" style={{width: "70rem",borderRadius:"2rem"}}>
        <div className="row padding" style={{textAlign:"center", paddingTop:"1rem"}}>
        <strong><b><h1>Meet our brilliant and knowledgeable support team</h1> </b></strong>
        <h5>Live Support is available Mon-Fri 8am-6pm ET / 10am-Midnight GMT</h5>
       
        </div>
        <hr/>
        <div className="row padding fonttt " style={{textAlign:"center"}}>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <img className="team-circular" src={wahab} alt = "Team Image" />
            <p><span><b>Abdul Wahab</b></span></p>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <img className="team-circular" src={alamdar} alt = "Team Image" />
            <p><span><b>Alamdar Ali</b></span></p>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <img className="team-circular" src={dani} alt = "Team Image" />
            <p><span><b>Mian Daniyal</b></span></p>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
            <img className="team-circular" src={ali} alt = "Team Image" />
           <p> <span><b>Ali Hassan</b></span></p>
        </div>
        
         </div>
        </div>

    </div> 

    <Carousel_why />
        <br/>
    <Footer2 />
        </>
    )
}

export default ContactUs
