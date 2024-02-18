import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, ternd, updateVideo } from "../controller/video.js";

const router = express.Router();

router.post("/", verifyToken,addVideo);
router.put("/:id", verifyToken,updateVideo);
router.delete("/:id", verifyToken,deleteVideo);
router.put("/view/:id",addView);
router.get("/find/:id",getVideo);
router.get("/trend",ternd);
router.get("/random",random);
router.get("/sub",sub);
router.get("/tags",getByTag);
router.get("/search",search);

export default router;
