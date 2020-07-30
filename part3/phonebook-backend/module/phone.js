const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MOG_URI

mongoose.set('useCreateIndex', true)

console.log('connecting to ', url)    

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    console.log('connected to MongoDB')
})
.catch((error) => {
    console.log('error connecting', error.message)
})

const phoneSchema = new mongoose.Schema({
    name: {type: String, unique: true, minlength: 3},
    number: {type: String, minlength: 8},
    id: {type: Number},
})

phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

phoneSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Phone', phoneSchema)
