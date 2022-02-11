const validator = require('validator');
module.exports = (mongoose) => {
    const user = mongoose.model('user',
        mongoose.Schema({
            userid: { type: String, required: true, unique: true },

            email: { type: String, required: true, validate: (value) => { return validator.isEmail(value) } },

            first_name: { type: String, required: true },

            last_name: { type: String, required: true },

            username: String,

            contact: { type: String, required: true },

            password: { type: String, required: true },

            role: { type: String, enum: ["user", "admin"], default: "user" },

            isLoggedIn: Boolean,

            uuid: String,

            accesstoken: String,

            coupens: [],

            bookingRequests: [],
        }, { timestamps: true })
    );
    return user;
};