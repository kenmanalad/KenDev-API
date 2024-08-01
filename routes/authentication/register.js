import express from "express"
import passport from "passport";
import "../../utils/strategies/local-strategy.js"
import register from "../../controllers/auth/register.js";

const router = express.Router();
export default router.post("/register", async (req, res) => {
    const { email , password, userType} = req.body;
    console.log(email);
    try{
        const created = await register(email,password);
        if(created){
            res.status(200).json({
                success:"true",
                errMessage:null
            })
        }
        else{
            res.status(200).json({
                success:false,
                errMessage:"Your email was used already"
            })
        }
    }catch(e){
        res.status(400).json({message: "Bad Input"})
    }
})