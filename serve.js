const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');
const connectDB = require('./server/database/connection');

dotenv.config({ path: 'config.env' });
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware setup
const corsOptions = {
    origin: '*', 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Pre-flight request handler



// Log requests
app.use(morgan('tiny'));

// MongoDB connection
connectDB();

// Parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
// app.set('views', path.resolve(__dirname, "views"));

// Load assets
app.use('/css', (req, res, next) => {
    res.setHeader('Content-Type', 'text/css');
    express.static(path.resolve(__dirname, 'assets/css'))(req, res, next);
});
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

// Load routers
app.use('/', require('./server/routes/router'));

app.listen(PORT, () => { 
    console.log(`Server is running at http://localhost:${PORT}`);
});
