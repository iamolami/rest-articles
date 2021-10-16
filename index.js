const express = require('express')
const PORT = 8080;
const app = express();
const path = require('path')


var hour = 3600000;
var day = hour * 24;
var week = day * 7;

/**
 * Load controllers.
 */
var API = require('./routes/articles');

app.use(express.static(path.join(__dirname, 'public'), { maxAge: week }));


/**
 * Application routes.
 */

app.get('/', API.index);


app.listen(PORT, ()=> {
    console.log('Server connected')
})