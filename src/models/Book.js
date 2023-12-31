import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    id: {type: String},
    title: {type: String, required: [true, "Title is required!"]},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "authors", required: [true, "Author is required!"]},
    numberOfPages: {type: Number}
  }
);

const books = mongoose.model("books", bookSchema);

export default books;