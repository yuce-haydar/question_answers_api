# Getting started

- Clone this repo
- `npm install` to install all required dependencies
- Create MongoDb Cluster and Get Connection MongoDb URI
- Set environment variables in `config.env` under `./config/env`
* Set `MONGO_URI = <YOUR_MONGO_URI>`
* Set `JWT_SECRET_KEY = <YOUR_SECRET_KEY>`
* Set `SMTP_EMAIL=<YOUR_GMAIL_EMAIL>`
* Set `SMTP_PASS=<YOUR_GMAIL_PASSWORD>`

## Code Overwiew
### Dependencies
- expressjs - The server for handling and routing HTTP requests
- jsonwebtoken - For generating JWTs used by authentication
- mongoose - For modeling and mapping MongoDB data to JavaScript
- slugify - For encoding titles into a URL-friendly format
- bcryptjs - Hashing Password
- dotenv - Zero-Dependency module that loads environment variables
- multer - Node.js middleware for uploading files
- nodemailer - Send e-mails from Node.js
## Application Structer
`server.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also inncludes the routes we'll be using in the application.
- `config/` - This folder contains configuration for central location environment variables and other configurations.
- `routes/` - This folder contains the route definitions (answer, question etc. ) for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models (User, Question).
- `controllers/` - This folder contains controllers for our API.
- `public/ `- This folder contains static files for our API.
- `middlewares/` - This folder contains middlewares for our API.
- `helpers/` - This folder contains helper functions for adapting 3rd party libraries for our API.
- `dummy/` - This folder contains dummy data created by dummy-generator.js file for our database.

# Authentication
Requests are authenticated using the Authorization header and value `Bearer: {{token}}`. with a valid JWT.<br>

We define express middlewares in middlewares/authorization/auth.js that can be used to authenticate requests. The required middlewares returns 401 or 403.

Bu rest api Mustafa murat COŞKUN ve Engin Demirog Udemy kursundaki derslerindenden  Yapılmıştır 
https://github.com/mustafamuratcoskun/question-answer-rest-api/blob/master/README.md
