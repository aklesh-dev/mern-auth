import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import User from '../models/User.Model.js';


export const test = (req, res) => {
    res.json({
        "message": "Api is called from controller."
    })
};

// --update user
export const updateUser = async (req, res, next) => {
    //--check user is autorized
    if (req.user.id !== req.params.id) {
        return next(errorHandler(403, "You can only update your account."));
    };
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        // --update the user
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture
                }
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc; //remove the password from the response
        res.status(200).json(rest);

    } catch (error) {
        next(errorHandler(500, "Error updating user"));
    }
};