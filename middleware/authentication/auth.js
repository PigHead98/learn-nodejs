const db = require('../../db');
const users = require('../../models/users.model');

module.exports.requireAuth = (req, res, next) => {

    let user = users.findById(req.signedCookies.userId);
    if ( user ) {
        res.locals.user = user;
        return next();
    }

    return res.redirect('auth/login');
};