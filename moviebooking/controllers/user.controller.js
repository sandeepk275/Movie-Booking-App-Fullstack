const db = require('../models/index');
const User = db.user;
const jwt = require("jsonwebtoken");
// const bcrypt = require('bcrypt');
//...>>>>...........................>>>>>>...............................>>>>>>>>>>.............................
exports.signUp = (req, res) => {

    // validation of request
    if (!req.body.firstName || !req.body.email || !req.body.password) {
        res.status(400).send({ message: "please provide firstName, email and password" });
        return;
    }
    // checking email already exist or not if not then insert into db

    const filter = { email: req.body.email };
    User.findOne(filter, (err, user) => {
        if (err || user !== null) {
            res.status(400).send({ message: "user already exist" })
        } else {
            // const salt = bcrypt.genSaltSync(10);
            // const hash = bcrypt.hashSync(req.body.password, salt);
           
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                isLoggedIn: req.body.isLoggedIn,
            });
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
    if (!req.body.email || !req.body.password) {
        res.status(400).send({ message: "please provide email and password" });
        return;
    }

    //matching the first email then password..
    const filter = { email: req.body.email };

    User.findOne(filter, (err, user) => {
        if (err || user === null) {
            res.status(401).send({ message: "email or password is incorrect" })
        } else {

            if (req.body.password===user.password) {   // user has all object that particular email
                // udating the user loggedIn true
                const update = { isLoggedIn: true };
                User.findOneAndUpdate(filter, update, { new: true })
                    .then((user) => {
                        const token = jwt.sign({ _id: user._id }, "myprivatekey")
                        user.token = token;
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
    if (!req.body.id) {
        res.status(400).send({ message: "please provide id" });
        return;
    }

    const update = { isLoggedIn: false };
    User.findByIdAndUpdate(req.body.id, update, { new: true })
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