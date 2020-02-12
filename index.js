const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const users = [
    { id : 1, name: 'An'},
    { id : 2, name: 'Thu'},
];

app.set('view engine', 'pug');
app.set('views ', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.render('index', {
        name: 'An'
    })
});
app.get('/users', (req, res) => {
    return res.render('users/index', {
        users: users
    })
});

app.get('/users/search', (req, res) => {
    let valSearch = req.query.name ? users.filter( item => item.name.toLowerCase().indexOf(req.query.name.trim().toLowerCase()) !== -1) : users;

    return res.render('users/index', {
        users: valSearch
    })
});

app.post('/users/create', (req, res) => {
    users.push( req.body );

    return res.redirect('/users');
});
app.get('/users/create', (req, res) => {
    return res.render('users/create')
});

app.listen(port, () => console.log(`your port is ${port}`));