/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const express = require("express");
const app = express();
const router = require("../src/app");
const supertest = require("supertest");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

const request = supertest(app.listen(3002,()=>{
	console.log("User tests...");
}));


describe("User registers suites",()=>{

	test("Should register a new user with success .",()=>{
		let time = Date.now();
		let email = `${time}@gmail.com`;
		let user = {
			name:"benjamim",
			email:email,
			password:`${Date.now()}`};
		return request.post("/user")
			.send(user)
			.then(res=>{
				expect(res.statusCode).toEqual(201);
				expect(res.body.email).toEqual(email);
			})
			.catch(error=>{
				fail(error);
			});
	});
	
    test("Should prevent empty data entry by user .",()=>{
		let user = {
			name:"",
			email:"",
			password:""
		};
		return request.post("/user")
			.send(user)
			.then(res=>{
				expect(res.statusCode).toEqual(400);
			})
			.catch(error=>{
				fail(error);
			});
	});

    test("Should prevent a registration of an email already registered .",()=>{
		let time = Date.now();
		let email = `${time}@gmail.com`;
		let user = {
			name:"benjamim",
			email:email,
			password:`${Date.now()}`
		};
		return request.post("/user")
			.send(user)
			.then(res=>{
				expect(res.statusCode).toEqual(201);
				expect(res.body.email).toEqual(email);
				return request.post("/user")
					.send(user)
					.then(res=>{
						expect(res.statusCode).toEqual(400);
					})
					.catch(error=>{
						fail(error);
					});
			})
			.catch(error=>{
				fail(error);
			});
	});
});

