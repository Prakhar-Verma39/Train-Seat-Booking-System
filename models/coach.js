const mongoose = require('mongoose');
const Row = require('./row');

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


//mongoose 'findByIdAndDelete' function triggers 'findOneAndDelete' middleware

coachSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
            
        await Row.deleteMany({
            _id:{
                $in: doc.coach
            }
        })
    }
})

module.exports = mongoose.model('Coach', coachSchema);