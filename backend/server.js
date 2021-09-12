const app= require('./app');
const dotenv = require("dotenv")
const databaseConnect = require ("./config/database")
process.on('uncaughtException',err=>{
    console.log(`error: ${err.stack}`)
    console.log("shutting doen the server due to uncaught exception")
    process.exit(1)
})

dotenv.config({path:'backend/config/config.env'})

databaseConnect();
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server started at ${process.env.PORT} in ${(process.env.ENV_MODE)} mode`)
})


process.on('unhandledRejection',err=>{
    console.log(`Error ${err.message}`)
    console.log("Closing server due to unhandledPromiseRejection")
    server.close(()=>{
        process.exit(1)
    })
})