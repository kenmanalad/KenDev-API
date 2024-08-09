import express from "express";
import { config } from "dotenv";
import passport from "passport";
import { getUserData, getAccessToken } from "../../../controllers/auth/social-networks/access-user-data.js";
import { generateToken } from "../../../controllers/auth/jwt/jwt-auth.js";
import register from "../../../controllers/auth/register.js";
import { body, validationResult } from "express-validator";
import URLSearchParams from "url-search-params";


config();

const router = express.Router();
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

router.post("/getGithubUserData", body('code').notEmpty(), async (req, res) => 
    {

        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(500).json(
                {
                    message: "Code parameter is missing",
                    token: null,
                    id: null
                }
            );
        }

        const code = req.body.code;

        const params = new URLSearchParams({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret:process.env.GITHUB_CLIENT_SECRET,
            code: code
        }).toString();
        const contentType = {
            "Accept":"application/json"
        }

        try{

            const response = await getAccessToken(code,process.env.GITHUB_GET_ACCESS_TOKEN_URL,params,contentType);

            console.log(response);

            if(!response.success){
                return res.status(response.status).json(
                    {
                        message: response.message,
                        token: token,
                        id: id
                    }
                );
            }

            const userData = await getUserData(response.access_token,process.env.GITHUB_GET_USER_DATA_URL);

            if(!userData.success){
                return res.status(user.status).json(
                    {
                        messsage: user.message,
                        token: null,
                        id:null
                    }
                );
            }


            const customizedUsername = userData.data.login + userData.data.id;

            let { success, id, message, status } = await register(
                userData.data.email ?? customizedUsername,
                null,
                null,
                "github"
            );

            if(!success){
                return res.status(status).json(
                    {
                        message: message,
                        token: null,
                        id: null
                    }
                );
            };

            const payload = {
                id: id
            }

            const token = generateToken(payload);

            console.log(token);
            
            return res.status(201).json(
                {
                    message: "",
                    token:token,
                    id:id
                }
            );

    
            

        }catch(error){
            console.log(error);
            return res.status(400).json(
                {
                    message: "Unable to complete request. Please Try again later.",
                    token: null,
                    id: null
                }
            );
        }
    }
);

export default router;