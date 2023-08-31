import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        id: {type: String},
        title: {type: String, require: true},
        author: {type: String, require: true},
        numberOfPages: {type: Number}
    }
);

const books = mongoose.model('books', bookSchema);

export default books;