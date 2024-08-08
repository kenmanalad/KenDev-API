import express from "express";
import { config } from "dotenv";
import passport from "passport";
import { getUserData } from "../../../controllers/auth/social-networks/github-auth.js";
import { generateToken } from "../../../controllers/auth/jwt/jwt-auth.js";
import register from "../../../controllers/auth/register.js";


config();

const router = express.Router();
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

router.post("/getGithubUserData", async (req, res) => 
    {
        const code = req.body.code;


        if(!code){
            return res.status(400).json(
                {
                    errMessage: "Code parameter is missing"
                }
            );
        }

        try{

            const userData = await getUserData(code);

            console.log(userData);

            const customizedUsername = userData.login + userData.id;

            let id = await register(
                userData.email ?? customizedUsername,
                null,
                null,
                true
            );

            if(!id){
                res.status(400).json(
                    {
                        errMessage: "This email address is already in use. Please try a different one.",
                    }
                );
            };

            const payload = {
                id: id
            }

            const token = generateToken(payload);

            console.log(token);
            
            res.status(200).json(
                {
                    token:token,
                    id:id
                }
            );

    
            

        }catch(error){
            res.status(400).json(
                {
                    errMessage: "Unable to complete request. Please Try again later.",
                }
            );
        }
    }
);

export default router;