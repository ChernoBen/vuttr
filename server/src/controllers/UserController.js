/* eslint-disable linebreak-style */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");
const keys = require("../../keys");
const JWTSecret = keys.secret;
const User = require("../models/User");

class UserController {

	async create(req, res) {
		const { name, email, password } = req.body;
		if (name == "" || email == "" || password == "")return res.sendStatus(400);
		if(!validator.validate(email))return res.status(400); 
		if(password.length<8 ) return res.status(400);
		let salt = await bcrypt.genSalt(10);
		let hash = await bcrypt.hash(password, salt);
		try {
			const user = await User.findOne({ "email": email });
			if (user != undefined) { return res.status(400).json({ error: "Email ja cadastrado" }); }
			const newUser = new User({ name, email, password: hash });
			await newUser.save();
			res.status(201).json({ email:email });
		} catch (error) {
			res.status(500);
		}
	}

}
module.exports = new UserController();