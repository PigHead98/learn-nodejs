const shortid = require('shortid');
const db = require('../db');

const users = (key) => {
    return db.get(key);
};

module.exports = {
    index : (req, res) => {
        return res.render('users/index', {
            users: users('name').value()
        })
    },
    search : (req, res) => {
        let valSearch = req.query.name ? users('name').value().filter(item => item.name.toLowerCase().indexOf(req.query.name.trim().toLowerCase()) !== -1) : users('name').value();

        return res.render('users/index', {
            users: valSearch
        })
    },
    create : (req, res) => {
        return res.render('users/create')
    },
    view : (req, res) => {
        let id = req.params.id;

        return res.render('users/view', {
            user: db.get('name').find({"id": id}).value()
        })
    },
    postCreate : (req, res) => {
        req.body.id = shortid.generate();

        users('name').push(req.body).write();

        return res.redirect('/users');
    }

};