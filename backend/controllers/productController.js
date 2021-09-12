const Product= require('../models/product')
const ErrorHandler= require ("../utils/errorHandler")
const catchAsyncErrors = require("../middlewares/catchAsyncErrors")
const ApiFeatures= require("../utils/APIFeatures")

exports.newProduct= catchAsyncErrors( async(req,res,next) =>{
    
    req.body.user= req.user.id;
    const product= await Product.create(req.body);
   
    res.status(201).json({
        success:true,
        product
    })
})


exports.getProducts=catchAsyncErrors(async (req,res,next) =>{

    const resPerPage=4;
    const apiFeatures = new ApiFeatures(Product.find(),req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)
    const products = await apiFeatures.query; 

    res.status(200).json({
        success:true,
        count:products.length,
        products
    })
})


exports.getSingleProduct=catchAsyncErrors( async(req,res,next) =>{
    const product= await Product.findById(req.params.id)

    if(!product)
    {
        return next(new ErrorHandler("Product not found",404))
    }
    else
    {
        res.status(200).json({
            success:true,
            message:"Product found",
            product
        })
    }
})

exports.updateSingleProduct =catchAsyncErrors( async(req,res,next) => {
    let product= await Product.findById(req.params.id)

    if(!product)
    {
        return next(new ErrorHandler("Product not found",404))
    }
    else
    {
        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true,
            useFindAndModify:false
        })
        res.status(200).json({
            success:true,
            message:"Product updated",
            product
        })
    }
})

exports.deleteSingleProduct = catchAsyncErrors(async(req,res,next) =>{
    const product = await Product.findById(req.params.id)
    if(!product)
    {
        return next(new ErrorHandler("Product not found",404))
    }
    else
    {
        await product.remove()
        res.status(200).json({
            success:true,
            message:"Product deleted"
        })
    }

})