require("dotenv").config({ debug: true });

const uri = `mongodb+srv://wendi:${process.env.PASSWORD}@cluster0.wecrb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const express = require("express");
const mongoose = require('mongoose');
const homeRouter = require("./router/home");
const bookRouter = require("./router/book");
const authorRouter = require("./router/author");
const cors = require('cors');
const app = express();

const port = process.env.PORT;

mongoose.connect(uri , {
    useNewUrlParser:true ,
    useUnifiedTopology:true
});

const db = mongoose.connection;

db.once("open" , () => {
    console.log('success connect to db');
});

//use-middleware
app.use(cors({
    origin:"*",
    methods:["GET","POST","DELETE","PUT"]
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",homeRouter);
app.use("/book",bookRouter);
app.use("/author" , authorRouter);

app.listen(port, () => console.log(`run on port : ${port}`));
