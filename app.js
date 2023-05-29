const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

//import Routes
const userRoutes = require('./routes/user');

//app
const app = express();


//db
mongoose.connect(
    "mongodb+srv://doc123456:doc123456@cluster0.obaye.mongodb.net/doc24*7?retryWrites=true&w=majority"
    //  `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_USER_PASSWORD}@cluster0.x7tnt.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`
    , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>
        console.log("DB connected")
    ).catch(err => console.log("Database not connected" + err))

//middlewares   
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "10mb",
        parameterLimit: 100000,
    })
);
app.use(cors());
app.options("*", cors());
app.use(morgan('dev'));
app.use(express.static("uploads"));

//routes middleware 
app.use('/api',userRoutes);

const port = process.env.PORT || 8001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})