var mongoose = require("mongoose");
var seasonSchema = new mongoose.Schema ({
    startYear: Number,
    endYear: Number,
    league: mongoose.Schema.Types.ObjectId, 
    teams: [{type: mongoose.Schema.Types.ObjectId, ref:"team"}],
    matches: [{type: mongoose.Schema.Types.ObjectId, ref:"match"}],
});

var Season = mongoose.model('Season',seasonSchema);

module.exports = Season; 