const express = require('express')
const hbs = require('express-handlebars')
const bodyParser = require('body-parser');
const fs = require('fs')


let app = express();
const port = process.env.PORT || 5500;
const routes = require('./server/routes/user')


app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/', routes);


//Templating Engine
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: '.hbs',
}));


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
