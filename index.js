import express from 'express';
import dotenv from 'dotenv';
import corsConfig from './configs/cors.js';
import connectDB from './configs/db.js';
import configCloudinary from './configs/cloudinary.js';
import route from './routes/index.js';

dotenv.config();
connectDB();
configCloudinary();

// app
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(corsConfig);

// routes
app.use('/api', route);
app.get('/', (req, res) => {
    res.send('<h1>Hello world!</h1>');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('App running at port: ' + PORT);
});
