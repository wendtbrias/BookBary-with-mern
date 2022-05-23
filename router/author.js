const express = require('express');
const router = express.Router();

const { GetAuthor,PostAuthor,DeleteAuthor,UpdateAuthor,AuthorDetail } = require("../controller/authorController");

router.route("/").get(GetAuthor).post(PostAuthor).put(UpdateAuthor);
router.route("/:id").get(AuthorDetail).delete(DeleteAuthor);

module.exports = router;