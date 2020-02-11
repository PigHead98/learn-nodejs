const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views ', 'pug');

app.get('/', (req, res) => {
    return res.render('index', {
        name: 'An'
    })
});
app.get('/users', (req, res) => {
    return res.render('users/index', {
        users: [
            { id : 1, name: 'An'},
            { id : 2, name: 'Thu'},
        ]
    })
});

app.listen(port, () => console.log(`your port is ${port}`));