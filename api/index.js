import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Sever running on Port: ${PORT}`))
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB:', err);
    });

app.use('/api/user', userRouter);