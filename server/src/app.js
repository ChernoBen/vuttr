/* eslint-disable linebreak-style */
const express = require("express");
const router = express.Router();
const UserController = require("./controllers/UserController");

router.use((req, res, next)=> {
	next();
});

router.post("/user",UserController.create);
router.post("/auth",UserController.auth);
router.delete("/user:email",UserController.delete);

module.exports = router;