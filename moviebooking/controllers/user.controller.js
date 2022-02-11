const db = require('../models/index');
const { v4: uuidv4 } = require('uuid');

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const User = db.user;

//...>>>>...........................>>>>>>...............................>>>>>>>>>>.............................
exports.signUp = (req, res) => {

    // validation of request
    if (!req.body.first_name || !req.body.last_name || !req.body.password) {
        res.status(400).send({ message: "please provide firstName, email and password" });
        return;
    }
    // checking email already exist or not if not then insert into db

    const filter = { first_name: req.body.first_name };
    User.findOne(filter, (err, user) => {
        if (err || user !== null) {
            res.status(400).send({ message: "user already exist" })
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
           
            const user = new User({
                
                userid: uuidv4(),
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                contact: req.body.contact,
                password: hash,
            });
            user.username=user.first_name+user.last_name;
            user.save(user).then((data) => {
                res.status(200).send(data);
            }).catch((err) => {
                res.status(500).send({ message: "some error ocurred.please try again later" })
            })
        }
    })
}


//.........................>>>>>>>>...................................>>>>>>>>>>>..............................
exports.login = (req, res) => {
    // validation of request
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ message: "please provide username and password" });
        return;
    }

    //matching the first email then password..

    const filter = { username: req.body.username };

    User.findOne(filter, (err, user) => {
        if (err || user === null) {
            res.status(401).send({ message: "username or password is incorrect" })
        } else {

            if (bcrypt.compareSync(req.body.password, user.password)){   // user has all object that particular email
                // udating the user loggedIn true
                user.isLoggedIn = true;
                user.uuid = uuidv4();
                user.accesstoken = jwt.sign({ _id: user._id }, "myprivatekey");
                // const update = { isLoggedIn: true };
                User.findOneAndUpdate(filter, user, { new: true })
                    .then((user) => {
                        res.json(
                            user
                        )
                    })
                    .catch(() => {
                        res.status(500).send({ message: "some error ocurred" })
                    })

            } else {
                res.status(401).send({ message: "password is incorrect" })
            }
        }
    })

}
//>>>>>.......................>>>>>>>>>>>>>>>>>>......................>>>>>>>>>>>>>>>>>>>............................
exports.logOut = (req, res) => {
    // validation of request
    if (!req.body.userid) {
        res.status(400).send({ message: "please provide userid" });
        return;
    }

    const update = { isLoggedIn: false };
    const filter = { userid: req.body.userid};
    User.findOneAndUpdate(filter, update, { new: true })
        .then((user) => {
            res.json({
                userDetail: user,
                message: "logout successfully"
            })
        })
        .catch(() => {
            res.status(500).send({ message: "some error ocurred" })
        })
}