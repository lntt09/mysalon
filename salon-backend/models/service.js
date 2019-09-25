const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    serviceName: String,
    description: String,
    price: Number,
    duration: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model('Service', serviceSchema);