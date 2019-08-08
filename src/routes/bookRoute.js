const express = require('express');

function bookRouteFn(configObj, Books) {
    const bookRoute = express.Router();

    bookRoute.route('/')
        .post((req, res)=>{
            // create an instance of the book model
            // pass in the data from the body
            let book = new Books(req.body);
            // save the book to the database
            book.save();
            return res.status(201).json(book);
        })
        .get((req, res)=>{
            let query = req.query;
            Books.find(query, (err, books)=>{
                return err ? res.send(err) : res.json(books); // view returned data using postman
                // return err ? res.send(err) : res.render('allBooks',{ configObj, books});
            })
        });

    bookRoute.route('/:bookId')
        .get((req, res)=>{
            const bookId = req.params.bookId;
            Books.findById(bookId, (err, book)=>{
                return err ? res.send(err) : res.json(book);
                // return err ? res.send(err) : res.render('singleBook',{ configObj, book});
            })
        });
    
    return bookRoute;
}

module.exports = bookRouteFn;