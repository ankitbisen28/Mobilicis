import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Relationship" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "Relationship" }],
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
