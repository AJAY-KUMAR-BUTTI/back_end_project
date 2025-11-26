const logMiddleWare = (req, res, next) => {
    console.log("th path is", req.url);
    console.log("Time", new Date());
    next();
}

module.exports = logMiddleWare;