var mongoose = require("mongoose");
var MatchSchema = new mongoose.Schema ({
    date: Date,
    homeTeam: mongoose.Types.ObjectId,
    homePlayers: [[mongoose.Types.ObjectId]],
    awayTeam: mongoose.Types.ObjectId,
    awayPlayers: [[mongoose.Types.ObjectId]],
    homeGoals: Number,
    awayGoals: Number,
    result: String,
    league: mongoose.Types.ObjectId 
});

var Match = mongoose.model('Match',MatchSchema);

module.exports = Match; 
