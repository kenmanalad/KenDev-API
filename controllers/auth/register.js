import User from "../../models/user.js";
import bcrypt from "bcrypt"
import login from "./login.js";

const register = async (email,password,userType,oauth) => {

    try{
        if(oauth){

            const created = await User.findOrCreate(
                {
                    where: {email}
                }
            );

            if(!created){
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

            if(!created){
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
            return {
                success:false,
                id: null,
                message:"Unable to process authentication request: Credentials are invalid.",
                status: 401
            };

        } else if (err.name === 'SequelizeUniqueConstraintError') {

            console.error("Unique Constraint Error: This email is already registered.", err.errors);
            return {
                success:false,
                id: null,
                message:"Unable to process authentication request: Email address is already registered.",
                status: 401
            };

        } else if (err.name === 'SequelizeDatabaseError') {

            console.error("Database Error: There was an issue with the database operation.", err);
            return {
                success:false,
                id: null,
                message:"Unable to process authentication request: Server has an issue as of the moment.",
                status: 500
            };

        } else {

            console.error("Unexpected Error: Failed to process registration.", err);
            return {
                success:false,
                id: null,
                message:"Unable to process authentication request. Please try again later.",
                status: 400
            };

        }
        
    }

}

export default register;