const mongoose = require('mongoose')



const connectdb = async () =>{
    try {
        conn = await mongoose.connect(process.env.MONGO_URI,{
        useUnifiedTopology:true,
        useNewUrlParser: true,
        useCreateIndex: true    
        })
        console.log("Database Connected successfully " + conn.connection.host)
    } catch (e) {
        console.log(e.message)
    }
}

module.exports = connectdb