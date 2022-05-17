
module.exports = (req, res, next) => {
    console.log(`Estou no middleware auth: ${req.headers.authorization}`);
      if (req.headers.authorization) {
        //aqui seria onde ocorreria a validação do token
        console.log(`token: ${req.headers.authorization}`)
      return next();
    }
  
    //res.status(401).json({ message: "you're not batata" })
    throw { status: 400, message: "Bad Request"};
  };
  