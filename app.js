const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser');
const fs = require('fs')
const mongoose = require('mongoose')


let app = express();
const port = process.env.PORT || 5500;
const routes = require('./server/routes/user');
const router = require('./server/routes/user');

//Templating Engine
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: '.hbs',
}));

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/', router);




app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
