$ = jquery = require('jquery');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const chalk = require('chalk');
// Only displays information to the console on development mode but not production mode.
const debug = require('debug')('server');
// HTTP request logger middleware for node.js
// Morgan is used for logging request details
const morgan = require('morgan');
// Create an instance of express
const app = express();
const port = process.env.PORT;
const dbConnect = mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true })
                    .catch(function(err) {
                        debug(chalk.red(err))
                    });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static(path.resolve(__dirname, '../src/')));
app.use('/css' ,express.static(path.resolve(__dirname, '../node_modules/bootstrap/dist/css/')));
app.use('/js' ,express.static(path.resolve(__dirname, '../node_modules/bootstrap/dist/js/')));
app.use('/js' ,express.static(path.resolve(__dirname, '../node_modules/jquery/dist/')));
app.set('views', path.resolve(__dirname, '../src/views/'));
app.set('view engine', 'ejs');

const configObj = {
    title: "Book Store",
    nav:[{link : '/', menu : "Home"},
        {link : '/books', menu : "Books"},
        {link : '/authors', menu : "Authors"}]
};
const Books = require('../src/model/bookModel');
const bookRoute = require('../src/routes/bookRoute')(configObj, Books);

app.use('/books', bookRoute);
app.get('/', (req, res)=>{
    Books.find((err, books)=>{
        return err ? res.send(err) : res.render('index',{ configObj, books});
    })
});

app.listen(port, (err)=>{
    return err ? debug(chalk.red(err)) : debug(chalk.green(`listening on port: ${port}`));
});