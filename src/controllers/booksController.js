import books from "../models/Book.js";
import AuthorController from "./authorsController.js";

class BookController {
    static booksList = async (req, res) => {
        try {
            const booksResult = await books.find().populate('author');
            res.status(200).json(booksResult)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static bookListById = async(req, res) => {
        const id = req.params.id;
        const booksResult = await books.findById(id).populate('author', 'name');
        res.status(200).send(booksResult);
    }

    static listBooksByAuthor = async(req, res) => {
        const authorName = req.query.author;

        const authorObj = await AuthorController.getAuthorByName(authorName);
        if (!authorObj) {
            res.status(404).json({message: "Author not found!"});
        } else {
            try {
                const booksResult = (await books.find({"author": authorObj._id}).populate('author'));
                res.status(200).json(booksResult)
            } catch (err) {
                res.status(500).json(err);
            }
        }
        
    }

    static createBook = async (req, res) => {
        try {
            let book = new books(req.body);
            const result = await book.save();
            res.status(201).send(book.toJSON());
        } catch(err){
            res.status(500).send({message: `Error to create book: ${err.message}`})
        }
    }

    static updateBook = async (req, res) => {
        try {
            const id = req.params.id;
            const result = await books.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "Book sucessfully updated!"});
        } catch(err) {
            res.status(500).send({message: err.message})
        }
    }

    static deleteBook = async (req, res) => {
        try{
            const id = req.params.id;
            const result = await books.findByIdAndDelete(id);
            res.status(200).send({message: "Book deleted sucessfully!"})
        } catch(err){
            res.status(500).send({message: err.message})
        }
    }
}

export default BookController