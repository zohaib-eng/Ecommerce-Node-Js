// Package Imports

// Local Imports
const { ObjectId, BSON } = require('mongodb');
const  product  = require('../database/schemas/product.schema');
const cart = require('../database/schemas/productCart.schema')
const { catchError } = require('../utils/index');

module.exports = class {
   static product = async( id, productName, qtyInCart, uom, manufacturer, category, qtyInStock, price ) =>
      await catchError(async () => {
        const result = await product.findOne({ id: id});
        if(result) return false;
        const p = new product({ id, productName, qtyInCart, uom, manufacturer, category, qtyInStock, price });
        const results = await p.save();
        return results;
   });

   static updateProductById = async( id, productName, qtyInCart, uom, manufacturer, category, qtyInStock, price ) =>
      await catchError(async () => {
        const result = await product.findOneAndUpdate({ id: id}, { productName, qtyInCart, uom, manufacturer, category, qtyInStock, price }, { new: true });
        if(result) return  result ;
        else return false;
   });


   static uploadImage = async(id, image) =>
      await catchError(async () => {
         const results = await product.findOne({ id: id});
         if(!results) return  false ;
         const result = await product.findOneAndUpdate(
           {id: id},
           {$set: {'image': image}}, {new: true}
        )
        if (result) return result;
        else return false;
   });


   static searchProduct = async( id ) =>
      await catchError(async () => {
         const result = await product.findOne({ id: id });
         if(result) return result;
         else return false;
   });

   static deleteProduct = async( id ) =>
      await catchError(async () => {
         const result = await product.deleteOne({ id: id });
         if(result) return result;
         else return false;
  });

   static filterProduct = async(minPrice, maxPrice) =>
   await catchError(async () => {
         const result = await product.find({
            price: {
            $gte: minPrice,
            $lte: maxPrice,
         },
      });
      if (result) return result;
      else return false;
   });

   static addProduct = async (cid, id, productId, quantity) =>
   await catchError(async () => {
     const result = await product.findOne({ id: id });
 
     if (result) {
       // Create a new cart if it doesn't exist for the given user (id).
       const c = new cart({ cid : cid, productId: productId });
       c.products.push({
         productId: result,
         quantity: quantity
       });
       await c.save();
       return c;
     }
 
     // If the cart exists, simply push the product to it.
     result.products.push({
       productId: productId,
       quantity: quantity
     });
 
     await result.save();
     return result;
   });



   static addQuantity = async (cid, productId, quantityToAdd) =>
   await catchError(async () => {
     const result = await cart.findOne({ cid: cid });console.log(quantityToAdd);
     
     if (!result) {
       return { message: "Product not found" };
     }
     
     const productToUpdate = result.products.find((product) => product.productId == productId);
 
     if (!productToUpdate) {
       return { message: "Product not found in the cart" };
     }
 
     const currentQuantity = productToUpdate.quantity;
     // Check if the current quantity is a valid number (not NaN).
     if (typeof currentQuantity === 'number' && !isNaN(currentQuantity)) {
       // Add the desired quantity.
       productToUpdate.quantity = currentQuantity + Number(quantityToAdd);
     } else {
       // Handle the case where the current quantity is not a valid number.
       return { message: "Invalid current quantity" };
     }

     await result.save();
     return result;
   });



   static subQuantity = async (cid, productId, quantityToSub) =>
   await catchError(async () => {
     const result = await cart.findOne({ cid: cid });console.log(quantityToSub);
     
     if (!result) {
       return { message: "Product not found" };
     }
     
     const productToUpdate = result.products.find((product) => product.productId == productId);
 
     if (!productToUpdate) {
       return { message: "Product not found in the cart" };
     }
 
     const currentQuantity = productToUpdate.quantity;
     // Check if the current quantity is a valid number (not NaN).
     if (typeof currentQuantity === 'number' && !isNaN(currentQuantity)) {
       // Add the desired quantity.
       productToUpdate.quantity = currentQuantity - Number(quantityToSub);
     } else {
       // Handle the case where the current quantity is not a valid number.
       return { message: "Invalid current quantity" };
     }

     await result.save();
     return result;
   });
 
 
}