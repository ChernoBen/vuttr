/* eslint-disable linebreak-style */
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./src/app");
const keys = require("./keys");


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use(routes);

app.listen(keys.apiPort,()=>{
	console.log("Server ir running...");
});