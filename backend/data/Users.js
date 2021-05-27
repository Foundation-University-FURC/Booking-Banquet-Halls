// dummy data
const bcrypt = require('bcryptjs')
const Users =[
  /* 1 */
{
    _id : "605a265b0651eb0674ddf7e0",
    isAdmin : false,
    isOwner : true,
    name : "Ali",
    email : "ali@gmail.com",
    password : "owner123",
    // "createdAt" : ISODate("2021-03-23T17:33:15.650Z"),
    // "updatedAt" : ISODate("2021-05-16T18:32:09.105Z"),
    owner : {
        numReviews : 0,
        rating : 0,
        description : "Best Owner ",
        name : "Ali"
    }
},

/* 2 */
{
    // "_id" : ObjectId("607ac44a61299a2c3874084a"),
    isAdmin : true,
    isOwner : false,
    name : "Hassan",
    email : "admin@gmail.com",
    password : "admin123",
    // "createdAt" : ISODate("2021-04-17T11:19:38.574Z"),
    // "updatedAt" : ISODate("2021-04-18T10:13:59.088Z"),

    owner : {
        numReviews : 0,
        rating : 0
    }
},

/* 3 */
{
    // "_id" : ObjectId("607b30d3dfb52f4248609555"),
    owner : {
        name : "Ali",
        rating : 0,
        numReviews : 0
    },
    isAdmin : false,
    isOwner : false,
    name : "Ali Hassan",
    email : "ali.hassan91170@gmail.com",
    password : "hassan91170",
    // "createdAt" : ISODate("2021-04-17T19:02:43.822Z"),
    // "updatedAt" : ISODate("2021-05-16T21:15:46.272Z"),
    "__v" : 0
},

/* 4 */
{
    // "_id" : ObjectId("60a1593ebadf6c31d0cabf84"),
    owner : {
        rating : 0,
        numReviews : 0
    },
    isAdmin : false,
    isOwner : false,
    name : "Mian Daniyal",
    email : "dani@gmail.com",
    password : "dani",
    // "createdAt" : ISODate("2021-05-16T17:41:18.471Z"),
    // "updatedAt" : ISODate("2021-05-24T21:56:05.419Z"),
    "__v" : 0
}
]

module.exports = Users