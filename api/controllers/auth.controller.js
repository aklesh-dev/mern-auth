import User from "../models/User.Model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(200).json({ message: "User Created Successfully" });
    } catch (error) {
        // res.status(400).json(error.message);
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // --check validation
        const validUser = await User.findOne({ email });
        //--in not a valid user return invalid message--
        if (!validUser) return next(errorHandler("User not found", 404));
        //--check password
        const isValidPassword = bcryptjs.compareSync(password, validUser.password);
        if (!isValidPassword) return next(errorHandler("Invalid Credentials", 401));
        //--prevent password & only send rest of the user info
        const { password: hashedPassword, ...restInfo } = validUser._doc;
        //--generate token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        res.cookie('access_token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 3600000), //expires in 1 hours, optional.
            maxAge: 3600000, // equivalient to expires, but in milliseconds, preferred.
            // sameSite: 'none',
            secure: true,
        }).status(200).json(restInfo);

    } catch (error) {
        next(error);
    }
}; 