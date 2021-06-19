const express = require("express")

const marriage_hall = require("../models/marriage_hall.js")
const car_rental = require("../models/car_rental")
const design_card = require("../models/design_card")
const photographers = require("../models/photographers")
const asysncHandler = require("express-async-handler")
const User = require("../models/user.js")
const users = require("../data/Users.js")
const Mhall = require("../data/Halls.js")
const Order =require( '../models/order.js');
const {isAuth, isAdmin, isOwnerOrAdmin, mailgun, isOwner, UserEmailTemplate2}  = require( '../utils.js');
const {OrderEmailTemplate} = require('../utils.js')
const bcrypt =require('bcryptjs')
const { generateToken } = require("../utils.js")
const Marriage_hall = require("../models/marriage_hall.js")
const { populate } = require("../models/marriage_hall.js")
const { isValidObjectId } = require("mongoose")
const router = express.Router()
const jwt = require('jsonwebtoken');
const userRouter = express.Router()
const orderRouter = express.Router();

const nodemailer = require('nodemailer');

// get Route for users
router.get('/seed',asysncHandler(async(req,res)=>{

    const createdUsers =await User.insertMany(users)
    res.send({createdUsers})
}))


// get route for seed Marriage_Halls
router.get('/seeds',asysncHandler(async(req,res)=>{

    const createdMHall =await marriage_hall.insertMany({Mhall})
    res.json({createdMHall})
}))


//get Route for all Lists
router.get('/lists', asysncHandler( async (req,res)=>{
    // const marriageHalls = await marriage_hall.find({});
    const name = req.query.name || '';
    const location = req.query.location || '';
    const owner = req.query.owner || '';
    const nameFilter = name ? { name: {$regex: name,$options: 'i'} } : {};  //regex ->allows to match patteren 
    const locationFilter = location ? { location: {$regex: location,$options: 'i'} } : {};
    const ownerFilter = owner ? { owner } : {}; //for owner lists of marriage Hall
    const marriageHalls = await marriage_hall.find({ ...ownerFilter,...nameFilter, ...locationFilter });
    if(marriageHalls){

      res.json(marriageHalls)
    }else{
      res.status(400).json({message: "There are No Marriage Hall"})
    }
}))


//get Route for single data
router.get('/lists/:id', asysncHandler( async (req,res)=>{
    const data1 = await marriage_hall.findById(req.params.id);
    if(data1){ 
        res.json(data1)
    }else{
        res.status(400).json({message: "Marriage Hall not Found"})
    }
}))


//get Route for all Lists
router.get('/clists', asysncHandler( async (req,res)=>{
    const cars = await car_rental.find({});
    res.json(cars)
}))

//get Route for single data
router.get('/clists/:id', asysncHandler( async (req,res)=>{
    const data = await car_rental.findById(req.params.id);
    if(data){ 
        res.json(data)
    }else{
        res.status(400).json({message: "Rent a Car not Found"})
    }
}))


//get Route for all Lists
router.get('/cardlists', asysncHandler( async (req,res)=>{
    const cards = await design_card.find({});
    res.json(cards)
}))

//get Route for single data
router.get('/cardlists/:id', asysncHandler( async (req,res)=>{
    const data = await design_card.findById(req.params.id);
    if(data){ 
        res.json(data)
    }else{
        res.status(400).json({message: "Cards services not Found"})
    }
}))

//get Route for all Lists
router.get('/plists', asysncHandler( async (req,res)=>{
    const grapher = await photographers.find({});
    res.json(grapher)
}))

//get Route for single data
router.get('/plists/:id', asysncHandler( async (req,res)=>{
    const data = await photographers.findById(req.params.id);
    if(data){ 
        res.json(data)
    }else{
        res.status(400).json({message: "photographers services not Found"})
    }
}))

// For signin
router.post('/signin',asysncHandler(async(req,res)=>{
    console.log("my email",req.body.email)
    const user = await User.findOne({email:req.body.email})
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email:user.email,
                isAdmin: user.isAdmin,
                isOwner: user.isOwner,
                token: generateToken(user),
            })
           return 
        }
    }
    res.status(400).send({message: 'Invalid email or password'})
}))

