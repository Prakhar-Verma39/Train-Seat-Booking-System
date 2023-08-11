const mongoose = require('mongoose');
const Review = require('./ticket');

const Schema = mongoose.Schema;

const rowSchema = new Schema({
    isAvaliable:{
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