const express = require('express');
const bodyParser = require('body-parser');

const { initDB } = require('./dbConfig');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const movieRouter = require('./routes/movieRouter');

const app = express();
const dotenv = require('dotenv');
dotenv.config();
initDB();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static('public'));

app.use('/', authRouter);
app.use('/movies', movieRouter);
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/homePage.html');
})
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
})
app.get('/addPost', (req, res) => {
    res.sendFile(__dirname + '/public/post.html');
})
app.get('/delete', (req, res) => {
    res.sendFile(__dirname + '/public/delete.html');
})


app.listen(8000, () => {
    console.log(" server connected successfully");
})