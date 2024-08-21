import express from "express";
import { config } from "dotenv";
import { OAuth2Client } from "google-auth-library";

config();

const router = express.Router();

router.use(( req, res, done) => {
    res.header("Access-Control-Allow-Origin",'http://127.0.0.1:5173');

    res.header("Referrer-Policy","no-referrer-when-downgrade");

    done();
});

router.post("/google-request",async(req, res) => {

    const redirectUrl = process.env.GOOGLE_REDIRECT_URL;

    try{
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectUrl
        );
    
        console.log(oAuth2Client);
        
        const authorizeURL = oAuth2Client.generateAuthUrl(
            {
                access_type: "offline",
                scope: [ 
                    process.env.GOOGLE_SCOPES 
                ],
                prompt: "consent"
            }
        );

        if(!authorizeURL){
            res.status(400).json(
                {
                    url: null,
                    message:"Unable to redirect to Google Sign in Page. Please try again later"
                }
            );
        }

        res.status(200).json(
            {
                url:authorizeURL,
                message:""
            }
        );

    } catch(error) {

        console.error("Error occured while requesting auth url",error);

        res.status(400).json(
            {
                url: null,
                message:"There is an unexpected issue/s that occured. Please contact an agent for assistance"
            }
        );
    }

});

export default router;