// For registration

router.post(
    '/signup',
    asysncHandler(async (req, res) => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
      const createdUser = await user.save();
      res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isOwner: user.isOwner,
        token: generateToken(createdUser),
      });
    })
  );


//  For create Order

router.post(
    '/orders',
    isAuth,
    // isOwnerOrAdmin,
    asysncHandler(async (req, res) => {
      console.log("Order: ",req.body.orderItems[0])
      console.log("Order Body: ",req.body)
      if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Order Cart is empty' });
      } else {
        const order = new Order({
        owner: req.body.orderItems[0].owner,
        orderItems: req.body.orderItems,
        product: req.body.orderItems[0].product,
        user: req.user._id,
        TotalPrice:req.body.orderItems[0].Total,
        hallPrice:req.body.orderItems[0].Total1,
        MenuPrice:req.body.orderItems[0].Total2,
        ThemePrice:req.body.orderItems[0].Total3,
        ServicesPrice:req.body.orderItems[0].Total4,
        // orderDetail: req.body.orderItems,
          
        });
        // console.log(req.body.orderItems[0]);
        const createdOrder = await order.save();
        res.status(201).send({ message: 'New Order Created', order: createdOrder });
      }
    })
  );

router.get(
    '/orders/:id',
    isAuth,
    asysncHandler(async (req, res) => {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.send(order);
      } else {
        res.status(404).send({ message: 'Order Not Found' });
      }
    })
  );

//order history 
router.get(
    '/mine',
    isAuth,
    asysncHandler(async (req, res) => {
      const orders = await Order.find({ user: req.user._id });
      res.send(orders);
    })
  );


// for admin get orders
router.get(
    '/orders',
    isAuth,
    // isAdmin,
    isOwnerOrAdmin,
    asysncHandler(async (req, res) => {
    
    const owner = req.query.owner || '';
    const ownerFilter = owner ? { owner } : {};

    const orders = await Order.find({ ...ownerFilter }).populate(
      'user', 
      'name'
    );
      res.send(orders);
    })
  );


router.delete(
  '/orders/:id',
  isAuth,
  isOwnerOrAdmin,
  asysncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);


// Users lists on Admin side
router.get(
  '/users',
  isAuth,
  isAdmin,
  asysncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

// deleting Users from Admin side

router.delete(
  '/users/:id',
  isAuth,
  isAdmin,
  asysncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@gmail.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: 'User Deleted', user: deleteUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);


// User edit from admin side
router.put(
  '/users/:id',
  isAuth,
  isAdmin,
  asysncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isOwner = req.body.isOwner;
      user.isAdmin = req.body.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

  // for user profile updation

  router.get(
    '/users/:id',
    // isAuth,
    asysncHandler(async (req, res) => {
      const user = await User.findById(req.params.id);
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );


// updation function

router.put(
  '/user/profile',
  isAuth,
  asysncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (user.isOwner) {
        user.owner.name = req.body.ownerName || user.owner.name;
        user.owner.logo = req.body.ownerLogo || user.owner.logo;
        user.owner.description = req.body.ownerDescription || user.owner.description;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isOwner: user.isOwner,
        token: generateToken(updatedUser),
      });
    }
  })
);

