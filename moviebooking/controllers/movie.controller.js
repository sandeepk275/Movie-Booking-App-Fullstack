const db=require ('../models/index');
const Movie=db.movie;


exports.findAllMovies=(req, res)=>{
    Movie.find({}).then((data) => {
        res.status(200).send({
            movies: data,
            message: "retrieve all movies successful"
        })
    }).catch((err) => {
        res.status(404).send({
            message: err.message || "not found",
        })
    })

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