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
import githubAuth from "./routes/authentication/github/github-auth.js";
import linkedInAuth from "./routes/authentication/linkedIn/linkedIn-auth.js";
import Profile from "./routes/profile/profile.js"
import ProfileRegistration from "./routes/profile/profile-registration.js";
import Course from "./models/courses/course.js";
import CourseAPI from "./routes/course/course.js";
import ChapterRegistration from "./routes/chapter/chapter.js";
import QuizRegistration from "./routes/quiz/quiz.js"

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
app.use(bodyParser.json());
app.use('/temp_upload', express.static('C:\\Users\\user\\Documents\\My Web Sites\\KenDev\\api\\temp_upload'));


// SYNC MODELS
//TEMPORARILY FORCING THE CHANGE FOR DEVELOPMENT
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
app.get("/fetch-course",CourseAPI);


// POST
app.post("/profile",Profile);
app.post("/login",auth);
app.post("/register",register);
app.post("/google-request",googleAuthRequest);
app.post("/getGithubUserData",githubAuth);
app.post("/getLinkedInUserData",linkedInAuth);
app.post("/profile-registration",ProfileRegistration)
app.post(process.env.ADD_COURSE_ROUTE, CourseAPI);
app.post(process.env.ADD_CHAPTER_ROUTE,ChapterRegistration);
app.post(process.env.ADD_QUIZ_ROUTE,QuizRegistration);


app.listen(3030,() => console.log("Running Locally on 3030"));

