const Money = require('../model/MoneyModel')

async function createTableMouth(year, mouth) {
    
}

async function setUsersPayment(year, mouth, users) {
    const aggregate = [ { $match: { $and: [ { year: year }, { mouth: mouth } ] } } ]
    return await Money.findOneAndUpdate(aggregate, { userPayments: users })
}

async function getUsersPayment(year, mouth) {
    return await Money.find([ 
        { $match: { $and: [ { year: year }, { mouth: mouth } ] } }, //Query criteria
        { userPayments } // Projection
    ])
}

async function updateCurrentValue(year, mouth, newValue) {
    const aggregate = [ { $match: { $and: [ { year: year }, { mouth: mouth } ] } } ]
    return await Money.findOneAndUpdate(aggregate, { currentValue: newValue })
}

module.exports = { setUsersPayment, getUsersPayment, updateCurrentValue }