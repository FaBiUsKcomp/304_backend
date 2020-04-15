const { Schema, model } = require('mongoose')

const product = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = model('product', product)