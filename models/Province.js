const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProvinceSchema = new Schema(
    {
        name: { type: String, trim: true },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Province", ProvinceSchema);
