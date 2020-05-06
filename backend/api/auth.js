const { authsecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const User = require('../model/UserModel')

module.exports = app => {
    const login = async (req, res) => {
        const userNotAuth = { ...req.body }

        if(!userNotAuth.username || !userNotAuth.password) {
            return res.status(400).send({ error: 'Informe Usuário e Senha!' })
        }

        const user = await User.findOne({ username: userNotAuth.username })
            .catch(error => error)
        if(!user) return res.status(400).send({ error: 'Usuário Inexistente!' })
        const isMatch = bcrypt.compareSync(userNotAuth.password, user.password)
        if(!isMatch) return res.status(400).send({ error: 'Usuário/Senha inválido!' })

        const now = Math.floor(Date.now() / 1000)
        const payload = {
            _id: user._id,
            username: user.username,
            email: user.email,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60 * 24 * 3) // 3 days (60 * 60 * 24 * 3)
        }

        return res.status(200).send({ ...payload, token: jwt.encode(payload, authsecret) })
    }

    const validate = async (req, res) => {
        const user = { ...req.body }
        if(!user) return res.status(400).send(false)
        const token = jwt.decode(user.token, authsecret)
        if(new Date(token.exp * 1000) > new Date()) return res.status(200).send(true)
        return res.status(400).send(false)
    }

    const checkUserLevel = async (req, res) => {
        const user = { ...req.body }
        if(!user) return res.status(400).send('Usuário inválido!')
        const token = jwt.decode(user.token, authsecret)
        const { admin } = await User.findOne({ _id: token._id })
        if(admin) return res.status(200).send(true)
        return res.status(200).send(false)
    }

    return { login, validate, checkUserLevel }
}