const { Schema, model } = require("mongoose");

const userStatsSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  totalNumberOfSession: {
    type: Number,
    required: true,
  },
  totalHours: {
    type: Number,
    require: true,
  },
  hoursPerLabel: {
    type: Schema.Types.Mixed,
  },
});

module.exports = model("userStats", userStatsSchema);
