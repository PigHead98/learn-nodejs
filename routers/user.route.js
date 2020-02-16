const express = require('express');

const controller = require('../controller/user.controller');
const validationUsers = require('../middleware/validation/users');

const router = express.Router();

router.get('/', controller.index);

router.get('/cookie', (req, res, next) => {
    res.cookie('user-id',123);
    res.send('cookies view');
});

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.view);

router.post('/create', validationUsers.postUser, controller.postCreate);

module.exports = router;
