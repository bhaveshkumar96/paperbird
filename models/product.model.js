const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    title:String,
    price:Number,
    discount:Number,
    description:String,
    rating:Number
})

const ProductModel = mongoose.model("product",productSchema)

module.exports = {
    ProductModel
}