const express = require("express");

const server = express();

const accountsRouter = require('./accounts/accounts-router')

server.use(express.json());

server.use('/api/accounts', accountsRouter)

server.get('/', (req, res) => {
    res.send(`<h2>Let's write some code!</h2>`);
});

server.use('*', (req, res, next) => {
    res.status(404).json({
        message: `${req.baseUrl} could not be found`
    })
})



module.exports = server;
