const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookname: {type: String, required:true, trim:true},
    author: {type: String, required:true, trim:true},
    description:{type: String, required: true, trim:true},
    bookimage:{data:Buffer, contentType:String},
    averagerating: {type:Number, default:0},
    numreviews:{type:Number, default:0}
},{timestamps:true});

module.exports = mongoose.model("Book", bookSchema);