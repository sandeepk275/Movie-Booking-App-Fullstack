const db = require('../models/index');
const Genre = db.artist;


exports.findAllGenres = (req, res) => {
    Genre.find({}).then((data) => {
        res.status(200).send({
            genres: data,
            message: "retrieve all genres successful"
        })
    }).catch((err) => {
        res.status(404).send({
            message: err.message || "not found",
        })
    })

}