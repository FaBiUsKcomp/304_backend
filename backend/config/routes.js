module.exports = app => {

    //ALL Express -------------------------------------------
    app.get('/', (req, res) => {
        res.send('Backend do Projeto 304')
    })

    //AUTH
    app.post('/login', app.api.auth.login)
    app.post('/validate', app.api.auth.validate)

    //USER
    //app.route('/user').all(app.config.passport.authenticate()) //Autorization
    app.get('/user', app.api.user.readUsers)
    app.get('/user/:id', app.api.user.readAUser)
    app.post('/user', app.api.user.createUser)
    app.put('/user', app.api.user.updateUser)
    app.delete('/user/:id', app.api.user.deleteUser)

    //USER LEVEL
    app.route('/checkUserLevel').all(app.config.passport.authenticate())
    app.post('/checkUserLevel', app.api.auth.checkUserLevel)

    //MONEY
    app.post('/money', app.api.money.createTableMouth)

    //CLEANING
    app.get('/cleaning', app.api.cleaning.getAllWeek)
    app.put('/cleaning', app.api.cleaning.updateAllWeek)

    //DISPENSATION
    app.get('/dispensation', app.api.dispensation.readProducts)
    app.post('/dispensation', app.api.dispensation.createProduct)
    app.delete('/dispensation', app.api.dispensation.deleteProduct)
    app.post('/dispensation/missing', app.api.dispensation.createMissingProduct)
    app.get('/dispensation/missing', app.api.dispensation.readMissingProducts)
    app.delete('/dispensation/missing', app.api.dispensation.deleteMissingProduct)

    //CHAT
    app.route('/chat').all(app.config.passport.authenticate())
    app.get('/chat', app.api.chat.readChat)
    app.post('/chat', app.api.chat.createMessage)
}