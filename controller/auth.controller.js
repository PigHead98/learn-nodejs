const md5 = require('md5');

const db = require('../db');

module.exports = {

    login: (req, res) => {
        res.render('auth/login', {
            users: db.get('name').value()
        });
    },
    postLogin: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;

        let checkEmail = db.get('name').find( {email: email}).value();

        if (!checkEmail) {
            return res.render('auth/login', {
                errors : [
                    "Email is invalid",
                ],
                data : req.body
            })
        }

        if (checkEmail.password !== md5(password)) {
            return res.render('auth/login', {
                errors : [
                    "password is invalid",
                ],
                data : req.body
            })
        }

        res.cookie('userId',checkEmail.id, {
            signed:true
        });
        res.redirect('/users');
    }
};