const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        required: true
    },
    password: {
        type: "String",
        required: true
    },
    role: {
        type: "String",
        default: 'user'
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

const usermodel = mongoose.model("User", userSchema);

module.exports = usermodel;
