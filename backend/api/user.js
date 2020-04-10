const { validField, isEmail, passwordIsEquals } = require('./validation')
const User = require('../model/UserModel')
const bcrypt = require('bcrypt-nodejs')

//Cript pass

const encrypt = pass => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(pass, salt)
}

//------------------------------------------------------------------------------------------------

module.exports = (app, http) => {
    const createUser = async (req, res) => {

        const user = { ...req.body }

        try {
            validField(user.username, 'Usuário Inválido!')
            isEmail(user.email, 'Email Inválido!')
            validField(user.password, 'Senha Inválida!')
            validField(user.confpassword, 'Confirme sua Senha!')
            passwordIsEquals(user.password, user.confpassword, 'As senhas não coencidem!')
        }
        catch (e) {
            return res.status(400).send(e)
        }

        const isMatch = await User.findOne({ email: user.email })

        if (isMatch) return { "error": "Email já cadastrado!" }

        const newpass = encrypt(user.password)
        user.password = newpass
        delete user.confpassword

        const userbase = new User(user)
        return res.status(201).send(userbase.save())
    }

    const updateUser = async (req, res) => {
        const user = { ...req.body }
        await User.findByIdAndUpdate(user._id, { ...user })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(500).send(error))
    }

    const deleteUser = async (req, res) => {
        const id = req.params.id
        await User.findByIdAndDelete(id)
            .then(user => res.status(200).send(user))
            .catch(error => res.status(500).send(error))
    }

    const readUsers = async (req, res) => {
        await User.find({})
            .then(users => res.status(200).send(users))
            .catch(error => res.status(500).send(error))
    }

    const readAUser = async (req, res) => {
        const id = req.params.id
        await User.findOne({ _id: id })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(500).send(error))
    }

    return { createUser, updateUser, deleteUser, readUsers, readAUser }
}
