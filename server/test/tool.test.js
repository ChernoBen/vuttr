/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const express = require("express");
const app = express();
const router = require("../src/app");
const supertest = require("supertest");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

const request = supertest(app.listen(3001,()=>{
	console.log("Tool tests...");
}));


const mainUser = {
    name:"Benja",
    email:`${Date.now()}@gmail.com`,
    password:"benjabenjabenja"
};

const mainTool = {
    title:"Some title",
    link:"www.google.com",
    description:"Description area",
    tags:[`${Date.now()}`,`${Date.now()}`,`${Date.now()}`,`${Date.now()}`]
};
beforeAll(()=>{
    return request.post("/user")
        .send(mainUser);
});

afterAll(()=>{
    return request.delete(`/user/${mainUser.email}`);
});

describe("Tool suite .",()=>{
	
	test("Should get auth, register a new tool and then delete it.", ()=>{
		return request.post("/auth")
			.send({email:mainUser.email,password:mainUser.password})
			.then(res=>{
				var token = res.body.token;
				expect(res.statusCode).toEqual(200);
				return request.post("/tool")
					.set({"authorization": token})
					.send(mainTool)
					.then(res=>{
						expect(res.status).toEqual(201);
						return request.delete(`/tool/${res.body.id}`)
							.set({"authorization": token})
							.then(res=>{
								expect(res.statusCode).toEqual(204);
							})
							.catch(error=>{
								fail(error);
							});
					})
					.catch(error=>{
						fail(error);
					});
			}).catch(error=>{
				fail(error);
			});
	});

	test("Should get auth and then list all tools.",()=>{
		return request.post("/auth")
			.send({email:mainUser.email,password:mainUser.password})
			.then(res=>{
				expect(res.statusCode).toEqual(200);
				return request.get("/tools")
					.set({"Authorization": res.body.token})
					.then(res=>{
						expect(res.statusCode).toEqual(200);
					})
					.catch(error=>{
						fail(error);
					});
			}).catch(error=>{
				fail(error);
			});
	});
});

