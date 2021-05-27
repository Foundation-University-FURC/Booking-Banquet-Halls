//just export data in database

const mongoose = require('mongoose')
const dotev = require('dotenv')
const users = require('./data/Users')

//Get Models
const User = require('./models/user')
const marriage_hall = require('./models/marriage_hall')
const order = require('./models/order')
const car_rental = require('./models/car_rental')
const card_design = require('./models/design_card')
const photographers = require('./models/photographers')

//Get Data file
const Halls_list = require('./data/Halls')
const car_list = require('./data/Cars_data')
const cards_list = require('./data/Card_data')
const photographer_list = require('./data/Photographer_data')

const connectDB = require('./config/config')
dotev.config()

connectDB();

const importData = async()=>{
    try {
        // await order.deleteMany()
        // await marriage_hall.deleteMany()
        // await User.deleteMany()
        // const createUser= await User.insertMany(users)
        // const adminUser=  createUser[0]._id
        // const sampleData=  Halls_list.map((list)=>{
            //     return {...list, user: adminUser}
            // })
            //   const data =  await marriage_hall.insertMany(sampleData)
            // console.log("Data Imported",data)
        
            //For rent a car services
        // await car_rental.deleteMany()
        // const carData=  car_list.map((list)=>{
        //         return {...list}
        //     })
        //       const data =  await car_rental.insertMany(carData)
        //     console.log("Data Imported",data)


            //For rent a car services
        // await card_design.deleteMany()
        // const cardData=  cards_list.map((list)=>{
        //         return {...list}
        //     })
        //       const data =  await card_design.insertMany(cardData)
        //     console.log("Data Imported",data)
           
            //For photographers services
        // await photographers.deleteMany()
        // const grapherData=  photographer_list.map((list)=>{
        //         return {...list}
        //     })
        //       const data =  await photographers.insertMany(grapherData)
        //     console.log("Data Imported",data)
        
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)//faliure
    }
}

const dataDestroy = async() =>{
    try {
        // await order.deleteMany()
        // await marriage_hall.deleteMany()
        // await User.deleteMany()
        // await photographers.deleteMany()
        // console.log("data destroy successfully")

    } catch (error) {
        console.log(`${error}`)
        process.exit()
    }
    
}

if(process.argv[2]=== "-d"){
    dataDestroy()
}
else{
    importData()
}