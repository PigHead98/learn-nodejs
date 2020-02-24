require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

const app = express();

//process.env.PORT variable in heroku
const port = process.env.PORT || 3001;

const userRouter = require('./routers/user.route');
const authRouter = require('./routers/auth.route');

const authMiddleware = require('./middleware/authentication/auth');

app.set('view engine', 'pug');
app.set('views ', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get('/', (req, res) => {
    return res.render('index', {
        name: 'An'
    })
});

app.use('/users', authMiddleware.requireAuth, userRouter);
app.use('/auth', authRouter);
app.use(express.static('public'));

app.listen(port, () => console.log(`your port is http://localhost:${port}`));