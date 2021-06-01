/* eslint-disable linebreak-style */
const mongoose = require("../database");

const UserSchema = new mongoose.Schema({
	name:String,
	email:String,
	password:String
});
const User = mongoose.model("Users", UserSchema);
module.exports = User;