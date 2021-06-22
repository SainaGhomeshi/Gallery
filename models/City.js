const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema(
    {
        name: { type: String, trim: true },
        province: { type: Schema.Types.ObjectId, ref: 'Province' }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("City", CitySchema);
