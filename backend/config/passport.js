const passport = require('passport')
const User = require('../model/UserModel')
const { ExtractJwt, Strategy } = require('passport-jwt')
const { authsecret } = require('../.env')

module.exports = app => {
    const params = {
        secretOrKey: authsecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, async (payload, done) => {
        await User.findOne({ _id: payload._id })
            .then(user => done(null, user ? { ...payload } : false))
            .catch(error => done(error, false))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}