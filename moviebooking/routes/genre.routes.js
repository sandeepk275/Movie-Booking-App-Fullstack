module.exports = (express, app) => {
    const genre = require('../controllers/genre.controller');
    var router = express.Router();

    router.get('/', genre.findAllGenres);




    app.use('/api/genres', router);
}



