import express from "express";
import books from "./booksRoutes";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send({titulo: "Node course!"})
    })

    app.use(
        express.json(),
        livros
    )
}

export default routes