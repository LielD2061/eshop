import express from "express";
import Product from "../models/productModels.js";

const ProductRoutes = express.Router();

ProductRoutes.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

ProductRoutes.use("/:_id", async (req, res) => {
  const product = await Product.findById(req.params._id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product was not found" });
  }
});

ProductRoutes.use("/token/:token", async (req, res) => {
  const product = await Product.findOne({token: req.params.token});
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product was not found" });
  }
});



export default ProductRoutes;
