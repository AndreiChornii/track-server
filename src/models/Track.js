const mongoose = require('mongoose');

const pointShema = new mongoose.Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longtitude: Number,
        attitude: Number,
        accurancy: Number,
        heading: Number,
        speed: Number
    }
})
const trackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Myuser'
    },
    name: {
        type: String,
        default: ''
    },
    locations: [pointShema]
});

mongoose.model('Track', trackSchema);