// for creating new Marriage Hall
router.post(
  '/listss',
  isAuth,
  // isAdmin,
  isOwnerOrAdmin,
  asysncHandler(async (req, res) => {
    // console.log(req.user)
    const Hall = new  marriage_hall({
     services: [
      "Music System", 
      "Decoration", 
      "Special lights", 
      "lights", 
      "DJ", 
      "Parking for Bike 300", 
      "Parking capacity car 400", 
      "AirCondition", 
      "Social Media Pages", 
      "Seggretion", 
      "Catering", 
      "Projector", 
      "Stage Decoration", 
      "Ladies Waitress", 
      "People Capacity 500", 
      "Sitting 500", 
      "Round Table Capacity", 
      "Electricity"
     ],
     facilities : [ 
      "Parking", 
      "Bridal Room", 
      "Mosque", 
      "Guest Sitting", 
      "Backup Power", 
      "Round Tables", 
      "Square Tables", 
      "Mixed Gathering", 
      "Lounges", 
      "Segregation/Seperation"
  ],
  Venue_Restrictions : [ 
    "Pets", 
    "Alcohals", 
    "Traditional Gun Firing "
],
Food_Restrictions : [ 
    "Internal Only"
],
Decoration_Restrictions : [ 
    "External Only"
],
Gallary : [ 
 
  {
      id : "1",
      imgname : "../casblanca_banquet_hall_garrison/hall_2016qAnTp74fytJghc0gNMvBM1y1F9QsYOylDkr2FtCj.jpg"
  }, 
  {
      id : "2",
      imgname : "../casblanca_banquet_hall_garrison/hall_2016R7NSqIQ4M1e3xm7v5dCjptHcO4x8kosm38mO3U7i.jpg"
  }, 
  {
      id : "3",
      imgname : "../casblanca_banquet_hall_garrison/hall_2016SX4eh16N2c89drV4QnJNGVwJt1SpZL63Rl4OJ09j.jpg"
  }, 
  {
      id : "4",
      imgname : "../casblanca_banquet_hall_garrison/hall_2016tLxLbJiSzEi2GILASvfpdOiOCYUDrGf4OaCHVoX2.jpg"
  }, 
  {
      id : "5",
      imgname : "../casblanca_banquet_hall_garrison/hall_2016uqInWIIzY0FUbIUSUNvxMrUdoc7ciQ2y8pICvvVh.jpg"
  }, 
  {
      id : "6",
      imgname : "../casblanca_banquet_hall_garrison/hall_2016Yt8DnE7uyuDh3pzg2NqBLeQridFR3I8ulyHMgzR6.jpg"
  }
],
HallName : [ 
  {
      name : "A",
      capacity : "100-200",
      price : "45000"
  }, 
  {
      name : "B",
      capacity : "100-200",
      price : "55000"
  }
],
Menu : [ 
  {
      name : "1",
      Dish : [ 
          "Beef Qorma", 
          "Chicken Qorma", 
          "Rogni Naan"
      ],
      price : "460"
  }, 
  {
      name : "2",
      Dish : [ 
          "Beef Qorma", 
          "Rogni Naan", 
          "Biriyani", 
          "Salaad", 
          "Raita"
      ],
      price : "600"
  }, 
  {
      name : "3",
      Dish : [ 
          "Beef Qorma", 
          "Rogni Naan"
      ],
      price : "360"
  }
],
Decoration : [ 
  {
      name : "D1",
      image : "../casblanca_banquet_hall_garrison/2019-01-24.jpg",
      price : "9000"
  }, 
  {
      name : "D2",
      image : "../casblanca_banquet_hall_garrison/2019-05-20.jpg",
      price : "10000"
  }, 
  {
      name : "D3",
      image : "../casblanca_banquet_hall_garrison/hall_2016g9XnlLsLZObHO6xY32ix0JzeLJui6koiCKteUDzB.jpg",
      price : "7000"
  }, 
  {
      name : "D4",
      image : "../casblanca_banquet_hall_garrison/hall_2016qAnTp74fytJghc0gNMvBM1y1F9QsYOylDkr2FtCj.jpg",
      price : "8000"
  }, 
  {
      name : "D5",
      image : "../casblanca_banquet_hall_garrison/hall_2016uqInWIIzY0FUbIUSUNvxMrUdoc7ciQ2y8pICvvVh.jpg",
      price : "13000"
  }
],
Other_Services : [ 
  {
      name : "Cooling",
      price : "4000"
  }, 
  {
      name : "Music System",
      price : "2500"
  }, 
  {
      name : "Heating",
      price : "3500"
  }
],
image : "/images/marriage6.jfif",
name : "Gujrat Marriage Hall 2" + Date.now(),
owner: req.user._id,
price : 1650,
location : "Bypass Rd, Gujrat, Punjab",
rating : 3.5,
review : 9,
About : "Gujrat Marriage Hall provides superior catering services for weddings, family events, thematic events, seminars with great food and service quality, and a capacity of up-to 700 guests, promises personalized event management and a great attention to detail.",
description : "Event space for You, seminar, training, product launch, exhibition and open day event Accommodate up to your required people.Being an iconic landmark located at the heart of Lahore, The Wave offers spacious event space for your company to host business meeting, seminar, training, product launch, exhibition and open day event. Our event space never ceases to amazed our clients with how customisable it is to cater with different needs and requirements. It is conveniently located within 5 mins walking distance from the Metro and surrounded with amenities and services.",
Contact_No : 923334352676,
Email : "Info@EventHUB.pk",
website : "www.eventhub.pk",
reviews : [],

    });
    const createdHall = await Hall.save();
    res.send({ message: 'Marriage Hall Created', Hall: createdHall });
  })
);


