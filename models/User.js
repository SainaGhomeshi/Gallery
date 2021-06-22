const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
    {
        firstName: { type: String, trim: true, default: null },
        lastName: { type: String, trim: true, default: null },
        userName: { type: String, trim: true, required: true },
        about: { type: String, default: null },
        address: { type: String, trim: true, default: null },
        avatar: { type: String, default: "avatar.png", trim: true },
        birthday: { type: String, trim: true, default: null },
        phone: { type: String, trim: true, default: null },
        sex: { type: Boolean, default: true },
        password: { type: String, required: true, trim: true, minlength: 6 },
        email: { type: String, sparse: true, trim: true, lowercase: true },
        role: { type: String, trim: true, required: true, default: "customer", enum: ["customer", "seller", "superAdmin"] },
        block: { type: Boolean, default: false },
        isEmailVerified: { type: Boolean, default: false },
        city: { type: Schema.Types.ObjectId, ref: "City", default: null },
        postId: { type: String, trim: true, default: null },
        cart: [
            {
                product: Schema.Types.ObjectId,
                number: Number,
                price: Number
            }
        ]
    },
    {
        timestamps: true
    }
)

// Encrypt User Password
UserSchema.pre("save", function (next) {
    let user = this;
    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Compare Password Function for Login Process
UserSchema.methods.comparePassword = function (password) {
    const thisPassword = this.password
    return new Promise(function (resolve, reject) {
        bcrypt.compare(password, thisPassword, function (err, isMatch) {
            if (err) reject(err);
            resolve(isMatch)
        })
    })
};



module.exports = mongoose.model("User", UserSchema);
