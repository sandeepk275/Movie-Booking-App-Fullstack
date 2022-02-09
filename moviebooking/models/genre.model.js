module.exports = (mongoose) => {

    const genre = mongoose.model('genre',
        mongoose.Schema({

        }, { timestamps: true })
    );
    return genre;
};