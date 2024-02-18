import { createError } from "../middleware/errorHandlling.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "you are not Authorized here"));
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted." + deletedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "you are not Authorized here"));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export const subscribe = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const currentUser = req.user.id;

    if (currentUser === userId) {
      return res
        .status(400)
        .json({ message: "You Cant Subscribe To yourself" });
    }
    const subscribedUser = await User.findById(userId);
    if (!subscribedUser) {
      return res.status(404).json({ message: "Please SignIn First !!" });
    }
    await User.findByIdAndUpdate(
      currentUser,
      { $push: { subscriberedUser: userId } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      userId,
      { $inc: { subscribers: 1 } },
      { new: true }
    );
    res.status(200).json("Subscription successful");
  } catch (error) {
    next(error);
  }
};
export const unsubscribe = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const currentUser = req.user.id;

    const subscribedUser = await User.findById(userId);
    if (!subscribedUser) {
      return res.status(404).json({ message: "Please SignIn First !!" });
    }
    await User.findByIdAndUpdate(
      currentUser,
      { $pull: { subscriberedUser: userId } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      userId,
      { $inc: { subscribers: -1 } },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Unsubscription successful", user: subscribedUser });
  } catch (error) {
    next(error);
  }
};
export const like = async (req, res, next) => {
  const videoId = req.params.videoId;
  const id = req.user.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Please SignIn First !!" });
    }
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("liked video success");
  } catch (error) {
    next(error);
  }
};
export const dislike = async (req, res, next) => {
  const videoId = req.params.videoId;
  const id = req.user.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Please SignIn First !!" });
    }
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("disliked video success");
  } catch (error) {
    next(error);
  }
};