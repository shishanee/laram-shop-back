const mongoose = require('mongoose')

const accessorySchema = mongoose.Schema({
  name: String
})

const Accessory = mongoose.model('Accessory', accessorySchema)

module.exports = Accessory