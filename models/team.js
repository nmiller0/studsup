var mongoose = require("mongoose");
var TeamSchema = new mongoose.Schema ({
    name: String,
    city: String,
    sponsors: [[mongoose.Types.ObjectId]],
    players: [[mongoose.Types.ObjectId]],
    league: mongoose.Types.ObjectId 
});

var Team = mongoose.model('Team',TeamSchema);

module.exports = Team; 
