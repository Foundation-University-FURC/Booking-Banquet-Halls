import React,{useState, useEffect} from 'react'
import axios from 'axios'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import HomeIcon from '@material-ui/icons/Home';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import EmailIcon from '@material-ui/icons/Email';
import LanguageIcon from '@material-ui/icons/Language';
import { NavLink } from 'react-router-dom';
import Footer from './Footer'



const Cards_details = ({match}) => {
    const [cardD, setDetails] = useState([])
    useEffect(()=>{
        const fetchdetails = async ()=>{
            const {data} = await axios.get(`/api/cardlists/${match.params.id}`)
            setDetails(data)
            console.log("data is: " + data)
        }
        fetchdetails()
    },[match])

    return (
        <>
       <header className="venue-details">
  <div className="venue_title-details">
    <h1 className = "cheese-details">{cardD.name}</h1>
    <p className="scroll-details"><LocationOnIcon/>{cardD.location}</p>
  </div>
</header>
 
 <h3 className="GOBACK mt-3">
        <NavLink to='/design_card' style={{color:'black',textDecoration:"none"}}><span>←</span> GO BACK</NavLink>
      </h3>

        <div className="container mt-3">
            <div className="row padding">
                <div className="col-lg-6 col-sm-12">
                <img src={cardD.image} height="100%" width="100%" />
                </div>
                <div className="col-lg-6 col-sm-12">
                <div className="container">
          <h4 style={{fontStyle:"italic",fontWeight:"bolder", textAlign:"center"}}>{cardD.name}</h4>
          <p>
          <HomeIcon /> <b><strong style={{fontStyle:"italic",fontWeight:"bolder"}}>Address: </strong></b>{cardD.location}
          </p>
          <hr/>
          <p className="Price-details">
           <strong style={{fontStyle:"italic",fontWeight:"bolder"}}> Price:</strong><span> <b>RS.</b> {cardD.price} Per Picture</span>
          </p>
          <hr/>
          <p className="Contact-No">
         <ContactPhoneIcon /> <strong style={{fontStyle:"italic",fontWeight:"bolder"}}> Contact_NO: </strong> <span>{cardD.Contact_No}</span>
          </p>
          <p className="Email-details">
         <EmailIcon /> <strong style={{fontStyle:"italic",fontWeight:"bolder"}}> Email: </strong> <span>{cardD.Email}</span>
          </p>
          <p className="Website-details">
          <LanguageIcon /> <strong style={{fontStyle:"italic",fontWeight:"bolder"}}> Website: </strong> <span>{cardD.website}</span>
          </p>
        </div>
                </div>
            </div>
        </div>
      
      {/* <div className="mainInfo">
        <div className="image">
          <img src={grapher_Details.image} height="500px" width="600px" />
        </div>
        <div className="infoTxt">
          <h4>{grapher_Details.name}</h4>
          <p>
          <HomeIcon /> <b><strong>Address: </strong></b>{grapher_Details.location}
          </p>
          <p className="price">
           <strong> Price: </strong> <span>{grapher_Details.price}</span>
          </p>
          <p className="rentcar">
         <ContactPhoneIcon /> <strong> Contact_NO: </strong> <span>{grapher_Details.Contact_No}</span>
          </p>
          <p className="rentcar">
         <EmailIcon /> <strong> Email: </strong> <span>{grapher_Details.Email}</span>
          </p>
          <p className="rentcar">
          <strong> Website: </strong> <span>{grapher_Details.website}</span>
          </p>
        </div>
      </div> */}


<br/>
<hr />
<Footer />



        </>
    );
}

export default Cards_details