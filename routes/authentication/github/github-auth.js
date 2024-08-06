import express from "express";
import { config } from "dotenv";
import passport from "passport";
import { getAccessToken } from "../../../controllers/auth/social-networks/github-auth.js";
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

            const data = await getAccessToken(code);

            const userData = await getUserData(data.access_token);

            const customizedUsername = userData.login + userData.id;

            let id = await register(
                userData.email ?? customizedUsername,
                null,
                null,
                true
            );

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
            console.error("Error occured during github authentication",error);
        }
    }
);

export default router;