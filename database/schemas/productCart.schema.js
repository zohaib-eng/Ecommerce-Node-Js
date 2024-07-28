const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true
    },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref:'products' },
        quantity: { type: Number },
    }],
});

const Cart = mongoose.model('Carts', CartSchema);

module.exports = Cart;
