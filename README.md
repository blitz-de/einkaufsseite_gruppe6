# Getting started

To get started with the app, clone the repo, and 
then navigate to the backend folder

```
$ cd einkaufsseite_gruppe6
$ cd backend
```

Now install the needed npm packages:

```
$ npm install
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
$ npm start 
```

Open new terminal tab, navigate to frontend server and install node_modules in it as well as the necessary libs:

```
$ cd frontend
$ npm install
$ npm i braintree-web-drop-in-react@1.0.7 moment@2.24.0 query-string@6.5.0 react@16.8.6 react-dom@16.8.6 react-router-dom@5.0.0 braintree-web@3.45.0
```

Add a .env to the frontend folder, it should look something like below, depending on the port number you're using to connect to the server:

```
REACT_APP_API_URL=http://localhost:PortNr/api
```

Now install necessary modules and start local frontend server

```
$ npm i braintree-web-drop-in-react@1.0.7 moment@2.24.0 query-string@6.5.0 react@16.8.6 react-dom@16.8.6 react-router-dom@5.0.0 braintree-web@3.45.0
$ npm start 
```

Feature 3 was deployed to:
https://ecommerce-feature3-gruppe6.herokuapp.com/