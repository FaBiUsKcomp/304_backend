const Cleaning = require('../model/CleaningModel')
const { validField } = require('./validation')

module.exports = (app, http) => {
    
    const getAllWeek = async (req, res) => {
        await Cleaning.find({})
            .then(week => res.status(200).send(week))
            .catch(error => res.status(500).send(error))
    }

    const updateAllWeek = async (req, res) => {
        const newWeek = { ...req.body }

        try {
            validField(newWeek.sunday, 'Campo Vazio!')
            validField(newWeek.monday, 'Campo Vazio!')
            validField(newWeek.tuesday, 'Campo Vazio!')
            validField(newWeek.wednesday, 'Campo Vazio!')
            validField(newWeek.thursday, 'Campo Vazio!')
            validField(newWeek.friday, 'Campo Vazio!')
            validField(newWeek.saturday, 'Campo Vazio!')
        } catch (e) {
            return res.status(400).send(e)
        }

        await Cleaning.findOneAndUpdate({ id: 385, ...newWeek })
            .then(week => res.status(200).send(week))
            .catch(error => res.status(500).send(error))
    }

    return { getAllWeek, updateAllWeek }
}