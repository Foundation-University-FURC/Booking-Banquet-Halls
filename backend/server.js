
const express = require('express')
const http = require('http');
const {Server} = require('socket.io');
const Halls= require("./data/Halls")

const dotenv = require('dotenv')

const Route = require('./router/Route')
const uploadRouter = require('./router/uploadRouter')
const path = require('path')
dotenv.config()

const connectdb = require('./config/config')
connectdb() //connect to mongodb database

const app = express() //perform routing 

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const __dirnam = path.resolve();
app.use('/uploads', express.static(path.join(__dirnam, '/uploads')));


// "build": "cd client && npm install && npm run build",
// "install-client": "cd client && npm install",
// "heroku-postbuild": "npm run install-client && npm run build",

// "engines": {"node": "12.4.0","npm": "6.9.0"}

// app.get('/', (req,res)=>{
//     res.send('<h1>Hello from Node Server</h1>')
// })

app.use('/api',Route)
app.use('/api/uploads',uploadRouter)
// app.use('/api',CarsRoute)


const port = process.env.PORT || 6000



if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirnam, '/client/build')));
    app.get('*', (req, res) =>
      res.sendFile(path.join(__dirnam, '/client/build/index.html'))
    );
    }else{
        app.get('/',(req,res)=>{
            res.send("Api Running");
        });
    }
    


// const httpServer = http.Server(app);
// const io = new Server(httpServer, { cors: { origin: '*' } });
// const users = [];

// io.on('connection', (socket) => {
//   console.log('connection', socket.id);
//   socket.on('disconnect', () => {
//     const user = users.find((x) => x.socketId === socket.id);
//     if (user) {
//       user.online = false;
//       console.log('Offline', user.name);
//       const admin = users.find((x) => x.isAdmin && x.online);
//       if (admin) {
//         io.to(admin.socketId).emit('updateUser', user);
//       }
//     }
//   });
//   socket.on('onLogin', (user) => {
//     const updatedUser = {
//       ...user,
//       online: true,
//       socketId: socket.id,
//       messages: [],
//     };
//     const existUser = users.find((x) => x._id === updatedUser._id);
//     if (existUser) {
//       existUser.socketId = socket.id;
//       existUser.online = true;
//     } else {
//       users.push(updatedUser);
//     }
//     console.log('Online', user.name);
//     const admin = users.find((x) => x.isAdmin && x.online);
//     if (admin) {
//       io.to(admin.socketId).emit('updateUser', updatedUser);
//     }
//     if (updatedUser.isAdmin) {
//       io.to(updatedUser.socketId).emit('listUsers', users);
//     }
//   });

//   socket.on('onUserSelected', (user) => {
//     const admin = users.find((x) => x.isAdmin && x.online);
//     if (admin) {
//       const existUser = users.find((x) => x._id === user._id);
//       io.to(admin.socketId).emit('selectUser', existUser);
//     }
//   });

//   socket.on('onMessage', (message) => {
//     if (message.isAdmin) {
//       const user = users.find((x) => x._id === message._id && x.online);
//       if (user) {
//         io.to(user.socketId).emit('message', message);
//         user.messages.push(message);
//       }
//     } else {
//       const admin = users.find((x) => x.isAdmin && x.online);
//       if (admin) {
//         io.to(admin.socketId).emit('message', message);
//         const user = users.find((x) => x._id === message._id && x.online);
//         user.messages.push(message);
//       } else {
//         io.to(socket.id).emit('message', {
//           name: 'Admin',
//           body: 'Sorry. I am not online right now',
//         });
//       }
//     }
//   });
// });

// httpServer.listen(port, ()=>{
//     console.log('server is running at port no '+ port)
// })

app.listen(port, ()=>{
console.log('server is running at port no '+ port)
})