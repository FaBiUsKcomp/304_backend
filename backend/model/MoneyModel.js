const { Schema, model } = require('mongoose')

const money = new Schema({
    currentValue: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    mouth: {
        type: String,
        enum: [ 
            'january', 
            'february', 
            'march', 
            'april', 
            'may', 
            'june', 
            'july', 
            'august', 
            'september', 
            'october', 
            'november', 
            'december' 
        ],
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    userPayments: [{
        type: Schema.Types.ObjectId
    }],
    userPending: [{
        type: Schema.Types.ObjectId
    }]
})

module.exports = model('money', money)