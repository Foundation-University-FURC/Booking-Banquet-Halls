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
const {isAuth, isAdmin, isOwnerOrAdmin, mailgun, isOwner}  = require( '../utils.js');
const {OrderEmailTemplate} = require('../utils.js')
const bcrypt =require('bcryptjs')
const { generateToken } = require("../utils.js")
const Marriage_hall = require("../models/marriage_hall.js")
const { populate } = require("../models/marriage_hall.js")
const router = express.Router()


const userRouter = express.Router()
const orderRouter = express.Router();

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


//  For Order

router.post(
    '/orders',
    isAuth,
    // isOwnerOrAdmin,
    asysncHandler(async (req, res) => {
      if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Order Cart is empty' });
      } else {
        const order = new Order({
          owner: req.body.orderItems[0].owner,
        orderItems: req.body.orderItems,
        user: req.user._id, 
        // orderDetail: req.body.orderItems,
          
        });
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



module.exports = router