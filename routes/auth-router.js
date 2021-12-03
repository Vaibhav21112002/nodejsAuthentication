const express = require("express");
const router = express.Router();
const {
    register,
    login,
    forgotPassword,
    resetPassword,
} = require("../controller/auth-ctrl");

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:resetToken", resetPassword);
module.exports = router;
