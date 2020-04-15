const { validField } = require('./validation')
const Chat = require('../model/ChatModel')
const User = require('../model/UserModel')

module.exports = (app, http) => {
    const createMessage = async (req, res) => {
        const message = { ...req.body }
        try {
            validField(message.username, 'Usuário inválido!')
            validField(message.messagetext, 'Menssagem inválida!')
            validField(message.hour, 'Hora inválida!')
        } catch (e) {
            return res.status(400).send(e)
        }

        const isMatch = await User.findOne({ username: message.username })

        if (!isMatch) return { "error": "Usuário Inválido!" }

        const messagebase = new Chat(message)
        return res.status(201).send(messagebase.save())
    }

    const readChat = async (req, res) => {
        await Chat.find({}).sort("createdAt")
            .then(messages => res.status(200).send(messages))

    }

    return { createMessage, readChat }
}