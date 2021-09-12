const ErrorHandler = require ('../utils/errorHandler')
// const dotenv = require("dotenv")

// dotenv.config({path:"backend/config/config.env"})

module.exports = (err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    
   
    //  if(process.env.ENV_MODE === 'DEVELOPMENT')
    { 
        if(err.name==="CastError")
        {
            const message=`Resource not found. Invalid: ${err.path}`
            error=new ErrorHandler(message,400)
        }
        
        res.status(err.statusCode).json({
        success:false,
        message:err.message,
        error:err,
        statusCode: err.statusCode,
        stack:err.stack
        })

    }


 if (process.env.ENV_MODE === "PRODUCTION" )
{
    let error={...err}
    error.message=err.message
    res.status(error.statusCode).json({
        success:false,
        message:error.message|| "INternal Server Error"
    
    })
}

   
}