const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    // User: {
    //     type: mongoose.Schema.Types.ObjectId, //to identify which User book marriage hall
    //     required: true,
    //     ref: 'User'
    // },
    TotalPrice:{ type: Number, required: true},
    hallPrice: { type: Number, required: true},
    MenuPrice: { type: Number, required: true},
    ThemePrice: { type: Number, required: true},
    ServicesPrice: { type: Number, required: true},
    orderItems:[
        {
            
            name:{
                type:String,
                required: true
            },
            image:{
                type:String,
                required: true
            },
            price:{
                type:Number,
                required: true
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Marriage_hall'
            },
           
            date: { type: String, required: true},
            Guests: { type: Number, required: true},
            Shift: { type: String, required: true},
            hallName: { type: String, required: true},
            Menu1: { type: String, required: true},
            Theme: { type: String, required: true},
            Services: { type: String, required: true},
            Sitting: { type: String, required: true},
            style: { type: String, required: true},
            EventType: { type: String, required: true},
            Comments: { type: String},

        }
    ],
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Marriage_hall'
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookAt:{
        type: Date
    },
    isAccepted: {
        type: Boolean, default: false 
    },
    acceptedAt: {type: Date}
},{timestamps: true})

const Order = mongoose.model('Order',orderSchema) 
module.exports = Order