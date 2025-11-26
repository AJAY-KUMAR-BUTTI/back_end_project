const jwt = require('jsonwebtoken');
const authMiddleWare =  (req, res, next) => {
    console.log("Auth MiddleWare Executed");
   // get the token
   console.log(req.headers.cookie);
   console.log(req.cookies.jwt);
   const token = req.cookies.jwt;
   if(token) {
    try {
    const userPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userPayload = userPayload;
    console.log(userPayload);
    next()
    } catch (err) {
        res.status(401).send({status : 'error', msg : 'invalid token'})
    }
   } else {
    res.status(401).send({status : 'error', msg : 'Token not present, try login!'})
   }
}

const isAdminMiddleWare = (req, res, next) => {
    const userPayload = req.userPayload;
    if(userPayload.isAdmin) {
        next();
    } else {
        res.status(401).send({status : 'Error', msg : 'this operation is not allowed' })
    }
}
module.exports = {
    authMiddleWare,
    isAdminMiddleWare
}