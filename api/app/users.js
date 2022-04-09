const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const {nanoid} = require('nanoid');
const path = require('path');
const fs = require('fs');

const config = require('../config');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const authToken = req.body.authToken;
        const debugTokenUrl = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${authToken}`;

        const response = await axios.get(debugTokenUrl);
        if (response.status === 400) {
            return res.status(401).send({error: 'Incorrect Google token'});
        }

        if (response.data.user_id !== req.body.id) {
            return res.status(401).send({error: 'Wrong user id'});
        }

        let user = await User.findOne({googleId: req.body.id});
        if (!user) {
            const userData = {
                googleId: req.body.id,
                displayName: req.body.name,
            };

            if (req.body.photoUrl) {
                const photo = await axios.get(req.body.photoUrl, {responseType: 'stream'});
                const photoName = nanoid() + '.jpeg';

                const photoPath = path.resolve(config.uploadPath, photoName);
                photo.data.pipe(fs.createWriteStream(photoPath));

                userData.avatar = photoName;
            }

            user = new User(userData);
        }

        user.generateToken();
        await user.save();

        res.send(user);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);
    }
});

router.delete('/', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        if (!token) {
            return res.send({message: 'ok'});
        }

        const user = await User.findOne({token});
        if (!user) {
            return res.send({message: 'ok'});
        }

        user.generateToken();
        await user.save();

        res.send({message: 'ok'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;