router.put('/lists/:id', isAuth,isOwnerOrAdmin, asysncHandler(async (req,res)=>{

  const hallId = req.params.id;
  const data1= await marriage_hall.findById(hallId)
  if(data1){
    data1.name = req.body.name;
    data1.Email= req.body.Email;
    data1.image= req.body.image;
    data1.price= req.body.price;
    data1.location= req.body.location;
    data1.Contact_No= req.body.Contact_No;
    data1.website= req.body.website;

    const updatedData = data1.save();
    res.send({message: "Marriage Hall successfully updated", data: updatedData})
  }
  else{
    res.status(404).send({message: "Marriage Hall Not found"})
  }

})
);

router.delete(
  '/lists/:id',
  isAuth,
  isOwnerOrAdmin,
  asysncHandler(async (req, res) => {
    const Hall = await marriage_hall.findById(req.params.id);
    if (Hall) {
      const deleteHall = await Hall.remove();
      res.send({ message: 'Marriage Hall Deleted', Hall: deleteHall });
    } else {
      res.status(404).send({ message: 'Marriage Hall Not Found' });
    }
  })
);


// Forget Password

router.get('/forget-password',asysncHandler(async(req,res,next)=>{
  // res.render('Forget');
    })
)
const JWT_SECRET =  process.env.JWT_SECRET || 'somethingsecret'

router.post('/forget-password',asysncHandler(async(req,res,next)=>{
  const email2 = req.body.email2;
  console.log("user email2: ",email2)
  const user = await User.findOne({email:email2});
  console.log("user in post forget: ",user)
    
    if(user){
      const userPassword = user.password
    const userName = user.name
    const userEmail = user.email

    const secret = JWT_SECRET + userPassword; 
    console.log("check secret exist 2: ",secret)
   const userId = user._id
    console.log("user check id: ",userId);
      const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isOwner: user.isOwner,
      }
       const token = jwt.sign(payload,secret,{expiresIn: '15m'})
       const link = `http://localhost:3000/reset-password/${userId}/${token}` 
        console.log(link); 
        res.send("password reset link has been sent to Your Email...")

        // Node  mailgun
        mailgun().messages().send({
          //parameters for email
          from: 'EventHub <eventhub@mg.yourdomain.com>',
          to: `${userName} <${userEmail}>`,
          subject: `Reset Password Link`,
          html: UserEmailTemplate2(userName,link),
        }, (error,body) =>{
          if(error){
            console.log(error);
          }else{
            console.log(body);
          }
        });


  }else{
    res.send("User not registerd yet");
  }
    })
)
router.get('/reset-password/:id/:token',asysncHandler(async(req,res,next)=>{
  const {id,token} = req.params;
  console.log("For get:",req.params);
  // res.send(req.params);
  const users = await User.findById(id)
  console.log("check email exist 1: ",users.email)
  console.log("check email exist 1: ",users)
  if(users){
    const secret = JWT_SECRET + users.password
    console.log("check secret exist 1: ",secret)
    const payload = jwt.verify(token, secret)
    // then render that page 
    // res.render('reset-password',{email:users.email})
    console.log("check email exist: ",users.email)
    res.send(users.email);
  }else{
    res.send("inavlid user")
  }

    })
)
router.post('/reset-password/:id/:token',asysncHandler(async(req,res,next)=>{
  
  const {id,token} = req.params;
  const password = req.body.password
  const users = await User.findById(id)
  console.log("User for password: ", users)
  
  if (users) {
    const secret = JWT_SECRET + users.password
    const payload = jwt.verify(token, secret);

    users.password = password;
    if (users.password) {
      console.log("user password before hash: ", users.password)
      users.password = bcrypt.hashSync(users.password, 8);
    }
    console.log("user password after hash: ", users.password)
    const updatedUser = await users.save();

    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isOwner: updatedUser.isOwner,
      token: generateToken(updatedUser),
    });
  }else{
    res.send("inavlid user id")
  }

    })
)

