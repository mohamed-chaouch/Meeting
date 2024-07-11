import express from "express";
import upload from "../utils/multer.js"
import {createUser} from "../controllers/userController.js"

const router = express.Router();

router.post("/create-user", upload.single("imageUrl"), createUser);

export default router;