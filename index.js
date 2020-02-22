require('dotenv').config();

console.log(process.env.COOKIE_SECRET);

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const port = 3000;

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