const jwt = require('jsonwebtoken')
const mg = require('mailgun-js')
// import {mg} from 'mailgun-js'

const generateToken = (user)=>{
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isOwner: user.isOwner,
    }, 
    process.env.JWT_SECRET || 'somethingsecret',
    {
        expiresIn: '1d',
    }
    )
}

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
      jwt.verify(
        token,
        process.env.JWT_SECRET || 'somethingsecret',
        (err, decode) => {
          if (err) {
            res.status(401).send({ message: 'Invalid Token' });
          } else {
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: 'No Token' });
    }
  };

  const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin Token' });
    }
  };
  
 const isOwner = (req, res, next) => {
    if (req.user && req.user.isOwner) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Owner Token' });
    }
  };

  const isOwnerOrAdmin = (req, res, next) => {
    if (req.user && (req.user.isOwner || req.user.isAdmin)) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Owner/Admin Token' });
    }
  };
  
const mailgun = () => mg({
apiKey: process.env.MAILGUN_API_KEY,
domain: process.env.MAILGUN_DOMAIN
});




const OrderEmailTemplate =(order)=>{

const name =order.orderItems.map((item)=>(
  item.name
))
const price =order.orderItems.map((item)=>(
  item.price
))
const date =order.orderItems.map((item)=>(
  item.date
))
const Guests =order.orderItems.map((item)=>(
  item.Guests
))
const Shift =order.orderItems.map((item)=>(
  item.Shift
))
const HallName =order.orderItems.map((item)=>(
  item.hallName
))
const Menu =order.orderItems.map((item)=>(
  item.Menu1
))
const Theme =order.orderItems.map((item)=>(
  item.Theme
))
const Services =order.orderItems.map((item)=>(
  item.Services
))
const Sitting =order.orderItems.map((item)=>(
  item.Sitting
))
const style =order.orderItems.map((item)=>(
  item.style
))
const EventType =order.orderItems.map((item)=>(
  item.EventType
))

const Total1=order.hallPrice; 
const Total2=order.MenuPrice; 
const Total3=order.ThemePrice; 
const Total4=order.ServicesPrice; 
const Total=order.TotalPrice; 


  return `<h1>Thanks for Booking Our Marriage Hall</h1>
          <p>Hi ${order.user.name}, </p>
          <p>We have Accepted your Booking order</p>
          <h2>[Booking Order ${order._id}] (${order.createdAt.toString().substring(0,10)})</h2>
          <div className="container">
          <div className="row padding">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <h2>Booking Invoice</h2>
            <table className="table table-hover fonttt">
    <thead >
      <tr>
        <th>Services</th>
        <th>Prices</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Hall ${HallName}</td>
        <td>${Total1}</td>
      </tr>
      <tr>
      <td>Menu ${Menu}</td>
        <td>${Total2}</td>
      </tr>
      <tr>
      <td>Theme ${Theme}</td>
        <td>${Total3}</td>
      </tr>
      <tr>
      <td>Services</td>
        <td>${Total4}</td>
      </tr>
      <tfoot>
    <tr>
      <td>Advance Bill</td>
      <td>${Total/2}</td>
    </tr>
    <tr>
      <td>Total Bill</td>
      <td>${Total}</td>
    </tr>
  </tfoot>

    </tbody>
  </table>
              </div>
              
              <div className="col-lg-6 col-md-6 col-sm-12">
            <h2>Booking Summary</h2>
              <h4>Name: ${name} </h4>     
              <h4>Price: ${price} </h4>     
              <h4>Date: ${date} </h4>     
              <h4>Guests: ${Guests} </h4>     
              <h4>Shift: ${Shift} </h4>     
              <h4>Hall Name: ${HallName} </h4>     
              <h4>Menu: ${Menu} </h4>     
              <h4>Theme: ${Theme} </h4>     
              <h4>Services: ${Services} </h4>     
              <h4>Sitting: ${Sitting} </h4>     
              <h4>Style: ${style} </h4>     
              <h4>Event Type: ${EventType} </h4> 
              </div>

              </div>   
          </div>
          <hr/>
          <br/>
           <p>Thanks For Booking Our Marriage Hall</p> 
          `;
};



const UserEmailTemplate2 =(userName,link)=>{

  return `<h1>Asslam-o-Alaikum ${userName}, </h1>
          <h3>Please vist this <a href="${link}">Link</a> for reset password</h3>
          <hr/>
          <br/>
           <p>Thanks For Contacting Us</p> 
          `;
};

exports.OrderEmailTemplate = OrderEmailTemplate
exports.UserEmailTemplate2 = UserEmailTemplate2
exports.mailgun = mailgun
exports.isOwner = isOwner
exports.isOwnerOrAdmin = isOwnerOrAdmin
exports.isAuth = isAuth
exports.generateToken = generateToken
exports.isAdmin=isAdmin