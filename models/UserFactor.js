const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserFactorSchema = new Schema(
    {
        user: Schema.Types.ObjectId,
        galleries: [Schema.Types.ObjectId],
        condition: { type: String, default: 'pending', enum: ['pending', 'approved', 'sent', 'delivered'] },
        description: String,
        items: [
            {
                product: Schema.Types.ObjectId,
                number: Number,
                price: Number,
                priceWithDiscount: Number,
            }
        ],
        totalPrice: Number,
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("UserFactor", UserFactorSchema);
