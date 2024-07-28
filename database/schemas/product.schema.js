const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        image: {
            type: String,
            default: 0
        },
        productName: {
            type: String,
            trim: true
        },
        qtyInCart: {
            type: String,
            trim: true
        },
        uom: {
            type: String,
            trim: true
        },
        manufacturer: {
            type: String,
            trim: true
        },
        category: {
            type: String,
            trim: true
        },
        qtyInStock: {
            type: String,
            trim: true
        },
        price: {
            type: String,
            trim: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true
        },
    },
    { timestamps: true }
    );

// Create a model from the schema
const product = mongoose.model('products', productSchema);

// Export the User model
module.exports = product;