import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Sever running on Port: ${PORT}`))
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB:', err);
    });

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client/dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client','dist','index.html'));
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// --middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});