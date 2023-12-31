const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const errorMiddleware = require('./middleware/error')
const dotenv = require("dotenv")
const multer = require('multer');


// Config
dotenv.config({ path: '../.env' })


// Builtin Middlewares
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Routes 
const user = require("./routes/userRoutes");
const barber = require("./routes/barberRoutes");
const salon = require("./routes/salonRoutes");
const appointment = require("./routes/appointmentRoutes")
const review = require("./routes/reviewRoutes")

app.use("/api", user);
app.use("/api/salons", salon);
app.use('/api/barbers', barber);
app.use('/api/appointments', appointment)
app.use('/api/reviews', review)

// Middleware for Errors
app.use(errorMiddleware)

module.exports = app