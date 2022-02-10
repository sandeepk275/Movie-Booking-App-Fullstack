module.exports = (express, app) => {
    const artist = require('../controllers/artist.controller');
    var router = express.Router();

    router.get('/', artist.findAllArtists);




    app.use('/api/artists', router);
}



