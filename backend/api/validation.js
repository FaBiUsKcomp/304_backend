const emailValidator = require('email-validator')

function validField (field, msg) {
    if(!field) throw msg
    if(Array.isArray(field) && field.length === 0) throw msg
    if(typeof field === 'string' && !field.trim()) throw msg
}

function isEmail (email, msg) {
    if(!emailValidator.validate(email)) throw msg
}

function passwordIsEquals (pass1, pass2, msg) {
    if(!pass1 === pass2) throw msg
}

module.exports = { validField, isEmail, passwordIsEquals }