import express from "express";
import { signin, signup, google } from "../controllers/auth.controller.js";

const router = express.Router();

router.post ('/sign-up', signup)
router.post ('/signin', signin)
router.post ('/google', google)

export default router;