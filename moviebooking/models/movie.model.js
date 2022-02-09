module.exports = (mongoose) => {

    const movie = mongoose.model('movie',
        mongoose.Schema({

        }, { timestamps: true })
    );
    return movie;
};