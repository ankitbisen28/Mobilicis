import Relationship from "../Models/Realationship.js";
import User from "../Models/UserSchema.js";

export const follow = async (req, res) => {
  try {
    const follower = await User.findById(req.params.userId);
    const following = await User.findById(req.body.followingId);

    const relationship = new Relationship({
      follower: follower._id,
      following: following._id,
    });

    await relationship.save();

    follower.following.push(relationship);
    following.followers.push(relationship);

    await follower.save();
    await following.save();

    res.status(201).json({ message: "Followed successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Unfollow a user
export const unfollow = async (req, res) => {
  try {
    const follower = await User.findById(req.params.userId);
    const following = await User.findById(req.body.followingId);

    await Relationship.findOneAndDelete({
      follower: follower._id,
      following: following._id,
    });

    follower.following.pull(following._id);
    following.followers.pull(follower._id);

    await follower.save();
    await following.save();

    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
