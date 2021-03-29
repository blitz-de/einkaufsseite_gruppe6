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
$ npm i express express-validator mongoose morgan body-parser cookie-parser cors express-validator dotenv fs formidable lodash uuid crypto express-jwt jsonwebtoken braintree@2.22.0
```

Add .env file in your backend project. It should look like below

```
DATABASE=..
PORT=
JWT_SECRET=
BRAINTREE_MERCHANT_ID= write_merchantID_here
BRAINTREE_PUBLIC_KEY= write_public_key_here
BRAINTREE_PRIVATE_KEY= write _private_key_here
```

Start local backend server:

```
$ npm start 
```

Now start the frontend server