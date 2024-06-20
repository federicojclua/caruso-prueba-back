const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    price: {
        type: Number,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    image: {
        type: String
    },
});
/*
productSchema.methods.setImgUrl = function setImgUrl(filename) { 
    const {host, port} = indexConfig
    this.image = `${host}:${port}/public/${filename}`
}
*/

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
