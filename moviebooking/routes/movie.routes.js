module.exports = (express, app) => {
    const movie = require('../controllers/movie.controller');
    var router = express.Router();

    router.get('/', movie.findAllMovies);

    router.get('/:id', movie.findOne);

    router.get('/:id/shows', movie.findShows);

    router.get("/?status=PUBLISHED", movie.findAllMovies);

    router.get("/?status=RELEASED", movie.findAllMovies);

    router.get("/?status=RELEASED&title={title}&genres={genres}&artists={artists}&start_date={startdate}&end_date={enddate}", movie.findAllMovies);





    app.use('/api/movies', router);
}



