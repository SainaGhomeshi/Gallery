const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailCodeSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        email: { type: String, trim: true },
        code: { type: String, trim: true },
        createdAt: { type: Date, expires: '5m', default: Date.now }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("EmailCode", EmailCodeSchema);