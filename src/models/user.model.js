const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        email: String,
        secret: String,
    });

module.exports = mongoose.model("users", User);
