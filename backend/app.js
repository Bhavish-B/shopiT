const express=require ('express');
const errorMiddleWare = require ("./middlewares/Errors")
const app=express();
const cookieParser= require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const products = require('./routes/products')
const users = require('./routes/auth')

app.use(cookieParser())
app.use('/api/v1',products)
app.use('/api/v1',users)
app.use(errorMiddleWare)

module.exports = app

