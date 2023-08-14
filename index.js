if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
require('dotenv').config();

const express = require("express");
const path = require("path");
const methodOverrride = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');


const Row = require('./models/row');
const Ticket = require('./models/ticket');

const coachesRoutes = require('./routes/coaches');
const rowsRoutes = require('./routes/rows');
const ticketsRoutes = require('./routes/tickets');

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/Bookings';


mongoose.connect(dbUrl)
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

const MongoDBStore = require("connect-mongo");
const secret = process.env.SECRET || 'thisisshouldbeabettersecret!';

const store = MongoDBStore.create({
    mongoUrl: dbUrl,
    secret: secret,
    touchAfter: 24 * 60 * 60
})

store.on("error", function(e){
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store: store,
    name: 'session',
    secret: secret,
    resave: "false",
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) =>{
    res.locals.success = req.flash('success')
    next();
})

app.engine("ejs", ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"))


// HOME 'get' route

app.get('/', (req, res) => {
    res.render('home')
})


app.use('/coaches', coachesRoutes)
app.use('/coaches/:id/rows', rowsRoutes)
app.use('/coaches/:id/:id/tickets', ticketsRoutes)


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

app.use((err, req, res, next) => {

    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(statusCode).render('error', { err })
})


port = 4000 || PORT;

app.listen(port, () => {
    console.log(`LISTENING TO PORT ${port}`)
})