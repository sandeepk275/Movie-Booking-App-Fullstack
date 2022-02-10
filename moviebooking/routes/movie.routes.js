module.exports = (express, app) => {
    const movie = require('../controllers/movie.controller');
    var router = express.Router();

    router.get('/', movie.findAllMovies);

    router.get('/:id', movie.findOne);

    router.get('/:id/shows', movie.findShows);

    router.get("/published", movie.getAllPublishedMovies)





    app.use('/app/movies', router);
}



