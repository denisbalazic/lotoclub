const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 16,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      // minlength: 6,
      // maxlength: 19,
      // trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

/**
 * Hashing password before saving
 * !need to create and update with .save() in mongoose
 */
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    //bcrypt.hash creates salt and hashes
    user.password = await bcrypt.hash(user.password, 12);
  }
  next();
});

/**
 * Making sure that sensitive data is never sent to client
 * Every time user object is stringified to json password and tokens are removed
 */
userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.tokens;
  return userObj;
};

module.exports = mongoose.model("User", userSchema);
