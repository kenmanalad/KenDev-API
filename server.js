import express from "express";
import posts from "./routes/home.js";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import auth from "./routes/authentication/auth.js";
import register from "./routes/authentication/register.js";
import sequelize from './config/database.js';
import "./utils/strategies/jwt-strategy.js";
import { config } from "dotenv";
import cors from 'cors';
import googleAuthRouter from "./routes/authentication/google/google-auth.js";
import googleAuthRequest from "./routes/authentication/google/google-auth-request.js";

config();
const app = express();

//CORS CONFIGURATION
const corsOptions = {
  origin:"http://127.0.0.1:5173",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials:true
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(session({
  secret: process.env.SECRET, 
  resave: false,              
  saveUninitialized: false,    
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 
  }
}));
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
app.get("/g-auth",googleAuthRouter);


// POST
app.post("/login",auth);
app.post("/register",register);
app.post("/google-request",googleAuthRequest);


app.listen(3030,() => console.log("Running Locally on 3030"));

