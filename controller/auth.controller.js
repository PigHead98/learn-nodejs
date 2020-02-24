const md5 = require('md5');

const dataUsers = require('../models/users.model');

const db = require('../db');

module.exports = {

    login: (req, res) => {
        res.render('auth/login');
    },
    postLogin: async (req, res, next) => {
        try {
            let email = req.body.email;
            let password = req.body.password;

            let checkEmail = await dataUsers.findOne({ email: email });

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

            res.cookie('userId', checkEmail.id, {
                signed: true
            });
            res.redirect('/users');
        } catch (e) {
            next(e);
        }
    }
};