const { Schema, model } = require('mongoose')

const chat = new Schema({
    username: {
        type: String,
        require: true
    },
    messagetext: {
        type: String,
        require: true
    },
    hour: {
        type: String,
        require: true
    }
}, {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
})

module.exports = model('chat', chat)