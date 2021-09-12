const User = require('../models/User')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');

exports.registerUser = catchAsyncErrors(async(req,res,next) => {
    const {name,email,password}= req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"34rtggf",
            url:"https://www.udemy.com/staticx/udemy/images/v7/logo-udemy-inverted.svg"
        }
    })

  sendToken(user,200,res)

})

exports.loginUser = catchAsyncErrors(async(req,res,next) =>{
    const {email,password} = await req.body

    if(!email||!password){
        return next(new ErrorHandler("Please Enter a valid Email or Password",400))
    }
    
    const user = await User.findOne({email}).select("+password")
    if(!user)
    {
       return next(new ErrorHandler("Invalid Email or Password",401))
    }

    const isValidPassword= await user.comparePassword(password)

    if(!isValidPassword)
    {
        return next(new ErrorHandler("Invalid Email or Password",401))
    }

    sendToken(user,200,res)
    
  
})

exports.logoutUser= catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    
    res.status(200).json({
        success:true,
        message:"loggedOut"
    })
})
