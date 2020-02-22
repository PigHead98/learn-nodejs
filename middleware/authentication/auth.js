const db = require('../../db');

module.exports.requireAuth = (req, res, next) => {

    if ( db.get('name').find({id:req.cookies.userId}).value()) {
        return next();
    }

    return res.redirect('auth/login');
};