// Accepted Order Route
router.put(
  '/orders/:id/accept',
  isAuth,
  isOwnerOrAdmin,
  asysncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user','email name');
    if (order) {
      order.isAccepted = true;
      order.acceptedAt = Date.now();

      const updatedOrder = await order.save();
      mailgun().messages().send({
        //parameters for email
        from: 'EventHub <eventhub@mg.yourdomain.com>',
        to: `${order.user.name} <${order.user.email}>`,
        subject: `New Order ${order._id}`,
        html: OrderEmailTemplate(order),
      }, (error,body) =>{
        if(error){
          console.log(error);
        }else{
          console.log(body);
        }
      });
      res.send({ message: 'Booking Order Accepted', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Booking Order Not Found' });
    }
  })
);

// For Rating and reviwes
router.post('/lists/:id/reviews', isAuth, asysncHandler(async (req,res)=>{
  const hallId = req.params.id;
  const hall = await marriage_hall.findById(hallId);
  if(hall){
    if (hall.reviews.find((x) => x.name === req.user.name)) {
      return res
        .status(400)
        .send({ message: 'You already submitted a review' });
    }
    const review={
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment
    };
    hall.reviews.push(review);
    hall.review = hall.reviews.length;
    hall.rating = hall.reviews.reduce((a, c) => c.rating + a, 0) / hall.reviews.length;
    const updatedHall = await hall.save();
    res.status(201).send({
      message: 'Review Created',
      review: updatedHall.reviews[updatedHall.reviews.length - 1],
    });
  } else {
    res.status(404).send({ message: 'Marriage Hall Not Found' });
  }   
}))

// Check Date
router.get('/check-date', asysncHandler( async(req, res)=>{

const datee = req.query.date;
let date_ob1 = new Date(datee);
let date = date_ob1.getDate();
let month = date_ob1.getMonth() + 1;
let year = date_ob1.getFullYear();
const datee1= year + "-" + month + "-" + date;
const hallname= req.query.hallName;
const hallId = req.query.hallId;
console.log("Hall Name: ",hallname);
console.log("Marriage Hall ID: ",hallId);
console.log("Marriage Hall Date: ", datee);


const order_date = await Order.find({product: req.query.hallId});

const order_found = order_date.map(val=>(val.orderItems.filter(val2=> (val2.date===datee && val2.hallName===hallname) )))

for( i=0;i<order_found.length;i++)
{
  console.log(order_found[i])
  if(order_found[i].length!==0){
    // this will be run when there is an Order of same ID
    res.status(400).send({Message:"Booking Date is already Selected! Please Try another one"});
  }
}

let ts = Date.now();

let date_ob = new Date(ts);
let date1 = date_ob.getDate();
let month1 = date_ob.getMonth() + 1;
let year1 = date_ob.getFullYear();

// prints date & time in YYYY-MM-DD format
console.log(year1 + "-" + month1+ "-" + date1);
const dateV = year1 + "-" + month1 + "-" + date1;

if(datee1<dateV){
  console.log("datee: ",datee1);
  console.log("dateV: ",dateV);

res.status(404).send({Message:"Event Date has been passed Please try another one"});
}else{
  console.log("datee: ",datee1);
  console.log("dateV: ",dateV);
res.status(200).send({Message:"Great!!!"});
}

}))

