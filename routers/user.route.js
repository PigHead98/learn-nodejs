const express = require('express');
const shortid = require('shortid');

const db = require('../db');

const router = express.Router();

const users = (key) => {
    return db.get(key);
};

router.get('/', (req, res) => {
    return res.render('users/index', {
        users: users('name').value()
    })
});

router.get('/search', (req, res) => {
    let valSearch = req.query.name ? users('name').value().filter(item => item.name.toLowerCase().indexOf(req.query.name.trim().toLowerCase()) !== -1) : users('name').value();

    return res.render('users/index', {
        users: valSearch
    })
});

router.get('/create', (req, res) => {
    return res.render('users/create')
});

router.get('/:id', (req, res) => {
    let id = req.params.id;

    return res.render('users/view', {
        user: db.get('name').find({"id": id}).value()
    })
});


router.post('/create', (req, res) => {
    req.body.id = shortid.generate();

    users('name').push(req.body).write();

    return res.redirect('/users');
});

module.exports = router;
