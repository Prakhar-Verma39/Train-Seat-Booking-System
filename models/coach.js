const mongoose = require('mongoose');
const Review = require('./row');

const Schema = mongoose.Schema;

const coachSchema = new Schema({
    coach:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Row'
        }
    ],
    seq_number: {
        type: String,
        default: "Default-101",
        required: true
    },
    capacity: {
        type: Number,
        default: 80,
        required: true
    }
});

module.exports = mongoose.model('Coach', coachSchema);