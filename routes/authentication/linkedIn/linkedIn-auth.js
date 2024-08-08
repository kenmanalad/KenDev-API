import { getAccessToken, getUserData } from "../../../controllers/auth/social-networks/linkedin-auth.js";
import express from "express";
import register from "../../../controllers/auth/register.js";
import { generateToken } from "../../../controllers/auth/jwt/jwt-auth.js";



const linkedInAuth = async(req,res) => {

    const code = req.body.code;

    if(!code){
        res.status(400).json("Failed to process request due to incomplete data. Please try again later");
    };

    try{

        const access_token = await getAccessToken(code);

        const user = await getUserData(access_token);

        if(user.error){
            res.status(user.status).json(
                {
                    messsage: user.message
                }
            );
        }

        const id = await register(
            user.email,
            null,
            null,
            true
        );

        if(!id){
            res.status(400).json(
                {
                    message: "This email address is already in use. Please try a different one.",
                }
            );
        };

        const token = generateToken(
            {
                id : id
            }
        );

        res.status(200).json(
            {
                token: token,
                user_id: id
            }
        );

    }catch(error){
        res.status(400).json(
            {
                message: "Unable to complete request. Please Try again later.",
            }
        );
    }


}

const router = express.Router();

router.post("/getLinkedInUserData",linkedInAuth);

export default router;