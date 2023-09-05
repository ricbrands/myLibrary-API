import NotFound from "../errors/NotFound.js";
import authors from "../models/Author.js";

class AuthorController {
  static authorsList = async (req, res, next) => {
    try {
      const authorsResult = await authors.find();
      res.status(200).json(authorsResult);
    } catch (err) {
      next(err);
    }
  };

  static authorListById = async(req, res, next) => {
    try {
      const id = req.params.id;
      const authorsResult = await authors.findById(id);
      if (authorsResult !== null) {
        res.status(200).send(authorsResult);
      } else {
        next(new NotFound("Author not found."));
      }      
    } catch (err) {
      next(err);    }
  };

  static getAuthorByName = async(name) => {
    return await authors.findOne({"name": name});
  };

  static createAuthor = async (req, res, next) => {
    try {
      let author = new authors(req.body);
      const authorResult = await author.save();
      res.status(201).send(authorResult.toJSON());
    } catch(err){
      next(err);
    }
  };

  static updateAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const authorsResult = await authors.findByIdAndUpdate(id, {$set: req.body});
      if (authorsResult !== null) {
        res.status(200).send({message: "author sucessfully updated!"});
      } else {
        next(new NotFound("Author not found."));
      }
    } catch(err) {
      next(err);
    }
  };

  static deleteAuthor = async (req, res, next) => {
    try{
      const id = req.params.id;
      const authorsResult = await authors.findByIdAndDelete(id);
      if (authorsResult !== null) {
        res.status(200).send({message: "author deleted sucessfully!"});
      } else {
        next(new NotFound("Author not found."));
      }
    } catch(err){
      next(err);
    }
  };
}

export default AuthorController;