/**
 * @author: Sakhr Al-absi
 * @Gruppe: 6
 * @Matrikelnummer: s0562218
 */
 const path = require('path');//
 const express = require("express");
 const mongoose = require("mongoose");
 const morgan = require("morgan");
 const bodyParser = require("body-parser");
 const cookieParser = require("cookie-parser");
 const cors = require("cors");
 const expressValidator = require("express-validator");
 require("dotenv").config();
 // import routes
 const authRoutes = require("./routes/auth");
 const userRoutes = require("./routes/user");
 const categoryRoutes = require("./routes/category");
 const productRoutes = require("./routes/product");
 
 // app
 // const app = express();
 
 // db
 //
 mongoose.set("debug", true);
 mongoose.Promise = global.Promise;
 //
 mongoose
     .connect(process.env.DATABASE, {
         useNewUrlParser: true,
         useCreateIndex: true
     })
     .then(() => {
         console.log("DB Connected")
 
         startWebServer();
     },
         err => {
             console.log("mongoose did not connect", err);
         }
     );
 
 
 function startWebServer() {
 
     const app = express();
 
     // app.get("/api/publicinformation", function (req, res) {
     //     res.send("Anyone can see this");
     // });
 
     // middlewares
     app.use(express.static("public"));
     app.use(morgan("dev"));
     app.use(bodyParser.json());
     app.use(cookieParser());
     app.use(expressValidator());
     app.use(cors());
 
     // routes middleware
     app.use("/api", authRoutes);
     app.use("/api", userRoutes);
     app.use("/api", categoryRoutes);
     app.use("/api", productRoutes);
 
     app.use(express.static(path.join(__dirname, 'public')))
     app.get('*', (req, res) => {
         res.sendFile(path.join(__dirname, '/public/index.html'))
     })
 
     const port = process.env.PORT || 8000;
 
     app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
     });
 }