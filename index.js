const express = require('express');
const cors = require('cors');
const middlewares = require('./middlewares');

const app = express();

app.use(express.json()); //middleware

app.use(cors()); //middleware

//app.use(middlewares.logger);
//app.all('/sistema/users', middlewares.dummy);

app.use('/sistema', require('./routes/index'));

app.get('/welcome', (request, response) => {
    console.log("welcome");
    response.status(400).json({ message: "Tudo OK por aqui"});
});

//app.use(middlewares.dummy);
app.use(middlewares.error);

app.listen(3001, () => {
    console.log('Aplicação rodando na porta 3001');
})