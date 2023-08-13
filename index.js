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


// HOME 'get' route

app.get('/', (req, res) => {
    res.render('home')
})


app.use('/coaches', coachesRoutes)
app.use('/coaches/:id/rows', rowsRoutes)
app.use('/coaches/:id/:id/tickets', ticketsRoutes)




port = 4000 || PORT;

app.listen(port, () => {
    console.log(`LISTENING TO PORT ${port}`)
})