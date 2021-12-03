const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");


const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({
        status: "success",
        token,
    });
}

module.exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.create({
            username,
            email,
            password,
        });
        res.status(201).json({
            status: "success",
            token: "sdfhsd34",
        });
    } catch (err) {
        next();
    }
};

module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(
            new ErrorResponse("Please provide email and password", 400)
        );
    }

    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorResponse("Invalid email or password", 404));
        }
        const isMatch = await user.verifyPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid email or password", 404));
        }
        res.status(200).json({
            success: true,
            token: "skdfh23462y3",
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Server Error",
        });
    }
};

module.exports.forgotPassword = async (req, res, next) => {
    res.send("forgotPassword");
};

module.exports.resetPassword = async (req, res, next) => {
    res.send("resetPassword");
};

