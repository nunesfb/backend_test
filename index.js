const express = require('express');
const cors = require('cors');
const middlewares = require('./middlewares');

const app = express();

app.use(express.json()); //middleware

app.use(cors()); //middleware

app.use('/sistema', require('./routes/index'));

app.get('/welcome', (request, response) => {
    console.log("welcome");
    response.status(400).json({ message: "Tudo OK por aqui"});
});

app.use(middlewares.error);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`);
})