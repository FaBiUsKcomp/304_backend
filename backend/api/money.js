const Money = require('../model/MoneyModel')

async function createTableMouth(year, mouth, value) {
    return await Money.insertOne({ currentValue: 0, year, mouth, value, usersPayments: [] })
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