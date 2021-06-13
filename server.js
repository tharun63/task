const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const {json}= require('body-parser');
const todoModel = require('./model/todo');
const createError = require('http-errors');
require('dotenv').config();
const app = express();

//connect to mongodb
const MONGO_URI=process.env.MONGO_KEY
mongoose.connect(MONGO_URI || "mongodb://localhost/Task1", {
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('connected',()=>{
    console.log("Mongoose is connected");
})

app.use(express.json())

const todoRouter = require('./routes/todo.js');
app.use('/todo',todoRouter);

// 404 handler and pass to error handler
app.use((req,res,next)=>{
    next(createError(404,'Not found'));
});

//error handler
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
})




const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is runnning on port ${PORT}`);
})
