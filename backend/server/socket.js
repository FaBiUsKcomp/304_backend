module.exports = (app, http) => {
    const io = require('socket.io')(http)
    //const money = io.of('/money')
    //const cleaning = io.of('/cleaning')
   // const dispensation = io.of('/dispensation')
    const chat = io.of('/chat')
    //const meme = io.of('/meme')

    //Chat
    chat.on('connection', socket => {
        console.log('Novo Usuário conectado!')
        socket.emit('saudacao', 'Bem-Vindo ao Socket.io !')
        socket.on('chatmessage', message => {
            socket.broadcast.emit('chatmessage', message)
        })
        socket.on('disconnect', () => console.log('Usuário desconectado!'))
    })

}