const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');

const config = require('../config');
const Cocktail = require('../models/Cocktail');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const identify = require("../middleware/identify");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
})

const upload = multer({storage});
const router = express.Router();

router.get('/', identify, async (req, res, next) => {
    try {
        let orQuery = [{isPublished: true}];
        if (req.user && req.user.role === 'admin') {
            orQuery.push({isPublished: false});
        } else if (req.user) {
            orQuery.push({user: req.user._id});
        }

        let userId = null;
        if (req.user && req.query.my) {
            userId = { user: req.user._id };
        }

        const cocktails = await Cocktail.find(userId).and([{ $or: orQuery }]);
        res.send(cocktails);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', identify, async (req, res, next) => {
    try {
        let orQuery = [{isPublished: true}];
        if (req.user && req.user.role === 'admin') {
            orQuery.push({isPublished: false});
        } else if (req.user) {
            orQuery.push({user: req.user._id});
        }

        const cocktail = await Cocktail.findById(req.params.id).and([{ $or: orQuery }]);
        if (!cocktail) {
            return res.status(404).send({error: 'Page not found'});
        }

        res.send(cocktail);
    } catch (e) {
        next(e);
    }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
    try {
        const cocktail = new Cocktail({
            user: req.user._id,
            name: req.body.name,
            image: req.file ? req.file.filename : null,
            recipe: req.body.recipe,
            ingredients: req.body.ingredients ? JSON.parse(req.body.ingredients) : null,
        });

        await cocktail.save();
        res.send(cocktail);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        }

        next(e);
    }
});

router.post('/:id/rate', auth, async (req, res, next) => {
    try {
        let orQuery = [{isPublished: true}];
        if (req.user && req.user.role === 'admin') {
            orQuery.push({isPublished: false});
        } else if (req.user) {
            orQuery.push({user: req.user._id});
        }

        const cocktail = await Cocktail.findById(req.params.id).and([{ $or: orQuery }]);
        if (!cocktail) {
            return res.status(404).send({error: 'Page not found'});
        }

        let isVoted = false;

        cocktail.rates.forEach((r) => {
            if (r.user.equals(req.user._id)) {
                r.rate = req.body.rate;
                isVoted = true;
            }
        });

        if (!isVoted) {
            cocktail.rates.push({
                user: req.user._id,
                rate: req.body.rate
            });
        }

        await cocktail.save();
        res.send({message: 'ok'});
    } catch (e) {
        next(e)
    }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res, next) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);
        if (!cocktail) {
            return res.status(404).send({error: 'Page not found'});
        }

        cocktail.isPublished = true;
        await cocktail.save();

        res.send({message: 'ok'});
    } catch (e) {
        next(e)
    }
});

router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);
        if (!cocktail) {
            return res.send({message: 'ok'});
        }

        await cocktail.remove();
        res.send({message: 'ok'});
    } catch (e) {
        next(e);
    }
});

module.exports = router;
