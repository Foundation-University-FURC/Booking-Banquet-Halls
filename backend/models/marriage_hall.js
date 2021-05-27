const mongoose = require('mongoose')


const reviewSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    rating:{
        type:Number,
        required: true
    },
    comment:{
        type:String,
        required: true
    },
    
},{timestamps: true})

const M_hallSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId, //to identify which Admin has Specific marriage hall
        // required: true,
        ref: 'User'
    },
    services:[{
        type: String,
        required: true
    }],
    facilities:[{
        type: String,
        required: true
    }],
    Venue_Restrictions:[{
        type: String,
        required:true
    }],
    Food_Restrictions:[{
        type: String,
        required:true
    }],
    Decoration_Restrictions:[{
        type: String,
        required:true
    }],
    Gallary: [{
       id:{
           type: Number
       },
       imgname:{
           type: String,
           required:true

       }  
    }],
    HallName:[{
        name:{
            type:String,
            required: true
        },
        capacity:{
            type:String,
            required: true
        },
        price:{
            type:Number,
            required: true
        }
    }],
    Menu:[{
        name:{
            type: String,
            required: true
        },
        Dish:[{
            type: String,
            required: true
        }],
        price:{
            type: Number,
            required: true
        },
    }],
    Decoration:[{
        name:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        }
    }],
    Other_Services:[{
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
    }],
    
    image: {
        type: String,
        required: true
    },
    name:{
        type:String,
        required: true,
        unique: true
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    price:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type: Number,
        required:true
        },
    About:{
            type: String,
            required: true
    },
    description:{
            type: String,
            required: true
    },
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
     reviews:[reviewSchema],

})

const Marriage_hall = mongoose.model('Marriage_hall',M_hallSchema) 
module.exports = Marriage_hall