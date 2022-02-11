const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //we dont know header is in json or not so simply we use []
    const accesstoken = req.headers["authorization"];

    if (!accesstoken) { res.status(400).send("Access denied. No token provided") }

    try {
        jwt.verify(accesstoken, "myprivatekey");
        next();
    } catch {
        res.status(400).send("Invalid token");
    }

}