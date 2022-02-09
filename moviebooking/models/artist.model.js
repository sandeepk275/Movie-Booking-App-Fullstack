module.exports = (mongoose) => {

    const artist = mongoose.model('artist',
        mongoose.Schema({

        }, { timestamps: true })
    );
    return artist;
};