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
        if (!validUser) return next(errorHandler(404, "User not found"));
        //--check password
        const isValidPassword = bcryptjs.compareSync(password, validUser.password);
        if (!isValidPassword) return next(errorHandler(403, "Invalid Credentials"));
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

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            const expiryDate = new Date(Date.now() + 3600000);
            res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
        } else {
            // -- random password with 8 + 8 = 16 digit password & 36 is (a-z + 0-9)
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            // --encrypt the password
            const encryptedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                // --username with random num, to make username unique to avoid conflict
                username: req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 1000).toString(),
                email: req.body.email,
                password: encryptedPassword,
                profilePicture: req.body.photo
            });
            await newUser.save(); //--save to db
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = newUser._doc;
            const expiryDate = new Date(Date.now() + 3600000);
            res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
        }

    } catch (error) {
        next(error);
    }
};

export const signout = (req, res) => {
    res.clearCookie('access_token').status(200).json("Signout Success");
};