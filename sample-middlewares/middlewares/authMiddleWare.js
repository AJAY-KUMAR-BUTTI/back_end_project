const authMiddleware = (req, res, next) => {
    const isValidUser = true;
     console.log("Auth Middleware executed");
     if(isValidUser) {
         next();
     } else {
         res.status(401).send({status : 'Error', msg : 'not a valid user'});
     }
 }

 module.exports = authMiddleware;