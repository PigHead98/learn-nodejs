const db = require('../../db');

module.exports.requireAuth = (req, res, next) => {

    let user = db.get('name').find({
            id:req.signedCookies.userId
    }).value();
    if ( user ) {
        res.locals.user = user;
        return next();
    }

    return res.redirect('auth/login');
};