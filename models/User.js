const mongoose = require("mongoose");

const UserSchema = mongoose.schema({
  username: { type: string, required: true },
  password: { type: string, required: true },
  firstName: { type: string },
  lastName: { type: string },
  email: { type: string }
});

module.exports = mongoose.model("User", Userschema);
