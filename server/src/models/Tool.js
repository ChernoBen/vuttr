/* eslint-disable linebreak-style */
const mongoose = require("../database");

const ToolSchema = new mongoose.Schema({
	userid:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Users",
		required:true,
	},
	title:String,
	link:String,
	description:String,
	tags:[]
});
const Tool = mongoose.model("Tools",ToolSchema);
module.exports = Tool;