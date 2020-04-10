const bodyparser = require('body-parser')
const cors = require('cors')

module.exports = app => {

    //MiddleWares
    app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
    app.use(bodyparser.json())
    app.use(bodyparser.urlencoded({ extended: true }))
}