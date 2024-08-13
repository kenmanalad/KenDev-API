import express from "express"
import passport from "passport";
import "../../utils/strategies/local-strategy.js"
import login from "../../controllers/auth/login.js";

const router = express.Router();

export default router.post("/login", async(req, res) => {
    
    const {email, password} = req.body;

    try{
        const { id, token, message, status,profile} = await login(email,password);

        res.status(status).json(
            {
                id:id,
                message:message,
                token:token,
                profile: profile
            }
        );

    }catch(err){

        if (err.name === 'SequelizeValidationError') {

            console.error("Validation Error: Invalid input data.", err.errors);
            res.status(401).json({"message": "Unable to process authentication request: Credentials are invalid."});

        } else if (err.name === 'SequelizeDatabaseError') {
            console.error("Database Error: There was an issue with the database operation.", err);
            res.status(500).json({"message": "Unable to process authentication request: Server issue as of the moment."});
        } else {

            console.error("Unexpected Error: Failed to process registration.", err);
            res.status(400).json({"message": "Unable to process authentication request. Please try again later."});

        }

    }
});









