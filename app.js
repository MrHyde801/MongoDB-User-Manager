const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser');
const fs = require('fs')
const mongoose = require('mongoose')


let app = express();
const port = process.env.PORT || 5500;
const router = require('./server/routes/user');

//Templating Engine
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: '.hbs',
    helpers: {
        addOne: function(value, options){
          return parseInt(value) + 1;
        }
    }
}));

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/', router);




app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

