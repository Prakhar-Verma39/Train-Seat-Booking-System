const mongoose = require('mongoose');
const Ticket = require('./ticket');

const Schema = mongoose.Schema;

const rowSchema = new Schema({
    isAvailable:{
        type: Boolean,
        default: true
    },
    seats:[
        {
            type:Schema.Types.ObjectId,
            ref:'Ticket'
        }
    ],
    emptySeats:{
        type: Number,
        default: 7,
        required: true
    },
    capacity:{
        type: Number,
        default: 7,
        required: true
    }
});


module.exports = mongoose.model('Row', rowSchema);