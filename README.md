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

Open new terminal tab, navigate to frontend server and install node_modules in it:

```
$ cd frontend
$ npm install
```

Add a .env to the frontend folder, it should look something like below, depending on the port number you're using to connect to the server:

```
REACT_APP_API_URL=http://localhost:PortNr/api
```

Now start local frontend server

```
$ npm start 
```

Deployed Website for Feature1:

https://ecommerce-feature1-gruppe6.herokuapp.com/