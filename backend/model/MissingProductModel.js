const { Schema, model } = require('mongoose')

const missingProduct = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = model('missingProduct', missingProduct)