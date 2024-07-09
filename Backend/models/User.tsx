const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
        username: {
            type: String,
        },
        email:{
            type: String,
        },
        imageUrl: {
            type: String,
        },
        password:{
            type: String,
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema, "users", {strict: false});
module.exports = User;