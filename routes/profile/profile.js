import { config } from "dotenv";
import express from "express";
import passport from "passport";
import fetchProfile from "../../controllers/profile/fetch-profile.js";

config();

const router = express.Router();


router.post(
    "/profile",
    passport.authenticate(
        "jwt",
        {session:false}
    ),
     fetchProfile
    );

export default router;
