import express from "express"
import passport from "passport";
import "../../utils/strategies/local-strategy.js"
import login from "../../controllers/auth/login.js";

const router = express.Router();
export default router.post("/login", async(req, res) => {
    const {email, password} = req.body;
    try{
        const {success, message, token} = await login(email,password);
        console.log(token);
        if(success){
            res.json(
                {
                    message:message,
                    token:token
                }
            );
        }
        else{
            res.json(
                {
                    message:message,
                    token: null
                }
            )
        }

    }catch(err){
        res.status(401).json({"message": "Invalid Authorization"});
    }
});









