const Product= require ("../models/product")

const databaseConnect = require ('../config/database')

const products = require ("../data/products.json")

const dotenv = require("dotenv")

dotenv.config({path:"backend/config/config.env"})

databaseConnect();

const seeder = async()=>{
    try {
        await Product.deleteMany()
    console.log("Deleted all products")

    await Product.insertMany(products)
        console.log("Insertion successful")

        process.exit()
    } catch (error) {
        console.log(error.message)
        process.exit()
}
}

seeder();

    