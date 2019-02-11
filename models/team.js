var mongoose = require("mongoose");
var TeamSchema = new mongoose.Schema ({
    name: String,
    city: String,
    sponsors: [{type: mongoose.Schema.Types.ObjectId, ref:"sponsor"}],
    players: [{type: mongoose.Schema.Types.ObjectId, ref:"player"}],
    league: mongoose.Schema.Types.ObjectId 
});

var Team = mongoose.model('Team',TeamSchema);

module.exports = Team; 
