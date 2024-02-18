import express from "express";
import { googleSign, signin, signup } from "../controller/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", googleSign);

export default router;
