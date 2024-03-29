const User = require("../models/User");

const identify = async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        return next();
    }

    const user = await User.findOne({token});
    if (!user) {
        return next();
    }

    req.user = user;
    next();
};

module.exports = identify;