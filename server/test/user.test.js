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

const mainUser = {
	name:`${Date.now()}`,
	email:`${Date.now()}@hotmail.com`,
	password:`${Date.now()}`
};

beforeAll(()=>{
	return request.post("/user")
		.send(mainUser);
});

afterAll(()=>{
	request.delete(`/user/${mainUser.email}`);
});

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

describe("User authentication",()=>{
	test("Should return a auth token .",()=>{
		return request.post("/auth")
			.send({email:mainUser.email,password:mainUser.password})
			.then(res=>{
				expect(res.statusCode).toEqual(200);
				expect(res.body.token).toBeDefined();
			})
			.catch(error=>{
				fail(error);
			});
	});

    test("Should prevent an unregistered person to get an auth token.",()=>{
		return request.post("/auth")
			.send({email:"false@email.com",password:mainUser.password})
			.then(res=>{
				expect(res.statusCode).toEqual(403);
			})
			.catch(error=>{
				fail(error);
			});
	});

	test("Should prevent from entering an incorrect password.",()=>{
		return request.post("/auth")
			.send({email:mainUser.email,password:"wrongPassword"})
			.then(res=>{
				expect(res.statusCode).toEqual(403);
			})
			.catch(error=>{
				fail(error);
			});
	});
});
