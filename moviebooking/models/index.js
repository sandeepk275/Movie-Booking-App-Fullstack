const dbconfig = require('../config/db.config');
const mongoose = require("mongoose");

let db = {};

db.mongoose = mongoose;
db.url = dbconfig.url;
db.artist = require('./artist.model')(mongoose);
db.genre = require('./genre.model')(mongoose);
db.movie = require('./movie.model')(mongoose);
db.user = require('./user.model')(mongoose);
module.exports = db;