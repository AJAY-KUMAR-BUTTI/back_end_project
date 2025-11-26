const userValidation = (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400).send({status : 'Error', msg : 'Invalid input'});
    } else {
        next();
    }
}

const postValidation = (req, res, next) => {
    const { body, title } = req.body;

    if(!body || !title) {
        res.status(400).send({status : 'Error', msg : 'Invalid Input'});
    } else {
        next();
    }
}

module.exports = {
    userValidation,
    postValidation
}