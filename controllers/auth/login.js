import User from "../../models/user.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { config } from "dotenv"
import { generateToken } from "./jwt/jwt-auth.js";

config();
const login = async (email, password) => {
    try{

        const findUser = await User.findOne({ where : {email} } );

        const isMatch = await bcrypt.compare(password,findUser.password);
        
        let payload = {id: findUser.id}

        let token = generateToken(payload);

        if(!findUser){ 
            return {
                id: null,
                success:false,
                message: "Unable to process authentication request: Email address not registered",
                token: null,
                status: 404
            }
        }
        else if(!isMatch){     
            return {
                id: null,
                success : false,
                message: "Unable to process authentication request: Password is incorrect",
                token: null,
                status:401
                
            }
        }
        return {
            id: findUser.id,
            success:true,
            message: "",
            token: token,
            status:200
        };
        

    }catch(error){
        if (err.name === 'SequelizeValidationError') {

            console.error("Validation Error: Invalid input data.", err.errors);
            return {
                id: null,
                success:false,
                message: "Unable to process authentication request: Invalid input data.",
                token: null,
                status:401
            };
            
            

        } else if (err.name === 'SequelizeDatabaseError') {

            console.error("Database Error: There was an issue with the database operation.", err);

            return {
                id: null,
                success:false,
                message: "Unable to process authentication request: Server has an issue as of the moment. ",
                token: null,
                status:500
            };

        } else {

            console.error("Unexpected Error: Failed to process registration.", err);
            return {
                id: null,
                success:false,
                message: "Unable to process authentication request: Please try again later",
                token: null,
                status:400
            };

        }
    }
}
export default login;