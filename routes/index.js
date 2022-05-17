const express = require('express');
const routes = express.Router();
const usersData = require('../data/users');
const middlewares = require('../middlewares');
const {generateToken} = require('../utils/crypto');

//routes.get('/users', middlewares.auth, function (req, res, next) {
routes.get('/users', function (req, res, next) {
    res.status(200).json(usersData);
    next();
});

routes.get('/users/search', function (req, res) {
    const {text} = req.query;
    
    if(!text) return res.status(400).json({message: 'Not Found'});

    const users = usersData.filter
    ((user) => user.name.toLowerCase().includes(text.toLocaleLowerCase()) ||
    user.username.toLowerCase().includes(text.toLocaleLowerCase())
    );

    if(!users) return res.status(404).json({message: 'User not Found'});

    res.status(200).json(users);
});

routes.get('/users/:id', function (req, res) {
    const {id} = req.params;
    
    const user = usersData.find((user) => user.id === parseInt(id));

    if(!user) return res.status(404).json({message: 'User not Found'});

    res.status(200).json(user);
});

routes.post('/users', function (req, res) {
    const {id, name, email, phone, age, username} = req.body;
    //req.body.teste.name = 'teste';
    if (!id || !name || !email || !phone || !age || ! username) {
        // return res.status(400).json({ message: "Bad Request" });
        throw { status: 400, message: "Está faltando dados!"};
    }

    usersData.push({id, name, email, phone, age, username});
    res.status(201).json({message: 'Insert OK'});
});

routes.put('/users/:id', function (req, res) {
    const {id} = req.params;
    const {name, email, phone, age, username} = req.body;
    if (username.length > 20) {
        //return res.status(400).json({ message: "Dados incorretos!" });
        throw { status: 400, message: "Está faltando dados!"};
    }

    const userIndex = usersData.findIndex((user) => user.id === parseInt(id));

    if(userIndex === -1) return res.status(404).json({message: 'User not Found'});

    usersData[userIndex] = {...usersData[userIndex], name, email, phone, age, username};

    res.status(204).end();
});

routes.delete('/users/:id', function (req, res) {
    const {id} = req.params;
    
    const userIndex = usersData.findIndex((user) => user.id === parseInt(id));

    if(userIndex === -1) return res.status(404).json({message: 'User not Found'});

    usersData.splice(userIndex, 1);

    res.status(204).end();
});

routes.post('/login', function (req, res) {
    const { email, password } = req.body;
    if(email === 'teste@teste.com' && password === '1234'){
        const token = generateToken();
        res.status(200).json({token});
    }
    console.log(req.body)
    res.status(401).end();
});

routes.get('/userauth', middlewares.auth, function (req, res, next) {
    res.status(200).json(usersData);
    next();
});

module.exports = routes;