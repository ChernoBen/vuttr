<img align="right" alt="Travis status"  src="https://travis-ci.com/ChernoBen/vuttr.svg?token=c62HYvrR3yxRwZfGvY8o&branch=main" />


# Very useful tools to remember:

 - [Intro](#intro)
 - [Routes](#routes)
 - [Initizalizing](#init)
 - [Tests](#tests)
 

# Intro <a name="intro"></a>

This is an API project that can be used to register useful tools that you would'nt like to forget.
It was created using TDD and MVC concepts thinking about good programing pratices.
This project uses mongodb and node express containers orchestrated by docker compose.
An user can register, get the auth token to use it to manage the tool features as well as create a new tool, list one or more tools and delete them by passing its id.
Even the data base being non-realational i decided to face it as a scenario where the user "entity" could have none or many tools registered and referenced. Therefore the "scheme" should looks like:
"user could have":[
    {
        none or many tools:{
            each tool needs a user to exist
        }
    }
] .
- Tecs
    - Express
    - Mongoose
    - Jest
    - Swagger
    - Docker



## Routes <a name ="routes"></a>
- `/doc`: To test the routes described down below .
- `POST/user`: Register a new user by passing name, email and password inside Body .
- `POST/auth`: Get access token by passing email and password inside Body .
- `DELETE/user/{email}`: Delete your own user account by passing the account email as a param .
- `POST/tool`: Create a new tool by passing title, link, description and a string array of tags inside Body .
- `GET/tool`: Get single or multiple tools by passing tag names as a param.
- `GET/tools`: Get every tools registered and linked to the authenticated user .
- `DELETE/tool/{id}`: Delete a tool by passing its id as a param .
## Initializing<a name="init"></a>
`First of all make sure that you have docker and node installed.`
> **Define a SECRET on docker-compose file at line 15**
> **Clone this repo, follow to root of this project and run the command:**
> 
> "docker compose up"

>**On browser follow to the address:**
> "localhost:3000/doc"

>**Over there you can use the documentation page of this project to test the project endpoints already described above.**

## Tests<a name="tests"></a>
> **Inside this project there are two docker-compose files. The first one is used to production and the second one to do tests .**

>**To execute the test run this command on root of this project**:                                                                     				
>"docker-compose -f docker-compose-test.yml -p tests run --rm api npm test" .
**About the tests:**
 - *There are two suite of tests*
 - `**First suite**: User suite**`
    - `should register a new user with success`
        >`routes:` `POST/user`
        >`expected:` `status 201` / `email within response.body`
    - `should prevent empty data entry by user`
        >`routes:` `POST/user`
        >`expected:` `status 400`
    - `should prevent a registration of an email already registered`
        >`routes:` `POST/user`
        >`expected:` `status 201`, `email within response.body`/ `status 400`   
    - `should return a auth token`
        >`routes:` `POST/auth`
        >`expected:` `status 200`, `token within response.body`
    - `should prevent an unregistred person to get an auth token`
        >`routes:` `POST/auth`
        >`expected:` `status 403` 
    - `should prevent entering of an incorrect password`
        >`routes:` `POST/auth`
        >`expected:` `status 403 `
 - `**Second suite**: Tool suite**`
    - `should get auth, register a new tool and then delete it`
        >`routes:` `POST/auth`,`POST/tool`,`DELETE/tool/{id}`
        >`expected:` `status 200`,`status 201`,`status 204`
    - `should get auth and then list all tools`
        >`routes:` `POST/auth`,`GET/tools`
        >`epected:` `status 200`,`status 200`,
    - `should get auth, create a new tool and then get tools by passing a string array of tags`
        >`routes:` `POST/auth`, `POST/tool`, `GET/tool`
        >`expected:` `status 200`, `status 201`, `status 200`
