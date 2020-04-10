//All dependencies
const express = require('express')
const app = express()
const consign = require('consign') //Organization of project
const http = require('http').createServer(app)

consign()
    .include('/config/middlewares.js')
    .include('/model/dbconfig.js')
    .include('/config/passport.js')
    .include('/api')
    .include('/config/routes.js')
    .include('/server/socket.js')
    .into(app, http)

//Server
const Port = process.env.port || 4000
http.listen(Port, () => console.log(`Rodando na Porta ${Port}`))
