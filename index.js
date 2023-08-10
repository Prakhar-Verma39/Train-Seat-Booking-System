const express = require("express");
const path = require("path");

const app = express()

app.use(express.static(path.join(__dirname, "public")))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"))

// HOME 'get' route

app.get('/', (req, res) => {
    res.render('home')
})

// HOME 'post' route

app.post('/', (req, res) => {
    res.send("Hello")
})

port = 4000 || PORT;

app.listen(port, () => {
    console.log(`LISTENING TO PORT ${port}`)
})