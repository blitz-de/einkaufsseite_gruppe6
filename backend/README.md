# Getting started

Navigate to the backend server:

```
$ cd backend
```

To get started with the app, clone the repo and
then install the needed npm packages:

```
$ npm install
```

To install the necessary modules run the following command:

```
$ npm i express express-validator mongoose morgan body-parser cookie-parser cors express-validator dotenv fs formidable lodash uuid crypto express-jwt jsonwebtoken
```

Add .env file in your backend project. It should look like below

```
DATABASE=..
PORT=
JWT_SECRET=
```

Start local backend server:

```
$ cd backend
$ npm start 
```

Now start the frontend server