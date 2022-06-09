const express = require('express');
const dotenv=require("dotenv");
const app = express();

require("./models/room")
require("./models/user")
require("./models/booking")

const roomsRoute = require("./roots/roomsRoute")
const usersRoute = require("./roots/usersRoutes")
const bookingRoute = require("./roots/bookingRoute")


const connectDB = require("./db");

dotenv.config();
connectDB();

app.use(express.json())
app.use('/api/rooms',roomsRoute);
app.use('/api/users',usersRoute);
app.use('/api/booking', bookingRoute);

const port=process.env.PORT||5000;


app.listen(port, () =>{console.log(`server running on port ${port}`)})
