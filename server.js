const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

require('dotenv').config();

const PORT = process.env.PORT || 4000;
const routes = require('./routes');
const db  = require('./models');
const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use('/api/v1', routes.api);
app.use(
    session({
        store: new MongoStore({url: process.env.MONGODB_URI}),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2
        }
    })
);

app.get('/', (req, res) => {
    res.send('Closing Bells');
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));