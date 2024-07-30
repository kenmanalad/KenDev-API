import express from "express"
import passport from "passport";
import "../../utils/strategies/local-strategy.js"
import register from "../../controllers/auth/register.js";

const router = express.Router();
export default router.post("/register", (req, res) => {
    const { email , password, userType} = req.body;
    console.log(email);
    register(email,password);
    res.send("Logged in");
})