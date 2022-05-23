const bookModel = require("../schema/books");

module.exports = {
    Homepage: async (req,res) => {
        const book = await bookModel.find();
        res.status(200).json({ book });
    }
}