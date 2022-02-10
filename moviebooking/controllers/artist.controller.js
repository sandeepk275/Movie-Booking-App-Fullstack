const db = require('../models/index');
const Artist = db.artist;


exports.findAllArtists = (req, res) => {
    Artist.find({}).then((data) => {
        res.status(200).send({
            artists: data,
            message: "retrieve all artists successful"
        })
    }).catch((err) => {
        res.status(404).send({
            message: err.message || "not found",
        })
    })

}