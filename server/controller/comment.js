import { createError } from "../middleware/errorHandlling.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment = async (req, res, next) => {
  try {
    const newComment = await Comment.create({
      userId: req.user.id,
      ...req.body,
    });
    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);
    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The Comment Has Been Deleted");
    } else {
      return next(createError(403, "You Can Only Delete Yours"));
    }
  } catch (error) {
    next(error);
  }
};
export const getComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({videoId:req.params.videoId});
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
