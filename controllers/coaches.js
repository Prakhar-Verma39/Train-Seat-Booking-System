const Coach = require('../models/coach');
const Row = require('../models/row');
const Ticket = require('../models/ticket');



module.exports.index = async (req, res) =>{
    const coaches = await Coach.find({});
    res.render('Coaches/index', {coaches})
};

module.exports.renderNewForm = (req, res) => {
    res.render('coaches/new');
};

module.exports.createCoach = async (req, res) => {
    
    const newCoach = new Coach(req.body.coach)
    let capacity = parseInt(newCoach.capacity)
    let row = []
    for(let i=1; i<=capacity/7;i++){
        
        row.push(new Row({emptySeats: 7, capacity: 7}))
    
    }
    capacity %= 7
    if(capacity > 0){
        row.push(new Row({emptySeats: capacity, capacity: capacity}))
    }
       
    await Row.insertMany(row)
    .then(data => {
        for(datum of data){
        newCoach.coach.push(datum)}});

    await newCoach.save();
    res.redirect(`/coaches/${newCoach._id}`)
};

module.exports.showCoach = async (req, res) => {
    const coach = await Coach.findById(req.params.id)
    .populate('coach'); // each coach rows


    if(!coach){
        return res.redirect('/coaches');
    }

    let booked_num = []
    let total_empty_seats = 0
    const MAX_SEATS = coach.capacity

    for(let row of coach.coach){
        for(let seat of row.seats){
            booked_num.push(seat)
        }
        total_empty_seats += row.emptySeats
    }

    res.render('coaches/show', {coach, booked_num, total_empty_seats, MAX_SEATS});
};

module.exports.renderEditForm = async (req, res) =>{
    console.log("coach edit form is rendering..")
};

module.exports.updateCoach = async (req, res) => {
    console.log("updating coach..")
    const {required_seats} = req.body
    let ticket = []
    const row = new Row({emptySeats: 7, capacity: 7})
    for(let i=1; i<= parseInt(required_seats); i++){
        ticket.push(new Ticket({seat_number: i}))
    }
    await Ticket.insertMany(ticket)
    .then(data => {
        console.log(data)
        for(datum of data){
        row.seats.push(datum)}});
    await row.save();

    res.redirect('/coaches')

};

module.exports.deleteCoach = async (req, res) => {
    const { id } = req.params;
    await Coach.findByIdAndDelete(id);
    res.redirect('/coaches');
};