import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRoutes from './routes/seedroutes.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use('/api/v1/seed', seedRoutes);

app.use(cors());

//Endpoints
app.get('/api/v1/products', (req, res) => {
	res.send(data.products);
});

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		console.log(`connected on port ${PORT}`)
		app.listen(PORT, () => {
			console.log(`I am listaning on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error(`not connected to db! ${err.message}`);
	});