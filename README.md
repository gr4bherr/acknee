## instructions

to run: `docker compose up -d`

to run e2e tests: `docker exec -it acknee-api-1 npm run test:e2e`

to seed data: `docker exec -it acknee-api-1 npx mikro-orm seeder:run`

> to resest db: `docker exec -it acknee-api-1 npx mikro-orm migration:fresh`

## endpoints

`auth/`

- POST `localhost:3000/auth/login`
  - needs a body of `{ email: string, password: string }`
  - returns `{ acessToken: string, refreshToken: string}`
  - example body `{ "email": "user@test.com", "password": "acknee" }`
- POST `localhost:3000/auth/register`
  - needs a body of `{ email: string, password: string }`
  - returns `{ acessToken: string, refreshToken: string}`
  - example body `{ "email": "user@test.com", "password": "acknee" }`
- POST `localhost:3000/auth/refresh`
  - needs a body of `{ refreshToken: string }`
  - returns `{ acessToken: string, refreshToken: string}`
  - example body `{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJFbWFpbCI6InVzZXIxQGZ1Y2ttZS5jb20iLCJpYXQiOjE3NTA1MTU0MzksImV4cCI6MTc1MzEwNzQzOX0.-TI9ZTk3LBiA-E6F7GjHEoC-0gFvhbOQXKp_phDaN14"
}`

`box/`

all box endpoints require **Bearer Token** in header

- GET `localhost:3000/box/list`
  - needs query params: `lat: string & lon: string`
  - optional query params: `search: string, page: number, limit: number`
  - returns a paginated list of boxes ordered by closest first
  - example: `localhost:3000/box/list?lon=51.066875&lat=13.746496`
  - example: `localhost:3000/box/list?lon=51.066875&lat=13.746496&limit=3&search=b23&page=1`
- GET `localhost:3000/box/:boxId`
  - needs valid boxId in uri
  - return box details
- POST `localhost:3000/box/:boxId/open`
  - needs valid boxId in uri
  - needs body `{ packageCode: string }`
  - return `{ success: boolean }`
- POST `localhost:3000/box/:boxId/closed`
  - needs valid boxId in uri
  - needs body `{ packageCode: string }`
  - return `{ success: boolean }`

## overview

#### number of hours worked on task: 7h

### used tools:

- vscodium
- orbstack
- dbeaver
- yaak
- grok
- chatgpt
- not cursor (i disable it on projects i do on my own time, it's more fun that way)

### used technologies:

- postgres - used it because of its postgis integrated location capabilities and structured data needs
- nestjs - used it because i deemed it fit for this task (i also like it the most)
- mikroorm - i like using orms, chose this based on my personal preference
- jwt bearer token - used it as its an api for a phone app, where passing jwt tokens in cookies wouldn't make much sense

### notes

- tests are not close to perfect and exhaustive - just wanted for you to be able to run them and not have to manually test each endpoint
- diagram and 2fa would take more time which i don't have - focused on what I thought was most important, I'm happy to talk about it more
- normaly would make different auth guards for different roles, this example needs just one tho
- to view db, look in .env for credentials

## curls to test:

#### replace **YOUR_TOKEN** with the accessToken you get from login

login

- `curl -X POST 'localhost:3000/auth/login' --header 'Content-Type: application/json' --data-raw '{ "email": "user@test.com", "password": "acknee" }'`
- expected result: `{ "accessToken": "eyJhbGciOi...", "refreshToken": "eyJhbGc..." }`
-
- `curl -X POST 'localhost:3000/auth/login' --header 'Content-Type: application/json' --data-raw '{ "email": "customer@test.com", "password": "acknee" }'`
- expected result: `{ "accessToken": "eyJhbGciOi...", "refreshToken": "eyJhbGc..." }`

box/list

- `curl -X GET 'localhost:3000/box/list?lon=51.066875&lat=13.746496&limit=3&search=b23&page=1' --header 'Authorization: Bearer YOUR_TOKEN'`
- expected result: `{
  "currentPage": 1,
  "totalPages": 3815,
  "isPrev": false,
  "isNext": true,
  "total": 11444,
  "nodes": [
    {
      "id": 2364,
      "identifier": "B2364",
      "geom": {
        "lat": 49.7766,
        "lon": 19.07036
      },
      "distance": 4941531.75665323
    },
    {
      "id": 2348,
      "identifier": "B2348",
      "geom": {
        "lat": 49.79804,
        "lon": 19.09204
      },
      "distance": 4941998.19619478
    },
    {
      "id": 2383,
      "identifier": "B2383",
      "geom": {
        "lat": 49.7831691,
        "lon": 19.0673607
      },
      "distance": 4942185.39517013
    }
  ]
}`

box/:boxId

- `curl -X GET 'localhost:3000/box/234' \ --header 'Authorization: Bearer YOUR_TOKEN'`
- expected result: `{
  "id": 234,
  "identifier": "B234",
  "geom": {
    "lon": 17.0313134,
    "lat": 51.0926429
  }
}`
-
- `curl -X GET 'localhost:3000/box/123412341234' \ --header 'Authorization: Bearer YOUR_TOKEN'`
- expected result: `{
  "message": "box with id 123412341234 not found",
  "error": "Not Found",
  "statusCode": 404
}`

box/:boxId/open

- `curl -X POST 'localhost:3000/box/234/open' --header 'Content-Type: application json' --data-raw '{ "packageCode": "1bo3j5b" }' --header 'Authorization: Bearer YOUR_TOKEN'`
- expected result: `{"success":true}`
-
- `curl -X POST 'localhost:3000/box/234/open' --header 'Content-Type: application/json' --data-raw '{ "packageCode": "xxxx" }' --header 'Authorization: Bearer YOUR_TOKEN'`
- expected result: `{ "message": "package with code xxxx not found", "error": "Not Found", "statusCode": 404 }`

box/:boxId/closed

- `curl -X POST 'localhost:3000/box/234/closed' --header 'Content-Type: application json' --data-raw '{ "packageCode": "1bo3j5b" }' --header 'Authorization: Bearer YOUR_TOKEN'`
- expected result: `{"success":true}`
-
- `curl -X POST 'localhost:3000/box/234/closed' --header 'Content-Type: application/json' --data-raw '{ "packageCode": "xxxx" }' --header 'Authorization: Bearer YOUR_TOKEN'`
- expected result: `{ "message": "package with code xxxx not found", "error": "Not Found", "statusCode": 404 }`
