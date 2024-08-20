import User from "../../models/user.js";
import bcrypt from "bcrypt"
import login from "./login.js";
import Profile from "../../models/profile/profile.js";
import { capitilizeFirstLetter } from "../../utils/shared/stringUtils.js";

const register = async (email,password,oauth) => {

    try{
        if(oauth){

            const created = await User.findOrCreate(
                {
                    where: {email}
                }
            );

            if(!created[1]){
                console.error(`Error occured in user registration through ${oauth}`);
                return {
                    success: false,
                    id: null,
                    message: "Failed in processing registration request. Please Try again later.",
                    status: 500
                }
            }

            return {
                success:true,
                id: created[0].dataValues.id,
                message: "",
                status: 200
            }
            
        } else {
            const hashedPassword = await bcrypt.hash(password,10);
            

            const created = await User.create(
                {
                    email, 
                    password: hashedPassword
                }
             );

            if(!created.id){
                console.error("Error occured in manual user registration");
                return {
                    success: false,
                    id: null,
                    message: "Failed in processing registration request. Please Try again later.",
                    status: 500
                }
            }

            return {
                success: true,
                id: created.id,
                message: "", 
                status: 200
            }

        }
    }catch(err){

        if (err.name === 'SequelizeValidationError') {

            console.error("Validation Error: Invalid input data.", err.errors);

            const field = err.errors[0].path ?? "a credential"
            
            return {
                success:false,
                id: null,
                message:`${capitilizeFirstLetter(field)} is invalid. Please provide valid credentials.`,
                status: 401
            };

        } else if (err.name === 'SequelizeUniqueConstraintError') {

            console.error("Unique Constraint Error: This email is already registered.", err.errors);
            return {
                success:false,
                id: null,
                message:"Email address is already registered. Please provide another email address",
                status: 401
            };

        } else if (err.name === 'SequelizeDatabaseError') {

            console.error("Database Error: There was an issue with the database operation.", err.errors);
            return {
                success:false,
                id: null,
                message:"Server has an issue as of the moment. Please contact an agent for this issue",
                status: 500
            };

        } else {

            console.error("Unexpected Error: Failed to process registration.", err);
            return {
                success:false,
                id: null,
                message:"There is an unexpected error. Please try again later.",
                status: 400
            };

        }
        
    }

}

export default register;