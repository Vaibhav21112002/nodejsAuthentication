const express = require("express");
const router = express.Router();
const { getPrivateData } = require("../controller/private-ctrl");
const { protect } = require("../middleware/auth");

router.get("/", protect,getPrivateData);

module.exports = router;
