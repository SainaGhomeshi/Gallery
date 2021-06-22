const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ForgotPasswordCodeSchema = new Schema({
    email: { type: String, trim: true },
    code: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now, expires: '5m' }
});

module.exports = mongoose.model("ForgotPasswordCode", ForgotPasswordCodeSchema);
