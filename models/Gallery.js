const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GallerySchema = new Schema(
  {
    name: { type: String, default: null },
    owner: Schema.Types.ObjectId,
    avatar: { type: String, default: "galleryAvatar.png" },
    galleryId: String,
    address: { type: String, default: null },
    description: { type: String, default: null },
    adsStatus: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gallery", GallerySchema);
