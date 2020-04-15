//All dependencies
const express = require('express')
const app = express()
const consign = require('consign') //Organization of project
const http = require('http').createServer(app)

consign()
    .include('/config/middlewares.js')
    .then('/model/dbconfig.js')
    .then('/config/passport.js')
    .then('/api')
    .then('/config/routes.js')
    .then('/server/socket.js')
    .into(app, http)

//Server
const Port = process.env.port || 4000
http.listen(Port, () => console.log(`Rodando na Porta ${Port}`))
