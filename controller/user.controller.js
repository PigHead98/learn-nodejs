const md5 = require('md5');

const users = require('../models/users.model');

module.exports = {
    index : async (req, res) => {
        let user = await users.find();

        return res.render('users/index', {
            users: user
        })
    },
    search : async (req, res) => {

        let dataUsers = await users.find();

        let valSearch = req.query.name
            ?
            dataUsers.filter( item =>
                item.name.toLowerCase().indexOf(req.query.name.trim().toLowerCase()) !== -1)
            :
            dataUsers;

        return res.render('users/index', {
            users: valSearch
        })
    },
    create : (req, res) => {
        return res.render('users/create')
    },
    view : async (req, res) => {
        let id = req.params.id;
        let user = await users.findById(id);

        return res.render('users/view', {
            user: user
        })
    },
    postCreate : async (req, res) => {
        let imageUrl = '../' + req.file.path.split("\\").slice(1).join("/");

        let data = {
            name: req.body.name,
            phone: req.body.phone,
            image: imageUrl,
            email: req.body.email,
            password: md5(req.body.password),
        };

        let result = await users.create(data, (err, onDone) => {
            if (!err) {console.log(onDone);
                return res.redirect('/users');
            }
            return console.log(err)
        });

    }

};
