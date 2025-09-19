// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, match: /^[^@\s]+@[^@\s]+\.[^@\s]+$/ },
    password: { type: String, required: true },
    givenName: { type: String, required: true },
    familyName: { type: String, required: true },
    phone: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    }
    next();
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);