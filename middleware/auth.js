const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

module.exports.protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(
            new ErrorResponse("Not authorized to access this route1", 401)
        );
    }

    try {
        const dcoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(dcoded.id);
        if (!user) {
            return next(new ErrorResponse("No User Find With this ID", 404));
        }
        req.user = user;
        console.log(user);
        next();
    } catch (error) {
        console.log("Server Error");
        return next(
            new ErrorResponse("Not authorized to access this route", 401)
        );
    }
};
