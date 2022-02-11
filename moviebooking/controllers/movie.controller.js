const db=require ('../models/index');
const Movie=db.movie;


exports.findAllMovies = async (req, res)=>{

    try {
        const REQ_QUERIES = req.query;
        const DB_QUERY = {};
        if ("status" in REQ_QUERIES) {
            DB_QUERY[REQ_QUERIES["status"].toLowerCase()] = true;
        }
        if ("title" in REQ_QUERIES) {
            DB_QUERY.title = REQ_QUERIES["title"];
        }
        /* for genres and artists
      1. convert the comma separated string to array
      2. build the nested query
      */
        if ("genres" in REQ_QUERIES) {
            const genres = REQ_QUERIES["genres"].split(",");
            DB_QUERY.genres = {};
            DB_QUERY.genres.$all = genres;
        }
        if ("artists" in REQ_QUERIES) {
            const artists = REQ_QUERIES["artists"].split(",");
            //get all the first_names
            const firstNames = artists.map(artist => artist.split(" ")[0]);
            DB_QUERY["artists.first_name"] = {};
            DB_QUERY["artists.first_name"]["$in"] = firstNames;
        }

        const results = await Movie.find(DB_QUERY);
        res.send(results);
    } catch (err) {
        res.status(500).send(err.message || "some internal error occurred");
    }






    // Movie.find({}).then((data) => {
    //     res.status(200).send({
    //         movies: data,
    //         message: "retrieve all movies successful"
    //     })
    // }).catch((err) => {
    //     res.status(404).send({
    //         message: err.message || "not found",
    //     })
    // })

}


exports.findOne = (req, res) => {
    
    Movie.find({ movieid: req.params.id }).then((data) => {
        res.status(200).send({
            MovieById: data,
            message: "fetch data by Id successful"
        })
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "some error while fetching the movies",
        })
    })

}


exports.findShows = (req, res) => {
    
    Movie.find({movieid: req.params.id}).then((data) => {
        res.status(200).send({
            showsById: data[0].shows,
            message: "shows by Id successful"
        })
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "some error while fetching the movies shows",
        })
    })

}

exports.getAllPublishedMovies = (req, res) => {
    const filter = { published: true };
    Tutorial.find(filter).sort("-createdAt").then((data) => {
        res.status(200).send({
            publishedMovies: data,
            message: "fetch data by published successful"
        })
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "some error while fetching the data",
        })
    })
}


exports.getAllReleasedMovies = (req, res) => {
    const filter = { published: true };
    Tutorial.find(filter).sort("-createdAt").then((data) => {
        res.status(200).send({
            publishedMovies: data,
            message: "fetch data by published successful"
        })
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "some error while fetching the data",
        })
    })
}