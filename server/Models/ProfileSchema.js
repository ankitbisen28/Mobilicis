import mongoose from "mongoose";
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  about: {
    type: String,
    require: true,
  },
  skill: [String],
  image: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model("Profile", ProfileSchema);

export default Profile;
