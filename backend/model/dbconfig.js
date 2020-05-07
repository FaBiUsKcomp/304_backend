const mongoose = require('mongoose')
const { uri } = require('../.env')

mongoose.set('useFindAndModify', false);

module.exports = app => {
    const connectDB = async () => {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Mongo connectado!');
    }

    app.db = connectDB()
}
