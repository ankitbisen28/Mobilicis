import mongoose from "mongoose";
const { Schema } = mongoose;

const relationshipSchema = new mongoose.Schema({
  follower: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  following: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Relationship = mongoose.model("Relationship", relationshipSchema);

export default Relationship;
