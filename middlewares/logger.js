module.exports = (req, _res, next) => {
    console.log("Estou no middleware logger");
    req.startTime = Date.now();
    console.log(`[${req.method}] ${req.path}`);
    next();
  }
  