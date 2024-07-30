import express from "express";
import home from "../controllers/home_controller.js";
import "../utils/strategies/jwt-strategy.js";
import passport from "passport";

const router = express.Router();

router.get("/hello",
    passport.authenticate(
            "jwt",
            {session:false}
        ),
        home
    );

export default router;