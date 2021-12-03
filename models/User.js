const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Provide a User Name"],
    },
    email: {
        type: String,
        required: [true, "Please Provide an Email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please Provide a Password"],
        minlength: [8, "Password must be at least 8 characters"],
        select: false,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
