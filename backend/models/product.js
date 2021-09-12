const mongoose= require ('mongoose')


const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter a product name"],
        trim:true,
        maxLength:[100,'Product name exceeds 100 char']
    },
    price:{
        type:Number,
        required:[true,"Please enter a price"],
        maxLength:[5,'Price  exceeds 5 char'],
        default:0.0
    },
    description:{
        type:String,
        required:[true,"Please enter a product description"],
    },
    rating:{
        type:Number,
        default:0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    category:{
        type:String,
        required:[true,"Please select category for this product"],
        enum:{
            values:[
                "Electronics",
                "Cameras",
                "Laptops",
                "Accessories",
                "Headphones",
                "Food",
                "Books",
                "Clothes/shoes",
                "Beauty/health",
                "sports",
                "Outdoor",
                "Home"
            ],
            message:"Please select correct category"
        }
    },
    seller:{
        type:String,
        required:[true,"Please Enter Seller Name"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter Product Stock"],
        maxLength:[5,"Stock cant exceed 5 places"],
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comments:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
        
    
})

module.exports=mongoose.model('Product',productSchema);