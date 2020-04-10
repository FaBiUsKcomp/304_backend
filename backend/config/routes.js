module.exports = app => {

    //ALL Express -------------------------------------------
    app.get('/', (req, res) => {
        res.send('Backend do Projeto 304')
    })

    //AUTH
    app.post('/login', app.api.auth.login)
    app.post('/validate', app.api.auth.validate)

    //USER
    app.get('/user', app.api.user.readUsers)
    app.get('/user/:id', app.api.user.readAUser)
    app.post('/user', app.api.user.createUser)
    app.put('/user', app.api.user.updateUser)
    app.delete('/user/:id', app.api.user.deleteUser)

    //CHAT

    app.get('/chat', app.api.chat.readChat)
    app.post('/chat', app.api.chat.createMessage)
}