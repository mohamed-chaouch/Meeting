import express from "express";
import upload from "../utils/multer.js"
import {createUser, loginUser, getUser} from "../controllers/userController.js"

const router = express.Router();

router.post("/create-user", upload.single("imageUrl"), createUser);
router.post("/login-user", loginUser);
router.get("/get-user/:id" , getUser)

export default router;