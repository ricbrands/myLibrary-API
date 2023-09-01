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

    static createBook = (req, res) => {
        let book = new books(req.body);
        book.save((err) => {
            if (err) {
                res.status(500).send({message: `Error to create book: ${err.message}`})
            } else {
                res.status(201).send(book.toJSON());
            }
        })
    }
}

export default BookController