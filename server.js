const express = require('express');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const session = require('express-session');
const logger = require('morgan');
const errorHandler = require('error-handler');
const methodOverride = require('method-override');
const path = require('path');
const expressValidator = require('express-validator');

/*====================== Create Express Server ===========================*/
const app = express();

const hour = 3600000;
const day = hour * 24;
const week = day * 7;

/*===================== Load Controllers =================================*/
const API = require('./controllers/api');

/*======================= Configuration of Packages ======================= */
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(compress());
app.use(logger('combined'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(expressValidator());
app.use(methodOverride())
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public'), { maxAge: week}));

/* ======================== Application Routes ===================== */
app.get('/', API.index);

app.get('/api/', API.index);

app.get('/api/v1', API.getAll);

app.get('/api/v1/name/:name', API.name);

app.get('/api/v1/content/:content', API.content)

/* ======================= Error Handler ============================= */
app.use((err, req, res, next) => {
    //treat as 404
    if(err.message 
        && (~err.message.indexOf('not found') 
        || (~err.message,indexOf('cast to ObjectId failed')))) {
        return next()
    }

    res.status(500).json({
        error: err,
        pkg: pkg,
        CONFIG: CONFIG
    })
})

app.use((req, res, next) => {
    res.status(404).json({
        url: req.originalUrl,
        message: 'Sorry, that page does not exist',
        code: 34
    })
})

if(app.get('env') === 'development') {
    app.use(errorHandler)
}

/* ===================== Start Express Server ============================== */
app.listen(app.get('port'), () => {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
})

module.exports = app;