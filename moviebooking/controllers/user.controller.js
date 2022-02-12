const db = require('../models/index');
const { v4: uuidv4 } = require('uuid');

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const TokenGenerator = require("uuid-token-generator");
const { atob, btoa } = require("b2a");
const tokenGenerator = new TokenGenerator();

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
            user.username = user.first_name + user.last_name;
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
    const encodedAuth = req.headers["authorization"];
    const userNameAndPassword = atob(encodedAuth.split(" ")[1]);
    const username = userNameAndPassword.split(":")[0];
    const password = userNameAndPassword.split(":")[1];
    // validation of request
    if (!username || !password) {
        res.status(400).send({ message: "please provide username and password" });
        return;
    }

    //matching the first email then password..
    

    const filter = { username: username };

    User.findOne(filter, (err, user) => {
        if (err || user === null) {
            res.status(401).send({ message: "username or password is incorrect" })
        } else {

            if (user.password=password) {   // user has all object that particular email
                // udating the user loggedIn true
                user.isLoggedIn = true;
                user.uuid = uuidv4();
                user.accesstoken = tokenGenerator.generate();
                // const update = { isLoggedIn: true };
                User.findOneAndUpdate(filter, user)
                    .then((user) => {
                        res.status(200).send({
                            id: user.uuid,
                            "access-token": user.accesstoken,
                        })
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
    const uuid = req.body.uuid;
    const update = { isLoggedIn: false, accesstoken: "", uuid: "" };
    User.findOneAndUpdate({ uuid: uuid }, update, { useFindAndModify: false })
        .then(data => {
            if (data === null) throw new error("unable to logout");
            res.send({ message: "Logged Out successfully." });
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
}

//>>>>>.......................>>>>>>>>>>>>>>>>>>......................>>>>>>>>>>>>>>>>>>>..................
exports.getCouponCode = (req, res) => {
    const accesstoken = req.headers["authorization"];

    User.find({ accesstoken: accesstoken }).then((users) => {
        if (users[0].coupens) {
            res.send(users[0].coupens);
        } else {
            res.send([]);
        }
    }).catch((err) => {
        return res.status(500).send(err.message || "user not found");
    })
}

//>>>>>.......................>>>>>>>>>>>>>>>>>>......................>>>>>>>>>>>>>>>>>>>....................

exports.bookShow = (req, res) => {

    const uuid = req.body.uuid;
    const bookingRequest = req.body.bookingRequest;
    User.findOneAndUpdate({ uuid: uuid }, { $push: { bookingRequests: bookingRequest } }, { new: true })
        .then(data => {
            if (!data) throw new Error("unable to book show dont have data");
           
            res.status(200).send(bookingRequest);
           
        })
        .catch(err => {
            res.status(500).send(err.message || "unable to book show");
        });

}