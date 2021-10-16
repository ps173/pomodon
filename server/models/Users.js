const mongoose = require("mongoose");
//
// NOTE: Currently a temperory schema will be updated soon
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  // this will give total time in hrs spent in doing pomodoro
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userStats", userStatsSchema);
