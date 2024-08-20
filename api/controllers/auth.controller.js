import User from "../models/User.Model.js";
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(200).json({ message: "User Created Successfully" });
    } catch (error) {
        res.status(400).json(error.message);
    }
};