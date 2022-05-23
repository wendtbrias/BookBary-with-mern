const authorModel = require('../schema/authors');
const bookModel = require("../schema/books");

module.exports = {
    GetAuthor: async (req,res) => {
        try {
            const author = await authorModel.find();
             res.status(200).json({ author:author });
        } catch(err) {
            console.log(err);
        }
    },

    AuthorDetail: async (req,res) => {
        const singleAuthor = await authorModel.findById(req.params.id);
        try {
            const bookAuthor = await bookModel.find({ author:singleAuthor._id });
            res.status(200).json({ author:singleAuthor, book:bookAuthor });
        } catch (err) {
            console.log(err);
        }
    },

    PostAuthor: async (req,res) => {
        const initAuthor = new authorModel(req.body);
        try {
            await initAuthor.save();
            res.status(200).json({ author:initAuthor });
        } catch(err) {
            console.log(err);
        }
    },

    DeleteAuthor: async (req,res) => {
         try {
             await authorModel.deleteOne({ _id:req.params.id });
             await bookModel.deleteOne({ author:req.params.id });
             res.status(200).json({ author:req.params.id });
         } catch (err) {
             console.log(err);
         }
    },

    UpdateAuthor: async (req,res) => {
        const initAuthor = req.body;
        try {
            await authorModel.updateOne({ _id:req.body._id } , {
                $set:{
                    name:req.body.name,
                    penName:req.body.penName
                }
            });

            res.status(200).json({ author:initAuthor });
        } catch(err) {
            console.log(err);
        }
    }
}