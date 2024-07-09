const express = require("express");

const createUser = require("../controllers/userController/create")

const router = express.Router();

router.post("create-user")