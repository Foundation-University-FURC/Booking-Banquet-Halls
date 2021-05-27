const mongoose = require('mongoose')


// const reviewSchema = mongoose.Schema({
//     name:{
//         type:String,
//         required: true
//     },
//     rating:{
//         type:Number,
//         required: true
//     },
//     comment:{
//         type:String,
//         required: true
//     },
    
// },{timestamps: true})

const Photographer = mongoose.Schema({
   
    name:{
        type:String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    // About:{
    //     type: String,
    //     required: true
    // },
    // description:{
    //     type: String,
    //     required: true
    // },
    // services:[{
    //     type: String,
    //     required: true
    // }],
    // reviews:[reviewSchema],
    // rating:{
    //     type:Number,
    //     required:true
    // },
    // review:{
    //     type: Number,
    //     required:true
    //     },

    // Gallery: {
            
    //     },
    Contact_No: {
            type: Number,
            required: true
        },
    Email: {
            type: String,
            required: true
        },
    website:{
            type: String,
            required: true
        },
    

})

const Photographer_data = mongoose.model('Photographer', Photographer) 
module.exports = Photographer_data