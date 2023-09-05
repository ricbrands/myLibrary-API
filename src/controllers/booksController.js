import NotFound from "../errors/NotFound.js";
import books from "../models/Book.js";
import AuthorController from "./authorsController.js";

class BookController {
  static booksList = async (req, res, next) => {    
    try {
      const booksResult = await books.find().populate("author");
      res.status(200).json(booksResult);
    } catch (err) {
      next(err);
    }
  };

  static bookListById = async(req, res, next) => {
    try {
      const id = req.params.id;
      const booksResult = await books.findById(id).populate("author", "name");
      if (booksResult !== null) {
        res.status(200).send(booksResult);
      } else {
        next(new NotFound("Book not found."));
      }
    } catch (err) {
      next(err);
    }
  };

  static listBooksByAuthor = async(req, res, next) => {
    const authorName = req.query.author;

    const authorObj = await AuthorController.getAuthorByName(authorName);
    if (!authorObj) {
      res.status(404).json({message: "Author not found!"});
    } else {
      try {
        const booksResult = (await books.find({"author": authorObj._id}).populate("author"));
        if (booksResult !== null) {
          res.status(200).json(booksResult);
        } else {
          next(new NotFound("Book not found."));
        }
      } catch (err) {
        next(err);
      }
    }
        
  };

  static createBook = async (req, res, next) => {
    try {
      let book = new books(req.body);
      await book.save();
      res.status(201).send(book.toJSON());
    } catch(err){
      next(err);
    }
  };

  static updateBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      const booksResult = await books.findByIdAndUpdate(id, {$set: req.body});
      if (booksResult !== null) {
        res.status(200).send({message: "Book sucessfully updated!"});
      } else {
        next(new NotFound("Book not found."));
      }
    } catch(err) {
      next(err);
    }
  };

  static deleteBook = async (req, res, next) => {
    try{
      const id = req.params.id;
      const booksResult = await books.findByIdAndDelete(id);
      if (booksResult !== null) {
        res.status(200).send({message: "Book deleted sucessfully!"});
      } else {
        next(new NotFound("Book not found."));
      }
    } catch(err){
      next(err);
    }
  };
}

export default BookController;