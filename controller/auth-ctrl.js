const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const userCheck = await User.findOne({ email: email });
        if (userCheck) {
            res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const user = await User.create({
            username,
            email,
            password,
        });
        const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({
            status: "success",
            token: authToken,
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
        const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
            success: true,
            token: authToken,
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "Server Error",
        });
    }
};

module.exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse("Invalid email", 404));
        }
        const resetToken = user.getResetPasswordToken();
        await user.save();
        const resetUrl = `http://localhost:3000/resetPassword/${resetToken}`;
        const message = `
        <h1>You have requested a Password Reset</h1>
        <p>Please go to this link to reset the password</p>
        <a href = ${resetUrl} clicktracking = off>${resetUrl}</a>
        `;
        try {
            
        }catch(err){
            console.log(err);
        }
    } catch (err) {
        return next(new ErrorResponse("Server Error", 500));
    }
};

module.exports.resetPassword = async (req, res, next) => {
    res.send("resetPassword");
};
