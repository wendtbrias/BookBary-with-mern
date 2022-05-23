const mongoose = require("mongoose");
const { Schema } = mongoose;


const authorSchema = new Schema({
    name:String ,
    penName:String
});

module.exports = mongoose.model("author" , authorSchema);