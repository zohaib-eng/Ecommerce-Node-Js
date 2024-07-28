// Package Imports
const multer=require('multer');
// Local Imports
const  productService  = require('../services/product.service');
const logger = require('../middlewares/loggers.middleware');
const { default: mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectId;
const response = require("../responses/index");
const responseHandler = require('../responses/responseHandler');

module.exports = class {
    static async create(req, res) {
        const id = new mongoose.Types.ObjectId();
        const { productName, qtyInCart, uom, manufacturer, category, qtyInStock, price } = req.body;
        logger.info('Create Product',{ id, productName, qtyInCart, uom, manufacturer, category, qtyInStock, price });
        const result = await productService.product( id, productName, qtyInCart, uom, manufacturer, category, qtyInStock, price );
        if(result) {
            logger.info('Successfully create a product',{  id, productName, qtyInCart, uom, manufacturer, category, qtyInStock, price  });
            return responseHandler(res, res.status(200).json(result));
        } else {
            logger.error('Product already exist',{ productName });
            return responseHandler(res,response.internalServerError({ message:error.message }));
        }
    }


    static async update(req, res) {
        const { id, productName, qtyInCart, uom, manufacturer, category, qtyInStock, price } = req.body;
        logger.info('Recieved a request to update a product',{ productName, qtyInCart, uom, manufacturer, category, qtyInStock, price });
        const result = await productService.updateProductById( id, productName, qtyInCart, uom, manufacturer, category, qtyInStock, price );
        if(result) {
            logger.info('Successfully update a product',{ productName, qtyInCart, uom, manufacturer, category, qtyInStock, price });
            return res.status(200).json({ message: "Data updates successfully.", result});
        } else {
            logger.error('Product already exist.',{ productName });
            res.status(400).json({message: "Product already exist."});
        }
    }


    static async upload(req, res) {
        const { id } = req.query;
        let payload = req.body;
        let imgurl = "";
        if(req.file){
            imgurl=`${req.file.filename}`;
            payload.avatar=imgurl;
        }
        const image = imgurl;console.log(image);
        logger.info('Recieved a request to upload image',{ id, image });
        if (image) {
            logger.info('Image is found..',{ image });
            const result = await productService.uploadImage(id, image);
            if (result) {
                logger.info('Successfully to upload image',{ id, image });
                return res.status(200).json({ message: "Success", result });
            } else {
                logger.error('Product not found',{ id });
                return res.status(400).json({ message: "Product not exist." });
            }
        } else {
            logger.error('Image is undefined',{ image });
            return res.status(204).json({ message: "Image is undefined." });
        }
    }


    static async search(req, res) {
        const { id } = req.params;
        logger.info('Recieved a request to search a product',`${ id }`);
        const result = await productService.searchProduct( id );
        if (result) {
            logger.info('Successfully to search a product',{ id });
            return res.status(200).json({ message: "Success", result });
        } else {
            logger.error(' brand of this product not exist ', {id});
            return res.status(400).json({ message: "Brand of this product not exist." });
        }
    }


    static async delete(req, res) {
        const { id } = req.params;
        logger.info('Recieved a request to search a product',`${ id }`);
        const result = await productService.deleteProduct( id );
        if (result) {
            logger.info('Successfully to delete a product',{ id });
            return res.status(200).json({ message: "Success", result });
        } else {
            logger.error(' brand of this product not exist ', {id});
            return res.status(400).json({ message: "Brand of this product not exist." });
        }
    }


    static async filterData(req, res) {
        const { minPrice, maxPrice } = req.body;console.log(minPrice, maxPrice);
        logger.info('Recieved a request to filter a product',`${ minPrice, maxPrice }`);
        const result = await productService.filterProduct( minPrice, maxPrice );
        if (result) {
            logger.info('Successfully to filter a product',{ minPrice, maxPrice });
            return res.status(200).json({ message: "Success", result });
        } else {
            logger.error(' product not exist ', { minPrice, maxPrice });
            return res.status(400).json({ message: "product not exist." });
        }
    }


    static async createCart(req, res) {
        const productId = new mongoose.Types.ObjectId();
        const cid = new mongoose.Types.ObjectId();
        const { id, quantity } = req.body;
        logger.info('Create Cart',{ id });
        const result = await productService.addProduct( cid, id, productId, quantity );
        if(result) {
            logger.info('Successfully create a product',{ id });
            return res.status(200).json({ message: "Success", result});
        } else {
            logger.error('Product already exist',{ id });
            res.status(400).json({message: "Product already exist."});
        }
    }


    static async quantityAdd(req, res) {
        const { cid, productId, quantityToAdd } = req.body;
        logger.info('Create Cart',{ cid });
        const result = await productService.addQuantity( cid, productId, quantityToAdd );
        if(result) {
            logger.info('Successfully create a product',{ cid });
            return res.status(200).json({ message: "Success", result});
        } else {
            logger.error('Product already exist',{ cid });
            res.status(400).json({message: "Product already exist."});
        }
    }


    static async quantitySub(req, res) {
        const { cid, productId, quantityToSub } = req.body;
        logger.info('Create Cart',{ cid });
        const result = await productService.subQuantity( cid, productId, quantityToSub );
        if(result) {
            logger.info('Successfully create a product',{ cid });
            return res.status(200).json({ message: "Success", result});
        } else {
            logger.error('Product already exist',{ cid });
            res.status(400).json({message: "Product already exist."});
        }
    }
}