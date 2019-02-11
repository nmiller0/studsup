var mongoose = require("mongoose");
var MatchSchema = new mongoose.Schema ({
    date: Date,
    homeTeam: mongoose.Schema.Types.ObjectId,
    homePlayers: [{type: mongoose.Schema.Types.ObjectId, ref:"player"}],
    awayTeam: mongoose.Schema.Types.ObjectId,
    awayPlayers: [{type: mongoose.Schema.Types.ObjectId, ref:"player"}],
    homeGoals: Number,
    awayGoals: Number,
    result: String,
    league: mongoose.Schema.Types.ObjectId 
});

var Match = mongoose.model('Match',MatchSchema);

module.exports = Match; 
