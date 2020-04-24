const { Schema, model } = require('mongoose')

const week = new Schema({
    id: {
        type: Number,
        required: true
    },
    sunday:{
        type: String,
        required: true
    }, 
    monday: {
        type: String,
        required: true
    }, 
    tuesday:{
        type: String,
        required: true
    }, 
    wednesday:{
        type: String,
        required: true
    }, 
    thursday: {
        type: String,
        required: true
    }, 
    friday: {
        type: String,
        required: true
    }, 
    saturday: {
        type: String,
        required: true
    }
})

module.exports = model('week', week)