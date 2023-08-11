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
    capacity: {
        type: Number,
        default: 80
    }
});

module.exports = mongoose.model('Coach', coachSchema);