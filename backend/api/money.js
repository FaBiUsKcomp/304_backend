const Money = require('../model/MoneyModel')
const User = require('../model/UserModel')

const createTableMouth = async (req, res) => {
    const table = { ...req.body }
    const users = await User.find({})
        .then(users => users)
        .catch(error => error)
    table['userPayments'] = []
    table['userPending'] = users.map(user => user.username)
    return res.status(200).send(table)
}

async function setUsersPayment(year, mouth, users) {
    const aggregate = [ { $match: { $and: [ { year: year }, { mouth: mouth } ] } } ]
    return await Money.findOneAndUpdate(aggregate, { usersPayments: users })
}

async function getUsersPayment(year, mouth) {
    return await Money.find([ 
        { $match: { $and: [ { year: year }, { mouth: mouth } ] } },
        { usersPayments }
    ])
}

async function getCurrentValue(year, mouth) {
    return await Money.find([
        { $match: { $and: [ { year: year }, { mouth: mouth } ] }},
        { currentValue }
    ])
}

async function getValue(year, mouth) {
    return await Money.find([
        { $match: { $and: [ { year: year }, { mouth: mouth } ] }},
        { value }
    ])
}

async function updateCurrentValue(year, mouth, newValue) {
    const aggregate = [ { $match: { $and: [ { year: year }, { mouth: mouth } ] } } ]
    return await Money.findOneAndUpdate(aggregate, { currentValue: newValue })
}

module.exports = { 
    createTableMouth ,
    setUsersPayment, 
    getUsersPayment, 
    getCurrentValue,
    getValue, 
    updateCurrentValue 
}