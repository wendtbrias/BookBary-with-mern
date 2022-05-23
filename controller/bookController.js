const bookModel = require("../schema/books");
const authorModel = require("../schema/authors");

module.exports = {
    BookPage: async (req,res) => {
        let query = bookModel.find();

        if(req.query.title != null && req.query.title != "") {
            query = query.regex("title" , new RegExp(req.query.title , "i"));
        }

        if(req.query.publishDateBefore != null && req.query.publishDateBefore != "") {
            query = query.lte("publishDate",req.query.publishDateBefore);
        }

        if(req.query.publishDateAfter != null && req.query.publishDateAfter != "") {
            query = query.gte("publishDate",req.query.publishDateAfter);
        }

        try {
             query = await query.exec();
             const author = await authorModel.find();
             res.status(200).json({ book:query,author:author  });
         } catch(err) {
             console.log(err);
         }
    },

    BookDetail: async (req,res) => {
        const findBook =  bookModel.findById(req.params.id);
        try {
            const singleBook = await findBook.populate('author').exec();
            res.status(200).json({ book:singleBook });
        } catch(err) {
            console.log(err);
        }
    },

    BookDelete: async (req,res) => {
        const id = req.params.id;
        try {
            await bookModel.findByIdAndDelete(id);
            const findBook = await bookModel.find();

            res.status(200).json({ book:req.params.id });
        } catch (err) {
            console.log(err);
        }
    },

    BookPost: async (req,res) => {
        const initBook = new bookModel(req.body);
        try {
            await initBook.save();
            res.status(200).json({ book:initBook });
        } catch(err) {
            console.log(err);
        }
    },

    BookUpdate: async (req,res) => {
         const initBook = req.body;

         try {
             await bookModel.updateOne({ _id:req.body._id } , {
                 $set: {
                     title:req.body.title ,
                     pageCount:req.body.pageCount,
                     description:req.body.description,
                     author:req.body.author,
                     coverImage:req.body.coverImage,
                     publishDate:req.body.publishDate
                 }
             });

             res.status(200).json({ book:initBook });
         } catch(err) {
             console.log(err);
         }
    }
}