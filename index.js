const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const low = require('lowdb');
const shortid = require('shortid');

const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);


db.defaults({
    name: [
        'An'
    ]
})
    .write();
const users = (key) => {
    return db.get(key);
};

app.set('view engine', 'pug');
app.set('views ', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    return res.render('index', {
        name: 'An'
    })
});
app.get('/users', (req, res) => {
    return res.render('users/index', {
        users: users('name').value()
    })
});

app.get('/users/search', (req, res) => {
    let valSearch = req.query.name ? users('name').value().filter(item => item.name.toLowerCase().indexOf(req.query.name.trim().toLowerCase()) !== -1) : users('name').value();

    return res.render('users/index', {
        users: valSearch
    })
});

app.get('/users/create', (req, res) => {
    return res.render('users/create')
});

app.get('/users/:id', (req, res) => {
    let id = req.params.id;

    return res.render('users/view', {
        user: db.get('name').find({"id": id}).value()
    })
});


app.post('/users/create', (req, res) => {
    req.body.id = shortid.generate();

    users('name').push(req.body).write();

    return res.redirect('/users');
});

app.listen(port, () => console.log(`your port is ${port}`));