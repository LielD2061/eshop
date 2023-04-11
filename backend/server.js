import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seedRoutes from "./routes/seedRoutes.js";
import cors from "cors";
import ProductRoutes from "./routes/productRoutes.js";
import UserRoutes from "./routes/userRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/seed", seedRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/products", ProductRoutes);

app.use((err, req, res, next) => {
  res.status(500).send({message: err.message});

})

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