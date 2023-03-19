import express from "express";
import data from "/home/devvm/Documents/dev/eshop/backend/data.js";

const PORT = process.env.PORT || 5000 
const app = express();



//Endpoints
app.get('/api/v1/products', (req, res) => {
    res.send(data.products)
})

app.listen(PORT, () =>{
    console.log(`I am listaning on port ${PORT}`)
})