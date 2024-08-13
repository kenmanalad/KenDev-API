import express from "express"
import passport from "passport";
import Profile from "../../models/profile/profile.js";
import User from "../../models/user.js";
import registerProfile from "../../controllers/profile/register-profile.js";
const router = express.Router();

router.post("/profile-registration",
    passport.authenticate(
        "jwt",
        {session:false}
    )
    ,registerProfile
);

export default router;