module.exports = (app, http) => {
    const io = require('socket.io')(http)
    //const money = io.of('/money')
    //const cleaning = io.of('/cleaning')
   // const dispensation = io.of('/dispensation')
    const chat = io.of('/chat')
    //const meme = io.of('/meme')

    //Chat
    chat.on('connection', socket => {
        socket.on('userconnect', message => {
            socket.broadcast.emit('userconnect', message)
        })
        socket.on('userdisconnected', message => {
            socket.broadcast.emit('userdisconnected', message)
        })
        socket.on('chatmessage', message => {
            socket.broadcast.emit('chatmessage', message)
        })
    })

}