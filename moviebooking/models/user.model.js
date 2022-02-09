module.exports = (mongoose) => {
    const user = mongoose.model('user',
        mongoose.Schema({
            firstName: { type: String, require: true, },
            lastName: { type: String },
            email: { type: String, require: true, unique: true, dropDups: true, validate: (value) => { return validator.isEmail(value) }, },
            password: { type: String, require: true, },
            role: { type: String, default: 'user' },
            isLoggedIn: false,
            token: String,
        }, { timestamps: true })
    );
    return user;
};