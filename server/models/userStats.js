const mongoose = require("mongoose");

// NOTE: Currently a temperory schema will be updated soon
const userStatsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  // this will give total time in hrs spent in doing pomodoro
  totalTime: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userStats", userStatsSchema);
