module.exports.postUser = (req, res, next) => {
    let errors = [];
    if (!req.body.name) {
        errors.push('name is required');
    }
    if (!req.body.phone) {
        errors.push('phone is required');
    }

    if (req.body.password !== req.body.rePassword) {
        errors.push('re-password does not like password ');
    }

    if (errors.length) {
        return res.render('users/create', {
            errors : errors,
            data : req.body
        })
    }

    next();
};