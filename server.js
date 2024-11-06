const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({path:"config.env"});

const dbConnection = require("./config/database.js");
const taskRoute = require('./routes/taskRoute.js');
dbConnection();


const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
    console.log(`Mode :${process.env.NODE_ENV}`)
}


app.use('/api/v1/api-nodejs-todolist',taskRoute)
app.all("*",(req,res,next)=>{
    const err=new Error(`Can't find this Route ${req.originalUrl}`)
    next(err.message);
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
      message: err.message,
      error: req.app.get("env") === "development" ? err : {},
    });
})

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})