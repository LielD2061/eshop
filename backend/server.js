import express from "express";
import data from "./data.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seedRoutes from "./routes/seedroutes.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use("/api/v1/seed", seedRoutes);
app.use("/api/v1/product/token/:token", async (req, res) => {
  const product = await data.products.find((x) => x.token === req.params.token);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product was not found" });
  }
});

app.use("/api/v1/product/:id", async (req, res) => {
  const product = await data.products.find((x) => x._id === req.params._id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product was not found" });
  }
});

//Endpoints
app.get("/api/v1/products", (req, res) => {
  res.send(data.products);
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(`connected on port ${PORT}`);
    app.listen(PORT, () => {
      console.log(`I am listaning on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`not connected to db! ${err.message}`);
  });
