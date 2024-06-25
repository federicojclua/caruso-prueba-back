const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Es necesario un nombre'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Es necesario una descripcion'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Es necesario un precio']
    },
    quantity: {
        type: Number,
        required: [true, 'Es necesario una cantidad']
    },
    image: {
        type: String
    },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
