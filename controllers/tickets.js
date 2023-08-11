const Ticket = require('../models/ticket');

module.exports.index = async (req, res) =>{
    console.log("tickets are indexing..")

};

module.exports.renderNewForm = (req, res) => {
    console.log("new form to add a Ticket..")

};

module.exports.createTicket = async (req, res) => {
    console.log("new Ticket created ..")
};

module.exports.showTicket = async (req, res) => {
    console.log("showing individual Ticket")
};

module.exports.renderEditForm = async (req, res) =>{
    console.log("ticket edit form is rendering..")
};

module.exports.updateTicket = async (req, res) => {
    console.log("updating Ticket..")
};

module.exports.deleteTicket = async (req, res) => {
    console.log("Deleting individual Ticket")
};