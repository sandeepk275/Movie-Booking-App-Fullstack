module.exports = (mongoose) => {

    const artist = mongoose.model('artist',
        mongoose.Schema({
            artistid: { type: Number, required: true },

            first_name: { type: String, required: true },

            last_name: { type: String, required: true },

            wiki_url: { type: String, required: true },

            profile_url: { type: String, required: true },

            movies: { type: [], required: true },

        }, { timestamps: true })
    );
    return artist;
};