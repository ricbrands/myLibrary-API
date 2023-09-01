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
}

export default BookController