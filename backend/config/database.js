const mongoose = require ('mongoose')


const databaseConnect = () =>{
    mongoose.connect(process.env.DB_LOCAL_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    }).then(con=>{
        console.log(`MongoDb database conected with host: ${con.connection.host}`)
    })
    
    
}

module.exports = databaseConnect;