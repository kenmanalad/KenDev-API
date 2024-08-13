import User from "../../models/user.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { config } from "dotenv"
import { generateToken } from "./jwt/jwt-auth.js";

config();
const login = async (email, password) => {
    try{

        //Retrieve user data with profile data
        const user = await User.findOne(
            { where : 
                {
                    email
                }, 
                include: "Profile" 
            } 
        );

        if(!user){ 
            return {
                id: null,
                success:false,
                message: "Unable to process authentication request: Email address not registered",
                profile: null,
                token: null,
                status: 404
            }
        }

        //Validate Password
        const isMatch = await bcrypt.compare(password,user.password);


        if(!isMatch){     
            return {
                id: null,
                success : false,
                profile: null,
                message: "Unable to process authentication request: Password is incorrect",
                token: null,
                status:401
                
            }
        }


        //JWT 
        let payload = {id: user.id}


        let token = generateToken(payload);

        // This can be null or have a value
        const profile = await user.getProfile();


        return {
            id: user.id,
            success:true,
            profile: !!profile,
            message: "",
            token: token,
            status:200
        };
        

    }catch(err){
        if (err.name === 'SequelizeValidationError') {

            console.error("Validation Error: Invalid input data.", err.errors);
            return {
                id: null,
                success:false,
                profile: null,
                message: "Unable to process authentication request: Invalid input data.",
                token: null,
                status:401
            };
            
            

        } else if (err.name === 'SequelizeDatabaseError') {

            console.error("Database Error: There was an issue with the database operation.", err);

            return {
                id: null,
                success:false,
                profile: null,
                message: "Unable to process authentication request: Server has an issue as of the moment. ",
                token: null,
                status:500
            };

        } else {

            console.error("Unexpected Error: Failed to process registration.", err);
            return {
                id: null,
                success:false,
                profile: null,
                message: "Unable to process authentication request: Please try again later",
                token: null,
                status:400
            };

        }
    }
}
export default login;