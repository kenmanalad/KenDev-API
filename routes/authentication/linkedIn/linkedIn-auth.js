import { getAccessToken, getUserData } from "../../../controllers/auth/social-networks/access-user-data.js"
import express from "express";
import register from "../../../controllers/auth/register.js";
import { generateToken } from "../../../controllers/auth/jwt/jwt-auth.js";
import { body, validationResult } from "express-validator";



const linkedInAuth = async(req,res) => {


    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(500).json(
            {
                message: "Code parameter is missing",
                token:null,
                user_id:null
            }
        );
    }

    const code = req.body.code;

    const params = new URLSearchParams(
        {
            client_secret: process.env.LINKEDIN_CLIENT_SECRET,
            client_id: process.env.LINKEDIN_CLIENT_ID,
            redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
            grant_type: process.env.LINKEDIN_GRANT_TYPE,
            code: code
    
        }
    ).toString();

    try{

        const contentType = {
            "Content-Type":"x-www-form-urlencoded"
        }
        const response = await getAccessToken(
            code, 
            process.env.LINKEDIN_GET_ACCESS_TOKEN_URL,
            params,
            contentType
        );

        console.log(response);
        if(!response.success){
            return res.status(response.status).json(
                {
                    message: response.message,
                    token: token,
                    user_id: id
                }
            );
        }

        const user = await getUserData(
            response.access_token,
            process.env.LINKEDIN_GET_USER_DATA_URL

        );

        if(!user.success){
            return res.status(user.status).json(
                {
                    messsage: user.message,
                    token: null,
                    user_id:null
                }
            );
        }

        const {success,id,message,status} = await register(
            user.data.email,
            null,
            null,
            "linkedin"
        );

        if(!success){
            return res.status(status).json(
                {
                    message: message,
                    token: null,
                    user_id:null
                }
            );
        };

        const token = generateToken(
            {
                id : id
            }
        );

        return res.status(status).json(
            {
                message:"",
                token: token,
                user_id: id
            }
        );

    }catch(error){
        return res.status(400).json(
            {
                message: "Unable to complete request. Please Try again later.",
                token: null,
                user_id: null
            }
        );
    }


}

const router = express.Router();

router.post("/getLinkedInUserData", body('code').notEmpty() ,linkedInAuth);

export default router;