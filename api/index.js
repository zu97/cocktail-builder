const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config');
const users = require('./app/users');
const cocktails = require('./app/cocktails');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', users);
app.use('/cocktails', cocktails);

const run = async () => {
    await mongoose.connect(config.mongo.url, config.mongo.options);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
}

run().catch((e) => console.error(e));