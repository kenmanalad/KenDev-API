import express from "express"
import passport from "passport";
import "../../utils/strategies/local-strategy.js"
import register from "../../controllers/auth/register.js";

const router = express.Router();
export default router.post("/register", async (req, res) => {
    const { email , password, userType} = req.body;
    console.log(email);
    try{
        const {success,message,status} = await register(email,password);

        res.status(status).json({
            success:success,
            message:message
        });

    }catch(e){

        if (err.name === 'SequelizeValidationError') {

            console.error("Validation Error: Invalid input data.", err.errors);
            res.status(401).json(
                {
                    message: "Unable to process authentication request: Credentials are invalid.",
                    success:false
                }
            );

        } else if (err.name === 'SequelizeUniqueConstraintError') {

            console.error("Unique Constraint Error: This email is already registered.", err.errors);
            res.status(401).json(
                {
                    message: "Unable to process authentication request: Email address is already registered.",
                    success:false,
                }
            );

        } else if (err.name === 'SequelizeDatabaseError') {
            console.error("Database Error: There was an issue with the database operation.", err);
            res.status(500).json(
                {
                    message: "Unable to process authentication request: Server issue as of the moment.",
                    success:false
                }
            );
        } else {

            console.error("Unexpected Error: Failed to process registration.", err);
            res.status(400).json(
                {
                    message: "Unable to process authentication request. Please try again later.",
                    success:false
                }
            );

        }
    }
})