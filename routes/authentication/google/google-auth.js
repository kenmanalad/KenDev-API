import express from "express";
import { config } from "dotenv";
import { OAuth2Client } from "google-auth-library";
import { getUserData } from "../../../controllers/auth/social-networks/google-auth.js";
import { generateToken } from "../../../controllers/auth/jwt/jwt-auth.js";
import register from "../../../controllers/auth/register.js";
import { query, validationResult } from "express-validator";


config();

const router = express.Router();

router.get("/g-auth", query('code').notEmpty() ,async(req,res)=>{

    const code = req.query.code;

    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(500).json(
            {
                message: "Code parameter is missing"
            }
        );
    }

    try{

        const redirectUrl = process.env.GOOGLE_REDIRECT_URL;

        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );

        const response = await oAuth2Client.getToken(code);

        if(!response) throw new Error("Failed to complete authentication request: No Access Token received from API");

        await oAuth2Client.setCredentials(response.tokens);

        const user = oAuth2Client.credentials;

        if(!user) throw new Error("Failed to complete authentication request: Credentials were not set properly");

        const userInfo  = await getUserData(user.access_token);

        if(!userInfo.success) throw new Error(userInfo.message);

        const { success,message, id} = await register(
            userInfo.data.email,
            null,
            "google"
        );

        if(!success){
            throw new Error(message);
        }

        let payload = {
            id: id
        };


        const token = generateToken(payload);
        
        res.cookie('token', token);

        res.cookie("id",id)
        
        res.redirect("http://127.0.0.1:5173/student-feed");

    }catch(error){

        console.error("Error happened while authentication google account",error);

        return res.status(400).json(
            {
                message: "Unable to process authentication request. Please try again later."
            }
        );

    }


});


export default router;