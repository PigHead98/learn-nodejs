const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const port = 3000;

const userRouter = require('./routers/user.route');

app.set('view engine', 'pug');
app.set('views ', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', (req, res) => {
    return res.render('index', {
        name: 'An'
    })
});

app.use('/users', userRouter);
app.use(express.static('public'));

app.listen(port, () => console.log(`your port is http://localhost:${port}`));