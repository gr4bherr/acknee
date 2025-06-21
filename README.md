## instructions

to run: `docker compose up -d`

to seed data: `docker exec -it acknee-api-1 npx mikro-orm seeder:run`

to resest db: `docker exec -it acknee-api-1 npx mikro-orm migration:fresh`

## example endpints

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
  - returns a paginated list of boxes order by closest first
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

#### number of hours worked on task: 6h

### used tools:

- vscodium
- orbstack
- dbeaver
- yaak
- grok
- chatgpt
- not cursor (i disable it on projects i do on my own time, it's more fun that way)

### used technologies:

- posgres - used it because of its postgis integrated location capabilities and structured data needs
- nestjs - used it because i deemed it fit for this task (i also like it the most)
- mikroorm - i like using orms, chose this based on my personal preference
- jwt bearer token - used it as its an api for a phone app, where passing jwt tokens in cookies wouldn't make much sense

### notes

-
