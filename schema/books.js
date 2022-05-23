const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: {
        type:String ,
        required:true
    },
    pageCount:{
        type:Number,
        required:true
    },
    publishDate:{
       type:Date,
       required:true
    },
    description:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'author'
    },
    coverImage: {
        type:String ,
        required:true
    }
});

const bookModel = mongoose.model("book" , bookSchema);

module.exports = bookModel;