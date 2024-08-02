import express from "express";
import { config } from "dotenv";
import { OAuth2Client } from "google-auth-library";
import { getUserData ,generateToken } from "../../../controllers/auth/google-auth.js";
import register from "../../../controllers/auth/register.js";


config();

const router = express.Router();

router.get("/g-auth", async(req,res)=>{

    const code = req.query.code;

    if(!code){
        return res.status(400).json({
            errMessage: "Code parameter is missing"
        })
    }
    try{

        const redirectUrl = process.env.GOOGLE_REDIRECT_URL;

        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );

        const response = await oAuth2Client.getToken(code);

        await oAuth2Client.setCredentials(response.tokens);

        const user = oAuth2Client.credentials;

        // console.log(user);

        const userInfo = await getUserData(user.access_token);

        // console.log(userInfo.email);

        const id = await register(
            userInfo.email,
            null,
            null,
            "oauth"
        );

        let payload = {
            id: id
        };

        const token = generateToken(payload);
        
        res.cookie('token', token);
        
        res.redirect("http://127.0.0.1:5173/student-feed");

    }catch(error){

        console.error("Error happened while authentication google account",error);

    }


});


export default router;