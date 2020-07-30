const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
} else if (process.argv.length === 4
    || process.argv.length > 5) {
    console.log('Provide more details')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0.xetx1.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
})

const Phone = mongoose.model('Phone', phoneSchema)


if (process.argv.length === 3) {
    Phone.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(phone => {
            console.log(phone.name, phone.number)
        })
        mongoose.connection.close()
    })
    return null
}


const phonename = process.argv[3]
const phonenumber = process.argv[4]

const generateNum = () => {
    return Math.floor(Math.random() * 1000000)
}

const phone = new Phone({
    name: phonename,
    number: phonenumber,
    id: generateNum()
})

phone.save().then(result => {
    console.log(`added ${phone.name} number ${phone.number} to phonebook`)
    mongoose.connection.close()
})