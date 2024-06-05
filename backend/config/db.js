const mongoose = require("mongoose");

exports.connectDB = ()=>{ 
    mongoose.connect("mongodb://localhost:27017/todo-App-FullStack");
    console.log("Db successfully connected")
}