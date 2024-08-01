import express from "express"
import passport from "passport";
import "../../utils/strategies/local-strategy.js"
import login from "../../controllers/auth/login.js";

const router = express.Router();

export default router.post("/login", async(req, res) => {
    
    const {email, password} = req.body;

    try{
        const {success, message, token} = await login(email,password);

        if(success){
            res.status(200).json(
                {
                    message:message,
                    token:token
                }
            );
        }

        else{
            res.status(400).json(
                {
                    message:message,
                    token: null
                }
            )
        }

    }catch(err){

        res.status(400).json({"message": "Bad Credentials"});

    }
});









