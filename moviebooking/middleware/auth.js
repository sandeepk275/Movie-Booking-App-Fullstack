const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //we dont know header is in json or not so simply we use []
    const accesstoken = req.headers["Authorization"];

    if (!accesstoken) { res.status(400).send("Access denied.  user not logged in") }

    try {
        jwt.verify(accesstoken, "myprivatekey");
        next();
    } catch {
        res.status(400).send("Invalid token");
    }

}