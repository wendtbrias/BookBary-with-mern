const express = require('express');
const { Homepage } = require("../controller/homeController");
const router = express.Router();

router.get("/" , Homepage);

module.exports = router;