const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    isOwner: { 
        type: Boolean, 
        default: false, 
        required: true 
    },
    owner: {
        name: {type: String}, 
        logo: {type: String},
        description: {type: String},
        rating: { type: Number, default: 0, required: true },
        numReviews: { type: Number, default: 0, required: true },
      },
},{timestamps:true})

const User = mongoose.model('User',userSchema)

module.exports = User