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
     
    // to push rows inserted on a single coach
    const data = await Row.insertMany(row)
    data.forEach(datum => newCoach.coach.push(datum));

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

    // to get booked seat number from the coach object and total empty seats
    for (let row_id of coach.coach) {
        let row = await Row.findById(row_id)
        .populate('seats')
        if(row.seats.length > 0){
            const seat_numbers = row.seats.map(obj => obj.seat_number);
            booked_num.push(...seat_numbers);
        }
        total_empty_seats += row.emptySeats;
    }

    res.render('coaches/show', {coach, booked_num, total_empty_seats, MAX_SEATS});
};

module.exports.renderEditForm = async (req, res) =>{
    console.log("coach edit form is rendering..")
};

module.exports.updateCoach = async (req, res) => {

// add tickets on first row only
const { coach } = await Coach.findById(req.params.id);
const { required_seats } = req.body;
const row_id = coach[0];
const tickets = Array.from({ length: parseInt(required_seats) }, (_, i) => new Ticket({ seat_number: i + 1 }));

await Ticket.insertMany(tickets);
await Row.findByIdAndUpdate(row_id, { seats: tickets });

    res.redirect('/coaches')

};

module.exports.deleteCoach = async (req, res) => {
    const { id } = req.params;

    // to delete coach and all its rows by coach id.
    await Promise.all([
      Row.deleteMany({ _id: { $in: (await Coach.findById(id)).coach } }),
      Coach.findByIdAndDelete(id)
    ]);
    
    res.redirect('/coaches');
};