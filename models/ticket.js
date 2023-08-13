const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    seat_number:{
        type : Number,
        default: 0,
        required: true
    },
    buyer:{
        type: String,
        default: "Computer"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Ticket", ticketSchema);