import express from "express";
import Product from '../models/productmodels.js'
import data from '../data.js'

const seedRoutes = express.Router();

seedRoutes.get('/', async(req, res) => {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts});
})


export default seedRoutes