import authors from "../models/Author.js";

class AuthorController {
    static authorsList = async (req, res) => {
        try {
            const authorsResult = await authors.find();
            res.status(200).json(authorsResult)
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static authorListById = async(req, res) => {
        try {
            const id = req.params.id;
            const authorsResult = await authors.findById(id);
            res.status(200).send(authorsResult);
        } catch (err) {
            res.status(500).json(err);
        }
    }

    static createAuthor = async (req, res) => {
        try {
            let author = new authors(req.body);
            const result = await author.save();
            res.status(201).send(author.toJSON());
        } catch(err){
            res.status(500).send({message: `Error to create author: ${err.message}`})
        }
    }

    static updateAuthor = async (req, res) => {
        try {
            const id = req.params.id;
            const result = await authors.findByIdAndUpdate(id, {$set: req.body});
            res.status(200).send({message: "author sucessfully updated!"});
        } catch(err) {
            res.status(500).send({message: err.message})
        }
    }

    static deleteAuthor = async (req, res) => {
        try{
            const id = req.params.id;
            const result = await authors.findByIdAndDelete(id);
            res.status(200).send({message: "author deleted sucessfully!"})
        } catch(err){
            res.status(500).send({message: err.message})
        }
    }
}

export default AuthorController