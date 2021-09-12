class ApiFeatures {
    constructor(query,queryStr){
        this.query=query
        this.queryStr=queryStr
    }
    
    search(){
        const keyword=this.queryStr.keyword?{
        name:{
            $regex:this.queryStr.keyword,
            $options:'i'
        } }: {}
        this.query=this.query.find({...keyword})
        return this;
    }
    filter(){
        const queryCpy ={...this.queryStr}
        const removeQuery=['limit','keyword','page']
    removeQuery.forEach(e=>delete queryCpy[e])
        let queryStr= JSON.stringify(queryCpy)
        queryStr=queryStr.replace(/\b(lte|gte|gt|lt)\b/g,match=>`$${match}`)
        this.query=this.query.find(JSON.parse(queryStr))
        return this
    }

    pagination(resPerPage){
        const pageno= Number(this.queryStr.page)||1
        const skip= resPerPage*(pageno-1);
        this.query=this.query.limit(resPerPage).skip(skip)
        return this
    }
}

module.exports = ApiFeatures