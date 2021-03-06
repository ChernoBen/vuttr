/* eslint-disable linebreak-style */
const jwt = require("jsonwebtoken");
const Tool = require("../models/Tool");
const keys = require("../../keys");
const secret = keys.secret;


class ToolController{

    async create(req, res) {
		if (!req.body) return res. status(400);
		const { title, link, description, tags } = req.body;
		const token = req.headers["authorization"];
		if (token != undefined) {
			const bearer = token.split(" ");
			const tk = bearer[1];
			try {
				const decoded = jwt.verify(tk, secret);
				const newTool = new Tool({ title, link, description, tags, userid: decoded.id });
				await newTool.save();
				return res.status(201).json({
					title: newTool.title,
					link: newTool.link,
					tags: newTool.tags,
					description: newTool.description,
					id: newTool._id,
				});
			} catch {
				return res.status(500);
			}
		}
		return res.status(401);
	}

    async delete(req, res) {
		if (!req.headers["authorization"]) return res.status(401);
		let token = req.headers["authorization"];
		if (req.params.id) {
			let id = req.params.id;
			if (token) {
				let bearer = token.split(" ");
				let tk = bearer[1];
				let decoded = jwt.verify(tk, secret);
				let result = Tool.findOne({ "_id": id, "userid": decoded.id });
				if (result) {
					try {
						await Tool.deleteOne({ "_id": id });
						return res.sendStatus(204);
					} catch (error) {
						return res.status(500);
					}
				} else {
					return res.status(404);
				}
			} else {
				return res.status(401);
			}
		} else {
			return res.status(400);
		}
	}

    async list(req, res) {
		if (!req.headers["authorization"]) return res.status(401);
		let list = [];
		try {
			const token = req.headers["authorization"];
			if (token != undefined) {
				const bearer = token.split(" ");
				const tk = bearer[1];
				const decoded = jwt.verify(tk, secret);
				const result = await Tool.find({ "userid": decoded.id });
				result.forEach(item => {
					let data = {
						id: item._id,
						title: item.title,
						link: item.link,
						description: item.description,
						tags: item.tags
					};
					list.push(data);
				});
				return res.json(list);
			} else {
				return res.status(401);
			}
		} catch {
			return res.status(401);
		}
	}

    async getByTag(req, res) {
		if (!req.query.tags) return res.status(400);
		let tags = req.query.tags;
		if (!req.headers["authorization"]) return res.status(401);
		let token = req.headers["authorization"];
		if (token != undefined) {
			let bearer = token.split(" ");
			let tk = bearer[1];
			let decoded = jwt.verify(tk, secret);
			let result = await Tool.find({ "userid": decoded.id, "tags": tags });
			let data = [];
			result.forEach(item => {
				let tool = {
					id: item._id,
					title: item.title,
					link: item.link,
					description: item.description,
					tags: item.tags
				};
				data.push(tool);
			});
			return res.json(data);
		} else {
			return res.status(401);
		}
	}
}
module.exports = new ToolController();