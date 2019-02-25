var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username:String,
    name:String,
    password:String,
    team: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("User", UserSchema);