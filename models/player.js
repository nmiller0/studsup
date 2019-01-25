var mongoose = require("mongoose");
var PlayerSchema = new mongoose.Schema ({
    name: String,
    position: String,
    age: Number,
    att: Number,
    def: Number,
    mid: Number,
    team: mongoose.Types.ObjectId 
});

var Player = mongoose.model('Player',PlayerSchema);

module.exports = Player; 
