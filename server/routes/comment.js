import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  addComment,
  deleteComment,
  getComment,
} from "../controller/comment.js";

const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);
router.get("/:videoId", getComment);

export default router;
