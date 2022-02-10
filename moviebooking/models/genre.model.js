module.exports = (mongoose) => {

    const genre = mongoose.model('genre',
        mongoose.Schema({
            genreid: { type: Number, required: true },

            genre: { type: String, required: true },

        }, { timestamps: true })
    );
    return genre;
};