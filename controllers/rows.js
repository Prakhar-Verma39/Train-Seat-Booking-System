const Coach = require('../models/coach');
const Row = require('../models/row');
const Ticket = require('../models/ticket');

module.exports.index = async (req, res) =>{
    console.log("rows are indexing..")

};

module.exports.renderNewForm = (req, res) => {
    console.log("new form to add a Row..")

};

module.exports.createRow = async (req, res) => {
    console.log("new Row created ..")
};

module.exports.showRow = async (req, res) => {
    console.log("showing individual Row")
};

module.exports.renderEditForm = async (req, res) =>{
    console.log("row edit form is rendering..")
};

module.exports.updateRow = async (req, res) => {
  
};

module.exports.deleteRow = async (req, res) => {
    console.log("Deleting individual Row")
};