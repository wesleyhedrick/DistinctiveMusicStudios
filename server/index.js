require('dotenv').config();
const http = require('http');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const es6Renderer = require('express-es6-template-engine');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();
const logger = morgan('dev');
const hostname = '127.0.0.1';
//Register Middleware
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// disabling for local development
// app.use(helmet());
app.use(session({
    store: new FileStore(),  // no options for now
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');
const { homeRouter, instrumentRouter, studentRouter } = require('./routes')

const server = http.createServer(app);
app.use('/api/instruments', instrumentRouter)
app.use('/api/students/', studentRouter)
app.use('/api', homeRouter)
//Error Handling for Bad Routes
app.get('*', (req, res) => {
    res.status(404).send('<h1>Page not found</h1>');
});
server.listen(3002, hostname, () => {
    console.log('Server running at localhost, port 3002');
});

