import User from "../models/User";

export const checkExistUser = async (req, res, next) => { 
    const user = await User.findOne({ email: req.body.email });
    if (!user) { 
        return res.status(404).json({
            message: "User has not found",
        });
    }
    req.user = user;
    next();
}

//compare otp
export const compareOtp = async (req, res, next) => { 
    if (req.user.otp !== req.body.otp) { 
        return res.status(400).json({
            message: "Otp does not match",
        })
    }
    next();
}