// user Count

router.get('/user-count', asysncHandler( async(req,res)=>{
  const users = await User.find({});

  // console.log("users count: ",users.length)
  
 
  if(users){
    res.status(200).json(users.length);
  }else{
    res.status(400).send({Message: "No User Found"});
  }
}))
// order Count for owner

router.get('/order-count-owner', asysncHandler( async(req,res)=>{
  const order = await Order.find({owner: req.query.ownerId});

  // console.log("order count for owner: ",order.length)
 
  if(order){
    res.status(200).json(order.length);
  }else{
    res.status(400).send({Message: "No No Booking Found"});
  }
}))

// Booking Count
router.get('/order-count', asysncHandler( async(req,res)=>{
  
  const orders= await Order.find({});
  
  // console.log("Booking count: ",orders)
 
  if(orders){
    res.status(200).json(orders.length);
  }else{
    res.status(400).send({Message: "No Order Found"});
  }
  
}))

// Hall Count
router.get('/hall-count', asysncHandler( async(req,res)=>{
  
  const MHall= await marriage_hall.find({});
 
  // console.log("Halls count: ",MHall)
 
  if(MHall){
    res.status(200).json(MHall.length);
  }else{
    res.status(400).send({Message: "No Hall Found"});
  }
}))

// Hall Count of owner
router.get('/hall-count-owner', asysncHandler( async(req,res)=>{
  
  const MHall= await marriage_hall.find({owner: req.query.ownerId});
 
  // console.log("Halls count of owner: ",MHall)
 
  if(MHall){
    res.status(200).json(MHall.length);
  }else{
    res.status(400).send({Message: "No Marriage Hall"});
  }
}))

// Total Earnings
router.get('/earning-count', asysncHandler( async(req,res)=>{
  
  const orders= await Order.find({});
  var earning=0;
  var pending=0;
 for (i=0;i<orders.length;i++){
  if(orders[i].acceptedAt){
    earning+=orders[i].TotalPrice;
  }else{
    pending++;
  }
}
if(earning!==0){
  console.log("Total Earning: ",earning)
  console.log("Total pending: ",pending)
  res.status(200).json(earning);
}else{
  res.status(400).send(pending);
}
}))

// Total Earnings of Owner
router.get('/earning-count-owner', asysncHandler( async(req,res)=>{
  
  const orders= await Order.find({owner: req.query.ownerId});
  var earning=0;
  var pending=0;
 for (i=0;i<orders.length;i++){
  if(orders[i].acceptedAt){
    earning+=orders[i].TotalPrice;
  }else{
    pending++;
  }
}
if(earning!==0){
  console.log("Total Earning of owner: ",earning)
  console.log("Total pending of owner: ",pending)
  res.status(200).json(earning);
}else{
  res.status(400).send(pending);
}
}))

// Pending Bookings
router.get('/pending-count', asysncHandler( async(req,res)=>{
  
  const orders= await Order.find({});
  var pending=0;
 for (i=0;i<orders.length;i++){
  if(!orders[i].acceptedAt){
    pending++;
  }
}
if(pending!==0){
  console.log("Total pending: ",pending)
  res.status(200).json(pending);
}else{
  res.json(0);
}
}))

// Pending Bookings of Owner
router.get('/pending-count-owner', asysncHandler( async(req,res)=>{
  
  const orders= await Order.find({owner: req.query.ownerId});
  var pending=0;
 for (i=0;i<orders.length;i++){
  if(!orders[i].acceptedAt){
    pending++;
  }
}
if(pending!==0){
  console.log("Total pending booking of owner: ",pending)
  res.status(200).json(pending);
}else{
  res.json(0);
}
}))


module.exports = router