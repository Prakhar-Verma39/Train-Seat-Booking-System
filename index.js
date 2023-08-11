const express = require("express");
const path = require("path");
const methodOverrride = require("method-override");
const mongoose = require("mongoose");

const Row = require('./models/row');
const Ticket = require('./models/ticket');

const coachesRoutes = require('./routes/coaches');
const rowsRoutes = require('./routes/rows');
const ticketsRoutes = require('./routes/tickets');


mongoose.connect('mongodb://127.0.0.1:27017/Bookings')
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("ERROR!!")
        console.log(err)
    })

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverrride('_method'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"))

const MAX_SEATS = 80

let coach = [
    {
        "isAvaliable": true,
        "seats": [2,7],
        "emptySeats": 5
        },

    {
        "isAvaliable": true,
        "seats": [],
        "emptySeats": 7
        },

    {
        "isAvaliable": true,
        "seats": [],
        "emptySeats": 7
        },

    {
        "isAvaliable": true,
        "seats": [],
        "emptySeats": 7
        },

    {
        "isAvaliable": true,
        "seats": [37],
        "emptySeats": 6
        },

    {
        "isAvaliable": true,
        "seats": [],
        "emptySeats": 7
        },

    {
        "isAvaliable": true,
        "seats": [],
        "emptySeats": 7
        },

    {
        "isAvaliable": true,
        "seats": [],
        "emptySeats": 7
        },
        
    {
        "isAvaliable": true,
        "seats": [],
        "emptySeats": 7
        },
    {
        "isAvaliable": true,
        "seats": [],
        "emptySeats": 7
        },
    {
        "isAvaliable": true,
        "seats": [],
        "emptySeats": 7
        },

    {
        "isAvaliable": true,
        "seats": [80],
        "emptySeats": 2
        },

]

let booked_num = []
let total_empty_seats = 0
for(let row of coach){
    for(let seat of row.seats){
        booked_num.push(seat)
    }
    total_empty_seats += row.emptySeats
}

// HOME 'get' route

app.get('/', (req, res) => {
    res.render('home')
})


app.use('/coaches', coachesRoutes)
app.use('/coaches/:id/reviews', rowsRoutes)
app.use('/coaches/:id/:d/tickets', ticketsRoutes)


// coach 'post' route

app.post('/coach', async (req, res) => {
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

    res.redirect('/coach')
})

// TICKETS 'index' route

app.get('/tickets', (req, res) => {
    console.log("tickets is getting")
})

// TICKETS 'create' route

app.post('/tickets', (req, res) => {
    console.log(req.body)
    res.redirect('/tickets')
})

// TICKET 'show' route 

app.get('/tickets/:id', (req, res) => {
    console.log(req.params)
})

// TICKET 'delete' route 

app.delete('/tickets/:id', (req, res) => {
    console.log(req.body)
})


port = 4000 || PORT;

app.listen(port, () => {
    console.log(`LISTENING TO PORT ${port}`)
})