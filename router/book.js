const express = require('express');
const router = express.Router();
const { BookPage,BookPost,BookDetail,BookDelete,BookUpdate } = require("../controller/bookController");

router.route("/").get(BookPage).post(BookPost).put(BookUpdate);
router.route("/:id").get(BookDetail).delete(BookDelete);

module.exports = router;