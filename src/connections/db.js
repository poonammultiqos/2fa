const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/2fa")
    .then(() => {
        console.log('connected successfully');
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
    });
