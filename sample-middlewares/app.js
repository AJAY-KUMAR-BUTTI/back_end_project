const express = require('express');
const app = express();

const authMiddleware = require('./middlewares/authMiddleWare');
const logMiddleWare = require('./middlewares/logMiddleWare');
const { userValidation, postValidation } = require('./middlewares/validationMiddleWare');
app.use(authMiddleware);
app.use(logMiddleWare);
app.use(express.json());

app.get('/users', (req, res, next) => {
    console.log('get call is executed');
    res.send("hello world");
})
app.post('/users', userValidation, (req, res, next) => {
    console.log("Add users post call is executed");
    res.end();
})
app.post('/posts', postValidation ,(req, res, next) => {
    console.log('Add feed post call executed');
    res.send();
})
app.listen(8000, () => {
    console.log("the server is running");
})