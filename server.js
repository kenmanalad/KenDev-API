import express from "express";
import posts from "./routes/home.js";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import auth from "./routes/authentication/auth.js";
import register from "./routes/authentication/register.js";
import sequelize from './config/database.js';
import "./utils/strategies/jwt-strategy.js";

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

// SYNC MODELS
sequelize.sync()
  .then(() => {
    console.log('Database connected and synchronized');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });


// GET 
app.get("/",posts);
app.get("/hello",posts);


// POST
app.post("/login",auth);
app.post("/register",register);

app.listen(3030,() => console.log("Running Locally on 3030"));

