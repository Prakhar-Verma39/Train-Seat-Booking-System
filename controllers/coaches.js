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
    req.flash('success', "Successfully made a new coach!");
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

// "update" tickets on first row only
const { coach, id } = await Coach.findById(req.params.id);
const { required_seats } = req.body;
let need_seats = required_seats;
let total_empty_seats = 0

// to get total empty seats
for (let row_id of coach) {
    let row = await Row.findById(row_id)
    total_empty_seats += row.emptySeats;
}

if(total_empty_seats >= need_seats){
    let max = 0

    while(need_seats > 0)
    {
        let max_row = null;
        let max_row_number = 0;

        // Iterate through coach rows
        for(let row_number=0;row_number < coach.length; row_number++)
        {
            let row_id = coach[row_number];
            let row = await Row.findById(row_id)
            
            // Check if the row is available and has enough seats
            if(row.isAvailable && row.emptySeats >= need_seats)
            {
                assign_seat(row, row_number, need_seats) // Assign seats
                need_seats = 0
            }
            else if(row.isAvailable && row.emptySeats > max)
            {
                max = row.emptySeats
                max_row = row
                max_row_number = row_number
            }

        }

        // Assign seats on max row with remaining required seats
        while(need_seats > 0 && max > 0){
            assign_seat(max_row, max_row_number, Math.min(need_seats, max))
            need_seats -= Math.min(need_seats, max)

            // If more seats required, update max_row and max
            if(need_seats > 0){
                max_row_number = update_max_row(max_row_number)
                max_row = await Row.findById(coach[max_row_number])
                max = max_row.emptySeats
            }
        }

        // Function to assign seats to a row
        async function assign_seat(row, row_number, need_seats){
            // to make required number of tickets and provide them seat numbers
            const tickets = Array.from({ length: parseInt(need_seats) }, (_, i) => new Ticket({ seat_number: i + 1 + row.seats.length + row_number*7}));
            await Ticket.insertMany(tickets);

            // to add new tickets in seats array, update ramaining empty seats in one row 
            // and if all empty seats are booked then row becomes unavailable
            await Row.findByIdAndUpdate(coach[row_number], {
                $push: { seats: { $each: tickets } },
                $inc: { emptySeats: -tickets.length },
                $set: { isAvailable: row.emptySeats !== tickets.length } 
            }, { new: true });
        }

        // Function to update max_row based on availability and empty seats
        function update_max_row(max_row_number){
            if(max_row_number + 1 < coach.length && max_row_number >= 0){
                let before_row = Row.findById(coach[max_row_number - 1])
                let after_row = Row.findById(coach[max_row_number + 1])
                if(after_row.isAvailable){
                    if(before_row.isAvailable && before_row.emptySeats >= after_row.emptySeats){
                        max_row_number -= 1}
                    else{
                        max_row_number += 1}
                }
                else if(before_row.isAvailable){
                    max_row_number -= 1
                }
                else{
                    max_row_number = (max_row_number + 1) % coach.length
                }
            }
            else if(max_row_number + 1 >= coach.length){
                max_row_number -= 1
            }
            else{
                max_row_number += 1
            }
            return max_row_number
        }
    }
    req.flash('success', `Successfully boooked ${required_seats} seats.` );
}
    res.redirect(`/coaches/${id}`)

};

module.exports.deleteCoach = async (req, res) => {
    const { id } = req.params;
    await Coach.findByIdAndDelete(id)
    
    req.flash('success', `Successfully deleted ${id} coach.` );
    res.redirect('/coaches');
};