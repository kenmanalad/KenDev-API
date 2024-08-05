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
    
        const authorizeURL = oAuth2Client.generateAuthUrl(
            {
                access_type: "offline",
                scope: [ 
                    process.env.GOOGLE_SCOPES 
                ],
                prompt: "consent"
            }
        );

        res.json(
            {
                url:authorizeURL
            }
        );

    } catch(error) {
        console.error("Error occured while requesting auth url",error);
    }

});

export default router;