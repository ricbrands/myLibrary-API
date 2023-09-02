import books from "../models/Book.js";

class BookController {
    static booksList = async (req, res) => {
        try {
            const booksResult = await books.find();
            res.status(200).json(booksResult)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static bookListById = async(req, res) => {
        const id = req.params.id;
        const booksResult = await books.findById(id);
        res.status(200).send(booksResult);
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