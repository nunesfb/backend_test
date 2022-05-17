
module.exports = (req, res, next) => {
    console.log(`Estou no middleware auth: ${req.query.user}`);
    console.log(`Estou no middleware auth: ${req.headers.authorization}`);
      if (req.query.user === 'batata') {
        req.user = {
          name: 'batata'
        };
      return next();
    }
  
    //res.status(401).json({ message: "you're not batata" })
    throw { status: 400, message: "Bad Request"};
  };
  